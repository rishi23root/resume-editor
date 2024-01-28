// handle all the actions to use use by the each pages 
import { prisma } from "@/lib/prisma";
import { PrivateMetadata } from "@/types/user";
import { clerkClient, currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { checkIfFromLinkedin } from "@/utils/linkedinUtil";
import useParamParser, { encodeJSONToBase64, jsonToSearchParameters } from "./paramHandeler";
import { PageProps } from '../types/utils';
import { serverAPI } from "@/serverTRPC/serverAPI";




export async function newUserLoginHandler(): Promise<PrivateMetadata | {}> {
    // effective only for new login accounts
    const user = await currentUser();

    if (!user) return {}

    var redirectPage = ""
    // if user does not have private metadata that means user is new to platform 
    if (!Object.keys(user?.privateMetadata as object).length && user?.id) {
        // 1. create user in database 
        try {
            const newUser = await prisma.user.create({
                data: {
                    name: (user.firstName ? user.firstName : "Blank_Name") + (user?.lastName ? " " + user.lastName : ""),
                    clerkId: user.id
                },
                select: {
                    id: true,
                }
            })

            // 2. update user metadata for the application 
            // for more info see https://clerk.com/docs/users/metadata
            // console.log("setting up user metadata: ",user?.id, newUser);
            await clerkClient.users.updateUserMetadata(user?.id as string, {
                "privateMetadata": {
                    'userDBid': newUser.id,
                    'name': (user.firstName ? user.firstName : "Blank_Name") + (user?.lastName ? " " + user.lastName : "")
                }
            }
            )
            // 3 redict user to the first time login sequence 
            redirectPage = '/New?' + await jsonToSearchParameters({
                _s: encodeJSONToBase64({
                    mode: "newLogin",
                }),
            });
        } catch (e) {
            console.error(e);
            return {}
        }
    }
    // else{
    //     console.debug("User is already exiting with private Metadata :",Object.keys(user?.privateMetadata as object));
    // }

    // check if user have is from linkedin account add boolean in metadata
    if (!user?.privateMetadata?.linkedin) {
        // console.log("linkedin account not found ");

        const linkedinUser = await checkIfFromLinkedin(user);
        if (linkedinUser) {
            try {
                // update the metadata
                await clerkClient.users.updateUserMetadata(user?.id as string, {
                    "privateMetadata": {
                        'linkedin': linkedinUser ? true : false
                    }
                }
                )
                // update the database
                await prisma.user.update({
                    data: {
                        isLinkedLogin: linkedinUser ? true : false
                    },
                    where: {
                        clerkId: user.id
                    }
                })
                redirectPage = '/New/parsePDF'
            } catch (e) {
                console.error(e);
                return {}
            }
        }
    }

    redirectPage && redirect(redirectPage)

    return user?.privateMetadata as PrivateMetadata
}



// builderPage params validator
// check for all search params and redirect to the right page if not found
export async function builderPageParamsRedirectHandeler({ searchParams }: PageProps) {
    // copy the search params to avoid mutation
    const SearchParams = { ...searchParams }
    // extract the readable data from the search params
    const { privateData } = await useParamParser("", SearchParams);

    // if (private data or _s session string) is not found or empty object then redirect to the dashboard
    if (!Object.keys(privateData).length || !SearchParams._s) {
        SearchParams.error = "error decoding data, have to restart building :( ";
        return redirect("/Dashboard?" + await jsonToSearchParameters(SearchParams));
    }

    // add param to activate mean mode where only those path with no 
    // add the next redirect page info
    SearchParams.redirectPage = "/Builder";
    privateData.mode = "newResume";

    // jobId is not found then redirect to the jobDis page
    if (!SearchParams.jobId) {
        privateData.procegure = 1;
        SearchParams._s = encodeJSONToBase64(privateData);
        return redirect("/JobDescriptions?" + await jsonToSearchParameters(SearchParams));
    }
    // templateName is not found then redirect to the Template page
    if (!SearchParams.templateName) {
        privateData.procegure = 2;
        SearchParams._s = encodeJSONToBase64(privateData);
        return redirect("/Templates?" + await jsonToSearchParameters(SearchParams));
    }
    // payId is not found then redirect to the Payment page
    if (!SearchParams.payId) {
        // update the session data with right procegure info
        privateData.procegure = 3;
        SearchParams._s = encodeJSONToBase64(privateData);
        return redirect("/Payment?" + await jsonToSearchParameters(SearchParams));
    }

    return
}

// validate the params for the builder page like payment id and jsondataId
// now user have all the required search params work on secured params and work on it 
export async function builderPageParamsValidator({ searchParams }: PageProps) {
    const { stringifiedData, privateData } = await useParamParser(
        "/Builder",
        searchParams
    );

    const SearchParams = { ...searchParams }

    // --------------------------------------------------------------------------

    // get user to reference the database with its id

    // user clerk private metadata to get user id
    const user = await currentUser();
    const userDBid = user?.privateMetadata?.userDBid;

    // if user is not found then redirect to the dashboard and logout
    if (!userDBid) {
        return redirect("/Dashboard?" + await jsonToSearchParameters({
            error: "Error with your account, del your account and try again :( ",
        }));
    }

    // console.log("Extract userid from clerk private metadata: ", userDBid);

    // flow-
    // first check if the request have json data id, if not assign the recent unpaid user's resume for the user
    // then check for the recent unpaid resume for the user

    // check if request have json data id or not
    console.log('Check if request have json data id or not');
    if (privateData.jsonDataId) {
        console.log('Passed, json data id exist in request, varifiying the id');

        // check if the json data id is valid or not and its user id is same as the current user 
        const jsonData = await prisma.resumeData.findUnique({
            where: {
                id: privateData.jsonDataId,
            },
            select: {
                id: true,
                payId: true,
                jobId: true,
                template: true,
                paymentId: true,
                paymentStatus: true,
                creaatedAt: true,
            }
        })
        if (jsonData) {
            console.log('passed json data id check, varified datajson id');
            // if unpaid then update the job id and pay id
            if (jsonData.paymentStatus === "pending") {
                console.log('passed unpaid check, updating the pay id and job id');
                // update the pay id and job id
                const updatedResume = await prisma.resumeData.update({
                    where: {
                        id: jsonData.id
                    },
                    data: {
                        payId: parseInt(SearchParams.payId as string),
                        jobId: parseInt(SearchParams.jobId as string),
                        template: SearchParams.templateName as string,

                    },
                    select: {
                        id: true,
                        payId: true,
                        jobId: true,
                        template: true,
                        paymentStatus: true,
                        paymentId: true,
                        creaatedAt: true,
                    }
                })
                return updatedResume;
            }
            else {
                // (jsonData.paymentStatus === "paid")
                console.log('passed paid check, user can start editing if time is left');
                console.log(jsonData.creaatedAt)
                // if paid then redirect to the dashboard
                // return redirect("/Dashboard?" + await jsonToSearchParameters({
                //     error: "You have already paid for this resume, you can download it from dashboard",
                // }));
                return jsonData;
            }
        } else {
            console.log('failed, datajson id, redirecting to dashboard');
            // if not valid then redirect to the dashboard
            return redirect("/Dashboard?" + await jsonToSearchParameters({
                error: "error decoding data, have to restart building :( ",
            }));
        }
    } else {
        console.log('failed, json data id not found in request, looking for recent unpaid resume for the user');

        // look for recent unpaid generated resume for the user 
        const recentRequstForResume = await prisma.resumeData.findFirst({
            where: {
                userId: userDBid as string,
                paymentStatus: "pending"
            },
            select: {
                id: true,
                payId: true,
                jobId: true,
                template: true,
                paymentStatus: true,
                paymentId: true,
                creaatedAt: true,
            }
        })

        if (recentRequstForResume) {
            console.log('passed found unpaid resume', recentRequstForResume.id);
            // console.log(recentRequstForResume.payId, parseInt(SearchParams.payId as string), SearchParams.payId);
            // console.log("testing for data similarity: ", parseInt(SearchParams.jobId as string) === recentRequstForResume.jobId);

            if (recentRequstForResume.payId !== parseInt(SearchParams.payId as string) || parseInt(SearchParams.jobId as string) !== recentRequstForResume.jobId) {
                var defaultData = await serverAPI.builder.getDefault({
                    jobId: parseInt(SearchParams.jobId as string),
                });
                // update the database with current pay id
                console.log('updating the pay id and data for reqeuested jobid in the database');
                const updatedResume = await prisma.resumeData.update({
                    where: {
                        id: recentRequstForResume.id
                    },
                    data: {
                        payId: parseInt(SearchParams.payId as string),
                        jobId: parseInt(SearchParams.jobId as string),
                        template: SearchParams.templateName as string,
                        data: JSON.stringify(defaultData),
                    },
                    select: {
                        id: true,
                        payId: true,
                        jobId: true,
                        template: true,
                        paymentStatus: true,
                        paymentId: true,
                        creaatedAt: true,
                    }
                })
                // return updatedResume;
                SearchParams._s = encodeJSONToBase64({
                    ...privateData as object,
                    jsonDataId: updatedResume.id
                });
                return redirect("/Builder?" + await jsonToSearchParameters(SearchParams));
            }
            SearchParams._s = encodeJSONToBase64({
                ...privateData as object,
                jsonDataId: recentRequstForResume.id
            });
            return redirect("/Builder?" + await jsonToSearchParameters(SearchParams));
        }
        else {
            console.log('fail in finding unpaid resume, creating a new one');
            // console.log("default data for new resume:", {
            //     payId: parseInt(SearchParams.payId as string),
            // });

            var defaultData = await serverAPI.builder.getDefault({
                jobId: parseInt(SearchParams.jobId as string),
            });
            // console.log(JSON.stringify(defaultData));
            const newResume = await prisma.resumeData.create({
                data: {
                    data: JSON.stringify(defaultData),
                    payId: parseInt(SearchParams.payId as string),
                    jobId: parseInt(SearchParams.jobId as string),
                    template: SearchParams.templateName as string,
                    paymentId: "",
                    user: {
                        connect: {
                            id: userDBid as string
                        }
                    }
                },
                select: {
                    id: true,
                    payId: true,
                    jobId: true,
                    template: true,
                    paymentStatus: true,
                    paymentId: true,
                    creaatedAt: true,
                }
            })
            // console.log(newResume);
            // return newResume;
            // SearchParams.payId = newResume.payId.toString(); ;
            SearchParams._s = encodeJSONToBase64({
                ...privateData as object,
                jsonDataId: newResume.id
            });
            return redirect("/Builder?" + await jsonToSearchParameters(SearchParams));
        }
    }
}


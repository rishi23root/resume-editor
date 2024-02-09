'use server';

import { ExternalAccount, User, currentUser } from "@clerk/nextjs/server";


export async function checkIfFromLinkedin(user: User | null): Promise<ExternalAccount | Boolean> {
    // loop through the accounts and check provider
    var data = user?.externalAccounts?.filter(account => account.verification?.strategy?.includes('oauth_linkedin')) as ExternalAccount[];
    var account: ExternalAccount | Boolean = false;
    if (data.length > 0) account = data[0]
    return account;
}

// get linkedin auto from cleck backend 
export async function getLinkedinAuth(): Promise<null | any> {
    const user = await currentUser();
    return {
        error: "unable to integrate due to linkedin authentication constraints"
    }
    // get auth token from clerk
    const res = await fetch(
        `https://api.clerk.com/v1/users/${user?.id}/oauth_access_tokens/oauth_linkedin`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.CLERK_SECRET_KEY as string}`,
            },
        }
    );
    if (res.status == 200) {
        const data = await res.json();
        // extract the account info from backend, using fetch request from the server   
        // console.log(data);   
        try {
            extractLinkedinResumeData(data[0].token)
            return data
        } catch (err) {
            return err
        }
    } else {
        // throw exception
        new Error("Could not extract profile data try again ")

    }

}


// extract linkedin data using auth form linkedin auth api
async function extractLinkedinResumeData(token: any) {
    console.log(token);
    // let testUrl = "https://api.linkedin.com/v2/me/~:(id,email-address,first-name,last-name),educations:(id,school-name,field-of-study,start-date,end-date,degree,activities,notes),positions:(id,title,summary,start-date,end-date,is-current,company:(id,name,type,size,industry,ticker)))?format=json"
    // const res = await fetch(testUrl,{
    //     method: 'GET',
    //     headers: {
    //         "Content-Type": "application/json",
    //         Authorization: 'Bearer ' + token
    //     }
    // })
    // console.log(await res.json());


    // need to work on elivating the scope permissions for the auth
    throw new Error("Not implemented because of api limitations")

}


// const accessToken = 'YOUR_ACCESS_TOKEN';

// const fetchLinkedInData = async () => {
//   try {
//     // Fetch basic profile data
//     const profileResponse = await axios.get('https://api.linkedin.com/v2/me', {
//       headers: {
//         'Authorization': `Bearer ${accessToken}`,
//       },
//     });

//     const profileData = profileResponse.data;

//     // Fetch skills
//     const skillsResponse = await axios.get('https://api.linkedin.com/v2/skills', {
//       headers: {
//         'Authorization': `Bearer ${accessToken}`,
//       },
//     });
//     const skillsData = skillsResponse.data;

//     // Fetch work experience
//     const workResponse = await axios.get('https://api.linkedin.com/v2/me/positions', {
//       headers: {
//         'Authorization': `Bearer ${accessToken}`,
//       },
//     });
//     const workData = workResponse.data;

//     // Fetch education
//     const educationResponse = await axios.get('https://api.linkedin.com/v2/me/educations', {
//       headers: {
//         'Authorization': `Bearer ${accessToken}`,
//       },
//     });
//     const educationData = educationResponse.data;

//     // Fetch projects
//     const projectsResponse = await axios.get('https://api.linkedin.com/v2/me/projects', {
//       headers: {
//         'Authorization': `Bearer ${accessToken}`,
//       },
//     });
//     const projectsData = projectsResponse.data;

//     // Fetch awards
//     const awardsResponse = await axios.get('https://api.linkedin.com/v2/me/honors-awards', {
//       headers: {
//         'Authorization': `Bearer ${accessToken}`,
//       },
//     });
//     const awardsData = awardsResponse.data;

//     // Map all the retrieved data to your resume template structure

//     const resumeData = {
//       basics: {
//         name: profileData.localizedFirstName + ' ' + profileData.localizedLastName,
//         // Map other basic details
//       },
//       skills: skillsData.elements.map(skill => skill.skill.name),
//       work: workData.elements.map(position => {
//         // Map work experience details
//       }),
//       education: educationData.elements.map(education => {
//         // Map education details
//       }),
//       projects: projectsData.elements.map(project => {
//         // Map project details
//       }),
//       awards: awardsData.elements.map(award => {
//         // Map award details
//       }),
//     };

//     // Now, you have more comprehensive LinkedIn data mapped to your resume template.

//   } catch (error) {
//     console.error('Error fetching LinkedIn data:', error);
//   }
// };

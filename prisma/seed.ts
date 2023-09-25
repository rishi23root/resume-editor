import { PrismaClient } from "@prisma/client";

// if (process.env.NODE_ENV === "production") {
// 	prisma = new PrismaClient();
// } else {
// 	if (!global.prisma) {
// 		global.prisma = new PrismaClient({
// 			errorFormat: "pretty",
// 		});
// 	}
// 	prisma = global.prisma;
// }

const prisma = new PrismaClient({
	errorFormat: "pretty",
});

// clear prisma database
// async function fresh(){
// 	await prisma.$connect();

// 	const delUser = await prisma.user.deleteMany({
// 		where: {}
// 	});
// 	// const delResume = await prisma.resumeData.deleteMany();
// 	console.log(delUser);
// }

// fresh()
// 	.then(async () => {
// 		await prisma.$disconnect();
// 	})
// 	.catch(async (e) => {
// 		console.error(e);
// 		await prisma.$disconnect();
// 		process.exit(1);
// 	});

// async function main() {
	// Connect the client
	// await prisma.$connect();
	// const newUser = await prisma.user.create(
	// 	{
	// 		data: {
    //             name: "John2",
	// 			email: "test@prisma.com",
	// 			defaultLabel: "software dev"
	// 		},
	// 	}
	// )
	// // // create new resume object for user 
	// const resume = await prisma.resumeData.create(
    //     {
    //         data: {
	// 			status: "created",
	// 			basic: { 
	// 				name: "test",
	// 				email: "test@prisma.com",
	// 				label: "software",
	// 				phone: "123",
	// 				url: "www.prisma.com",
	// 				location: {
	// 					city: "New York"
	// 				},
	// 				profiles: [
	// 					{
	// 						network: "facebook",
	// 						username: "tesing",
	// 						url: "www.prisma.com",
    //                     }
	// 				]
					
	// 			},
	// 			user:{
	// 				connect: {
    //                     id: newUser.id
    //                 }
	// 			}
    //         },
    //     }
    // )

	// get user with the resumes included in response
	// const users = await prisma.user.findMany({
	// 	include:{
	// 		resumes: true
	// 	}
	// })
	// console.log(users[0].resumes);
	

	// console.log(test);
	// const test1 = await prisma.user.create({
	// 	data: {
	// 		name: "admin",
	// 		email: "admin@admin.com",
	// 		password: "admin",
	// 		UrlTable: {
	// 			create: {
	// 				url: "https://www.google.com",
	// 				slug: "gogle",
	// 			},
	// 		},
	// 	},
	// });
	// console.log(test1);
// }

// main()
// 	.then(async () => {
// 		await prisma.$disconnect();
// 	})
// 	.catch(async (e) => {
// 		console.error(e);
// 		await prisma.$disconnect();
// 		process.exit(1);
// 	});

export default prisma;
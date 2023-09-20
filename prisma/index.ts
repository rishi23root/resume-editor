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

// async function main() {
// 	// Connect the client
// 	await prisma.$connect();
// 	// ... you will write your Prisma Client queries here
// 	// prisma.$connect();
// 	// delete all users with urlTable
// 	// const test = await prisma.user.deleteMany({
// 	// 	where: {
// 	// 		UrlTable: {
// 	// 			some: {},
// 	// 		},
// 	// 	},
// 	// });
// 	// console.log(test);
// 	// const test1 = await prisma.user.create({
// 	// 	data: {
// 	// 		name: "admin",
// 	// 		email: "admin@admin.com",
// 	// 		password: "admin",
// 	// 		UrlTable: {
// 	// 			create: {
// 	// 				url: "https://www.google.com",
// 	// 				slug: "gogle",
// 	// 			},
// 	// 		},
// 	// 	},
// 	// });
// 	// console.log(test1);
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
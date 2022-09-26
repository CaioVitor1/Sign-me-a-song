import  prisma from "../database.js";

async function truncate() {
	await prisma.$executeRaw`TRUNCATE TABLE recommendations RESTART IDENTITY`;
}

export const e2eRepository = {
	truncate
};

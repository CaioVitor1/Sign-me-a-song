import {faker} from "@faker-js/faker";
import app from "../../src/app";
import supertest from "supertest";
import prisma from "../../src/database";

export async function createBodyTest(){
	return {
		name: faker.lorem.words(3),
		youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y"
	};

}

export async function createRecommendation(){
	const body = await createBodyTest();

	
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const result = await supertest(app).post("/recommendations")
		.send(body);

	const findRecommendation = await prisma.recommendation.findUnique({
		where: { name: body.name }
	});
	return findRecommendation;
}

export async function makeRecommendations(){
	const recommendations = [
		{
			id:1, 
			name: "link música favorita",
			youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
			score: 20
		},
		{
			id:2, 
			name: "link segunda música favorita",
			youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y",
			score: 10
		}
	];
	return recommendations;
        
    
}
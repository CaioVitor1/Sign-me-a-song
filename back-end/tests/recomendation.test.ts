import app from "../src/app"
import supertest from 'supertest';
import prisma from "../src/database"
import * as recomendationFactory from "./factory/recomendantionFactory"

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations;`
  });
 

// escrever um describe para cada rota;

describe("Test create new Tests", () => {

    it("given a invalid body it should return 422", async () => {
      
        
        const body = await recomendationFactory.createBodyTest()

        const result = await supertest(app).post("/recommendations")
        .send({
            name: body.name
        })
        expect(result.status).toEqual(422);
    });

    it("create a new recommendation should return 201", async () => {
      
        const body = await recomendationFactory.createBodyTest()

        const result = await supertest(app).post("/recommendations")
        .send(body)

        const findRecommendation = await prisma.recommendation.findUnique({
            where: { name: body.name }
        });

        expect(result.status).toEqual(201);
        expect(findRecommendation).not.toBeNull();
    });

    it("given a name already register it should return 409", async () => {
      
        const body = await recomendationFactory.createBodyTest()

        const firstTry = await supertest(app).post("/recommendations")
        .send(body)
        const secondTry = await supertest(app).post("/recommendations")
        .send(body)

        expect(firstTry.status).toEqual(201);
        expect(secondTry.status).toEqual(409);
    });


});

describe("get all recommendations register", () => {

    it("get recommendations ", async () => {

        const body = await recomendationFactory.createBodyTest()

        const result = await supertest(app).get("/recommendations")
        
        expect(result.status).toEqual(200);
        expect(result.body).toBeInstanceOf(Array);
        //depois ver se precisar verificar os elementos desse objeto
        
        //expect(array).toHaveProperty('{name}')
        //expect(result.body).toHaveProperty('youtubeLink')
        //expect(result.body).toHaveProperty('score')
    
    });

})


describe("Add point to score", () => {

    it("get all recommendations register", async () => {

        const result = await supertest(app).post("/recommendations/:id/upvote")
       
       
    });

})



afterAll(async () => {
    await prisma.$disconnect();
});
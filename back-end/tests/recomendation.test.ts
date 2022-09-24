import app from "../src/app"
import supertest from 'supertest';
import prisma from "../src/database"
import * as recomendationFactory from "./factory/recomendantionFactory"

beforeEach(async () => {
    await prisma.$executeRaw`TRUNCATE TABLE recommendations;`
  });
 

// escrever um describe para cada rota;

describe("create a new recommendation", () => {

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

    it("get an id no register", async () => {
        
        const result = await supertest(app).post("/recommendations/0/upvote")
        expect(result.status).toEqual(404);
       
    });
    it("add one point to score", async () => {
        const addRecomendation = await recomendationFactory.createRecommendation();

        const score = addRecomendation.score;

        const result = await supertest(app).post(`/recommendations/${addRecomendation.id}/upvote`)
        
        const findRecommendation = await prisma.recommendation.findUnique({
            where: { id: addRecomendation.id }
        });

        expect(result.status).toEqual(200);
        expect(findRecommendation.score).toEqual(score + 1)
       
    });

})

describe("remove point to score", () => {

    it("get an id no register", async () => {
        
        const result = await supertest(app).post("/recommendations/0/downvote")
        expect(result.status).toEqual(404);
       
    });
    it("remove one point to score", async () => {
        const addRecomendation = await recomendationFactory.createRecommendation();

        const score = addRecomendation.score;

        const result = await supertest(app).post(`/recommendations/${addRecomendation.id}/downvote`)
        
        const findRecommendation = await prisma.recommendation.findUnique({
            where: { id: addRecomendation.id }
        });

        expect(result.status).toEqual(200);
        expect(findRecommendation.score).toEqual(score - 1)
       
    });
    it("remove one point to score and delete recommendation", async () => {
        const addRecomendation = await recomendationFactory.createRecommendation();
      
        const changeScore = await prisma.recommendation.update({
            where: {
                id: addRecomendation.id
            }, data: {
                score: -5
            }
        })

        const result = await supertest(app).post(`/recommendations/${addRecomendation.id}/downvote`)

        const find = await prisma.recommendation.findUnique({
            where: {
                id: addRecomendation.id
            }
        })
    
        const score = addRecomendation.score;

        expect(result.status).toEqual(200);
        expect(find).toBe(null)
       
    });

})

describe("get recommendation by id", () => {

    it("id not register it should return 404", async () => {

        const result = await supertest(app).get("/recommendations/0")
        
        expect(result.status).toEqual(404);
        
    });

    it("get rigth recommendation", async () => {

        const recommendation = await recomendationFactory.createRecommendation()

        const result = await supertest(app).get(`/recommendations/${recommendation.id}`)
        
        expect(result.status).toEqual(200);
        expect(result.body).toBeInstanceOf(Object);
        expect(result.body).toHaveProperty('name')
        expect(result.body).toHaveProperty('youtubeLink')
        expect(result.body).toHaveProperty('score')  
    
    });

})

describe("get a random recommendation", () => {

    it("when no one single music was register", async () => {
        
        const result = await supertest(app).get("/recommendations/random")
        expect(result.status).toEqual(404);
       
    });

    it("when no one single music was register", async () => {
        
        const recommendation = await recomendationFactory.createRecommendation()

        const result = await supertest(app).get("/recommendations/random")

        expect(result.status).toEqual(200);
        expect(result.body).toBeInstanceOf(Object);
        expect(result.body).toHaveProperty('name')
        expect(result.body).toHaveProperty('youtubeLink')
        expect(result.body).toHaveProperty('score')  
    });
    

})


afterAll(async () => {
    await prisma.$disconnect();
});
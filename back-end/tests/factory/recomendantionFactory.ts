import {faker} from "@faker-js/faker"


export async function createBodyTest(){
    return {
        name: faker.lorem.words(3),
        youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y"
    };

}
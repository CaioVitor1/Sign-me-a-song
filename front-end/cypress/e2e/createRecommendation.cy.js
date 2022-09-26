/* eslint-disable no-undef */
import { faker } from "@faker-js/faker";

const URL_FRONT = "http://localhost:3000";
const URL_BACK = "http://localhost:5000";

beforeEach(async () => {
	await cy.request("POST", `${URL_BACK}/e2e/reset`, {});
});

describe("Add new recommendation", () => {
	it("create a new recommendation with successfully", () => {
		const recommendation = {
			name: faker.lorem.words(3),
			youtubeLink: "https://www.youtube.com/watch?v=chwyjJbcs1Y"
		};

		cy.visit(URL_FRONT);

		cy.get("[data-cy=name]").type(recommendation.name);
		cy.get("[data-cy=youtubeLink]").type(recommendation.youtubeLink);

		cy.intercept("POST", `${URL_BACK}/recommendations`).as("postRecommendations");

		cy.intercept("GET", `${URL_BACK}/recommendations`).as("getRecommendations");

		cy.get("[data-cy=submit]").click();

		cy.wait("@postRecommendations");

		cy.wait("@getRecommendations");

		cy.get("[data-cy=title]").should("contain", recommendation.name);

		cy.get("[data-cy=video]").should("be.visible");
	});
});
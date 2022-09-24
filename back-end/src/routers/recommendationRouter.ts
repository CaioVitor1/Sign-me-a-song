import { Router } from "express";
import { recommendationController } from "../controllers/recommendationController.js";

const recommendationRouter = Router();

recommendationRouter.post("/", recommendationController.insert);  //ok
recommendationRouter.get("/", recommendationController.get);  //ok
recommendationRouter.get("/random", recommendationController.random);  //ok
recommendationRouter.get("/top/:amount", recommendationController.getTop); //ok
recommendationRouter.get("/:id", recommendationController.getById);  //ok
recommendationRouter.post("/:id/upvote", recommendationController.upvote);  //ok
recommendationRouter.post("/:id/downvote", recommendationController.downvote); //ok

export default recommendationRouter;

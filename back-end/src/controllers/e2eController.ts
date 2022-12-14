import { Request, Response } from "express";
import { e2eService } from "../services/e2eService.js";

export async function reset(req: Request, res: Response) {
	await e2eService.truncate();
  
	return res.sendStatus(200);
}
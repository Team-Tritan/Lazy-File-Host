"use strict";

import express, {
  type Request,
  type Response,
  type NextFunction,
  type Router,
} from "express";
import imageRouter from "./index";
import uploadRouter from "./api/upload";

const router: Router = express.Router();

router.use("*", (req: Request, res: Response, next: NextFunction) => {
  res.set("~~uwu~~", "fuck me daddy");
  next();
});

router.use("/", imageRouter);
router.use("/api/upload", uploadRouter);

router.use("*", (req: Request, res: Response, error: any) => {
  return res.status(error ? 500 : 404).json({
    error: true,
    status: error ? "500" : "404",
    message: error ? `Internal server error: ${error}` : "Content not found",
  });
});

export default router;

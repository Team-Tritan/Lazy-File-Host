"use strict";

import express, {
  type Request,
  type Response,
  type NextFunction,
  type Router,
} from "express";
import imageRouter from "./index";
import uploadRouter from "./api/upload";
import createKey from "./api/create-key";
import sharexConfig from "./api/sharex-config";
import errorHandler from "./err";

const router: Router = express.Router();

router.use("*", (req: Request, res: Response, next: NextFunction) => {
  res.set("~~uwu~~", "fuck me daddy");
  next();
});

router.use("/", imageRouter);
router.use("/api/upload", uploadRouter);
router.use("/api/create-key", createKey);
router.use("/api/sharex-config", sharexConfig);

router.use("*", errorHandler);

export default router;

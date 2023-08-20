"use strict";

import {
  Router,
  type Request,
  type Response,
  type NextFunction,
} from "express";

let router = Router();

class CustomError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

router.use("*", (req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next();
  }

  const error = new CustomError("Content not found", 404);

  return next(error);
});

router.use((error: any, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(error);
  }

  const status = error.status || 500;
  const message = error.message || "Internal server error";

  return res.status(status).json({
    error: true,
    status: status.toString(),
    message,
  });
});

export default router;

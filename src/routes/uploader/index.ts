"use strict";

import { Router, type Request, type Response } from "express";

let router = Router();

router.get("/", (req: Request, res: Response) => {
  res.render("uploader.ejs");
});

export default router;

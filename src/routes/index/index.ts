"use stroct";

import { Router, type Request, type Response } from "express";
import path from "path";
import config from "../../config";
import { images as imgFunctions } from "../../functions";

const router: Router = Router();
const uploadsDir = imgFunctions.getPath("./uploads");

router.get("/", (req: Request, res: Response) => {
  return res.render("uploader", {
    domains: config.domains,
  });
});

router.get("/:dir/:file", (req: Request, res: Response) => {
  const { dir, file } = req.params;

  const fileWithExtension = imgFunctions.findFileWithoutExtension(
    file,
    uploadsDir
  );

  if (!config.dirs.includes(dir) || !fileWithExtension)
    return imgFunctions.renderError(res, 404, "Content not found.");

  return res.render("img", {
    name: fileWithExtension,
    ext: path.extname(fileWithExtension),
  });
});

export default router;

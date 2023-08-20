"use stroct";

import { Router, type Request, type Response } from "express";
import fs from "fs";
import path from "path";
import config from "../../config";

const router: Router = Router();
const uploadsDir = getPath("./uploads");

function getPath(dir: string): string {
  return path.resolve(process.cwd(), dir);
}

function renderError(res: Response, status: number, message: string) {
  res.status(status).json({
    error: true,
    status,
    message,
  });
}

function findFileWithoutExtension(
  fileName: string,
  dirPath: string
): string | null {
  const fileWithoutExtension = fileName.replace(/\.[^.]+$/, "");
  const files = fs.readdirSync(dirPath);

  return (
    files.find(
      (file) => fileWithoutExtension === file.replace(/\.[^.]+$/, "")
    ) || null
  );
}

router.get("/", (req: Request, res: Response) => {
  return res.render("uploader", {
    domains: config.domains,
  });
});

router.get("/:dir/:file", (req: Request, res: Response) => {
  const { dir, file } = req.params;
  const fileWithExtension = findFileWithoutExtension(file, uploadsDir);

  if (!config.dirs.includes(dir) || !fileWithExtension)
    return renderError(res, 404, "Content not found.");

  return res.render("img", {
    name: fileWithExtension,
    ext: path.extname(fileWithExtension),
  });
});

export default router;

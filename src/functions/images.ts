"use strict";

import fs from "fs";
import path from "path";
import type { Response } from "express";

export function getPath(dir: string): string {
  return path.resolve(process.cwd(), dir);
}

export function renderError(res: Response, status: number, message: string) {
  res.status(status).json({
    error: true,
    status,
    message,
  });
}

export function findFileWithoutExtension(
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

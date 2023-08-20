"use strict";

import express from "express";
import fs from "fs";

interface IKeys {
  key: string;
  ip: any;
  created_at: string;
}

interface IShareXConfig {
  Name: string;
  DestinationType: string;
  RequestType: string;
  RequestURL: string;
  Headers: {
    key: string;
  };
  FileFormName: string;
  ResponseType: string;
  URL: string;
}

const router = express.Router();
const keysFile = "keys.json";

router.post("/", (req, res) => {
  const { key } = req.headers as { key: string };

  const validKeys = loadValidKeys();

  if (!key) {
    return res.status(403).json({
      status: 403,
      message: "You need to be authenticated to get your ShareX config.",
    });
  }

  if (!validKeys.some((k: IKeys) => k.key === key)) {
    return res.status(403).send({
      status: 403,
      message: "Invalid key, retard.",
    });
  }

  const config: IShareXConfig = generateShareXConfig(key);

  sendShareXConfig(res, config);
});

function loadValidKeys(): IKeys[] {
  try {
    const keysData = fs.readFileSync(keysFile, "utf8");
    return JSON.parse(keysData) as IKeys[];
  } catch (err) {
    return [];
  }
}

function generateShareXConfig(key: string): IShareXConfig {
  return {
    Name: "Lazy Uploader",
    DestinationType: "ImageUploader, TextUploader, FileUploader",
    RequestType: "POST",
    RequestURL: "https://im.sleepdeprived.wtf/api/upload/",
    Headers: {
      key,
    },
    FileFormName: "sharex",
    ResponseType: "Text",
    URL: "https://im.sleepdeprived.wtf/$json:url$",
  };
}

function sendShareXConfig(res: express.Response, config: IShareXConfig): void {
  const file = JSON.stringify(config, null, 2);
  const fileName = "sharex-config.sxcu";

  res.setHeader("Content-disposition", `attachment; filename=${fileName}`);
  res.setHeader("Content-type", "application/json");

  res.send(file);
}

export default router;

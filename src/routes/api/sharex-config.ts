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

router.post("/", (req, res) => {
  const { key } = req.headers as {
    key: string;
  };

  const validKeys = JSON.parse(fs.readFileSync("keys.json", "utf8"));

  if (!validKeys.some((k: IKeys) => k.key === key)) {
    return res.status(403).send({
      status: 403,
      message: "Invalid key.",
    });
  }

  if (!key) {
    return res.status(403).json({
      status: 403,
      message: "You need to login to the API to get your ShareX config.",
    });
  }

  const config: IShareXConfig = {
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

  const file = JSON.stringify(config, null, 2);
  const fileName = "sharex-config.sxcu";

  res.setHeader("Content-disposition", `attachment; filename=${fileName}`);
  res.setHeader("Content-type", "application/json");

  res.send(file);
});

export default router;

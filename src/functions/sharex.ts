"use strict";

import { type Response } from "express";

export interface IShareXConfig {
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

export function generateShareXConfig(key: string): IShareXConfig {
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

export function sendShareXConfig(res: Response, config: IShareXConfig): void {
  const file = JSON.stringify(config, null, 2);
  const fileName = "sharex-config.sxcu";

  res.setHeader("Content-disposition", `attachment; filename=${fileName}`);
  res.setHeader("Content-type", "application/json");

  res.send(file);
}

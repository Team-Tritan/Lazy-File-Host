"use strict";

import { Router, type Request, type Response } from "express";
import fs from "fs";

const router: Router = Router();

interface Keys {
  key: string;
  ip: string;
  created_at: string;
}

router.post("/", (req: Request, res: Response) => {
  try {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const keys = loadKeysFromFile();

    const newKey: Keys = {
      key: generateRandomKey(10),
      created_at: new Date().toISOString(),
      ip: ip as string,
    };

    keys.push(newKey);
    saveKeysToFile(keys);

    return res.status(200).json({
      status: 200,
      message: "Key created successfully.",
      key: newKey.key,
    });
  } catch (err) {
    console.error(`Failed to create key: ${err}`);

    return res.status(500).json({
      status: 500,
      message: "Failed to create key.",
      error: err,
    });
  }
});

function loadKeysFromFile(): Keys[] {
  try {
    const keysData = fs.readFileSync("keys.json", "utf8");
    return JSON.parse(keysData) as Keys[];
  } catch (err) {
    console.error(`Failed to load keys: ${err}`);
    return [];
  }
}

function saveKeysToFile(keys: Keys[]): void {
  fs.writeFileSync("keys.json", JSON.stringify(keys, null, 2));
}

function generateRandomKey(length: number): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}

export default router;

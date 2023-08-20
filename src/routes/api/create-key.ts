"use strict";

import { Router, type Request, type Response } from "express";
import type { IKeys } from "../../functions/keys";
import { keys as keyFunctions } from "../../functions";

const router: Router = Router();

router.post("/", (req: Request, res: Response) => {
  try {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const keys = keyFunctions.loadKeysFromFile();

    const newKey: IKeys = {
      key: keyFunctions.generateRandomKey(10),
      created_at: new Date().toISOString(),
      ip: ip as string,
    };

    keys.push(newKey);
    keyFunctions.saveKeysToFile(keys);

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

export default router;

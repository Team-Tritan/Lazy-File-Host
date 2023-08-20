"use strict";

import fs from "fs";

export interface IKeys {
  key: string;
  ip: string;
  created_at: string;
}
export function loadKeysFromFile(): IKeys[] {
  try {
    const keysData = fs.readFileSync("keys.json", "utf8");
    return JSON.parse(keysData) as IKeys[];
  } catch (err) {
    console.error(`Failed to load keys: ${err}`);
    return [];
  }
}

export function saveKeysToFile(keys: IKeys[]): void {
  fs.writeFileSync("keys.json", JSON.stringify(keys, null, 2));
}

export function generateRandomKey(length: number): string {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return result;
}

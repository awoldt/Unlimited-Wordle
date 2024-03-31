//iaw = IS A WORD
//will determine if word is located in word bank of +5,000 words
import fs from "fs/promises";
import path from "path";
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // get all words possible to spell
  // if word guessed not in words list, return false
  const wordsTxt = await fs.readFile(
    path.join(process.cwd(), "words-list.json"),
    {
      encoding: "utf-8",
    }
  );
  const words = JSON.parse(wordsTxt);

  // word NOT in word list
  if (!words.includes(req.body.word.trim())) {
    res.json({ status: 400 });
  } else {
    res.json({ status: 200 });
  }
}

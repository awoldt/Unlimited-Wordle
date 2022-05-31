//iaw = IS A WORD
//will determine if word is located in word bank of +300,000 words

import type { NextApiRequest, NextApiResponse } from "next";
import fs from "fs";
import path from "path";
type Data = {
  status: number;
  word?: string;
};
import removeSpaces from "../../scripts/removeSpaces";

const filePath = path.resolve(__dirname, "../../../../pages/api/word_bank.txt");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  await fs.readFile(filePath, "utf-8", async (err, data) => {
    if (err) {
      console.log(err);
      res.status(200).json({ status: 401 });
    } else {
      const obj = await JSON.parse(data);

      //remove any spaces from word user submits
      const noSpaceWord = await removeSpaces(req.body.word);
      console.log("WORD WITH NO SPACES " + noSpaceWord);

      const index = await obj.indexOf(noSpaceWord);

      if (index !== -1) {
        console.log("WORD EXISTS");
        res.status(200).json({ status: 200, word: noSpaceWord });
      } else {
        console.log("word does not exist :(");
        res.status(200).json({ status: 401 });
      }
    }
  });
}

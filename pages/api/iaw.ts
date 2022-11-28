//iaw = IS A WORD
//will determine if word is located in word bank of +300,000 words

import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  status: number;
  word?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  //fetch the json word list from s3 bucket
  const words = await axios.get(
    "https://unlimited-wordle.s3.amazonaws.com/words-list.json"
  );

  //word NOT in word list
  if (!words.data.includes(req.body.word.trim())) {
    console.log("word does not exist :(");
    res.json({ status: 400 });
  } else {
    res.json({ status: 200 });
  }
}

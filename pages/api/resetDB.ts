import type { NextApiRequest, NextApiResponse } from "next";

import db from "../../firebase/connectToFirestore";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<null>
) {
  console.log(req.headers);
  if (req.headers.delete_access_key!) {
    if (req.headers.delete_access_key !== process.env.DELETE_ACCESS_KEY) {
      console.log("ACCESS DENIED");
      res.status(500).json(null);
    } else {
      try {
        const documents = await db.collection("wordle-games").listDocuments();
        documents.map(async (x) => {
          await x.delete();
        });

        res.status(200).json(null);
      } catch (err) {
        console.log(err);
        console.log("could not delete wordle games :(");
        res.status(500).json(null);
      }
    }
  } else {
    res.status(500).json(null);
  }
}

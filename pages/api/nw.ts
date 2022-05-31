//nw = new wordle
//CREATES NEW WORDLE GAME

import type { NextApiRequest, NextApiResponse } from "next";
import db from "../../firebase/connectToFirestore";
import { nanoid } from "nanoid";
import NewWordleInterface from "../../interfaces/newWordleGame";

type Data = {
  message?: string;
  id?: string;
  endGameMessage?: string;
};

//adds wordle game details to firestore databse
async function addWordleGame(w: string, endMessage: string | null) {
  try {
    console.log("adding word " + w);
    //make sure unique id has not already been used

    const newId = nanoid();
    console.log("new unique id of " + newId);

    const d = await db.collection("wordle-games").doc(newId).get();
    //wordle with current id does not exist
    //CREATE
    if (!d.exists) {
      console.log("document does not exists!");

      //if user has added endgame message

      const data: NewWordleInterface = {
        word: w,
        views: 0,
        endGameMsg: endMessage! || endMessage !== "" ? endMessage : null,
      };
      await db.collection("wordle-games").doc(newId).set(data);
      console.log("addEDDEDD word!!!");
      return newId;
    } else {
      console.log("id " + newId + " already exosts ");

      //loop until new unique is created
      let l = true;
      let newerId;
      while (l == true) {
        const k = nanoid();
        const q = await db.collection("wordle-games").doc(k).get();
        if (!q.exists) {
          l = false;
          newerId = k;
        }
      }

      return newerId;
    }
  } catch (err) {
    console.log(err);
    console.log("cannot add id");
    return null;
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const wordToSpell: string = req.body.word;
  const endGameMessage: string | null = req.body.endgameMessage;

  console.log("ENDGAME MESSAGE");
  console.log(endGameMessage);

  console.log("\nuser is tryingm to add " + wordToSpell + " to database");

  if (wordToSpell.length < 3 || wordToSpell.length > 16) {
    res.status(400).json({ message: "Word does not fit criteria" });
  } else {
    try {
      const w = await addWordleGame(wordToSpell, endGameMessage);
      if (w !== null) {
        res.status(200).json({
          id: w,
          message: "Game successfully created. You can find it at " + w,
        });
      } else {
        res
          .status(500)
          .json({ message: "There was an error while creating game :(" });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "There was an error creating the game" });
    }
  }
}

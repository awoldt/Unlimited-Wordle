import type { GetServerSideProps } from "next";
import { Container, Spinner, Button, Row } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import db from "../firebase/connectToFirestore";
import Head from "next/head";

const CreatePage = ({ num_of_games }: { num_of_games: number }) => {
  const [wordToSpell, setWordToSpell] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [endGameMessage, setEndGameMessage] = useState<string | null>(null);

  return (
    <>
      <Head>
        <title>Create a Wordlebin Game | Custom 5 Letter Word Games</title>
        <meta
          name={"description"}
          content={
            "Create a custom made word guessing game with words that have 3 to 16 letters. Free and easy to use, share with friends."
          }
        />
        <meta property="og:title" content="Create Custom Word Guessing Games" />
        <meta
          property="og:description"
          content="Easily create and share word guessing games with friends and family"
        />
        <meta property="og:image" content="https://wordlebin.com/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <link rel="canonical" href="https://wordlebin.com/create" />
      </Head>
      <Container className="text-center">
        <h1 style={{ marginTop: "25px" }}>Create a Custom Wordlebin Game</h1>
        <p>
          {num_of_games == 0 && <code>There are no games at this time</code>}
          {num_of_games == 1 && <code>There is 1 game being hosted</code>}
          {num_of_games !== 0 && num_of_games !== 1 && (
            <code>There are {num_of_games} games being hosted</code>
          )}
        </p>
        <Row className="justify-content-center">
          <p style={{ maxWidth: "650px" }}>
            Create a custom word guessing game to share with friends and family.
            Wish there was a harder version of the standard 5-letter format? Now
            you can create games based on words with more or less than the
            default of five letters.
          </p>
        </Row>

        <p style={{ marginBottom: "0px" }}>Submitted word must: </p>
        <ul
          style={{ listStyle: "none", paddingLeft: "0px", fontWeight: "bold" }}
        >
          <li>Between 3 and 16 characters long</li>
          <li>Word must exist</li>
        </ul>

        <div style={{ marginBottom: "25px" }}>
          <input
            style={{ height: "38px", marginTop: "25px" }}
            type={"text"}
            placeholder={"Word to spell"}
            onChange={(e) => {
              setWordToSpell(e.target.value);
            }}
            maxLength={16}
          />
          <br></br>
          <textarea
            style={{ width: "50%", marginTop: "25px" }}
            placeholder={"Endgame message"}
            onChange={(e) => {
              setEndGameMessage(e.target.value);
            }}
            maxLength={100}
          />
          <p>
            The endgame message will be displayed to the person playing if they
            are not able to guess the word.{" "}
          </p>

          <Button
            variant="danger"
            style={{ marginTop: "25px" }}
            onClick={async () => {
              if (wordToSpell == "") {
                alert("enter word");
              } else {
                setLoading(true);
                const doesWordExist = await axios.post("/api/iaw", {
                  word: wordToSpell.toLowerCase(),
                });
                //WORD DOES NOT EXIST
                if (doesWordExist.data.status !== 200) {
                  setLoading(false);
                  alert("Cannot create game with current word :(");
                }
                //WORD EXISTS, CREATE NEW GAME
                else {
                  const req = await axios.post("/api/nw", {
                    word: doesWordExist.data.word,
                    endgameMessage: endGameMessage,
                  });
                  //400
                  if (req.status !== 200) {
                    alert("Could not create game :(");
                  }
                  //200
                  else {
                    window.location.assign(
                      String(window.location).split("/create")[0] +
                        "/game?id=" +
                        req.data.id
                    );
                  }
                }
              }
            }}
          >
            {loading == false && "Create"}{" "}
            {loading && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
          </Button>
        </div>

        <Row className="justify-content-center">
          <p style={{ maxWidth: "650px" }}>
            Note that all word games created will be deleted at 12AM EDT on a
            recurring basis. Make sure to create games you want to share with
            friends earlier in the day to give as much time as possible to play.
          </p>
        </Row>
        <a href={"/"} title="return to homepage">
          <Button style={{ marginTop: "100px" }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-house-door"
              viewBox="0 0 16 16"
            >
              <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293L8.354 1.146zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4H2.5z" />
            </svg>{" "}
            Return home
          </Button>
        </a>
      </Container>
    </>
  );
};
export default CreatePage;

export const getServerSideProps: GetServerSideProps = async (context) => {
  //gets all wordle games data from database
  const x = await db.collection("wordle-games").get();
  const numOfGames: number = x.size;

  return {
    props: {
      num_of_games: numOfGames,
    },
  };
};

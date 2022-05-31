import type { GetServerSideProps } from "next";
import db from "../firebase/connectToFirestore";
import RowSpellingInterface from "../interfaces/RowData";
import WordleGrid from "../components/WordleGrid";
import Keyboard from "../components/Keyboard";
import { useState, useLayoutEffect, useRef, useEffect } from "react";
import DeviceDetector from "device-detector-js";
import deviceData from "../interfaces/DeviceData";
import { Alert, Button, Container } from "react-bootstrap";
import InitializeCustomGameReponsiveLayout from "../scripts/customGameResponsiveResize";
import initializeCustomGameDeviceLayout from "../scripts/initializeCustomGameResponsiveLayout";
import EndGameBannerInterface from "../interfaces/EndGameBanner";
import EndGameBanner from "../components/EndgameBanner";
import CopiedGameIcon from "../components/CopiedGameIcon";
import Head from "next/head";
import Link from "next/link";

interface gameDataInterface {
  word: string;
  views: Number;
  endGameMsg: string | null;
}

const UserDevice = new DeviceDetector();
function generateRepsonsiveLayout(userAgent: string) {
  //generate responsive layout numbers before sending to frontend
  const device = UserDevice.parse(userAgent).device;
  if (device!) {
    if (device.type!) {
      if (device.type == "desktop") {
        return "desktop";
      } else if (device.type == "tablet") {
        return "tablet";
      } else if (device.type == "smartphone") {
        return "phone";
      } else {
        return "unknown_device";
      }
    }
  }
}

const WordleGame = ({
  gameData,
  rowData,
  deviceLayout,
  gameID,
  firstPlay,
}: {
  gameData: gameDataInterface;
  rowData: RowSpellingInterface;
  deviceLayout: deviceData;
  gameID: string;
  firstPlay: boolean;
}) => {
  const alertRef = useRef<HTMLDivElement>(null);
  const firstGameMsgRef = useRef<HTMLDivElement>(null);

  const [rows, setRows] = useState<RowSpellingInterface>(rowData);

  const [gridDimentions, setGridDimentions] = useState<string[]>([]); //W x H x FontSize
  const [keyboardDimentions, setKeyboardDimentions] = useState<string[]>([]);
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [copiedGameLink, setCopiedGameLink] = useState<boolean>(false);
  const [endGameBanner, setEndGameBanner] = useState<EndGameBannerInterface>();
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);

  //sets the dementions of grid BEFORE rendering child component
  useLayoutEffect(() => {
    InitializeCustomGameReponsiveLayout(
      keyboardDimentions,
      setKeyboardDimentions,
      gridDimentions,
      setGridDimentions
    );
    const w: number = window.innerWidth;
    initializeCustomGameDeviceLayout(
      String(deviceLayout),
      w,
      setGridDimentions,
      setKeyboardDimentions
    );
  }, []);

  useEffect(() => {
    //will only run if alertmessage is not empty string
    //prevents infinite loops when changing alert message state below
    if (alertMessage !== "") {
      const t = setTimeout(() => {
        if (alertRef.current!) {
          setAlertMessage("");
        }
      }, 2000);

      return () => {
        clearTimeout(t);
      };
    }

    if (firstPlay) {
      const t = setTimeout(() => {
        if (firstGameMsgRef.current!) {
          firstGameMsgRef.current.remove();
        }
      }, 2000);

      return () => {
        clearTimeout(t);
      };
    }
  }, [alertMessage]);

  return (
    <>
      <Head>
        <title>Custom Wordlebin Game</title>
        <meta
          name={"description"}
          content={"Play a custom made word guessing game."}
        />
        <meta
          property="og:title"
          content="Custom Word Guessing Game | Play Free Online"
        />
        <meta
          property="og:description"
          content="Play a 5-letter guessing game. Share with friends and family. "
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
      </Head>
      <Container fluid>
        {firstPlay && (
          <Container className="text-center mt-5">
            <Alert variant="success" id="success_msg" ref={firstGameMsgRef}>
              Game successfully created!
            </Alert>
          </Container>
        )}

        {rowData! && (
          <div className="text-center" style={{ paddingTop: "50px" }}>
            <WordleGrid
              rowData={rows}
              word={gameData.word}
              gridSize={gridDimentions}
            />
            {alertMessage !== "" && (
              <Container>
                <Alert variant={"danger"} ref={alertRef}>
                  {alertMessage}
                </Alert>
              </Container>
            )}

            {gameOver == false && (
              <Keyboard
                currentRow={rows}
                changeRow={setRows}
                currentWord={gameData.word}
                keyboardSize={keyboardDimentions}
                setAlert={setAlertMessage}
                setEndgame={setEndGameBanner}
                gameStart={setGameStarted}
                hasGameStarted={gameStarted}
                endMessage={gameData.endGameMsg}
                gameOver={setGameOver}
              />
            )}

            {endGameBanner! && (
              <EndGameBanner
                endGameBanner={endGameBanner}
                endGameMessage={gameData.endGameMsg}
              />
            )}

            <CopiedGameIcon
              copiedGameLink={copiedGameLink}
              setCopiedGameLink={setCopiedGameLink}
              gameID={gameID}
            />
            {gameStarted == false && (
              <Link href={"/rules"} passHref={true}>
                <a>
                  <div style={{ marginBottom: "10px" }}>How to Play</div>
                </a>
              </Link>
            )}

            <div>
              <a
                href={"/"}
                style={{
                  textDecoration: "none",
                  display: "inline",
                  marginRight: "30px",
                }}
                className="mt-5 mb-3"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-caret-left"
                  viewBox="0 0 16 16"
                >
                  <path d="M10 12.796V3.204L4.519 8 10 12.796zm-.659.753-5.48-4.796a1 1 0 0 1 0-1.506l5.48-4.796A1 1 0 0 1 11 3.204v9.592a1 1 0 0 1-1.659.753z" />
                </svg>{" "}
                Return home
              </a>

              <a href={"/create"} style={{ textDecoration: "none" }}>
                Create another game
              </a>
            </div>

            <p className="text-secondary mb-0 mt-3">Game ID: {gameID}</p>

            {gameData.views == 1 && (
              <p className="text-secondary">{gameData.views} view</p>
            )}
            {gameData.views !== 1 && (
              <p className="text-secondary">{gameData.views} views</p>
            )}
          </div>
        )}
      </Container>
    </>
  );
};

export default WordleGame;

//////////////////////////////////////////////////////////////////////////////////////////////

async function getWordleGameById(id: string) {
  const x = await db.collection("wordle-games").doc(id).get();
  if (!x.exists) {
    return null;
  } else {
    return x.data();
  }
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  //200
  if (context.query.id !== undefined) {
    const r = generateRepsonsiveLayout(
      context.req.rawHeaders[
        context.req.rawHeaders.indexOf(process.env.USER_AGENT!) + 1
      ]
    );

    const g = await getWordleGameById(String(context.query.id));

    //generate the rowSpellingData
    if (g!) {
      const generatedRow = new Array(g.word.length).fill("");

      const rows: RowSpellingInterface = {
        rowIndex: 0,
        charIndex: 0,
        spellings: [
          generatedRow,
          generatedRow,
          generatedRow,
          generatedRow,
          generatedRow,
          generatedRow,
        ],
      };

      //check if this is the first play on game
      if (g.views == 0) {
        //add a view
        const x = g;
        x.views += 1;
        await db
          .collection("wordle-games")
          .doc(String(context.query.id))
          .update(x);
        return {
          props: {
            gameData: g,
            rowData: rows,
            deviceLayout: r,
            gameID: context.query.id,
            firstPlay: true,
          },
        };
      }
      //not first play
      else {
        //add a view
        const x = g;
        x.views += 1;
        await db
          .collection("wordle-games")
          .doc(String(context.query.id))
          .update(x);
        return {
          props: {
            gameData: g,
            rowData: rows,
            deviceLayout: r,
            gameID: context.query.id,
            firstPlay: false,
          },
        };
      }
    } else {
      return {
        notFound: true,
      };
    }

    //400
  } else {
    return {
      notFound: true,
    };
  }
};

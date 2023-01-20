import type { GetServerSideProps } from "next";
import { useState, useLayoutEffect } from "react";
import RowDataInterface from "../interfaces/RowData";
import WordleGrid from "../components/WordleGrid";
import Keybaord from "../components/Keyboard";
import { Container } from "react-bootstrap";
import gridWindowResize from "../scripts/gridWindowResize";
import keybordWindowReize from "../scripts/keyboardWindowResize";
import EndGameBannerInterface from "../interfaces/EndGameBanner";
import generateRepsonsiveLayout from "../scripts/detectDevice";
import EndGameBanner from "../components/EndgameBanner";
import Head from "next/head";
import SocialMedia from "../components/SocialMediaBtns";
import axios from "axios";

const Home = ({
  word_to_spell,
  initialRowData,
}: {
  word_to_spell: string;
  initialRowData: RowDataInterface;
}) => {
  const [rowSpellings, setRowSpellings] =
    useState<RowDataInterface>(initialRowData);

  const [gridDimentions, setGridDimentions] = useState<string[]>([]); //W x H x FontSize
  const [keyboardDimentions, setKeyboardDimentions] = useState<string[]>([]);
  const [endGameBanner, setEndGameBanner] = useState<EndGameBannerInterface>();
  const [gameStarted, setGameStarted] = useState<boolean>(false);
  const [gameOver, setGameOver] = useState<boolean>(false);

  //sets the dementions of grid BEFORE rendering child component
  useLayoutEffect(() => {
    gridWindowResize(setGridDimentions);
    keybordWindowReize(setKeyboardDimentions);

    //adjust the keyboard and grid based on window size on pageload
    const w = window.innerWidth;
    //desktop
    if (w >= 992) {
      setKeyboardDimentions(["50px", "50px", "28px"]);
      setGridDimentions(["80px", "80px", "26px"]);
    }
    //phone or smaller
    else if (w <= 575) {
      setKeyboardDimentions(["30px", "30px", "17px"]);
      setGridDimentions(["50px", "50px", "18px"]);
    }
    //tablet
    else {
      setKeyboardDimentions(["40px", "40px", "23px"]);
      setGridDimentions(["70px", "70px", "23px"]);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Wordle Clone</title>
        <meta
          name={"description"}
          content={
            "Play online word guessing game with over 5000 words to spell. Play games with friends and test your word guessing skills."
          }
        />
        <meta property="og:title" content="Play 5-Word Guessing Game" />
        <meta
          property="og:description"
          content="Play free online guessing game and share custom games with friends."
        />
        <meta property="og:image" content="/favicon.ico" />

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
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        ></link>
        <link rel="canonical" href="https://unlimited-wordle.vercel.app/" />
      </Head>
      <Container fluid>
        <div
          className="text-center"
          style={{ paddingTop: "50px", marginBottom: "25px" }}
        >
          <WordleGrid
            rowData={rowSpellings}
            word={word_to_spell}
            gridSize={gridDimentions}
          />

          {gameOver == false && (
            <Keybaord
              changeRow={setRowSpellings}
              currentRow={rowSpellings}
              currentWord={word_to_spell}
              keyboardSize={keyboardDimentions}
              setEndgame={setEndGameBanner}
              gameStart={setGameStarted}
              hasGameStarted={gameStarted}
              endMessage={null}
              gameOver={setGameOver}
            />
          )}

          {endGameBanner! && (
            <EndGameBanner
              endGameBanner={endGameBanner}
              endGameMessage={null}
            />
          )}

          <code style={{ display: "block" }}>Over 5,000 words to spell!</code>

          <SocialMedia />

          <a
            href={"/rules"}
            style={{ textDecoration: "none" }}
            title="Learn how to play game"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-question-diamond"
              viewBox="0 0 16 16"
            >
              <path d="M6.95.435c.58-.58 1.52-.58 2.1 0l6.515 6.516c.58.58.58 1.519 0 2.098L9.05 15.565c-.58.58-1.519.58-2.098 0L.435 9.05a1.482 1.482 0 0 1 0-2.098L6.95.435zm1.4.7a.495.495 0 0 0-.7 0L1.134 7.65a.495.495 0 0 0 0 .7l6.516 6.516a.495.495 0 0 0 .7 0l6.516-6.516a.495.495 0 0 0 0-.7L8.35 1.134z" />
              <path d="M5.255 5.786a.237.237 0 0 0 .241.247h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286zm1.557 5.763c0 .533.425.927 1.01.927.609 0 1.028-.394 1.028-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94z" />
            </svg>{" "}
            How to play
          </a>
          <span
            style={{
              display: "block",
              marginTop: "10px",
              marginBottom: "10px",
            }}
          >
            <a
              href="https://awoldt.com/"
              target="_blank"
              rel="noreferrer"
              style={{ textDecoration: "none", color: "#6c757d" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-brush"
                viewBox="0 0 16 16"
              >
                <path d="M15.825.12a.5.5 0 0 1 .132.584c-1.53 3.43-4.743 8.17-7.095 10.64a6.067 6.067 0 0 1-2.373 1.534c-.018.227-.06.538-.16.868-.201.659-.667 1.479-1.708 1.74a8.118 8.118 0 0 1-3.078.132 3.659 3.659 0 0 1-.562-.135 1.382 1.382 0 0 1-.466-.247.714.714 0 0 1-.204-.288.622.622 0 0 1 .004-.443c.095-.245.316-.38.461-.452.394-.197.625-.453.867-.826.095-.144.184-.297.287-.472l.117-.198c.151-.255.326-.54.546-.848.528-.739 1.201-.925 1.746-.896.126.007.243.025.348.048.062-.172.142-.38.238-.608.261-.619.658-1.419 1.187-2.069 2.176-2.67 6.18-6.206 9.117-8.104a.5.5 0 0 1 .596.04zM4.705 11.912a1.23 1.23 0 0 0-.419-.1c-.246-.013-.573.05-.879.479-.197.275-.355.532-.5.777l-.105.177c-.106.181-.213.362-.32.528a3.39 3.39 0 0 1-.76.861c.69.112 1.736.111 2.657-.12.559-.139.843-.569.993-1.06a3.122 3.122 0 0 0 .126-.75l-.793-.792zm1.44.026c.12-.04.277-.1.458-.183a5.068 5.068 0 0 0 1.535-1.1c1.9-1.996 4.412-5.57 6.052-8.631-2.59 1.927-5.566 4.66-7.302 6.792-.442.543-.795 1.243-1.042 1.826-.121.288-.214.54-.275.72v.001l.575.575zm-4.973 3.04.007-.005a.031.031 0 0 1-.007.004zm3.582-3.043.002.001h-.002z" />
              </svg>
              Made by awoldt
            </a>
          </span>
        </div>
      </Container>
    </>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const device_layout = generateRepsonsiveLayout(
    context.req.headers["user-agent"]!
  );

  //fetch the json word list from s3 bucket
  const word = await axios.get(
    "https://unlimited-wordle.s3.amazonaws.com/words-list.json"
  );
  const WORD = word.data[Math.floor(Math.random() * word.data.length)];

  //DEFAULT 5 letter word game
  const x: RowDataInterface = {
    rowIndex: 0,
    charIndex: 0,
    spellings: [
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
      ["", "", "", "", ""],
    ],
  };

  return {
    props: {
      word_to_spell: WORD,
      initialRowData: x,
    },
  };
};

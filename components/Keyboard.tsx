const topRow = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
const midRow = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
const bottomRow = ["ENTER", "Z", "X", "C", "V", "B", "N", "M", "BACKSPACE"];
import { Button } from "react-bootstrap";
import TopRow from "./keyboardComponents/TopRow";
import MiddleRow from "./keyboardComponents/MiddleRow";
import BottomRow from "./keyboardComponents/BottomRow";
import RowSpellingsInterface from "../interfaces/RowData";
import { useState } from "react";
import axios from "axios";
import EndGameInterface from "../interfaces/EndGameBanner";

const K = ({
  currentRow,
  changeRow,
  currentWord,
  keyboardSize,

  setEndgame,
  gameStart,
  hasGameStarted,
  endMessage,
  gameOver,
}: {
  currentRow: RowSpellingsInterface;
  changeRow: React.Dispatch<React.SetStateAction<RowSpellingsInterface>>;
  currentWord: string;
  keyboardSize: string[];

  setEndgame: React.Dispatch<
    React.SetStateAction<EndGameInterface | undefined>
  >;
  gameStart: React.Dispatch<React.SetStateAction<boolean>>;
  hasGameStarted: boolean;
  endMessage: string | null;
  gameOver: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [keysUsed, setKeysUsed] = useState<string[]>([]);

  //corresponds to the index of the keys used array above
  //ex: keysUsed=['F', 'A', 'T'] => keysUsedColorCode=['green', 'yellow, 'black'];
  const [keysUsedColorCode, setKeysUsedColorCode] = useState<string[]>([]);

  const [keyboardPreventDefault, setKeyboardPreventDefault] =
    useState<boolean>(false); //will turn keyboard grey while checking if word user guseed is valid

  //makes sure word guessed is in word list
  async function isAWord(guessedWord: string) {
    setKeyboardPreventDefault(true);
    const doesWordExist = await axios.post("/api/iaw", {
      word: guessedWord.toLowerCase(),
    });
    setKeyboardPreventDefault(false);
    //WORD DOES NOT EXIST
    if (doesWordExist.data.status !== 200) {
      return false;
    } else {
      return true;
    }
  }

  //after pressing enter, adds all keys used in row and color codes them
  function addKeysUsed(userSpelling: string[]) {
    const y = [...keysUsed];
    var m = [...keysUsedColorCode];
    const z = new Array();
    const w = new Array();

    //loop through each char in row
    //add too glovbal state array that contains all chars used on key
    //will NOT add duplicate chars
    userSpelling.forEach((x, index) => {
      //KEY HAS NOT BEEN ADDED
      if (keysUsed.indexOf(x) == -1 && z.indexOf(x) == -1) {
        z.push(x);

        //add corresponding color with it to ketsUsedColorCode array
        //GREEN
        if (x.toLowerCase() == currentWord[index]) {
          w.push("rgb(83, 141, 78)");
        }
        //YELLOW
        else if (currentWord.split("").indexOf(x.toLowerCase()) !== -1) {
          w.push("rgb(181, 159, 59)");
        }
        //BLACK
        else {
          w.push("#949494");
        }
      } else {
        //it is green, cant be switched to any other color
        if (keysUsedColorCode[index] !== "rgb(83, 141, 78)") {
          if (x.toLowerCase() == currentWord[index]) {
            m.splice(y.indexOf(x), 1, "rgb(83, 141, 78)");
          }
        }
      }
    });
    const c = y.concat(z);
    setKeysUsed(c);
    const q = m.concat(w);
    setKeysUsedColorCode(q);
  }

  return (
    <div style={{ marginBottom: "100px" }}>
      <div style={{ marginBottom: "5px" }}>
        {topRow.map((x, index) => {
          return (
            <TopRow
              letter={x}
              index={index}
              currentRow={currentRow}
              changeRow={changeRow}
              keysUsedAlready={keysUsed}
              keyBackgroundColors={keysUsedColorCode}
              btnSize={keyboardSize}
              key={index}
              wordToSpell={currentWord}
              preventKeyboardClick={keyboardPreventDefault}
              startGame={gameStart}
              hasGameStarted={hasGameStarted}
            />
          );
        })}
      </div>
      <div style={{ marginBottom: "5px" }}>
        {midRow.map((x, index) => {
          return (
            <MiddleRow
              letter={x}
              index={index}
              currentRow={currentRow}
              changeRow={changeRow}
              keysUsedAlready={keysUsed}
              keyBackgroundColors={keysUsedColorCode}
              btnSize={keyboardSize}
              key={index}
              wordToSpell={currentWord}
              preventKeyboardClick={keyboardPreventDefault}
              startGame={gameStart}
              hasGameStarted={hasGameStarted}
            />
          );
        })}
      </div>
      <div style={{ marginBottom: "5px" }}>
        {bottomRow.map((x, index) => {
          //ENTER
          if (x == "ENTER") {
            return (
              <Button
                key={index}
                style={{
                  padding: "0px",
                  fontSize: keyboardSize[2],
                  marginRight: "5px",
                  width: keyboardSize[0],
                  height: keyboardSize[1],
                  backgroundColor: "#d3d6da",
                  color: "black",
                  border: "none",
                }}
                onClick={async () => {
                  if (currentRow.charIndex == currentWord.length) {
                    //make sure word is in word list
                    if (
                      await isAWord(
                        currentRow.spellings[currentRow.rowIndex]
                          .join("")
                          .toLowerCase()
                      )
                      //WORD EXISTS
                    ) {
                      if (
                        currentWord.toLowerCase() !==
                        currentRow.spellings[currentRow.rowIndex]
                          .join("")
                          .toLowerCase()
                      ) {
                        //GAME OVER, DID NOT GUESS WORD
                        if (currentRow.rowIndex == 5) {
                          const x: EndGameInterface = {
                            guessedWord: false,
                            word: currentWord,
                            message: "Better luck next time.",
                            attempts: currentRow.rowIndex + 1,
                            endGameMessage: endMessage,
                          };
                          gameOver(true);
                          setEndgame(x);
                        }
                        //not on the last row yet,
                        else {
                          const y = { ...currentRow };
                          y.rowIndex += 1;
                          y.charIndex = 0;
                          addKeysUsed(
                            currentRow.spellings[currentRow.rowIndex]
                          );
                          changeRow(y);
                        }
                      }
                      //USER WON
                      else {
                        const x: EndGameInterface = {
                          guessedWord: true,
                          word: currentWord,
                          message: "Nice job!",
                          attempts: Number(currentRow.rowIndex + 1),
                          endGameMessage: null,
                        };
                        gameOver(true);
                        setEndgame(x);
                      }
                      //WORD DOES NOT EXIST
                    } else {
                      alert("Not in word list");
                    }
                  } else {
                    alert("mist finishe spelling worD!");
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  fill="currentColor"
                  className="bi bi-check-circle"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                  <path d="M10.97 4.97a.235.235 0 0 0-.02.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-1.071-1.05z" />
                </svg>
              </Button>
            );
          }
          //BACKSPACE
          else if (x == "BACKSPACE") {
            return (
              <Button
                key={index}
                style={{
                  padding: "0px",
                  fontSize: keyboardSize[2],
                  marginRight: "5px",
                  width: keyboardSize[0],
                  height: keyboardSize[1],
                  backgroundColor: "#d3d6da",
                  color: "black",
                  border: "none",
                }}
                onClick={() => {
                  if (currentRow.charIndex !== 0) {
                    const x = [...currentRow.spellings[currentRow.rowIndex]];
                    x.splice(currentRow.charIndex - 1, 1, "");

                    const y = { ...currentRow };
                    y.spellings[y.rowIndex] = x;
                    y.charIndex -= 1;

                    changeRow(y);
                  }
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="19"
                  height="19"
                  fill="currentColor"
                  className="bi bi-arrow-left-square"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm11.5 5.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5z"
                  />
                </svg>
              </Button>
            );
          } else {
            return (
              <BottomRow
                key={index}
                letter={x}
                index={index}
                currentRow={currentRow}
                changeRow={changeRow}
                keysUsedAlready={keysUsed}
                keyBackgroundColors={keysUsedColorCode}
                btnSize={keyboardSize}
                wordToSpell={currentWord}
                preventKeyboardClick={keyboardPreventDefault}
                startGame={gameStart}
                hasGameStarted={hasGameStarted}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

export default K;

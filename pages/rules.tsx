import { Container, Row, Col, Button } from "react-bootstrap";
import { Image } from "react-bootstrap";
import Head from "next/head";

const Rules = () => {
  return (
    <>
      <Head>
        <title>How to Play</title>
        <meta
          name={"description"}
          content={
            "Learn how to play this 5-letter word guessing game. Learn what the green, yellow, and grey colors mean."
          }
        />
        <meta property="og:title" content="How to Play 5-Letter Word Game" />
        <meta
          property="og:description"
          content="Learn how to play 5-letter word guessing game"
        />
        <meta
          property="og:image"
          content="https://unlimitedwordle.app/favicon.ico"
        />
        <link
          rel="canonical"
          href="https://unlimitedwordle.app/rules"
        />
      </Head>
      <Container style={{ maxWidth: "850px", marginTop: "25px" }}>
        <div className="text-center">
          <a href={"/"} title="return to homepage">
            <Button style={{ marginTop: "50px", marginBottom: "25px" }}>
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
        </div>

        <h1>How to Play</h1>
        <p>
          This is a basic word game where the objective is to guess a random
          5-letter word within six attempts. Each attempt will highlight parts
          of the word where the letters used are correct and where they are not.
          <br></br>
          <br></br>
          These highlighted portions of the word will be either:
        </p>

        <Row style={{ marginBottom: "50px" }}>
          <Col>
            <div
              style={{
                width: "100px",
                height: "100px",
                backgroundColor: "#538d4e",
              }}
            ></div>
            <span style={{ marginLeft: "28.07px" }}>Green</span>
          </Col>
          <Col>
            <div
              style={{
                width: "100px",
                height: "100px",
                backgroundColor: "#b59f3b",
              }}
            ></div>
            <span style={{ marginLeft: "26.975px" }}>Yellow</span>
          </Col>
          <Col>
            <div
              style={{
                width: "100px",
                height: "100px",
                backgroundColor: "#949494",
              }}
            ></div>
            <span style={{ marginLeft: "33.99px" }}>Gray</span>
          </Col>
        </Row>

        <hr></hr>
        <ul style={{ marginTop: "50px", marginBottom: "50px" }}>
          <li>
            <h2>Green</h2>
            <p>
              Indicates the letter is both correct <u>and</u> in the same
              position relative to the word being spelled. Position refers to
              the index a character is at. The word <b>bat</b> has{" "}
              <code style={{ color: "black" }}>B</code> at the first position,{" "}
              <code style={{ color: "black" }}>A</code> at the second, and{" "}
              <code style={{ color: "black" }}>T</code> at the third.
              <br></br>
              <br></br>
              <u>Example</u>
              <br></br>
              Imagine the word to guess is <b>snake</b>. If the word{" "}
              <i>&quot;syrup&quot;</i> is a user&apos;s first guess, the
              resulting grid would display:
            </p>
            <Image src="/rules_pic_1.webp" fluid />
            <p>
              The reason why <code style={{ color: "black" }}>S</code> is green,
              and all other letters are not because{" "}
              <code style={{ color: "black" }}>S</code> is the correct letter at
              the right position. The first letter in the world snake is{" "}
              <code style={{ color: "black" }}>S</code>, and the same goes for
              the word <i>&quot;syrup&quot;</i>. All other letters are grey
              because they do not appear at any position in the word snake.
            </p>
          </li>
          <li style={{ marginTop: "50px" }}>
            <h2>Yellow</h2>
            <p>
              Yellow indicates the the guessed letter is somewhere within the
              word, just <u>not</u> at the position provided.
              <br></br>
              <br></br>
              <span>
                <u>Example</u>
              </span>
              <br></br>
              If the word to guess is <b>reach</b> and if a user&apos;s first
              guess is <i>&quot;every&quot;</i>, the resulting grid would
              display:
            </p>
            <Image
              src="/rules_pic_2.webp"
              fluid
              alt="what does yellow mean in wordle"
            />
            <p>
              Both letter <code style={{ color: "black" }}>E</code>&apos;s are
              yellow because there is an{" "}
              <code style={{ color: "black" }}>E</code> in the word <b>reach</b>
              , just not at the same position. While playing, yellow letters
              give a hint as to what the word could be and narrows the search of
              letters to use.
            </p>
          </li>
          <li style={{ marginTop: "50px" }}>
            <h2>Grey</h2>
            <p>
              Grey represents the letter guessed is <u>neither</u> the correct
              letter or in the right position. Grey should indicate that the
              letter is not used at all and should be disregarded for all other
              guesses, it can be used to help narrow the correct spelling of the
              word to guess. <br></br>
              <br></br>
              <u>Example</u>
              <br></br>
              If the word to guess is <b>fuzzy</b> and the user&apos;s first
              guess is <i>&quot;beans&quot;</i>, the resulting grid would
              display:
            </p>
            <Image
              src="/rules_pic_3.webp"
              fluid
              alt="what does grey mean in wordle"
            />
            <p>
              At no point in <i>&quot;beans&quot;</i> does a single letter match
              any of the letters in <b>fuzzy</b>
            </p>
          </li>
        </ul>

        <p>
          While attempting to guess the word there are also two other things to
          keep in mind. First is that in order for a guess to be valid - the
          word must be <u>exactly</u> 5-letters long, no less, no more. For
          example, if someone was to try and guess the word{" "}
          <i>&quot;cat&quot;</i> during their game, it would not register.
          Second is that each guess must be an <u>actual</u> word. Typing in{" "}
          <i>&quot;asdfg&quot;</i> would not register. These two rules take the
          challenge of this word game to a new level. Remeber to practice and
          learn new words along the way!
        </p>
      </Container>
    </>
  );
};

export default Rules;

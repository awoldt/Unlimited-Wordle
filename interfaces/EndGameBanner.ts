interface Banner {
    guessedWord: boolean; //true or false
    word: string;
    message: string;
    attempts: number;
    endGameMessage: string | null;
}
export default Banner;
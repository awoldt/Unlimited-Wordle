export default (word: string) => {
  console.log("removing spaces from word " + word);

  console.log(word.split(" "));
  //THERE ARE SPACES TO REMOVE
  if (word.split(" ").length !== 1) {
    console.log("there are spaces to remove from users word");

    //find the first index where there is no spaces
    for (let i = 0; i < word.split(" ").length; ++i) {
      if (word.split(" ")[i] !== "") {
        return word.split(" ")[i];
      }
    }
  } else {
    return word;
  }
};

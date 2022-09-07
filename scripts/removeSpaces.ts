export default (word: string) => {
  //THERE ARE SPACES TO REMOVE
  if (word.split(" ").length !== 1) {
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

function adjustLayout(
  changeKeyboardSize: React.Dispatch<React.SetStateAction<string[]>>
) {
  window.addEventListener("resize", () => {
    const w = window.innerWidth;

    //desktop
    if (w >= 992) {
      changeKeyboardSize(["50px", "50px", "28px"]);
    }
    //phone or smaller
    else if (w <= 575) {
      changeKeyboardSize(["30px", "30px", "17px"]);
    }
    //tablet
    else {
      changeKeyboardSize(["40px", "40px", "23px"]);
    }
  });
}

export default adjustLayout;

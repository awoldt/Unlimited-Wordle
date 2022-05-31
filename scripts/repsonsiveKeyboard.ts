function adjustLayout(
  keyboardDimentions: string[],
  changeKeyboardSize: React.Dispatch<React.SetStateAction<string[]>>
) {
  window.addEventListener("resize", () => {
    const w = window.innerWidth;

    if (w >= 1400) {
      console.log("xxl screen");
      if (keyboardDimentions[0] !== "70px") {
        const x = ["70px", "70px", "28px"];
        changeKeyboardSize(x);
      }
    } else if (w >= 1200) {
      console.log("xl screen");
      if (keyboardDimentions[0] !== "70px") {
        const x = ["70px", "70px", "28px"];
        changeKeyboardSize(x);
      }
    } else if (w >= 992) {
      console.log("l screen");
      if (keyboardDimentions[0] !== "60px") {
        const x = ["60px", "60px", "25px"];
        changeKeyboardSize(x);
      }
    } else if (w >= 768) {
      console.log("md screen");
      if (keyboardDimentions[0] !== "55px") {
        const x = ["55px", "55px", "22px"];
        changeKeyboardSize(x);
      }
    } else if (w >= 576) {
      console.log("sm screen");
      if (keyboardDimentions[0] !== "37px") {
        const x = ["45px", "45px", "20px"];
        changeKeyboardSize(x);
      }
    } else {
      if (keyboardDimentions[0] !== "28px") {
        console.log("xsm screen");
        const x = ["30px", "30px", "16px"];
        changeKeyboardSize(x);
      }
    }
  });
}

export default adjustLayout;

export default (
  deviceLayout: string,
  w: number,
  setGridDimentions: React.Dispatch<React.SetStateAction<string[]>>,
  setKeyboardDimentions: React.Dispatch<React.SetStateAction<string[]>>
) => {
  if (String(deviceLayout) == "desktop") {
    console.log("DESKTOP");
    //ANYTHING LESS THAN A LG SCREEN
    if (w < 992) {
      if (w >= 768) {
        setGridDimentions(["5%", "40px", "20px"]);
        setKeyboardDimentions(["55px", "55px", "22px"]);
      } else if (w >= 576) {
        setGridDimentions(["5%", "35px", "18px"]);
        setKeyboardDimentions(["37px", "37px", "18px"]);
      } else {
        setGridDimentions(["5%", "35px", "16px"]);
        setKeyboardDimentions(["29px", "29px", "16px"]);
      }
      //ANYTHING LG OR LARGER
    } else {
      if (w >= 1400) {
        setGridDimentions(["5%", "65px", "26px"]);
        setKeyboardDimentions(["70px", "70px", "28px"]);
      } else if (w >= 1200) {
        setGridDimentions(["5%", "60px", "24px"]);
        setKeyboardDimentions(["70px", "70px", "28px"]);
      } else {
        setGridDimentions(["5%", "50px", "22px"]);
        setKeyboardDimentions(["60px", "60px", "25px"]);
      }
    }
  } else if (String(deviceLayout) == "tablet") {
    //ANYTHING LESS THAN A MD SCREEN
    if (w < 768) {
      if (w >= 576) {
        setGridDimentions(["5%", "35px", "18px"]);
        setKeyboardDimentions(["37px", "37px", "18px"]);
      } else {
        setGridDimentions(["5%", "26px", "16px"]);
        setKeyboardDimentions(["28px", "28px", "15px"]);
      }
      //ANYTHING MD OR LARGER
    } else {
      if (w >= 1400) {
        setGridDimentions(["5%", "65px", "26px"]);
        setKeyboardDimentions(["70px", "70px", "28px"]);
      } else if (w >= 1200) {
        setGridDimentions(["5%", "60px", "24px"]);
        setKeyboardDimentions(["70px", "70px", "28px"]);
      } else if (w >= 992) {
        setGridDimentions(["5%", "50px", "22px"]);
        setKeyboardDimentions(["60px", "60px", "25px"]);
      } else {
        setGridDimentions(["5%", "40px", "20px"]);
        setKeyboardDimentions(["55px", "55px", "22px"]);
      }
    }
  } else if (String(deviceLayout) == "phone") {
    //ANYTHING LESS THAN A SM SCREEN
    if (w < 576) {
      setGridDimentions(["5%", "26px", "16px"]);
      setKeyboardDimentions(["29px", "29px", "16px"]);

      //ANYTHING sm OR LARGER
    } else {
      if (w >= 1400) {
        setGridDimentions(["5%", "65px", "26px"]);
        setKeyboardDimentions(["70px", "70px", "28px"]);
      } else if (w >= 1200) {
        setGridDimentions(["5%", "60px", "24px"]);
        setKeyboardDimentions(["70px", "70px", "28px"]);
      } else if (w >= 992) {
        setGridDimentions(["5%", "50px", "22px"]);
        setKeyboardDimentions(["60px", "60px", "25px"]);
      } else if (w >= 768) {
        setGridDimentions(["5%", "40px", "20px"]);
        setKeyboardDimentions(["55px", "55px", "22px"]);
      } else if (w >= 576) {
        setGridDimentions(["5%", "35px", "18px"]);
        setKeyboardDimentions(["37px", "37px", "18px"]);
      }
    }
  } else {
    setGridDimentions(["5%", "26px", "18px"]);
  }
};

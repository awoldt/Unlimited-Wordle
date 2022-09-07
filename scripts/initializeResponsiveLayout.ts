export default (
  deviceLayout: string,
  w: number,
  setGridDimentions: React.Dispatch<React.SetStateAction<string[]>>,
  setKeyboardDimentions: React.Dispatch<React.SetStateAction<string[]>>
) => {
  if (String(deviceLayout) == "desktop") {
    //ANYTHING LESS THAN A LG SCREEN
    if (w < 992) {
      if (w >= 768) {
        setGridDimentions(["70px", "70px", "20px"]);
        setKeyboardDimentions(["55px", "55px", "22px"]);
      } else if (w >= 576) {
        setGridDimentions(["60px", "60px", "18px"]);
        setKeyboardDimentions(["37px", "37px", "18px"]);
      } else {
        setGridDimentions(["50px", "50px", "16px"]);
        setKeyboardDimentions(["29px", "29px", "16px"]);
      }
      //ANYTHING LG OR LARGER
    } else {
      if (w >= 1400) {
        setGridDimentions(["80px", "80px", "26px"]);
        setKeyboardDimentions(["70px", "70px", "28px"]);
      } else if (w >= 1200) {
        setGridDimentions(["75px", "75px", "24px"]);
        setKeyboardDimentions(["70px", "70px", "28px"]);
      } else {
        setGridDimentions(["70px", "70px", "22px"]);
        setKeyboardDimentions(["60px", "60px", "25px"]);
      }
    }
  } else if (String(deviceLayout) == "tablet") {
    //ANYTHING LESS THAN A MD SCREEN
    if (w < 768) {
      if (w >= 576) {
        setGridDimentions(["60px", "60px", "18px"]);
        setKeyboardDimentions(["37px", "37px", "18px"]);
      } else {
        setGridDimentions(["50px", "50px", "16px"]);
        setKeyboardDimentions(["29px", "29px", "16px"]);
      }
      //ANYTHING MD OR LARGER
    } else {
      if (w >= 1400) {
        setGridDimentions(["80px", "80px", "26px"]);
        setKeyboardDimentions(["70px", "70px", "28px"]);
      } else if (w >= 1200) {
        setGridDimentions(["75px", "75px", "24px"]);
        setKeyboardDimentions(["70px", "70px", "28px"]);
      } else if (w >= 992) {
        setGridDimentions(["70px", "70px", "22px"]);
        setKeyboardDimentions(["60px", "60px", "25px"]);
      } else {
        setGridDimentions(["70px", "70px", "20px"]);
        setKeyboardDimentions(["55px", "55px", "22px"]);
      }
    }
  } else if (String(deviceLayout) == "phone") {
    //ANYTHING LESS THAN A SM SCREEN
    if (w < 576) {
      setGridDimentions(["50px", "50px", "16px"]);
      setKeyboardDimentions(["30px", "30px", "16px"]);

      //ANYTHING sm OR LARGER
    } else {
      if (w >= 1400) {
        setGridDimentions(["80px", "80px", "26px"]);
        setKeyboardDimentions(["70px", "70px", "28px"]);
      } else if (w >= 1200) {
        setGridDimentions(["75px", "75px", "24px"]);
        setKeyboardDimentions(["70px", "70px", "28px"]);
      } else if (w >= 992) {
        setGridDimentions(["70px", "70px", "22px"]);
        setKeyboardDimentions(["60px", "60px", "25px"]);
      } else if (w >= 768) {
        setGridDimentions(["70px", "70px", "20px"]);
        setKeyboardDimentions(["55px", "55px", "22px"]);
      } else if (w >= 576) {
        setGridDimentions(["60px", "60px", "18px"]);
        setKeyboardDimentions(["45px", "45px", "20px"]);
      }
    }
  } else {
    setGridDimentions(["60px", "60px", "18px"]);
  }
};

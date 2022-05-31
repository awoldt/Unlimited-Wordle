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
      console.log("screen size is too small for desktop");
      if (w >= 768) {
        console.log("between MD and LG");
        setGridDimentions(["5%", "40px", "20px"]);
        setKeyboardDimentions(["55px", "55px", "22px"]);
      } else if (w >= 576) {
        console.log("between SM and MD");
        setGridDimentions(["5%", "35px", "18px"]);
        setKeyboardDimentions(["37px", "37px", "18px"]);
      } else {
        console.log("between XSM and SM");
        setGridDimentions(["5%", "35px", "16px"]);
        setKeyboardDimentions(["29px", "29px", "16px"]);
      }
      //ANYTHING LG OR LARGER
    } else {
      console.log("screen size is valid desktop size");
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
    console.log("TABLET");
    //ANYTHING LESS THAN A MD SCREEN
    if (w < 768) {
      console.log("screen size is too small for tablet");
      if (w >= 576) {
        console.log("between SM and MD");
        setGridDimentions(["5%", "35px", "18px"]);
        setKeyboardDimentions(["37px", "37px", "18px"]);
      } else {
        console.log("between XSM and SM");
        setGridDimentions(["5%", "26px", "16px"]);
        setKeyboardDimentions(["28px", "28px", "15px"]);
      }
      //ANYTHING MD OR LARGER
    } else {
      console.log("screen size is valid tablet size");
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
    console.log("PHONE");
    //ANYTHING LESS THAN A SM SCREEN
    if (w < 576) {
      console.log("screen size is valid for small for phone");

      console.log("between XSM and SM");
      setGridDimentions(["5%", "26px", "16px"]);
      setKeyboardDimentions(["29px", "29px", "16px"]);

      //ANYTHING sm OR LARGER
    } else {
      console.log("screen size is too big for phone size");
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
    console.log("UNKNOWN DEVICE, DEFAULT SIZE");
    setGridDimentions(["5%", "26px", "18px"]);
  }
};

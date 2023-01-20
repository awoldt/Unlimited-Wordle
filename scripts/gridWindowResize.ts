function adjustLayout(setGD: React.Dispatch<React.SetStateAction<string[]>>) {
  window.addEventListener("resize", () => {
    const w = window.innerWidth;
    //desktop
    if (w >= 992) {
      setGD(["80px", "80px", "26px"]);
    }
    //phone or smaller
    else if (w <= 575) {
      setGD(["50px", "50px", "18px"]);
    }
    //tablet
    else {
      setGD(["70px", "70px", "23px"]);
    }
  });
}

export default adjustLayout;

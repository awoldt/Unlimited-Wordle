function adjustLayout(
  gd: string[],
  setGD: React.Dispatch<React.SetStateAction<string[]>>
) {
  window.addEventListener("resize", () => {
    const w = window.innerWidth;

    if (w >= 1400) {
      if (gd[0] !== "80px") {
        const x: string[] = ["80px", "80px", "26px"];
        setGD(x);
      }
    } else if (w >= 1200) {
      if (gd[0] !== "75px") {
        const x: string[] = ["75px", "75px", "24px"];
        setGD(x);
      }
    } else if (w >= 992) {
      if (gd[0] !== "70px") {
        const x: string[] = ["70px", "70px", "22px"];
        setGD(x);
      }
    } else if (w >= 768) {
      if (gd[0] !== "70px") {
        const x: string[] = ["70px", "70px", "20px"];
        setGD(x);
      }
    } else if (w >= 576) {
      if (gd[0] !== "60px") {
        const x: string[] = ["60px", "60px", "18px"];
        setGD(x);
      }
    } else {
      if (gd[0] !== "50px") {
        const x: string[] = ["50px", "50px", "16px"];
        setGD(x);
      }
    }
  });
}

export default adjustLayout;

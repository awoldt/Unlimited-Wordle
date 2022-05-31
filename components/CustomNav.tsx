import { Container } from "react-bootstrap";

const Nav = () => {
  return (
    <Container
      className="text-center"
      style={{ borderBottom: "3px solid black", fontFamily: 'Arial, sans-serif', fontWeight: 'bold'}}
    >
      <h1>Wordlebin</h1>
    </Container>
  );
};

export default Nav;

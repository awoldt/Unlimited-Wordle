import RowDataInterface from "../interfaces/RowData";

import { Row } from "react-bootstrap";
const Grid = ({
  rowData,
  word,
  gridSize,
}: {
  rowData: RowDataInterface;
  word: string;
  gridSize: string[];
}) => {
  return (
    <div style={{ marginBottom: "25px" }}>
      {rowData.spellings.map((y, index) => {
        //GRADED ROW
        if (rowData.rowIndex > index) {
          return (
            <Row className="justify-content-center" key={index}>
              {y.map((z, index2) => {
                if (z.toLowerCase() !== word[index2]) {
                  //YELLOW
                  if (word.indexOf(z.toLowerCase()) !== -1) {
                    return (
                      <div
                        key={index2}
                        style={{
                          color: "white",
                          border: "1px solid black",
                          width: gridSize[0],
                          height: gridSize[1],
                          marginRight: "4px",
                          marginBottom: "4px",
                          display: "inline-block",
                          backgroundColor: "#b59f3b",
                          fontSize: gridSize[2],
                          lineHeight: gridSize[1],
                          fontWeight: "bold",
                          padding: "0px",
                        }}
                      >
                        {z}
                      </div>
                    );
                  }
                  //BLACK
                  else {
                    return (
                      <div
                        key={index2}
                        style={{
                          color: "white",
                          border: "1px solid black",
                          width: gridSize[0],
                          height: gridSize[1],
                          marginRight: "4px",
                          marginBottom: "4px",
                          display: "inline-block",
                          backgroundColor: "#949494",
                          fontSize: gridSize[2],
                          lineHeight: gridSize[1],
                          fontWeight: "bold",
                          padding: "0px",
                        }}
                      >
                        {z}
                      </div>
                    );
                  }
                } else {
                  //green
                  return (
                    <div
                      key={index2}
                      style={{
                        border: "1px solid green",
                        width: gridSize[0],
                        height: gridSize[1],
                        marginRight: "4px",
                        marginBottom: "4px",
                        display: "inline-block",
                        backgroundColor: "#538d4e",
                        fontSize: gridSize[2],
                        color: "white",
                        lineHeight: gridSize[1],
                        fontWeight: "bold",
                        padding: "0px",
                      }}
                    >
                      {z}
                    </div>
                  );
                }
              })}
            </Row>
          );
        }
        //NOT GRADED
        else {
          return (
            <Row className="justify-content-center" key={index}>
              {y.map((z, index2) => {
                //chars
                return (
                  <div
                    key={index2}
                    style={{
                      border: "1px solid black",
                      width: gridSize[0],
                      height: gridSize[1],
                      marginRight: "4px",
                      marginBottom: "4px",
                      display: "inline-block",
                      fontSize: gridSize[2],
                      lineHeight: gridSize[1],
                      fontWeight: "bold",
                      padding: "0px",
                    }}
                  >
                    {z}
                  </div>
                );
              })}
            </Row>
          );
        }
      })}
    </div>
  );
};
export default Grid;

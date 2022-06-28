import { Col } from "react-bootstrap";

// centered Col vertically
export const CentredCol = (props) => {
  return (
    <Col
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      {...props}
    >
      {props.children}
    </Col>
  );
};

export default CentredCol;

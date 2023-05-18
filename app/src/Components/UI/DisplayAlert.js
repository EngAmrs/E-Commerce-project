import React from "react";
import { Alert } from "react-bootstrap";

const DispalyAlert = ({ variant = "info", children }) => {
  return (
    <Alert variant={variant} style={{ fontSize: 20, textAlign: "center" }}>
      <strong>{children}</strong>
    </Alert>
  );
};

export default DispalyAlert;
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import "../src/assets/style/navigationbuttonstyle.css";

const NavigationButtons = () => {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <>
      <Button className="button" onClick={() => handleNavigation("/xml-text")}>
        xml-text
      </Button>
      <Button className="button" onClick={() => handleNavigation("/xml")}>
        xml
      </Button>
      <Button className="button" onClick={() => handleNavigation("/form")}>
        form
      </Button>
    </>
  );
};

export default NavigationButtons;

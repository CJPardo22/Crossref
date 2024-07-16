import React from "react";
import useXMLFileStore from "./store/useXMLFileStore";
import NavigationButtons from "./NavigationButtons";
import "../src/assets/style/xmltextcontent.css";

export default function XMLTextContent() {
  const { xmlContent } = useXMLFileStore();

  const removeXMLTags = (xmlString) => {
    const regex = /<[^>]+>/g;
    return xmlString.replace(regex, "");
  };

  const formatText = (text) => {
    return text.split("\n").map((line, index) => (
      <div key={index} className="xml-line">
        {line}
      </div>
    ));
  };

  return (
    <div className="xml-text-content">
      <NavigationButtons />
      <h1 className="title">Contenido del archivo XML sin etiquetas</h1>
      <div className="xml-content">{formatText(removeXMLTags(xmlContent))}</div>
    </div>
  );
}

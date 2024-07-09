import React from "react";
import useXMLFileStore from "./store/useXMLFileStore";
import "../src/assets/style/xmltextcontent.css";

export default function XMLTextContent() {
  const { xmlContent } = useXMLFileStore();

  const removeXMLTags = (xmlString) => {
    const regex = /<[^>]+>/g;
    return xmlString.replace(regex, "");
  };

  return (
    <div>
      <h1>Contenido del archivo XML sin etiquetas</h1>
      <pre>{removeXMLTags(xmlContent)}</pre>
      {/* <div>{removeXMLTags(xml)}</div> */}
    </div>
  );
}

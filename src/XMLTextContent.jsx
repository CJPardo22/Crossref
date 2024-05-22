import React, { useEffect, useState } from "react";
import XMLParser from "react-xml-parser";
import xmlJs from "xml-js";
import useXMLFileStore from "./store/useXMLFileStore";

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

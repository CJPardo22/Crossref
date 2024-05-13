import React, { useEffect, useState } from "react";
import XMLParser from "react-xml-parser";
import xmlJs from "xml-js";

export default function XMLTextContent({ xml }) {
  const removeXMLTags = (xmlString) => {
    const regex = /<[^>]+>/g;
    return xmlString.replace(regex, "");
  };

  return (
    <div>
      <h1>Contenido del archivo XML sin etiquetas</h1>
      <pre>{removeXMLTags(xml)}</pre>
      {/* <div>{removeXMLTags(xml)}</div> */}
    </div>
  );
}

import XMLParser from "react-xml-parser";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import useXMLFileStore from "./store/useXMLFileStore";

export const XmlForm = () => {
  const { xmlContent, setXMLContent } = useXMLFileStore();
  const parsedXML = new XMLParser().parseFromString(xmlContent);
  console.log("🦁", parsedXML);
  const [modifiedXML, setModifiedXML] = useState(parsedXML);

  const handleInputChange = (e, node) => {
    const newValue = e.target.value;
    node.value = newValue;
    setModifiedXML({ ...modifiedXML });
  };

  const handleSave = () => {
    const updatedXMLString = new XMLParser().toString(modifiedXML);
    setXMLContent(updatedXMLString);
    console.log("Updated XML JSON:", modifiedXML);
    console.log("🤠", updatedXMLString);
  };

  const handleDownload = () => {
    const updatedXMLString = new XMLParser().toString(modifiedXML);
    const blob = new Blob([updatedXMLString], { type: "application/xml" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "modified_file.xml";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderForm = (jsonData) => {
    const processNode = (node) => {
      if (node.name && node.value) {
        return (
          <div key={uuidv4()}>
            <label>{node.name}</label>
            <input
              type="text"
              value={node.value}
              onChange={(e) => handleInputChange(e, node)}
            />
            <br />
          </div>
        );
      }

      if (node.children && node.children.length > 0) {
        return (
          <div key={uuidv4()}>
            <br />
            {node.children.map((child) => processNode(child))}
          </div>
        );
      }

      return null;
    };

    return jsonData.children.map((child) => processNode(child));
  };

  return (
    <>
      <div>{renderForm(modifiedXML)}</div>
      <button onClick={handleSave}>Guardar</button>
      <button onClick={handleDownload}>Descargar</button>
    </>
  );
};

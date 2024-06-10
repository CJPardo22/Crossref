import XMLParser from "react-xml-parser";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AddCrossmark } from "./AddCrossmark";
import useXMLFileStore from "./store/useXMLFileStore";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

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

  const handleAddCrossmark = (value) => {
    const newJSON = {...modifiedXML}
  };

  const addCrossmarkToNode = (node) => {
    if (node.name === "pages") {
      const crossmarkNode = {
        name: "Crossmark",
        attributes: {},
        value: value,
        children: [],
      };
      const parentNode = node.parent;
      if (parentNode && parentNode.children) {
        const index = parentNode.children.indexOf(node);
        parentNode.children.splice(index + 1, 0, crossmarkNode);
      }
    }
    if (newJSON.children && newJSON.children.length > 0) {
      newJSON.children.forEach(addCrossmarkToNode);
    }
    setModifiedXML(newJSON);
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
            <Form.Label>{node.name} :</Form.Label>
            {/* <label>{node.name}</label> */}
            <Form.Control
              type="text"
              value={node.value}
              onChange={(e) => handleInputChange(e, node)}
            />
            {/* <input
              type="text"
              value={node.value}
              onChange={(e) => handleInputChange(e, node)}
            /> */}
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
      <AddCrossmark onSave={handleAddCrossmark} />
      <Button variant="info" onClick={handleSave} style={{ margin: "10px" }}>
        Guardar
      </Button>
      <Button variant="success" onClick={handleDownload}>
        Descargar
      </Button>
    </>
  );
};

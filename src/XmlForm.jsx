import XMLParser from "react-xml-parser";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { AddCrossmark } from "./AddCrossmark";
import { basedatos } from "./basedatos";
import useXMLFileStore from "./store/useXMLFileStore";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const XmlForm = () => {
  const { xmlContent, setXMLContent } = useXMLFileStore();
  const parsedXML = new XMLParser().parseFromString(xmlContent);
  const [modifiedXML, setModifiedXML] = useState(parsedXML);

  const handleInputChange = (e, node) => {
    const newValue = e.target.value;
    node.value = newValue;
    setModifiedXML({ ...modifiedXML });
  };

  const handleAddCrossmark = (value) => {
    const newJSON = { ...modifiedXML };
    let institucion = "";

    const addCrossmarkToNode = (node, parent = null) => {
      if (node.name === "registrant") {
        let registrant = node.value.toLowerCase().trim();
        const resultado = basedatos.find(
          (obj) => obj.institucion === registrant
        );
        if (resultado) {
          institucion = resultado.policy;
          console.log("Institución encontrada: ", resultado.policy);
        } else {
          console.log("Institucion no encontrada");
        }
      }
      if (node.name === "pages" && institucion) {
        const crossmarkNode = {
          name: "Crossmark",
          attributes: {},
          value: "",
          children: [
            {
              name: "crossmark_policy",
              attributes: {},
              value: institucion,
              children: [],
            },
            {
              name: "crossmark_domains",
              attributes: {},
              value: "",
              children: [
                {
                  name: "crossmark_domain",
                  attributes: {},
                  value: "",
                  children: [
                    {
                      name: "domain",
                      attributes: {},
                      value: "psychoceramics.labs.crossref.org",
                      children: [],
                    },
                  ],
                },
              ],
            },
            {
              name: "custom_metadata",
              attributes: {},
              value: "",
              children: [
                {
                  name: "assertion",
                  attributes: {
                    name: "received",
                    label: "Received",
                    group_name: "publication_history",
                    group_label: "Publication History",
                    order: "0",
                  },
                  value: value,
                  children: [],
                },
              ],
            },
          ],
        };
        console.log("💡 Entro en el primer IF");
        if (parent && parent.children) {
          console.log("💡 Entro en el segundo IF");
          const index = parent.children.indexOf(node);
          parent.children.splice(index + 1, 0, crossmarkNode);
        }
      }
      if (node.children && node.children.length > 0) {
        console.log("💡 Entro en el tercer IF");
        node.children.forEach((child) => addCrossmarkToNode(child, node));
      }
    };

    newJSON.children.forEach((child) => addCrossmarkToNode(child));
    setModifiedXML(newJSON);
    console.log("❤️", newJSON);
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
            <Form.Control
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

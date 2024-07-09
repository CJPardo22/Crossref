import React, { useState, useEffect } from "react";
import XMLParser from "react-xml-parser";
import { v4 as uuidv4 } from "uuid";
import { AddCrossmark } from "./AddCrossmark";
import useXMLFileStore from "./store/useXMLFileStore";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const parseXML = (xmlContent) => new XMLParser().parseFromString(xmlContent);
const convertJSONToXMLString = (json) => new XMLParser().toString(json);

export const XmlForm2 = () => {
  const { xmlContent, setXMLContent } = useXMLFileStore();
  const [articles, setArticles] = useState([]);
  const [selectedArticleIndex, setSelectedArticleIndex] = useState(0);
  const [modifiedArticles, setModifiedArticles] = useState([]);

  useEffect(() => {
    if (xmlContent) {
      const parsedXML = parseXML(xmlContent);
      const articleNodes = parsedXML.children.filter(node => node.name === "journal");
      setArticles(articleNodes);
      setModifiedArticles(articleNodes);
    }
  }, [xmlContent]);

  const handleInputChange = (e, node) => {
    node.value = e.target.value;
    setModifiedArticles([...modifiedArticles]);
  };

  const handleAddCrossmark = (values) => {
    const article = modifiedArticles[selectedArticleIndex];
    // Aquí va la lógica para agregar Crossmark al artículo seleccionado.
    // ... (similar a lo mostrado anteriormente)

    setModifiedArticles([...modifiedArticles]);
  };

  const handleSave = () => {
    const updatedXMLString = convertJSONToXMLString({ children: modifiedArticles });
    setXMLContent(updatedXMLString);
  };

  const handleDownload = () => {
    const updatedXMLString = convertJSONToXMLString({ children: modifiedArticles });
    const blob = new Blob([updatedXMLString], { type: "application/xml" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "modified_file.xml";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderForm = (article) => {
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

    return article.children.map((child) => processNode(child));
  };

  return (
    <>
      <div className="sidebar">
        {articles.map((article, index) => (
          <Button
            key={index}
            variant="link"
            onClick={() => setSelectedArticleIndex(index)}
          >
            Artículo {index + 1}
          </Button>
        ))}
      </div>
      <div className="content">
        {articles.length > 0 && renderForm(modifiedArticles[selectedArticleIndex])}
      </div>
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

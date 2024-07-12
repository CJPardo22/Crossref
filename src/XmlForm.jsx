import XMLParser from "react-xml-parser";
import { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { AddCrossmark } from "./AddCrossmark";
import { basedatos } from "./basedatos";
import { revistas } from "./revistasDoi";
import useXMLFileStore from "./store/useXMLFileStore";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/Stack";
import "../src/assets/style/xmlcontentstyle.css";

//Funciones utilitarias para convertir XML a Json y viceversa
const parseXML = (xmlContent) => new XMLParser().parseFromString(xmlContent);
const convertJSONToXMLString = (json) => new XMLParser().toString(json);

export const XmlForm = () => {
  const { xmlContent, setXMLContent } = useXMLFileStore();
  const [articles, setArticles] = useState([]);
  const [selectedArticleIndex, setSelectedArticleIndex] = useState(0);
  const [modifiedArticles, setModifiedArticles] = useState([]);
  const [headData, setHeadData] = useState({});
  // let headData = {};

  useEffect(() => {
    if (xmlContent) {
      const parsedXML = parseXML(xmlContent);
      const headNode = parsedXML.children.find((node) => node.name === "head");
      const bodyNode = parsedXML.children.find((node) => node.name === "body");

      const articleNodes = bodyNode.children.filter(
        (node) => node.name === "journal"
      );
      setArticles(articleNodes);
      setModifiedArticles(articleNodes);

      const registrantNode = headNode.children.find(
        (node) => node.name === "registrant"
      );
      if (registrantNode) {
        const registrant = registrantNode.value.toLowerCase().trim();
        const publisher = registrantNode.value.trim();
        const resultado = basedatos.find(
          (obj) => obj.institucion === registrant
        );
        if (resultado) {
          setHeadData({
            institucion: resultado.policy,
            publisher: publisher,
          });
          console.log("Institución encontrada: ", resultado.policy);
        } else {
          console.log("Institución no encontrada");
        }
      }
    }
  }, [xmlContent]);

  const handleInputChange = (e, node) => {
    const newValue = e.target.value;
    node.value = newValue;
    setModifiedArticles([...modifiedArticles]);
  };

  const handleAddCrossmark = (values) => {
    const newJSON = [...modifiedArticles];
    let articleTitle = "";
    let fullTitle = "";
    let doi = "";
    let year = "";
    let programNode = null;

    const addCrossmarkToNode = (node, parent = null) => {
      if (node.name === "title") {
        articleTitle = node.value.trim();
      }
      if (node.name === "full_title") {
        fullTitle = node.value.trim();
        let revista = fullTitle.toLowerCase().trim();
        const objeto = revistas.find((obj) => obj.revista === revista);
        console.log("👻", objeto);
        if (objeto) {
          doi = objeto.doi;
          console.log("Doi encontrado: ", doi);
        } else {
          console.log("Doi no encontrado");
        }
      }
      if (node.name === "year") {
        year = node.value.trim();
      }
      if (node.name === "program") {
        programNode = node;
        // console.log(programNode);
      }
      if (node.name === "pages" && headData.institucion && year) {
        const crossmarkNode = {
          name: "crossmark",
          attributes: {},
          value: "",
          children: [
            {
              name: "crossmark_policy",
              attributes: {},
              value: headData.institucion,
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
                  value: values.receivedDate,
                  children: [],
                },
                {
                  name: "assertion",
                  attributes: {
                    name: "accepted",
                    label: "Accepted",
                    group_name: "publication_history",
                    group_label: "Publication_History",
                    order: "1",
                  },
                  value: values.acceptedDate,
                  children: [],
                },
                {
                  name: "assertion",
                  attributes: {
                    name: "published_online",
                    label: "Published Online",
                    group_name: "publication_history",
                    group_label: "Publication_History",
                    order: "2",
                  },
                  value: values.publishedDate,
                  children: [],
                },
                {
                  name: "assertion",
                  attributes: {
                    label: "This article is maintained by ",
                    name: "publisher",
                  },
                  value: headData.publisher,
                  children: [],
                },
                {
                  name: "assertion",
                  attributes: {
                    label: "Article Title",
                    name: "articletitle",
                  },
                  value: articleTitle,
                  children: [],
                },
                {
                  name: "assertion",
                  attributes: {
                    label: "Journal Title",
                    name: "journaltitle",
                  },
                  value: fullTitle,
                  children: [],
                },
                {
                  name: "assertion",
                  attributes: {
                    label: "CrossRef DOI link to publisher maintained version",
                    name: "articlelink",
                  },
                  value: doi,
                  children: [],
                },
                {
                  name: "assertion",
                  attributes: {
                    label: "Content Type",
                    name: "content_type",
                  },
                  value: values.contentType,
                  children: [],
                },
                {
                  name: "assertion",
                  attributes: {
                    label: "Copyright",
                    name: "copyright",
                  },
                  value: `© ${year} ${headData.publisher}`,
                  children: [],
                },
              ],
            },
          ],
        };
        console.log(
          "Verificando programNode antes del segundo IF: ",
          programNode
        );
        if (programNode) {
          console.log("🧙🤌");
          programNode.children = programNode.children.map((child) => {
            if (child.name === "license_ref") {
              child.attributes = { ...child.attributes, applies_to: "vor" };
            }
            return child;
          });

          crossmarkNode.children[2].children.push(programNode);
        } else {
          console.log("NO PASO NADA");
        }
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
        // node.children.forEach((child) => artitleXML(child));
      }
    };

    // newJSON.children.forEach((child) => addCrossmarkToNode(child));
    const articleNode = newJSON[selectedArticleIndex];
    addCrossmarkToNode(articleNode);
    newJSON[selectedArticleIndex] = articleNode;
    setModifiedArticles(newJSON);
    console.log("❤️", newJSON);
  };

  const updateJSONWithChanges = (originalJSON, modifiedArticles) => {
    const updatedJSON = { ...originalJSON };
    const bodyNode = updatedJSON.children.find((node) => node.name === "body");
    bodyNode.children = modifiedArticles;
    return updatedJSON;
  };

  const handleSave = () => {
    const originalJSON = parseXML(xmlContent);
    const updatedJSON = updateJSONWithChanges(originalJSON, modifiedArticles);
    const updatedXMLString = convertJSONToXMLString(updatedJSON);
    setXMLContent(updatedXMLString);
    console.log("Updated XML JSON:", updatedJSON);
    console.log("🤠", updatedXMLString);
  };

  const handleDownload = () => {
    const originalJSON = parseXML(xmlContent);
    const updatedJSON = updateJSONWithChanges(originalJSON, modifiedArticles);
    const updatedXMLString = convertJSONToXMLString(updatedJSON);
    const blob = new Blob([updatedXMLString], { type: "application/xml" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "modified_file.xml";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderForm = (jsonData) => {
    if (!jsonData || !jsonData.children) {
      return null;
    }
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
    <div className="container">
      <div className="sidebar">
        {articles.map((article, index) => (
          <Button
            key={index}
            variant="info"
            onClick={() => setSelectedArticleIndex(index)}
            style={{ margin: "10px" }}
          >
            Artículo {index + 1}
          </Button>
        ))}
      </div>
      <div className="content">
        {articles.length > 0 &&
          renderForm(modifiedArticles[selectedArticleIndex])}
      </div>
      <Stack direction="vertical" gap={3}>
        <div className="p-2">
          <AddCrossmark onSave={handleAddCrossmark} />
          <Button
            variant="info"
            onClick={handleSave}
            style={{ margin: "10px" }}
          >
            Guardar
          </Button>
          <Button variant="success" onClick={handleDownload}>
            Descargar
          </Button>
        </div>
      </Stack>
    </div>
  );
};

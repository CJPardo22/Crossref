import XMLParser from "react-xml-parser";
import { useState, useEffect } from "react";
import { parse, v4 as uuidv4 } from "uuid";
import useXMLFileStore from "./store/useXMLFileStore";

export const XmlForm = () => {
  const { xmlContent } = useXMLFileStore();
  const parsedXML = new XMLParser().parseFromString(xmlContent);
  //!Estado del XML
  const [modifiedXML, setModifiedXML] = useState(parsedXML);

  console.log(parsedXML);
  const renderForm = (jsonData) => {
    const processNode = (node) => {
      //!Funcion para los cambios
      const cambios = (e) => {
        console.log(node.name);
        setModifiedXML(e.target.value);
      };
      //!acá
      if (node.name && node.value) {
        return (
          <div key={uuidv4()}>
            <label> {node.name} </label>
            <input onSubmit={cambios} type="text" defaultValue={node.value} />
            <br />
          </div>
        );
      }

      if (node.children && node.children.length > 0) {
        return (
          <div key={uuidv4()}>
            <br />
            {/* <h3>{node.name}</h3> */}
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
      <div>{renderForm(parsedXML)}</div>
    </>
  );
};

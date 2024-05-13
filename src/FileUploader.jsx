import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useXMLContext } from "./XMLContext";

export default function FileUploader({ onFileLoaded }) {
  const { handleFileLoaded } = useXMLContext(); //!del contexto

  const [xml, setXml] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log("💡", file);

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileContent = e.target.result;
        console.log("😴", fileContent);
        setXml(fileContent);
        // handleFileLoaded(fileContent); //!Cargar el contenido del archivo en el contexto
        onFileLoaded(fileContent); //Llama a la función proporcionada por las props
        navigate("/form"); //Redirige al usuario a a la pagina /xml
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <input
        accept="text/xml"
        type="file"
        id="directoryInput"
        onChange={handleFileChange}
      />
      {xml ? <h1>Archivo XML cargado</h1> : <h1>Seleccione un archivo XML</h1>}
    </div>
  );
}

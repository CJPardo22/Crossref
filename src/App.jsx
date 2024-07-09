import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PrincipalPage } from "./Bienvenida";
import FileUploader from "./FileUploader";
import XMLContent from "./XMLContent";
import XMLTextContent from "./XMLTextContent";
import { XmlForm } from "./XmlForm";
import { XmlForm2 } from "./XmlForm2";
import useXMLFileStore from "./store/useXMLFileStore";

export default function App() {
  const { xmlContent } = useXMLFileStore();
  // console.log("😁", xmlContent);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<PrincipalPage />} />

          <Route path="/CargarXML" element={<FileUploader />} />

          <Route path="/xml" element={<XMLContent />} />

          <Route path="/xml-text" element={<XMLTextContent />} />

          <Route path="/form" element={<XmlForm />} />

          <Route path="/form2" element={<XmlForm2 />} />
        </Routes>
      </Router>
    </>
  );
}

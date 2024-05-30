import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FileUploader from "./FileUploader";
import XMLContent from "./XMLContent";
import XMLTextContent from "./XMLTextContent";
import { XmlForm } from "./XmlForm";
import useXMLFileStore from "./store/useXMLFileStore";

export default function App() {
  const { xmlContent } = useXMLFileStore();
  // console.log("😁", xmlContent);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<FileUploader />} />

          <Route path="/xml" element={<XMLContent />} />

          <Route path="/xml-text" element={<XMLTextContent />} />

          <Route path="/form" element={<XmlForm />} />
        </Routes>
      </Router>
    </>
  );
}

import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FileUploader from "./FileUploader";
import XMLContent from "./XMLContent";
import XMLTextContent from "./XMLTextContent";
import { XMLProvider } from "./XMLContext";
import {XmlForm} from "./XmlForm";

export default function App() {
  const [xmlContent, setXmlContent] = useState(null);

  const handleFileLoaded = (content) => {
    setXmlContent(content);
    // console.log("🥑", content);
  };

  return ( 
    <XMLProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={<FileUploader onFileLoaded={handleFileLoaded} />}
          />

          <Route path="/xml" element={<XMLContent xml={xmlContent} />} />
          {/* {console.log("😶‍🌫️", xmlContent)} */}

          <Route
            path="/xml-text"
            element={<XMLTextContent xml={xmlContent} />}
          />

          <Route
            path="/form"
            element={<XmlForm xml={xmlContent}/>}
          />
        </Routes>
      </Router>
    </XMLProvider>
  );
}

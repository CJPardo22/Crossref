import XMLViewer from "react-xml-viewer";
import useXMLFileStore from "./store/useXMLFileStore";
import "../src/assets/style/xmlcontentstyle.css";
export default function XMLContent() {
  const { xmlContent } = useXMLFileStore();
  return (
    <div>
      <h1 className="title">Contenido del archivo XML</h1>
      <div className="codeContainer">
        <XMLViewer xml={xmlContent} />
      </div>
    </div>
  );
}

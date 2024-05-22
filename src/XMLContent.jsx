import XMLViewer from "react-xml-viewer";
import useXMLFileStore from "./store/useXMLFileStore";

export default function XMLContent({ xml }) {
  const { xmlContent } = useXMLFileStore();
  return (
    <div>
      <h1>Contenido del archivo XML</h1>
      <XMLViewer xml={xmlContent} />
    </div>
  );
}

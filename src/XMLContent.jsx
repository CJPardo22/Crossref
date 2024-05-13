import XMLViewer from "react-xml-viewer"

export default function XMLContent({xml}){
    return(
        <div>
            <h1>Contenido del archivo XML</h1>
            <XMLViewer xml={xml}/>
        </div>
    )
}
import {createContext, useContext, useState} from "react"

const XMLContent = createContext();

export const useXMLContext = () => useContext(XMLContent);

export const XMLProvider = ({children}) =>{
    const [xmlContent, setXmlContent] = useState(null)

    const handleFileLoaded = (content) => {
        setXmlContent(content)
        // console.log("🤪", content)
    }

    return (
        <XMLContent.Provider value ={{xmlContent, setXmlContent, handleFileLoaded}} >
            {children}
        </XMLContent.Provider>
    )
}
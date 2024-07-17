import { useNavigate } from "react-router-dom";
import useXMLFileStore from "./store/useXMLFileStore";
import Swal from "sweetalert2";

export default function FileUploader() {
  const { xmlContent, setXMLContent } = useXMLFileStore();
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const fileType = file.type;
      const fileExtension = file.name.split(".").pop().toLowerCase();
      if (fileExtension !== "xml") {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: "Solo se permiten archivos con extensión .xml",
        });
        return;
      }
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileContent = e.target.result;
        try {
          setXMLContent(fileContent);
          const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            },
          });
          Toast.fire({
            icon: "success",
            title: "Archivo Cargado Exitosamente",
          });
          navigate("/xml-text"); //Redirige al usuario a a la pagina /xml
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `Error al cargar XML: ${error.message}`,
          });
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <input
        accept=".xml"
        type="file"
        id="directoryInput"
        onChange={handleFileChange}
      />
      <p>Seleccione un archivo XML</p>
    </div>
  );
}

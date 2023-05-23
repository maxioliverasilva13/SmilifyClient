import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
const { default: storage } = require("firebaseConfig");
const { useState } = require("react");

const useUploadFile = () => {
  const [fileError, setFileError] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  const handleUpload = async (file: File) => {
    try {
        if (!file) {
            return null;
          }
          const storageRef = ref(
            storage,
            `/smilify/files/${file.type}/${Date.now() + file?.name}`
          ); // modificar esta línea para usar un nombre distinto para el archivo
          const uploadTask = uploadBytesResumable(storageRef, file);
          await uploadTask;
          const newUrl = await getDownloadURL(uploadTask.snapshot.ref);
          setFileUrl(newUrl);
          return newUrl;
    } catch (error) {
      setFileError("Error al submir archivo");
        return "";
    }
  };

  return {
    handleUpload,
    fileError,
    fileUrl,
  };
};

export default useUploadFile;
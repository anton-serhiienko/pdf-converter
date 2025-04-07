import { useState} from "react";

const usePdfConverter = (addNewHistory) => {
  const API_KEY = import.meta.env.VITE_API_KEY
  const API_URL = import.meta.env.VITE_API_URL

  const [loading, setLoading] = useState(false);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const blobToBase64 = (blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const convertTextToPDF = async (text) => {
    setLoading(true)
    try {
      const response = await fetch(`${API_URL}?apiKey=${API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({text: text}),
      });

      const blob = await response.blob();
      const base64 = await blobToBase64(blob)

      addNewHistory && addNewHistory(text, base64)
      return base64;
    } catch (e) {
      alert(`Failed to convert PDF: ${e}`);
      console.error('Error converting to PDF:', e);
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    convertTextToPDF,
    numPages,
    setPageNumber,
    pageNumber,
    onDocumentLoadSuccess
  }
}

export default usePdfConverter;
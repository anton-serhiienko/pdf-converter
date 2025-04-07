import './App.css'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css';
import {useState} from 'react'
import usePdfConverter from '../hooks/usePdfConverter.js'
import { Document, Page, pdfjs } from 'react-pdf';
import usePDFHistory from "../hooks/usePDFHistory.js";

pdfjs.GlobalWorkerOptions.workerSrc = 'https://unpkg.com/pdfjs-dist@4.8.69/build/pdf.worker.min.mjs';

function App() {
  const [inputValue, setInputValue] = useState('')
  const [activePDF, setActivePDF] = useState(null)
  const { history, addNewHistory } = usePDFHistory()

  const {
    loading,
    convertTextToPDF,
    pageNumber,
    setPageNumber,
    numPages,
    onDocumentLoadSuccess
  } = usePdfConverter(addNewHistory)

  const handleConvert = async () => {
    const url = await convertTextToPDF(inputValue)
    if (url) {
      setActivePDF(url)
      setInputValue('')
    }
  };

  const handleHistoryClick = (url) => {
    setActivePDF(url)
    setPageNumber(1)
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Text to PDF Converter</h1>

        <textarea
          className="w-full p-2 mb-4 border rounded resize-y"
          rows="4"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter your text here..."
        />

        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
          onClick={handleConvert}
          disabled={!inputValue || loading}
        >
          Convert to PDF
        </button>

        <div className="flex gap-4">
          <div className="w-1/3">
            <h2 className="text-lg font-semibold mb-2">History</h2>
            <div className="max-h-96 overflow-y-auto">
              {history.map(item => (
                <div
                  key={item.id}
                  className="p-2 mb-2 bg-white rounded cursor-pointer hover:bg-gray-100"
                  onClick={() => handleHistoryClick(item.data)}
                >
                  <p className="text-sm truncate">{item.text}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(item.date).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="w-2/3">
            {activePDF ? (
              <div className="pdf-viewer-wrapper">
                <Document
                  file={activePDF}
                  onLoadSuccess={onDocumentLoadSuccess}
                >
                  <Page pageNumber={pageNumber} />
                </Document>
                <div className="mt-2">
                  <p>
                    Page {pageNumber} of {numPages || '?'}
                  </p>
                  <button
                    className="mr-2 px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
                    onClick={() => setPageNumber(pageNumber - 1)}
                    disabled={pageNumber <= 1}
                  >
                    Previous
                  </button>
                  <button
                    className="px-2 py-1 bg-gray-200 rounded disabled:opacity-50"
                    onClick={() => setPageNumber(pageNumber + 1)}
                    disabled={pageNumber >= numPages}
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : (
              <p>No PDF to display</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App

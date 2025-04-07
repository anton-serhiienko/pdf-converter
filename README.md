## Overview

PDF Converter is a React-based web application that allows users to convert text into PDF files, preview them, and manage a history of conversions.

## Structure

`src/App.jsx`: Main component rendering the UI (text input, history, PDF preview).<br>
`src/hooks/usePdfConverter.js`: Custom hook for PDF conversion logic. <br>
`src/hooks/usePDFHistory.js`: Hook for managing PDF history. <br>
`src/App.css`: Styles using Tailwind CSS.
## Main Functionality

Text to PDF Conversion: Users input text, which is sent to an API (http://95.217.134.12:4010/create-pdf) and converted to a Base64-encoded PDF.
PDF Preview: Renders the PDF using react-pdf with page navigation.
History Management: Stores conversions in localStorage and displays them for reuse.
## Dependencies

react@19.1.0 <br>
react-pdf <br>
pdfjs-dist@4.8.69 <br>
## Tech Stack

React with Vite <br>
Tailwind CSS
## Usage

Users interact via a web interface: enter text, click "Convert to PDF," view the result, and browse past conversions in a history panel.
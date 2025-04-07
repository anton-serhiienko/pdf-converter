import {useEffect, useState} from "react";

const usePDFHistory = () => {
  const [history, setHistory] = useState([]);

  const addNewHistory = (text, data) => {
    const newHistoryItem = {
      id: Date.now(),
      text,
      data,
      date: new Date().toISOString(),
    }

    setHistory(prev => [...prev, newHistoryItem])
  }

  useEffect(() => {
    const savedHistory = localStorage.getItem('pdfHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  useEffect(() => {
    if (history && history.length) {
      localStorage.setItem('pdfHistory', JSON.stringify(history));
    }
  }, [history]);

  return {
    history,
    addNewHistory,
  }
}

export default usePDFHistory
import React, { useState, useEffect } from 'react';

function AnalysisPage() {
  const [charts, setCharts] = useState([]);

  const getCharts = async () => {
    try {
      const res = await fetch('/api/analysis');
      const body = await res.json();
      return body;
    } catch (error) {
      return error.message;
    }
  };

  useEffect(() => {
    const getData = async () => {
      const data = await getCharts();
      setCharts(data);
    };
    getData();
  }, []);

  return (
    <div className='AnalysisPage'>
      {charts.map(chart => (
        <div
          className='AnalysisCard'
          dangerouslySetInnerHTML={{ __html: chart }}
        />
      ))}
    </div>
  );
}

export default AnalysisPage;

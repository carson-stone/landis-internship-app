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
      <div className='AnalysisCard'>
        <h2>Chart Title</h2>
        <p>
          Et quis magna consectetur nulla id ad quis consequat irure do cillum
          nulla cillum. Nisi irure culpa amet sunt id velit anim. Fugiat veniam
          eiusmod dolore sit irure do cupidatat ullamco aliqua fugiat ex
          consequat. Non laborum minim cupidatat consequat laborum quis magna
          ullamco Lorem proident est sit amet.
        </p>
      </div>
      <div className='AnalysisCard'>
        <h2>Chart Title</h2>
        <p>
          Non do velit non dolor. Anim non quis anim nisi. Ullamco aliquip irure
          ad esse nostrud eiusmod esse eiusmod aliquip ad occaecat irure tempor.
        </p>
      </div>
    </div>
  );
}

export default AnalysisPage;

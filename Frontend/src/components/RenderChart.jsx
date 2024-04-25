import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const RenderChart = ({ data }) => {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    if (!data || !chartContainerRef.current) return;

    const myChart = echarts.init(chartContainerRef.current);

    const option = {
      xAxis: {
        type: 'category',
        axisLabel: {
          formatter: '{value}'
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value}'
        }
      },
      series: [{
        symbolSize: 20,
        data: data.map(player => player.ADJPIE),
        type: 'scatter'
      }]
    };

    myChart.setOption(option);

    // Cleanup function to dispose the chart when component unmounts
    return () => {
      myChart.dispose();
    };
  }, [data]);

  return <div ref={chartContainerRef} style={{ width: '100%', height: '400px' }} />;
};

export default RenderChart;

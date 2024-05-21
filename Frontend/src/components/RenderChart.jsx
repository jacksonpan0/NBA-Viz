import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const RenderChart = ({ data }) => {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    if (!data || !chartContainerRef.current) return;

    const myChart = echarts.init(chartContainerRef.current);

    const playerNames = data.map(player => player.PlayerName);
    const playerValues = data.map(player => player.ADJPIE);

    const option = {
      yAxis: {
        type: 'value',
        name: 'ADJPIE'
      },
      xAxis: {
        type: 'category',
        data: playerNames,
        name: 'Player Name',
        axisLabel: {
          interval: 0, // Show all labels
          rotate: 45, // Rotate labels for better visibility
        }
      },
      series: [{
        symbolSize: 10,
        data: data.map(player => [player.PlayerName, player.ADJPIE]),
        type: 'bar'
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

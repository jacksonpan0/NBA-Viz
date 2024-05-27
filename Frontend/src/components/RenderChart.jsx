import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const RenderChart = ({ data }) => {
  const chartContainerRef = useRef(null);

  useEffect(() => {
    if (!data || !chartContainerRef.current) return;

    const myChart = echarts.init(chartContainerRef.current);

    const playerNames = data.map(player => player.PlayerName);

    const option = {
      title: {
        text: 'Player Team Impact (PTI)',
        left: 'center',
        textStyle: {
          fontSize: 20,
          fontWeight: 'bold',
          color: '#E1DCDC',
        }
      },
      yAxis: {
        type: 'value',
        name: 'PTI',
        nameTextStyle: {
          fontSize: 14,
          fontWeight: 'bold',
        },
        axisLabel: {
          fontSize: 12,
          color: '#E1DCDC',
        }
      },
      xAxis: {
        type: 'category',
        data: playerNames,
        name: 'Player Name',
        nameTextStyle: {
          fontSize: 14,
          fontWeight: 'bold',
        },
        axisLabel: {
          interval: 'auto',
          rotate: 30,
          fontSize: 12,
          color: '#E1DCDC',
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

  return <div ref={chartContainerRef} style={{ width: '100%', height: '400px'}} />;
};

export default RenderChart;

import * as echarts from 'echarts';

// Using echart to render our scatter plot
const RenderChart = (data) => {
    const chartContainer = document.getElementById('chart-container');
    const myChart = echarts.init(chartContainer);
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
  };

export default RenderChart;

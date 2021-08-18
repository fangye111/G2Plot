import { Stock } from '@antv/g2plot';

fetch('https://gw.alipayobjects.com/os/antfincdn/qtQ9nYfYJe/stock-data.json')
  .then((data) => data.json())
  .then((data) => {
    const stockPlot = new Stock('container', {
      data,
      xField: 'trade_date',
      yField: ['open', 'close', 'high', 'low'],
      // 绿涨红跌
      fallingFill: '#ef5350',
      risingFill: '#26a69a',
    });

    stockPlot.render();
  });

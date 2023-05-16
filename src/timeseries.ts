import fs from 'fs';

type DataPoint = {
  timestamp: Date;
  connectedPlayers: number;
};

const dataPoints: DataPoint[] = [];
let currentPlayerCount = 0;

export const addDataPoint = () => {
  const dataPoint: DataPoint = {
    connectedPlayers: currentPlayerCount,
    timestamp: new Date(),
  };
  dataPoints.push(dataPoint);
};

export const trackConnectedPlayer = () => {
  currentPlayerCount++;
  addDataPoint();
};

export const trackDisconnectedPlayer = () => {
  currentPlayerCount--;
  addDataPoint();
};

export const writeDataPointsToCsv = () => {
  let csvContent = 'timestamp,connectedPlayers\n';

  for (const dataPoint of dataPoints) {
    // Write the timestamp the same way as AWS does
    const timestamp = dataPoint.timestamp
      .toISOString()
      .replace(/\-/gm, '/')
      .replace(/T/gm, ' ')
      .replace(/Z/gm, '')
      .replace(/\.\d{3}/gm, '');
    const connectedPlayers = dataPoint.connectedPlayers;
    csvContent += `${timestamp},${connectedPlayers}\n`;
  }

  const nowDateString = new Date().toISOString();
  const filename = 'snek-loadtest-timeseries-' + nowDateString + '.csv';

  const path = 'timeseries/';
  fs.writeFile(path + filename, csvContent, 'utf8', (err) => {
    if (err) {
      console.error('Error writing CSV file:', err);
    } else {
      console.log(`CSV file "${filename}" has been saved.`);
    }
  });
};

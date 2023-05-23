export type PlayerConfig = {
  connectDelay: number;
  disconnectDelay: number;
  name?: string;
};

const getMinutesAsMillis = (minutes: number): number => minutes * 60 * 1000;

export const firstSeriesPlayers: PlayerConfig[] = [
  { connectDelay: 1000, disconnectDelay: getMinutesAsMillis(10) },
  { connectDelay: 2000, disconnectDelay: getMinutesAsMillis(10) },
  { connectDelay: 3000, disconnectDelay: getMinutesAsMillis(10) },
  { connectDelay: 4000, disconnectDelay: getMinutesAsMillis(10) },
  { connectDelay: 5000, disconnectDelay: getMinutesAsMillis(10) },
  { connectDelay: 6000, disconnectDelay: getMinutesAsMillis(10) },
  { connectDelay: 7000, disconnectDelay: getMinutesAsMillis(10) },
  { connectDelay: 8000, disconnectDelay: getMinutesAsMillis(10) },
];

export const secondSeriesPlayers: PlayerConfig[] = [
  { connectDelay: 0, disconnectDelay: getMinutesAsMillis(20) },
  { connectDelay: 2000, disconnectDelay: getMinutesAsMillis(20) },
  { connectDelay: 4000, disconnectDelay: getMinutesAsMillis(20) },
  { connectDelay: 6000, disconnectDelay: getMinutesAsMillis(6) },
  { connectDelay: 8000, disconnectDelay: getMinutesAsMillis(6) },
  { connectDelay: 10000, disconnectDelay: getMinutesAsMillis(6) },
  { connectDelay: 12000, disconnectDelay: getMinutesAsMillis(6) },
  { connectDelay: 14000, disconnectDelay: getMinutesAsMillis(6) },

  {
    connectDelay: getMinutesAsMillis(4) + 1000,
    disconnectDelay: getMinutesAsMillis(12),
  },
];

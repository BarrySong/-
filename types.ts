export interface SeatData {
  id: string; // unique composite id: zoneId-seatIndex
  zoneId: number;
  seatIndex: number; // 0-3
  occupantName: string;
}

export interface ZoneData {
  id: number;
  row: number; // 0, 1, 2
  col: number; // 0 (left), 1 (right)
}

export type SeatMap = Record<string, SeatData>;
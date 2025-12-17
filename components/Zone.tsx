import React from 'react';
import { ZoneData, SeatMap } from '../types';
import { Seat } from './Seat';

interface ZoneProps {
  zone: ZoneData;
  seats: SeatMap;
  onSeatClick: (zoneId: number, seatIndex: number) => void;
}

export const Zone: React.FC<ZoneProps> = ({ zone, seats, onSeatClick }) => {
  const renderSeat = (index: number, isBottom: boolean) => {
    const seatId = `${zone.id}-${index}`;
    const seatData = seats[seatId] || {
      id: seatId,
      zoneId: zone.id,
      seatIndex: index,
      occupantName: '',
    };

    return (
      <Seat 
        key={index} 
        data={seatData} 
        onClick={() => onSeatClick(zone.id, index)} 
        className={isBottom ? 'bottom-seat' : 'top-seat'}
      />
    );
  };

  return (
    <div className="relative p-2">
      {/* Partition Walls */}
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-400 -translate-y-1/2 z-10"></div>
      <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-slate-400 -translate-x-1/2 z-10"></div>

      {/* 2x2 Grid of desks - Increased size from 160x100 to 240x160 */}
      <div className="grid grid-cols-2 gap-x-0.5 gap-y-0.5 w-[240px] h-[160px] bg-slate-200 border-2 border-slate-400 shadow-sm">
        {renderSeat(0, false)}
        {renderSeat(1, false)}
        {renderSeat(2, true)}
        {renderSeat(3, true)}
      </div>
      
      {/* Decor: Plants */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-1">
         <div className="w-3 h-3 rounded-full bg-white border border-slate-800 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-slate-400"></div>
         </div>
         <div className="w-2 h-2 rounded-full bg-white border border-slate-800 mt-1"></div>
      </div>
    </div>
  );
};
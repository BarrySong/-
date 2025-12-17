import React, { useState, useEffect } from 'react';
import { X, Trash2 } from 'lucide-react';
import { SeatData } from '../types';

interface EditSeatModalProps {
  seat: SeatData;
  isOpen: boolean;
  onClose: () => void;
  onSave: (seat: SeatData) => void;
}

export const EditSeatModal: React.FC<EditSeatModalProps> = ({ seat, isOpen, onClose, onSave }) => {
  const [name, setName] = useState(seat.occupantName);

  useEffect(() => {
    if (isOpen) {
      setName(seat.occupantName);
    }
  }, [isOpen, seat]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({
      ...seat,
      occupantName: name,
    });
    onClose();
  };
  
  const handleClear = () => {
      onSave({
          ...seat,
          occupantName: '',
      });
      onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-semibold text-slate-800">
            {seat.occupantName ? 'Edit Seat' : '请坐！！'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">你的名字</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="例如.Barry"
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all"
              autoFocus
            />
          </div>
        </div>

        <div className="bg-slate-50 px-6 py-4 flex justify-between items-center gap-3">
           <button 
            onClick={handleClear}
            className="text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
          >
            <Trash2 size={16} />
            这位置归我
          </button>
          
          <div className="flex gap-3">
             <button
                onClick={onClose}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition-colors"
            >
                我再想想
            </button>
            <button
                onClick={handleSave}
                disabled={!name && name === seat.occupantName}
                className="px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-sm font-medium shadow-md shadow-sky-200 transition-all disabled:opacity-50 disabled:shadow-none"
            >
                玛德，赶快保存
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
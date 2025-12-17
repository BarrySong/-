import React, { useState, useEffect } from 'react';
import { X, Sparkles, Loader2, Trash2 } from 'lucide-react';
import { SeatData } from '../types';
import { generateFunTitle } from '../services/geminiService';

interface EditSeatModalProps {
  seat: SeatData;
  isOpen: boolean;
  onClose: () => void;
  onSave: (seat: SeatData) => void;
}

export const EditSeatModal: React.FC<EditSeatModalProps> = ({ seat, isOpen, onClose, onSave }) => {
  const [name, setName] = useState(seat.occupantName);
  const [title, setTitle] = useState(seat.occupantTitle || '');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setName(seat.occupantName);
      setTitle(seat.occupantTitle || '');
    }
  }, [isOpen, seat]);

  if (!isOpen) return null;

  const handleGenerateTitle = async () => {
    if (!name) return;
    setIsGenerating(true);
    const newTitle = await generateFunTitle(name);
    setTitle(newTitle);
    setIsGenerating(false);
  };

  const handleSave = () => {
    onSave({
      ...seat,
      occupantName: name,
      occupantTitle: title,
    });
    onClose();
  };
  
  const handleClear = () => {
      onSave({
          ...seat,
          occupantName: '',
          occupantTitle: ''
      });
      onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-semibold text-slate-800">
            {seat.occupantName ? 'Edit Seat' : 'Claim Seat'}
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Your Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. John Doe"
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all"
              autoFocus
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-medium text-slate-700">Role / Fun Title (Optional)</label>
              <button
                onClick={handleGenerateTitle}
                disabled={!name || isGenerating}
                className="text-xs flex items-center gap-1 text-purple-600 hover:text-purple-700 disabled:opacity-50 font-medium transition-colors"
              >
                {isGenerating ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                Ask AI
              </button>
            </div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Chief Coffee Drinker"
              className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all"
            />
          </div>
        </div>

        <div className="bg-slate-50 px-6 py-4 flex justify-between items-center gap-3">
           <button 
            onClick={handleClear}
            className="text-red-500 hover:bg-red-50 px-3 py-2 rounded-lg text-sm font-medium flex items-center gap-2 transition-colors"
          >
            <Trash2 size={16} />
            Clear
          </button>
          
          <div className="flex gap-3">
             <button
                onClick={onClose}
                className="px-4 py-2 text-slate-600 hover:bg-slate-100 rounded-lg text-sm font-medium transition-colors"
            >
                Cancel
            </button>
            <button
                onClick={handleSave}
                disabled={!name && name === seat.occupantName}
                className="px-6 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg text-sm font-medium shadow-md shadow-sky-200 transition-all disabled:opacity-50 disabled:shadow-none"
            >
                Save Seat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
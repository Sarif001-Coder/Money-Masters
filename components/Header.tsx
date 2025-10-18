
import React from 'react';
import { EyeIcon } from './icons';

interface HeaderProps {
  netWorth: number;
  isViewHidden: boolean;
  onToggleView: () => void;
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
};

const Header: React.FC<HeaderProps> = ({ netWorth, isViewHidden, onToggleView }) => {
  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 mb-8 border border-white/20 shadow-lg">
      <div className="flex justify-between items-center mb-6 flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-3 text-white text-2xl font-bold">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-2xl">
          📊
          </div>
          <span>Money Masters</span>
        </div>
        <button 
            onClick={onToggleView}
            className="bg-white/20 py-2 px-4 rounded-xl text-white font-semibold transition-all hover:bg-white/30 hover:-translate-y-0.5 flex items-center gap-2"
        >
            <EyeIcon className="w-5 h-5"/>
            <span>Toggle View</span>
        </button>
      </div>
      <div className="text-center">
        <div className="text-white/90 text-sm font-medium uppercase tracking-wider mb-2">
          Total Net Worth
        </div>
        <div className="text-white text-4xl md:text-6xl font-bold transition-all">
          {isViewHidden ? '₹••••••••' : formatCurrency(netWorth)}
        </div>
      </div>
    </div>
  );
};

export default Header;

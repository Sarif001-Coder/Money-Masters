import React from 'react';
import { PortfolioItem } from '../types';
import PortfolioItemCard from './PortfolioItemCard';

interface PortfolioSectionProps {
  title: string;
  icon: React.ReactNode;
  items: PortfolioItem[];
  total: number;
  isViewHidden: boolean;
  colorClass: string;
  onItemClick?: (item: PortfolioItem) => void;
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
};

const PortfolioSection: React.FC<PortfolioSectionProps> = ({ title, icon, items, total, isViewHidden, colorClass, onItemClick }) => {
  return (
    <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
      <div className="flex justify-between items-center mb-6 pb-4 border-b-2 border-gray-100">
        <div className="flex items-center gap-3 text-xl font-bold text-gray-800">
          <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center text-white">
            {icon}
          </div>
          <span>{title}</span>
        </div>
        <div className={`text-2xl font-bold ${colorClass}`}>
          {isViewHidden ? '₹••••••' : formatCurrency(total)}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {items.map(item => (
          <PortfolioItemCard 
            key={item.id} 
            item={item} 
            isViewHidden={isViewHidden}
            onClick={item.subItems && item.subItems.length > 0 && onItemClick ? () => onItemClick(item) : undefined} 
          />
        ))}
      </div>
    </div>
  );
};

export default PortfolioSection;
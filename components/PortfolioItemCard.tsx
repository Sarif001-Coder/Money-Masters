import React from 'react';
import { PortfolioItem } from '../types';

interface PortfolioItemCardProps {
  item: PortfolioItem;
  isViewHidden: boolean;
  onClick?: () => void;
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
};

const PortfolioItemCard: React.FC<PortfolioItemCardProps> = ({ item, isViewHidden, onClick }) => {
  const hasSubItems = item.subItems && item.subItems.length > 0;

  return (
    <div 
        className={`group bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200 rounded-2xl p-5 transition-all relative overflow-hidden hover:-translate-y-1 hover:shadow-lg hover:border-blue-500 ${hasSubItems && onClick ? 'cursor-pointer' : ''}`}
        onClick={onClick}
    >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-2xl mb-4 text-white">
            {item.icon}
        </div>
        <div className="text-sm text-gray-500 mb-1 font-semibold">{item.name}</div>
        <div className="text-xl font-bold text-gray-800">
            {isViewHidden ? '₹••••••' : formatCurrency(item.amount)}
        </div>
        {hasSubItems && (
            <div className="absolute top-4 right-4 text-gray-400 group-hover:text-blue-500 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
              </svg>
            </div>
        )}
    </div>
  );
};

export default PortfolioItemCard;
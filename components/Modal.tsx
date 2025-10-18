import React, { useState, useEffect } from 'react';
import { PortfolioItem, ModalMode } from '../types';
import { PlusIcon, TrashIcon } from './icons';
import PortfolioItemCard from './PortfolioItemCard';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: ModalMode;
  items: PortfolioItem[];
  onSave: (item: Omit<PortfolioItem, 'id' | 'icon'>) => void;
  onDelete: (id: string) => void;
  viewingItem?: PortfolioItem | null;
}

const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(amount);
};

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, mode, items, onSave, onDelete, viewingItem }) => {
  const [itemName, setItemName] = useState('');
  const [itemAmount, setItemAmount] = useState('');

  useEffect(() => {
    if (isOpen) {
      setItemName('');
      setItemAmount('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSave = () => {
    const amount = parseFloat(itemAmount);
    if (itemName.trim() && !isNaN(amount) && amount >= 0) {
      onSave({ name: itemName.trim(), amount });
      setItemName('');
      setItemAmount('');
    }
  };

  const isViewMode = mode === 'view' && viewingItem;

  const title = isViewMode 
    ? viewingItem.name 
    : (mode === 'assets' ? 'Manage Assets' : 'Manage Liabilities');
    
  const description = isViewMode
    ? 'Breakdown of your holdings'
    : (mode === 'assets' ? 'Add or remove your assets' : 'Add or remove your liabilities');

  return (
    <div 
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-lg w-full p-8 md:p-10 shadow-2xl max-h-[90vh] flex flex-col animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-1">{title}</h2>
          <p className="text-gray-500">{description}</p>
        </div>

        {isViewMode ? (
          <>
            <div className="flex-grow overflow-y-auto mb-6">
              <div className="grid grid-cols-2 gap-4">
                {viewingItem.subItems?.map(subItem => (
                  <PortfolioItemCard 
                    key={subItem.id}
                    item={subItem}
                    isViewHidden={false}
                  />
                ))}
              </div>
            </div>
            <div className="mt-auto">
              <button onClick={onClose} className="w-full py-3 border-none rounded-xl text-base font-bold cursor-pointer transition-all bg-gray-200 text-gray-600 hover:bg-gray-300">Close</button>
            </div>
          </>
        ) : (
          <>
            <div className="flex-grow overflow-y-auto mb-6 pr-2 -mr-2">
              {items.map(item => (
                <div key={item.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl mb-3 transition-all hover:bg-gray-100">
                  <div className="flex-1">
                    <div className="font-semibold text-gray-800 mb-0.5">{item.icon} {item.name}</div>
                    <div className="text-lg font-bold text-blue-600">{formatCurrency(item.amount)}</div>
                  </div>
                  <button 
                    onClick={() => onDelete(item.id)}
                    className="bg-red-100 text-red-500 p-2 rounded-lg cursor-pointer flex items-center justify-center transition-all hover:bg-red-200 hover:scale-110"
                  >
                    <TrashIcon className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-auto">
              <div className="mb-4">
                <label htmlFor="itemName" className="block font-semibold mb-2 text-gray-800 text-sm">Name</label>
                <input 
                  type="text" 
                  id="itemName" 
                  placeholder="e.g., Savings Account" 
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl text-base transition-all bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="itemAmount" className="block font-semibold mb-2 text-gray-800 text-sm">Amount (₹)</label>
                <input 
                  type="number" 
                  id="itemAmount" 
                  placeholder="0.00" 
                  value={itemAmount}
                  onChange={(e) => setItemAmount(e.target.value)}
                  className="w-full p-3 border-2 border-gray-200 rounded-xl text-base transition-all bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white focus:ring-4 focus:ring-blue-600/10"
                />
              </div>
              <div className="flex gap-4">
                <button onClick={onClose} className="flex-1 py-3 border-none rounded-xl text-base font-bold cursor-pointer transition-all bg-gray-200 text-gray-600 hover:bg-gray-300">Cancel</button>
                <button onClick={handleSave} className="flex-1 py-3 border-none rounded-xl text-base font-bold cursor-pointer transition-all bg-gradient-to-br from-blue-500 to-cyan-500 text-white hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/40">Save</button>
              </div>
            </div>
          </>
        )}
      </div>
       <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out forwards; }
        .animate-slideUp { animation: slideUp 0.3s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default Modal;
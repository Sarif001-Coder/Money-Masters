import React, { useState, useEffect } from 'react';
import { PlusIcon, ChartBarIcon, ChartPieIcon } from './icons';

interface FABProps {
  onAddAsset: () => void;
  onAddLiability: () => void;
  isVisible: boolean;
}

const FAB: React.FC<FABProps> = ({ onAddAsset, onAddLiability, isVisible }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isVisible) {
      setIsOpen(false);
    }
  }, [isVisible]);

  const handleToggle = () => {
    if (isVisible) {
      setIsOpen(!isOpen);
    }
  };

  const handleActionClick = (action: () => void) => {
    action();
    setIsOpen(false);
  };

  const actionButtonClasses = "w-full flex items-center gap-3 text-left px-4 py-3 rounded-lg text-sm font-semibold transition-all duration-200 text-white hover:bg-white/20";

  return (
    <>
      {/* Semi-transparent overlay with a slight blur */}
      {isOpen && <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40" onClick={handleToggle} />}
      
      <div className={`fab-container fixed z-50 flex flex-col items-end gap-4 transition-all duration-500 ease-[cubic-bezier(0.18,0.89,0.32,1.28)] ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-24 pointer-events-none'}`}>
        <div
          className={`transition-all duration-300 ease-in-out transform ${
            isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
          }`}
        >
          {/* Menu box with glassmorphism effect */}
          <div className="bg-white/20 backdrop-blur-md border border-white/30 rounded-2xl shadow-lg w-48 p-2 flex flex-col gap-1">
             <button
              onClick={() => handleActionClick(onAddAsset)}
              className={actionButtonClasses}
            >
              <ChartBarIcon className="w-5 h-5" />
              Add Asset
            </button>
            <button
              onClick={() => handleActionClick(onAddLiability)}
              className={actionButtonClasses}
            >
              <ChartPieIcon className="w-5 h-5" />
              Add Liability
            </button>
          </div>
        </div>
        
        {/* Main FAB with a solid color to match screenshot */}
        <button
          onClick={handleToggle}
          className="w-16 h-16 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg transform transition-all duration-200 focus:outline-none hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/40 hover:-translate-y-1"
          aria-label="Add new item"
        >
          <PlusIcon className={`w-8 h-8 transition-transform duration-300 ${isOpen ? 'rotate-45' : 'rotate-0'}`} />
        </button>
      </div>

      <style>{`
        .fab-container {
          /* Mobile-first positioning with safe area. 1rem = right-4, bottom-4 */
          right: calc(1rem + env(safe-area-inset-right, 0px));
          bottom: calc(1rem + env(safe-area-inset-bottom, 0px));
        }
        @media (min-width: 768px) {
          /* Desktop positioning. 2rem = md:right-8, md:bottom-8 */
          .fab-container {
            right: calc(2rem + env(safe-area-inset-right, 0px));
            bottom: calc(2rem + env(safe-area-inset-bottom, 0px));
          }
        }
      `}</style>
    </>
  );
};

export default FAB;
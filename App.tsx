import React, { useState, useMemo, useEffect, useRef } from 'react';
import { PortfolioItem, ModalMode, ToastState } from './types';
import { INITIAL_ASSETS, INITIAL_LIABILITIES, ICONS } from './constants';
import Header from './components/Header';
import PortfolioSection from './components/PortfolioSection';
import Modal from './components/Modal';
import Toast from './components/Toast';
import FAB from './components/FAB';
import { ChartBarIcon, ChartPieIcon } from './components/icons';

const App: React.FC = () => {
  const [assets, setAssets] = useState<PortfolioItem[]>(INITIAL_ASSETS);
  const [liabilities, setLiabilities] = useState<PortfolioItem[]>(INITIAL_LIABILITIES);
  const [isViewHidden, setIsViewHidden] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [toast, setToast] = useState<ToastState>({ message: '', type: 'info', isVisible: false });
  const [viewingItem, setViewingItem] = useState<PortfolioItem | null>(null);
  const [isFabVisible, setIsFabVisible] = useState(true);

  const scrollTimeout = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      // Hide the button as soon as scrolling starts
      setIsFabVisible(false);
      
      // Clear the previous timeout to reset the timer
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }

      // Set a new timeout to show the button after scrolling has stopped
      scrollTimeout.current = window.setTimeout(() => {
        setIsFabVisible(true);
      }, 250); // Button reappears 250ms after the last scroll event
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Cleanup listener and timeout on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, []);

  const totalAssets = useMemo(() => assets.reduce((sum, item) => sum + item.amount, 0), [assets]);
  const totalLiabilities = useMemo(() => liabilities.reduce((sum, item) => sum + item.amount, 0), [liabilities]);
  const netWorth = useMemo(() => totalAssets - totalLiabilities, [totalAssets, totalLiabilities]);

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type, isVisible: true });
  };

  const handleSaveItem = (item: Omit<PortfolioItem, 'id' | 'icon'>) => {
    const newItem: PortfolioItem = {
      ...item,
      id: Date.now().toString(),
      icon: ICONS[Math.floor(Math.random() * ICONS.length)],
    };

    if (modalMode === 'assets') {
      setAssets(prev => [...prev, newItem]);
      showToast('Asset added successfully!');
    } else if (modalMode === 'liabilities') {
      setLiabilities(prev => [...prev, newItem]);
      showToast('Liability added successfully!');
    }
  };

  const handleDeleteItem = (id: string) => {
    if (modalMode === 'assets') {
      setAssets(prev => prev.filter(item => item.id !== id));
      showToast('Asset removed.', 'info');
    } else if (modalMode === 'liabilities') {
      setLiabilities(prev => prev.filter(item => item.id !== id));
      showToast('Liability removed.', 'info');
    }
  };

  const handleItemClick = (item: PortfolioItem) => {
    setViewingItem(item);
    setModalMode('view');
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-blue-950 min-h-screen p-4 font-sans text-gray-200">
      <div className="max-w-7xl mx-auto">
        <Header 
          netWorth={netWorth}
          isViewHidden={isViewHidden}
          onToggleView={() => setIsViewHidden(!isViewHidden)}
        />
        
        <main 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          style={{ paddingBottom: 'calc(6rem + env(safe-area-inset-bottom, 0px))' }} // 6rem = pb-24
        >
          <PortfolioSection 
            title="My Assets"
            icon={<ChartBarIcon className="w-5 h-5"/>}
            items={assets}
            total={totalAssets}
            isViewHidden={isViewHidden}
            onItemClick={handleItemClick}
            colorClass="text-emerald-500"
          />
          <PortfolioSection 
            title="My Liabilities"
            icon={<ChartPieIcon className="w-5 h-5"/>}
            items={liabilities}
            total={totalLiabilities}
            isViewHidden={isViewHidden}
            colorClass="text-red-500"
          />
        </main>
      </div>

      <Modal 
        isOpen={!!modalMode}
        onClose={() => { setModalMode(null); setViewingItem(null); }}
        mode={modalMode}
        items={modalMode === 'assets' ? assets : liabilities}
        onSave={handleSaveItem}
        onDelete={handleDeleteItem}
        viewingItem={viewingItem}
      />
      
      <Toast 
        toast={toast}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
      />

      <FAB
        onAddAsset={() => setModalMode('assets')}
        onAddLiability={() => setModalMode('liabilities')}
        isVisible={isFabVisible}
      />
    </div>
  );
};

export default App;
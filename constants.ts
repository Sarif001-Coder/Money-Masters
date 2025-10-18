import { PortfolioItem } from './types';

export const INITIAL_ASSETS: PortfolioItem[] = [
    { id: 'a1', name: 'Stocks', amount: 46230, icon: '📊' },
    { id: 'a2', name: 'Mutual Funds', amount: 66960, icon: '📈' },
    { id: 'a4', name: 'PPF', amount: 30000, icon: '💰' },
    { 
        id: 'a7', 
        name: 'Commodities', 
        amount: 18610, 
        icon: '📦',
        subItems: [
            { id: 'a5', name: 'Gold', amount: 12840, icon: '🪙' },
            { id: 'a6', name: 'Silver', amount: 5770, icon: '⚪' }
        ]
    }
];

export const INITIAL_LIABILITIES: PortfolioItem[] = [
    { id: 'l1', name: 'Home Loan', amount: 50000, icon: '🏠' },
    { id: 'l2', name: 'Car Loan', amount: 15000, icon: '🚗' },
    { id: 'l3', name: 'Credit Card', amount: 8000, icon: '💳' }
];

export const ICONS: string[] = ['💎', '💰', '🏦', '📊', '📈', '💳', '🏠', '🚗', '🪙', '⚪', '💵', '🏢', '🎓', '📱', '📦'];
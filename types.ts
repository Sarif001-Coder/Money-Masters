export interface PortfolioItem {
  id: string;
  name: string;
  amount: number;
  icon: string;
  subItems?: PortfolioItem[];
}

export type ModalMode = 'assets' | 'liabilities' | 'view' | null;

export interface ToastState {
  message: string;
  type: 'success' | 'error' | 'info';
  isVisible: boolean;
}
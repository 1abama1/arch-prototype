import React, { useState } from 'react';
import { useAppRoute } from './hooks/useAppRoute';
import { CartProvider, useCart } from './context/CartContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { MenuPage } from './pages/MenuPage';
import { QrPage } from './pages/QrPage';
import { OrdersPage } from './pages/OrdersPage';
import { TableSelectPage } from './pages/TableSelectPage';
import { CartDrawer } from './components/cart/CartDrawer';
import { FloatingCartBar } from './components/cart/FloatingCartBar';
import { CheckoutModal } from './components/cart/CheckoutModal';

/**
 * Main application content with access to CartContext
 */
const AppContent: React.FC = () => {
  const {
    view,
    tableId,
    tableConfig,
    isInvalidTable,
    goToTable,
    goToView,
    goToMenu,
  } = useAppRoute();

  const { openCart, closeCart } = useCart();
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleProceedToCheckout = () => {
    closeCart();
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-cream-100 text-stone-900 font-sans">
      {/* Global Navigation Header */}
      <Header
        tableConfig={tableConfig}
        onOpenCart={openCart}
        onNavigateView={goToView}
        onNavigateMenu={() => (tableId ? goToMenu(tableId) : goToView('table-select'))}
        currentView={view}
      />

      {/* Main View Switcher */}
      <main className="flex-1">
        {view === 'qr' && (
          <QrPage
            onOpenTable={goToTable}
            onBackToMenu={() => (tableId ? goToMenu(tableId) : goToView('table-select'))}
          />
        )}

        {view === 'orders' && (
          <OrdersPage
            onBackToMenu={() => (tableId ? goToMenu(tableId) : goToView('table-select'))}
            onOpenTable={goToTable}
          />
        )}

        {view === 'table-select' && (
          <TableSelectPage
            isInvalidTable={isInvalidTable}
            onSelectTable={goToTable}
            onOpenQrGenerator={() => goToView('qr')}
          />
        )}

        {view === 'menu' && tableConfig && (
          <MenuPage
            tableConfig={tableConfig}
            onSelectTable={goToTable}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigateView={goToView}
        onSelectTable={goToTable}
      />

      {/* Cart Drawer */}
      <CartDrawer
        tableConfig={tableConfig}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Floating Cart Button for mobile */}
      <FloatingCartBar />

      {/* Checkout Modal */}
      {tableConfig && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={() => setIsCheckoutOpen(false)}
          tableConfig={tableConfig}
          onViewOrders={() => goToView('orders')}
        />
      )}
    </div>
  );
};

/**
 * Root App component providing Cart context scoped by current table
 */
export default function App() {
  const { tableId } = useAppRoute();

  return (
    <CartProvider currentTableId={tableId}>
      <AppContent />
    </CartProvider>
  );
}

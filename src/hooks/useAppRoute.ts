import { useState, useEffect, useCallback, useMemo } from 'react';
import { getTableById } from '../data/tables';
import { TableConfig } from '../types';

export type AppView = 'menu' | 'qr' | 'orders' | 'table-select';

export interface AppRouteState {
  view: AppView;
  tableId: number | null;
  tableConfig: TableConfig | undefined;
  isInvalidTable: boolean;
  goToTable: (tableId: number) => void;
  goToView: (view: 'qr' | 'orders' | 'table-select') => void;
  goToMenu: (tableId?: number) => void;
}

export const useAppRoute = (): AppRouteState => {
  const [search, setSearch] = useState(() => window.location.search);

  useEffect(() => {
    const handlePopState = () => {
      setSearch(window.location.search);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const parsed = useMemo(() => {
    const params = new URLSearchParams(search);
    const viewParam = params.get('view')?.toLowerCase();
    const tableParam = params.get('table');

    let tableId: number | null = null;
    let isInvalidTable = false;

    if (tableParam !== null) {
      const parsedId = parseInt(tableParam, 10);
      if (!isNaN(parsedId) && parsedId >= 1 && parsedId <= 6) {
        tableId = parsedId;
      } else {
        isInvalidTable = true;
      }
    }

    // Determine view priority:
    // 1. Explicit ?view=qr
    // 2. Explicit ?view=orders
    // 3. If invalid table or no table specified and no valid view -> table-select
    // 4. Otherwise, menu view for that table
    let activeView: AppView = 'menu';

    if (viewParam === 'qr') {
      activeView = 'qr';
    } else if (viewParam === 'orders') {
      activeView = 'orders';
    } else if (tableId !== null && !isInvalidTable) {
      activeView = 'menu';
    } else {
      activeView = 'table-select';
    }

    const tableConfig = tableId !== null ? getTableById(tableId) : undefined;

    return {
      view: activeView,
      tableId,
      tableConfig,
      isInvalidTable,
    };
  }, [search]);

  const updateUrl = useCallback((newParams: URLSearchParams) => {
    const newSearch = newParams.toString();
    const pathname = window.location.pathname;
    const newUrl = newSearch ? `${pathname}?${newSearch}` : pathname;
    window.history.pushState({}, '', newUrl);
    setSearch(window.location.search);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const goToTable = useCallback(
    (tableId: number) => {
      const params = new URLSearchParams();
      params.set('table', tableId.toString());
      updateUrl(params);
    },
    [updateUrl]
  );

  const goToView = useCallback(
    (view: 'qr' | 'orders' | 'table-select') => {
      const params = new URLSearchParams();
      if (view === 'table-select') {
        // clear parameters to show table selector
        updateUrl(params);
        return;
      }
      params.set('view', view);
      // If a table is already selected, keep it as context
      if (parsed.tableId) {
        params.set('table', parsed.tableId.toString());
      }
      updateUrl(params);
    },
    [parsed.tableId, updateUrl]
  );

  const goToMenu = useCallback(
    (targetTableId?: number) => {
      const id = targetTableId || parsed.tableId || 1;
      const params = new URLSearchParams();
      params.set('table', id.toString());
      updateUrl(params);
    },
    [parsed.tableId, updateUrl]
  );

  return {
    view: parsed.view,
    tableId: parsed.tableId,
    tableConfig: parsed.tableConfig,
    isInvalidTable: parsed.isInvalidTable,
    goToTable,
    goToView,
    goToMenu,
  };
};

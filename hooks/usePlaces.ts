import { db } from '@/db';
import { useEffect, useState } from 'react';

const PAGE_SIZE = 30;

function loadPage(page: number) {
  if (!db) return [];

  return db.getAllSync(
    `
    SELECT *
    FROM places
    ORDER BY id ASC
    LIMIT ? OFFSET ?
    `,
    [PAGE_SIZE, page * PAGE_SIZE]
  );
}


export function usePlaces() {
  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadMore();
  }, []);

  function loadMore() {
    if (loading) return;

    setLoading(true);
    const rows = loadPage(page);

    if (rows.length > 0) {
      setItems(prev => [...prev, ...rows]);
      setPage(prev => prev + 1);
    }

    setLoading(false);
  }

  return { items, loadMore, loading };
}

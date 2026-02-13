"use client";

import { useEffect, useMemo, useState } from "react";
import { Lead } from "./types";
import { fetchLeadsApi, updateLeadApi, deleteLeadApi } from "./api";

export function useLeads() {
  const [page, setPage] = useState(0);
  const [pageSize] = useState(3);
  const [data, setData] = useState<Lead[]>([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [draftNotes, setDraftNotes] = useState<Record<number, string>>({});
  const [savingIds, setSavingIds] = useState<Set<number>>(new Set());
  const [deletingIds, setDeletingIds] = useState<Set<number>>(new Set());

  const fetchLeads = async () => {
    setLoading(true);
    setError(null);
    try {
      const json = await fetchLeadsApi(page, pageSize);
      setData(json.data);
      setTotalPages(json.totalPages);
      setTotalElements(json.totalElements);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [page]);

  const toggleContacted = async (row: Lead) => {
    setSavingIds((s) => new Set(s).add(row.id));

    setData((prev) =>
      prev.map((d) =>
        d.id === row.id ? { ...d, isContacted: !d.isContacted } : d,
      ),
    );

    try {
      await updateLeadApi(row.id, { isContacted: !row.isContacted });
    } catch {
      setData((prev) =>
        prev.map((d) =>
          d.id === row.id ? { ...d, isContacted: row.isContacted } : d,
        ),
      );
    } finally {
      setSavingIds((s) => {
        const n = new Set(s);
        n.delete(row.id);
        return n;
      });
    }
  };

  const saveNotes = async (row: Lead) => {
    const next = (draftNotes[row.id] ?? row.notes ?? "").trim();
    setSavingIds((s) => new Set(s).add(row.id));

    try {
      await updateLeadApi(row.id, { notes: next });
      setData((prev) =>
        prev.map((d) => (d.id === row.id ? { ...d, notes: next } : d)),
      );
    } finally {
      setSavingIds((s) => {
        const n = new Set(s);
        n.delete(row.id);
        return n;
      });
    }
  };

  const deleteLead = async (row: Lead) => {
    const backup = data;

    setDeletingIds((s) => new Set(s).add(row.id));

    // 낙관적 제거
    setData((prev) => prev.filter((d) => d.id !== row.id));
    setTotalElements((prev) => prev - 1);

    try {
      await deleteLeadApi(row.id);

      // 현재 페이지에 데이터가 0개 남으면 이전 페이지로
      if (data.length === 1 && page > 0) {
        setPage((p) => p - 1);
      }
    } catch {
      // 롤백
      setData(backup);
      setTotalElements((prev) => prev + 1);
    } finally {
      setDeletingIds((s) => {
        const n = new Set(s);
        n.delete(row.id);
        return n;
      });
    }
  };

  const showingFrom = useMemo(() => page * pageSize + 1, [page, pageSize]);
  const showingTo = useMemo(
    () => page * pageSize + data.length,
    [page, pageSize, data.length],
  );

  return {
    data,
    page,
    totalPages,
    totalElements,
    loading,
    error,
    savingIds,
    deletingIds,
    draftNotes,
    setDraftNotes,
    setPage,
    fetchLeads,
    toggleContacted,
    saveNotes,
    deleteLeadAction: deleteLead,
    showingFrom,
    showingTo,
  };
}

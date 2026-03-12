import { useState, useEffect } from 'react';
import { supabase } from './supabase';
import { mockGrants } from '@/app/data/mockData';
import type { Grant } from '@/app/data/mockData';

function parseDeadline(deadline: string | null): string {
  if (!deadline) return '2099-12-31';
  const d = deadline.replace(/\./g, '-').trim();
  return d.length >= 10 ? d.slice(0, 10) : '2099-12-31';
}

function getDDay(deadline: string): number {
  const [y, m, d] = deadline.split('-').map(Number);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const end = new Date(y, (m || 1) - 1, d || 1);
  end.setHours(0, 0, 0, 0);
  const diff = Math.ceil((end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  return Math.max(0, diff);
}

function parseAmount(str: string | null): number {
  if (!str || typeof str !== 'string') return 0;
  const match = str.match(/(\d+)\s*억/);
  if (match) return parseInt(match[1], 10) * 100000000;
  const manMatch = str.match(/(\d+)\s*천?\s*만?/);
  if (manMatch) return parseInt(manMatch[1], 10) * 10000000;
  return 0;
}

/** Supabase grants 행 → Grant 인터페이스 변환 */
function rowToGrant(row: Record<string, unknown>): Grant {
  const deadline = parseDeadline(row.deadline as string);
  const maxAmount = (row.max_amount as string) || '0원';
  return {
    id: (row.id as string) || crypto.randomUUID(),
    title: (row.title as string) || '',
    organization: (row.organization as string) || '',
    category: (row.category as string) || '기타',
    deadline,
    dDay: getDDay(deadline),
    maxAmount,
    maxAmountNum: parseAmount(maxAmount),
    matchRate: 75,
    matchReasons: [(row.category as string) || '지원 가능'],
    status: ((row.status as string) || 'open') as 'open' | 'closing' | 'closed',
    description: (row.description as string) || '',
    eligibility: [],
    benefits: [],
    requiredDocs: [],
    timeline: [],
    scraped: true,
  };
}

/** Supabase + mock 데이터 병합 (크롤 데이터 + 상세 mock) */
export function useGrants() {
  const [grants, setGrants] = useState<Grant[]>(mockGrants);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const { data, error } = await supabase.from('grants').select('*').order('deadline', { ascending: true });
        if (error) throw error;
        if (mounted && data && data.length > 0) {
          const fromSupabase = data.map(rowToGrant);
          const mockIds = new Set(mockGrants.map((g) => g.id));
          const supabaseIds = new Set(fromSupabase.map((g) => g.id));
          const newFromSupabase = fromSupabase.filter((g) => !mockIds.has(g.id));
          const merged = [...mockGrants, ...newFromSupabase];
          setGrants(merged);
        }
      } catch {
        setGrants(mockGrants);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return { grants, loading };
}

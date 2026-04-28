"use client";
import { useCallback, useEffect, useState } from "react";

type AuthLog = {
  id: number;
  email: string | null;
  success: 0 | 1;
  reason: string;
  ip: string | null;
  country: string | null;
  user_agent: string | null;
  timestamp: number;
};

type Props = {
  apiUrl: string;
  token: string;
  onClose: () => void;
};

const PAGE_SIZE = 50;

const reasonLabel: Record<string, string> = {
  ok: "Başarılı",
  wrong_password: "Yanlış şifre",
  user_not_found: "Kullanıcı yok",
  missing_fields: "Eksik alan",
  error: "Hata",
};

const reasonClass = (success: number, reason: string): string => {
  if (success === 1) return "bg-green-100 text-green-700 border-green-200";
  if (reason === "wrong_password") return "bg-red-100 text-red-700 border-red-200";
  if (reason === "user_not_found") return "bg-orange-100 text-orange-700 border-orange-200";
  return "bg-gray-100 text-gray-700 border-gray-200";
};

const formatTime = (ms: number): string => {
  try {
    return new Date(ms).toLocaleString("tr-TR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  } catch {
    return String(ms);
  }
};

export default function AuthLogsPanel({ apiUrl, token, onClose }: Props) {
  const [logs, setLogs] = useState<AuthLog[]>([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [emailFilter, setEmailFilter] = useState("");
  const [successFilter, setSuccessFilter] = useState<"all" | "1" | "0">("all");

  const fetchLogs = useCallback(
    async (nextOffset: number) => {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      params.set("limit", String(PAGE_SIZE));
      params.set("offset", String(nextOffset));
      if (successFilter !== "all") params.set("success", successFilter);
      if (emailFilter.trim()) params.set("email", emailFilter.trim());
      try {
        const response = await fetch(`${apiUrl}/api/auth/logs?${params.toString()}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) {
          if (response.status === 401) {
            setError("Oturum süresi dolmuş olabilir. Lütfen yeniden giriş yapın.");
          } else {
            setError("Loglar alınamadı.");
          }
          setLogs([]);
          setTotal(0);
          return;
        }
        const data = (await response.json()) as { logs: AuthLog[]; total: number };
        setLogs(data.logs);
        setTotal(data.total);
        setOffset(nextOffset);
      } catch {
        setError("Sunucuya ulaşılamadı.");
        setLogs([]);
        setTotal(0);
      } finally {
        setLoading(false);
      }
    },
    [apiUrl, token, successFilter, emailFilter]
  );

  useEffect(() => {
    fetchLogs(0);
  }, [fetchLogs]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const page = Math.floor(offset / PAGE_SIZE) + 1;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const canPrev = offset > 0 && !loading;
  const canNext = offset + PAGE_SIZE < total && !loading;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-2 sm:px-4 py-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-6xl max-h-[90vh] overflow-hidden bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-4 sm:px-6 py-4 border-b border-gray-100 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-bold text-gray-900">Giriş Kayıtları</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Toplam <span className="font-semibold text-gray-700">{total}</span> kayıt — sayfa {page}/{totalPages}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
            aria-label="Kapat"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-4 sm:px-6 py-3 border-b border-gray-100 flex flex-wrap items-center gap-2 bg-gray-50">
          <input
            type="text"
            value={emailFilter}
            onChange={(e) => setEmailFilter(e.target.value)}
            placeholder="E-posta filtrele"
            className="px-3 py-1.5 text-sm rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={successFilter}
            onChange={(e) => setSuccessFilter(e.target.value as "all" | "1" | "0")}
            className="px-3 py-1.5 text-sm rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Tümü</option>
            <option value="1">Sadece başarılı</option>
            <option value="0">Sadece başarısız</option>
          </select>
          <button
            onClick={() => fetchLogs(0)}
            disabled={loading}
            className="px-3 py-1.5 text-sm rounded-md bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:opacity-60"
          >
            {loading ? "Yükleniyor…" : "Yenile"}
          </button>
          {(emailFilter || successFilter !== "all") && (
            <button
              onClick={() => {
                setEmailFilter("");
                setSuccessFilter("all");
              }}
              className="px-3 py-1.5 text-sm rounded-md bg-white border border-gray-300 text-gray-600 hover:bg-gray-100"
            >
              Filtreleri temizle
            </button>
          )}
        </div>

        <div className="flex-1 overflow-auto">
          {error && (
            <div className="m-4 px-4 py-3 rounded-md bg-red-50 border border-red-200 text-sm text-red-700">
              {error}
            </div>
          )}
          {!error && logs.length === 0 && !loading && (
            <div className="p-12 text-center text-sm text-gray-500">Kayıt bulunamadı.</div>
          )}
          {logs.length > 0 && (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 sticky top-0">
                <tr className="text-left text-xs uppercase tracking-wide text-gray-500">
                  <th className="px-4 py-2 font-semibold">Zaman</th>
                  <th className="px-4 py-2 font-semibold">E-posta</th>
                  <th className="px-4 py-2 font-semibold">Sonuç</th>
                  <th className="px-4 py-2 font-semibold">IP</th>
                  <th className="px-4 py-2 font-semibold">Ülke</th>
                  <th className="px-4 py-2 font-semibold">User-Agent</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-4 py-2 text-gray-700 whitespace-nowrap font-mono text-xs">
                      {formatTime(log.timestamp)}
                    </td>
                    <td className="px-4 py-2 text-gray-900">
                      {log.email || <span className="text-gray-400 italic">—</span>}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border ${reasonClass(log.success, log.reason)}`}
                      >
                        {reasonLabel[log.reason] || log.reason}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-gray-600 font-mono text-xs">
                      {log.ip || <span className="text-gray-400">—</span>}
                    </td>
                    <td className="px-4 py-2 text-gray-700">
                      {log.country || <span className="text-gray-400">—</span>}
                    </td>
                    <td className="px-4 py-2 text-gray-500 text-xs max-w-xs truncate" title={log.user_agent || ""}>
                      {log.user_agent || <span className="text-gray-400">—</span>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        <div className="px-4 sm:px-6 py-3 border-t border-gray-100 flex items-center justify-between bg-gray-50">
          <span className="text-xs text-gray-500">
            {logs.length > 0
              ? `${offset + 1}–${offset + logs.length} / ${total}`
              : "—"}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => fetchLogs(Math.max(0, offset - PAGE_SIZE))}
              disabled={!canPrev}
              className="px-3 py-1.5 text-sm rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              ← Önceki
            </button>
            <button
              onClick={() => fetchLogs(offset + PAGE_SIZE)}
              disabled={!canNext}
              className="px-3 py-1.5 text-sm rounded-md bg-white border border-gray-300 text-gray-700 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Sonraki →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

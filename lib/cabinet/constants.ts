/** Услуги и их состояния — общий словарь для кабинета клиента и служебной части. */

export const SERVICE_KINDS = [
  "registration",
  "legal_address",
  "accounting",
  "itpark",
  "seller",
  "business_plan",
  "other",
] as const;

export type ServiceKind = (typeof SERVICE_KINDS)[number];

export const SERVICE_STATUSES = ["new", "documents", "submitted", "done", "cancelled"] as const;

export type ServiceStatus = (typeof SERVICE_STATUSES)[number];

/** Цвет плашки статуса: от нейтрального в начале до зелёного в конце. */
export const STATUS_STYLES: Record<ServiceStatus, string> = {
  new: "bg-muted text-muted-foreground",
  documents: "bg-amber-50 text-amber-700 border border-amber-200",
  submitted: "bg-blue-50 text-blue-700 border border-blue-200",
  done: "bg-brand-50 text-brand-700 border border-brand-200",
  cancelled: "bg-muted text-muted-foreground line-through",
};

export const BUCKET = "cabinet-documents";

/** Больше 20 МБ хранилище не примет. */
export const MAX_FILE_BYTES = 20 * 1024 * 1024;

export interface DocumentRow {
  id: string;
  title: string;
  storage_path: string;
  mime_type: string | null;
  size_bytes: number | null;
  uploaded_by: "client" | "manager";
  uploaded_by_email: string | null;
  created_at: string;
}

export interface ServiceRow {
  id: string;
  kind: ServiceKind;
  title: string | null;
  status: ServiceStatus;
  note: string | null;
  amount: number | null;
  created_at: string;
  updated_at: string;
}

export interface ServiceEventRow {
  id: string;
  service_id: string;
  status: ServiceStatus;
  comment: string | null;
  author_email: string | null;
  created_at: string;
}

/** «1,4 МБ» вместо «1468006». Единицы — на языке страницы. */
export function formatSize(bytes: number | null, locale = "ru"): string {
  if (!bytes) return "";
  const cyrillic = locale === "ru" || locale === "kk";
  const units = cyrillic ? ["Б", "КБ", "МБ"] : ["B", "KB", "MB"];
  if (bytes < 1024) return `${bytes} ${units[0]}`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} ${units[1]}`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} ${units[2]}`;
}

/** Дата в виде «24.08.2026» — без времени, оно тут не нужно. */
export function formatDate(value: string, locale: string): string {
  return new Date(value).toLocaleDateString(locale === "en" ? "en-GB" : "ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

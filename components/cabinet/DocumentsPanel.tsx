"use client";

import { useRef, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { Loader2, Upload, Download, Trash2, FileText } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  BUCKET,
  MAX_FILE_BYTES,
  formatDate,
  formatSize,
  type DocumentRow,
} from "@/lib/cabinet/constants";

/**
 * Документы клиента. Тот же список видит и сам клиент, и сотрудник в карточке
 * клиента — отличается только подпись, кто именно загрузил файл.
 */
export function DocumentsPanel({
  userId,
  initial,
  asManager = false,
}: {
  userId: string;
  initial: DocumentRow[];
  asManager?: boolean;
}) {
  const t = useTranslations("cabinet");
  const locale = useLocale();
  const [items, setItems] = useState<DocumentRow[]>(initial);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInput = useRef<HTMLInputElement>(null);

  const upload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    setError(null);

    if (file.size > MAX_FILE_BYTES) {
      setError(t("docsTooBig"));
      return;
    }

    setBusy(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const extension = file.name.includes(".") ? `.${file.name.split(".").pop()}` : "";
    const path = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}${extension}`;

    const { error: uploadError } = await supabase.storage
      .from(BUCKET)
      .upload(path, file, { contentType: file.type || undefined });

    if (uploadError) {
      setBusy(false);
      setError(t("docsUploadError"));
      return;
    }

    const { data, error: insertError } = await supabase
      .from("cabinet_documents")
      .insert({
        user_id: userId,
        title: file.name,
        storage_path: path,
        mime_type: file.type || null,
        size_bytes: file.size,
        uploaded_by: asManager ? "manager" : "client",
        uploaded_by_email: user?.email ?? null,
      })
      .select("id, title, storage_path, mime_type, size_bytes, uploaded_by, uploaded_by_email, created_at")
      .single();

    setBusy(false);

    if (insertError || !data) {
      // Файл лёг в хранилище, а запись не создалась — убираем файл, чтобы не остался мусор.
      await supabase.storage.from(BUCKET).remove([path]);
      setError(t("docsUploadError"));
      return;
    }

    setItems((prev) => [data as DocumentRow, ...prev]);
  };

  const download = async (doc: DocumentRow) => {
    const supabase = createClient();
    const { data, error: signError } = await supabase.storage
      .from(BUCKET)
      .createSignedUrl(doc.storage_path, 60, { download: doc.title });
    if (signError || !data) {
      setError(t("docsDownloadError"));
      return;
    }
    window.location.href = data.signedUrl;
  };

  const remove = async (doc: DocumentRow) => {
    if (!window.confirm(t("docsConfirmDelete", { name: doc.title }))) return;
    const supabase = createClient();
    setError(null);
    const { error: deleteError } = await supabase
      .from("cabinet_documents")
      .delete()
      .eq("id", doc.id);
    if (deleteError) {
      setError(t("docsDeleteError"));
      return;
    }
    await supabase.storage.from(BUCKET).remove([doc.storage_path]);
    setItems((prev) => prev.filter((item) => item.id !== doc.id));
  };

  return (
    <Card className="border-border">
      <CardContent className="p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-foreground mb-1">{t("docsTitle")}</h2>
        <p className="text-sm text-muted-foreground mb-5">
          {asManager ? t("docsSubtitleManager") : t("docsSubtitle")}
        </p>

        <input ref={fileInput} type="file" className="hidden" onChange={upload} />
        <Button onClick={() => fileInput.current?.click()} disabled={busy} className="mb-5">
          {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
          {busy ? t("docsUploading") : t("docsUpload")}
        </Button>

        {error && <p className="text-sm text-destructive mb-4">{error}</p>}

        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">{t("docsEmpty")}</p>
        ) : (
          <ul className="divide-y divide-border/70 border-t border-border/70">
            {items.map((doc) => (
              <li key={doc.id} className="py-3 flex items-center gap-3">
                <FileText className="w-5 h-5 text-muted-foreground shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-foreground truncate">{doc.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(doc.created_at, locale)}
                    {doc.size_bytes ? ` · ${formatSize(doc.size_bytes)}` : ""}
                    {` · ${doc.uploaded_by === "manager" ? t("docsFromManager") : t("docsFromClient")}`}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => download(doc)}
                  title={t("docsDownload")}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <Download className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => remove(doc)}
                  title={t("docsDelete")}
                  className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

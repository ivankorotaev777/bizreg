// Отправка URL в IndexNow (Яндекс, Bing и др. — без аккаунтов).
// Берёт список URL из живого sitemap.xml и шлёт их в IndexNow.
// Запуск: node scripts/indexnow.mjs   (после деплоя ключ-файла)

const HOST = "www.bizreg.uz";
const KEY = "ca86b872f1054089606759694aa69141";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP = `https://${HOST}/sitemap.xml`;
const ENDPOINT = "https://api.indexnow.org/indexnow";

async function getUrls() {
  const res = await fetch(SITEMAP, { headers: { "User-Agent": "indexnow-submit" } });
  if (!res.ok) throw new Error(`sitemap ${res.status}`);
  const xml = await res.text();
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

async function main() {
  const urlList = await getUrls();
  if (!urlList.length) throw new Error("no URLs in sitemap");
  console.log(`Submitting ${urlList.length} URLs to IndexNow...`);
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  });
  console.log(`IndexNow response: ${res.status} ${res.statusText}`);
  const body = await res.text();
  if (body) console.log(body);
  // 200/202 = принято; 403 = ключ не найден (проверь, что key-файл задеплоен)
}

main().catch((e) => {
  console.error("ERROR:", e.message);
  process.exit(1);
});

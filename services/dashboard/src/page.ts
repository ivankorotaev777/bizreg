// Одностраничный дашборд (vanilla JS + Chart.js с CDN, без сборки).
export const PAGE_HTML = `<!doctype html>
<html lang="ru">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>BizReg · SEO-дашборд</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4"></script>
<style>
  :root { --bg:#0f1420; --card:#171e2e; --line:#26304a; --txt:#e6ebf5; --muted:#8b97b0; --accent:#3b82f6; --good:#22c55e; }
  * { box-sizing:border-box; }
  body { margin:0; background:var(--bg); color:var(--txt); font:14px/1.5 -apple-system,Segoe UI,Roboto,sans-serif; }
  header { display:flex; align-items:center; gap:16px; padding:16px 24px; border-bottom:1px solid var(--line); }
  header h1 { font-size:18px; margin:0; }
  header .sp { flex:1; }
  select { background:var(--card); color:var(--txt); border:1px solid var(--line); border-radius:8px; padding:6px 10px; }
  main { padding:24px; max-width:1100px; margin:0 auto; }
  .kpis { display:grid; grid-template-columns:repeat(3,1fr); gap:16px; margin-bottom:20px; }
  .card { background:var(--card); border:1px solid var(--line); border-radius:12px; padding:16px; }
  .kpi .v { font-size:28px; font-weight:700; }
  .kpi .l { color:var(--muted); font-size:13px; }
  table { width:100%; border-collapse:collapse; }
  th,td { text-align:left; padding:9px 10px; border-bottom:1px solid var(--line); }
  th { color:var(--muted); font-weight:600; font-size:12px; text-transform:uppercase; letter-spacing:.03em; }
  td.num,th.num { text-align:right; font-variant-numeric:tabular-nums; }
  tr.row { cursor:pointer; }
  tr.row:hover { background:#1d2740; }
  a { color:var(--accent); text-decoration:none; }
  h2 { font-size:15px; margin:24px 0 12px; }
  .muted { color:var(--muted); }
  .pill { display:inline-block; background:#1d2740; border:1px solid var(--line); border-radius:999px; padding:1px 8px; font-size:12px; }
  #detail { display:none; }
</style>
</head>
<body>
<header>
  <h1>📊 BizReg · SEO-дашборд</h1>
  <span class="pill" id="freshness">…</span>
  <span class="sp"></span>
  <label class="muted">Период
    <select id="period">
      <option value="28">28 дней</option>
      <option value="90" selected>90 дней</option>
      <option value="180">180 дней</option>
    </select>
  </label>
</header>
<main>
  <div class="kpis">
    <div class="card kpi"><div class="v" id="k-clicks">–</div><div class="l">Клики (Google)</div></div>
    <div class="card kpi"><div class="v" id="k-impr">–</div><div class="l">Показы</div></div>
    <div class="card kpi"><div class="v" id="k-pos">–</div><div class="l">Средняя позиция</div></div>
  </div>
  <div class="card"><canvas id="trend" height="90"></canvas></div>

  <h2>Статьи <span class="muted">— клик по строке: запросы и гео</span></h2>
  <div class="card" style="padding:0;overflow:hidden">
    <table>
      <thead><tr><th>Страница</th><th class="num">Клики</th><th class="num">Показы</th><th class="num">Позиция</th><th>Топ-запрос</th></tr></thead>
      <tbody id="pages"></tbody>
    </table>
  </div>

  <div id="detail">
    <h2 id="d-title"></h2>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
      <div class="card" style="padding:0;overflow:hidden">
        <div style="padding:10px 12px" class="muted">Запросы</div>
        <table><thead><tr><th>Запрос</th><th class="num">Клики</th><th class="num">Показы</th><th class="num">Поз.</th></tr></thead><tbody id="d-queries"></tbody></table>
      </div>
      <div class="card" style="padding:0;overflow:hidden">
        <div style="padding:10px 12px" class="muted">География</div>
        <table><thead><tr><th>Страна</th><th class="num">Клики</th><th class="num">Показы</th><th class="num">Поз.</th></tr></thead><tbody id="d-countries"></tbody></table>
      </div>
    </div>
  </div>
</main>
<script>
const fmt = n => (n ?? 0).toLocaleString('ru-RU');
const path = u => { try { return new URL(u).pathname; } catch { return u; } };
let chart;
const days = () => document.getElementById('period').value;

async function load() {
  const ov = await (await fetch('/api/overview?days='+days())).json();
  document.getElementById('k-clicks').textContent = fmt(ov.totals.clicks);
  document.getElementById('k-impr').textContent = fmt(ov.totals.impressions);
  document.getElementById('k-pos').textContent = ov.totals.position || '–';
  const labels = ov.trend.map(r=>r.date.slice(5));
  const ds = (key,color)=>({label:key==='clicks'?'Клики':'Показы',data:ov.trend.map(r=>r[key]),borderColor:color,backgroundColor:color+'22',tension:.3,yAxisID:key});
  if (chart) chart.destroy();
  chart = new Chart(document.getElementById('trend'), {
    type:'line',
    data:{labels,datasets:[ds('impressions','#8b97b0'),ds('clicks','#3b82f6')]},
    options:{plugins:{legend:{labels:{color:'#e6ebf5'}}},scales:{
      clicks:{position:'left',ticks:{color:'#8b97b0'},grid:{color:'#26304a'}},
      impressions:{position:'right',ticks:{color:'#8b97b0'},grid:{display:false}},
      x:{ticks:{color:'#8b97b0'},grid:{display:false}}}}
  });

  const pg = await (await fetch('/api/pages?days='+days())).json();
  const tb = document.getElementById('pages'); tb.innerHTML='';
  if (!pg.length) tb.innerHTML = '<tr><td colspan=5 class="muted" style="padding:18px">Данных пока нет — Google ещё накапливает статистику по новому сайту, либо синхронизация не прошла.</td></tr>';
  for (const r of pg) {
    const tr = document.createElement('tr'); tr.className='row';
    tr.innerHTML = '<td><a href="'+r.page+'" target="_blank">'+path(r.page)+'</a></td>'+
      '<td class="num">'+fmt(r.clicks)+'</td><td class="num">'+fmt(r.impressions)+'</td>'+
      '<td class="num">'+(r.position??'–')+'</td><td class="muted">'+(r.top_query||'')+'</td>';
    tr.onclick = ()=>detail(r.page);
    tb.appendChild(tr);
  }
}

async function detail(url) {
  const d = await (await fetch('/api/page?days='+days()+'&url='+encodeURIComponent(url))).json();
  document.getElementById('detail').style.display='block';
  document.getElementById('d-title').textContent = path(url);
  const fill = (id,rows)=>{ const t=document.getElementById(id); t.innerHTML='';
    for(const r of rows){ const tr=document.createElement('tr');
      tr.innerHTML='<td>'+(r.query||r.country)+'</td><td class="num">'+fmt(r.clicks)+'</td><td class="num">'+fmt(r.impressions)+'</td><td class="num">'+(r.position??'–')+'</td>'; t.appendChild(tr);} };
  fill('d-queries', d.queries); fill('d-countries', d.countries);
  document.getElementById('detail').scrollIntoView({behavior:'smooth'});
}

fetch('/api/freshness').then(r=>r.json()).then(j=>{
  document.getElementById('freshness').textContent = j.last ? ('данные по '+j.last) : 'нет данных';
});
document.getElementById('period').onchange = load;
load();
</script>
</body>
</html>`;

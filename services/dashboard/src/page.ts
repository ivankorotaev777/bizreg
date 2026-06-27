export const PAGE_HTML = `<!doctype html>
<html lang="ru"><head>
<meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1" />
<title>BizReg · SEO-дашборд</title>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4"></script>
<style>
  :root{--bg:#0f1420;--card:#171e2e;--line:#26304a;--txt:#e6ebf5;--muted:#8b97b0;--accent:#3b82f6;--up:#22c55e;--down:#ef4444;}
  *{box-sizing:border-box}
  body{margin:0;background:var(--bg);color:var(--txt);font:14px/1.5 -apple-system,Segoe UI,Roboto,sans-serif}
  header{display:flex;align-items:center;gap:14px;padding:14px 24px;border-bottom:1px solid var(--line);position:sticky;top:0;background:var(--bg);z-index:5}
  header h1{font-size:17px;margin:0}.sp{flex:1}
  select{background:var(--card);color:var(--txt);border:1px solid var(--line);border-radius:8px;padding:6px 10px}
  main{padding:24px;max-width:1180px;margin:0 auto}
  .pill{display:inline-block;background:#1d2740;border:1px solid var(--line);border-radius:999px;padding:1px 9px;font-size:12px;color:var(--muted)}
  .kpis{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:18px}
  .card{background:var(--card);border:1px solid var(--line);border-radius:12px;padding:16px}
  .kpi .v{font-size:26px;font-weight:700}.kpi .l{color:var(--muted);font-size:13px}.kpi .d{font-size:12px;margin-top:2px}
  .up{color:var(--up)}.down{color:var(--down)}.muted{color:var(--muted)}
  .buckets{display:grid;grid-template-columns:repeat(5,1fr);gap:10px;margin:14px 0 22px}
  .bk{background:var(--card);border:1px solid var(--line);border-radius:10px;padding:10px 12px;text-align:center}
  .bk .n{font-size:20px;font-weight:700}.bk .t{font-size:12px;color:var(--muted)}
  h2{font-size:15px;margin:26px 0 10px}
  table{width:100%;border-collapse:collapse}
  th,td{text-align:left;padding:9px 10px;border-bottom:1px solid var(--line);white-space:nowrap}
  th{color:var(--muted);font-weight:600;font-size:12px;text-transform:uppercase;letter-spacing:.03em}
  th.s{cursor:pointer;user-select:none}
  td.num,th.num{text-align:right;font-variant-numeric:tabular-nums}
  td.q{white-space:normal;max-width:340px}
  td.pg{max-width:240px;overflow:hidden;text-overflow:ellipsis}
  a{color:var(--accent);text-decoration:none}
  tr.row{cursor:pointer}tr.row:hover{background:#1d2740}
  .pos{display:inline-block;min-width:34px;text-align:right}
  .p-good{color:var(--up)}.p-mid{color:var(--txt)}.p-bad{color:var(--muted)}
  .wrap{background:var(--card);border:1px solid var(--line);border-radius:12px;overflow:hidden}
  .wrap .hd{padding:10px 12px;color:var(--muted)}
  #detail{display:none}
</style></head><body>
<header>
  <h1>📊 BizReg · SEO-дашборд</h1><span class="pill" id="fresh">…</span><span class="muted" style="font-size:12px">Google · органика</span>
  <span class="sp"></span>
  <label class="muted">Период <select id="period"><option value="28">28 дн</option><option value="90" selected>90 дн</option><option value="180">180 дн</option></select></label>
</header>
<main>
  <div class="kpis">
    <div class="card kpi"><div class="v" id="k-clicks">–</div><div class="l">Клики</div><div class="d" id="d-clicks"></div></div>
    <div class="card kpi"><div class="v" id="k-impr">–</div><div class="l">Показы</div><div class="d" id="d-impr"></div></div>
    <div class="card kpi"><div class="v" id="k-ctr">–</div><div class="l">CTR</div><div class="d" id="d-ctr"></div></div>
    <div class="card kpi"><div class="v" id="k-pos">–</div><div class="l">Средняя позиция</div><div class="d" id="d-pos"></div></div>
  </div>
  <div class="card"><canvas id="trend" height="80"></canvas></div>

  <h2>Видимость <span class="muted">— сколько запросов на каких позициях</span></h2>
  <div class="buckets">
    <div class="bk"><div class="n p-good" id="b-top3">–</div><div class="t">Топ-3</div></div>
    <div class="bk"><div class="n" id="b-410">–</div><div class="t">4–10</div></div>
    <div class="bk"><div class="n" id="b-1120">–</div><div class="t">11–20</div></div>
    <div class="bk"><div class="n" id="b-2150">–</div><div class="t">21–50</div></div>
    <div class="bk"><div class="n p-bad" id="b-50">–</div><div class="t">50+</div></div>
  </div>

  <h2>Целевые ключи <span class="muted">— наш финальный лист vs реальные позиции в Google</span> <span class="pill" id="t-cov"></span></h2>
  <div class="wrap"><table>
    <thead><tr><th>Ключ</th><th>Кластер</th><th class="num">Wordstat</th><th class="num">Позиция</th><th class="num">Клики</th><th class="num">Показы</th><th>Статья</th></tr></thead>
    <tbody id="targets"></tbody>
  </table></div>

  <h2>Запросы <span class="muted">— фактические запросы из Google · клик по заголовку: сортировка</span></h2>
  <div class="wrap"><table>
    <thead><tr>
      <th class="s" data-k="query">Запрос</th>
      <th class="s num" data-k="position">Позиция</th>
      <th class="s num" data-k="clicks">Клики</th>
      <th class="s num" data-k="impressions">Показы</th>
      <th class="s num" data-k="ctr">CTR</th>
      <th>Статья</th>
    </tr></thead><tbody id="queries"></tbody>
  </table></div>

  <h2>Почти в топе <span class="muted">— позиции 5–20 с показами: дожать до топа</span></h2>
  <div class="wrap"><table>
    <thead><tr><th>Запрос</th><th class="num">Позиция</th><th class="num">Показы</th><th class="num">Клики</th><th>Статья</th></tr></thead>
    <tbody id="opps"></tbody>
  </table></div>

  <h2>Статьи <span class="muted">— клик по строке: запросы и гео</span></h2>
  <div class="wrap"><table>
    <thead><tr><th>Страница</th><th class="num">Клики</th><th class="num">Показы</th><th class="num">Позиция</th><th>Топ-запрос</th></tr></thead>
    <tbody id="pages"></tbody>
  </table></div>

  <div id="detail">
    <h2 id="d-title"></h2>
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:14px">
      <div class="wrap"><div class="hd">Запросы</div><table><thead><tr><th>Запрос</th><th class="num">Клики</th><th class="num">Показы</th><th class="num">Поз.</th></tr></thead><tbody id="d-queries"></tbody></table></div>
      <div class="wrap"><div class="hd">География</div><table><thead><tr><th>Страна</th><th class="num">Клики</th><th class="num">Показы</th><th class="num">Поз.</th></tr></thead><tbody id="d-countries"></tbody></table></div>
    </div>
  </div>
</main>
<script>
const fmt=n=>(n??0).toLocaleString('ru-RU');
const path=u=>{try{return new URL(u).pathname}catch{return u}};
const posCell=p=>{if(p==null)return '–';const c=p<=3?'p-good':p<=10?'p-mid':'p-bad';return '<span class="pos '+c+'">'+p+'</span>'};
const days=()=>document.getElementById('period').value;
let chart, Q=[], sortK='impressions', sortAsc=false;

function deltaPct(cur,prev){if(!prev)return '';const diff=cur-prev;if(!diff)return '<span class="muted">→ 0%</span>';const up=diff>0;return '<span class="'+(up?'up':'down')+'">'+(up?'▲':'▼')+' '+Math.round(Math.abs(diff)/prev*100)+'%</span>'}
function deltaPos(cur,prev){if(!prev)return '';const diff=cur-prev;if(!diff)return '<span class="muted">→</span>';const better=diff<0;return '<span class="'+(better?'up':'down')+'">'+(better?'▲':'▼')+' '+Math.abs(diff).toFixed(1)+'</span>'}
function deltaPp(cur,prev){if(prev==null)return '';const diff=+(cur-prev).toFixed(1);if(!diff)return '<span class="muted">→</span>';const up=diff>0;return '<span class="'+(up?'up':'down')+'">'+(up?'▲':'▼')+' '+Math.abs(diff)+' п.п.</span>'}

async function load(){
  const ov=await (await fetch('/api/overview?days='+days())).json();const t=ov.totals;
  document.getElementById('k-clicks').textContent=fmt(t.clicks);
  document.getElementById('k-impr').textContent=fmt(t.impressions);
  document.getElementById('k-ctr').textContent=(t.ctr||0)+'%';
  document.getElementById('k-pos').textContent=t.position||'–';
  document.getElementById('d-clicks').innerHTML=deltaPct(t.clicks,t.prev_clicks);
  document.getElementById('d-impr').innerHTML=deltaPct(t.impressions,t.prev_impressions);
  document.getElementById('d-ctr').innerHTML=deltaPp(t.ctr,t.prev_ctr);
  document.getElementById('d-pos').innerHTML=deltaPos(t.position,t.prev_position);

  const labels=ov.trend.map(r=>r.date.slice(5));
  const ds=(k,c)=>({label:k==='clicks'?'Клики':'Показы',data:ov.trend.map(r=>r[k]),borderColor:c,backgroundColor:c+'22',tension:.3,yAxisID:k});
  if(chart)chart.destroy();
  chart=new Chart(document.getElementById('trend'),{type:'line',data:{labels,datasets:[ds('impressions','#8b97b0'),ds('clicks','#3b82f6')]},
    options:{plugins:{legend:{labels:{color:'#e6ebf5'}}},scales:{clicks:{position:'left',ticks:{color:'#8b97b0'},grid:{color:'#26304a'}},impressions:{position:'right',ticks:{color:'#8b97b0'},grid:{display:false}},x:{ticks:{color:'#8b97b0',maxTicksLimit:12},grid:{display:false}}}}});

  const b=await (await fetch('/api/buckets?days='+days())).json();
  document.getElementById('b-top3').textContent=fmt(b.top3);
  document.getElementById('b-410').textContent=fmt(b.p4_10);
  document.getElementById('b-1120').textContent=fmt(b.p11_20);
  document.getElementById('b-2150').textContent=fmt(b.p21_50);
  document.getElementById('b-50').textContent=fmt(b.p50plus);

  const tg=await (await fetch('/api/targets?days='+days())).json();
  const tt=document.getElementById('targets');tt.innerHTML='';let ranked=0;
  if(!tg.length)tt.innerHTML='<tr><td colspan=7 class="muted" style="padding:16px">Список целевых ключей пуст.</td></tr>';
  for(const r of tg){const has=r.impressions>0;if(has)ranked++;
    tt.insertAdjacentHTML('beforeend','<tr><td class="q">'+r.keyword+'</td><td class="muted">'+(r.cluster||'')+'</td><td class="num">'+fmt(r.freq)+'</td><td class="num">'+(has?posCell(r.position):'<span class="muted">нет показов</span>')+'</td><td class="num">'+fmt(r.clicks)+'</td><td class="num">'+fmt(r.impressions)+'</td><td class="pg">'+(r.page?'<a href="'+r.page+'" target="_blank">'+path(r.page)+'</a>':'<span class="muted">—</span>')+'</td></tr>');}
  document.getElementById('t-cov').textContent=ranked+' из '+tg.length+' уже в выдаче';

  Q=await (await fetch('/api/queries?days='+days())).json();
  renderQueries();

  const opp=await (await fetch('/api/opportunities?days='+days())).json();
  const ot=document.getElementById('opps');ot.innerHTML='';
  if(!opp.length)ot.innerHTML='<tr><td colspan=5 class="muted" style="padding:16px">Пока нет запросов в зоне 5–20.</td></tr>';
  for(const r of opp)ot.insertAdjacentHTML('beforeend','<tr><td class="q">'+r.query+'</td><td class="num">'+posCell(r.position)+'</td><td class="num">'+fmt(r.impressions)+'</td><td class="num">'+fmt(r.clicks)+'</td><td class="pg"><a href="'+r.page+'" target="_blank">'+path(r.page)+'</a></td></tr>');

  const pg=await (await fetch('/api/pages?days='+days())).json();
  const pt=document.getElementById('pages');pt.innerHTML='';
  if(!pg.length)pt.innerHTML='<tr><td colspan=5 class="muted" style="padding:16px">Данных пока нет.</td></tr>';
  for(const r of pg){const tr=document.createElement('tr');tr.className='row';
    tr.innerHTML='<td class="pg"><a href="'+r.page+'" target="_blank">'+path(r.page)+'</a></td><td class="num">'+fmt(r.clicks)+'</td><td class="num">'+fmt(r.impressions)+'</td><td class="num">'+posCell(r.position)+'</td><td class="muted">'+(r.top_query||'')+'</td>';
    tr.onclick=()=>detail(r.page);pt.appendChild(tr);}
}

function renderQueries(){
  const tb=document.getElementById('queries');tb.innerHTML='';
  if(!Q.length){tb.innerHTML='<tr><td colspan=6 class="muted" style="padding:16px">Данных пока нет — Google ещё накапливает статистику по новому сайту.</td></tr>';return;}
  const arr=[...Q].sort((a,b)=>{const x=a[sortK],y=b[sortK];const c=typeof x==='string'?String(x).localeCompare(y):(x-y);return sortAsc?c:-c;});
  for(const r of arr)tb.insertAdjacentHTML('beforeend','<tr><td class="q">'+r.query+'</td><td class="num">'+posCell(r.position)+'</td><td class="num">'+fmt(r.clicks)+'</td><td class="num">'+fmt(r.impressions)+'</td><td class="num">'+(r.ctr??0)+'%</td><td class="pg"><a href="'+r.page+'" target="_blank">'+path(r.page)+'</a></td></tr>');
}
document.querySelectorAll('th.s').forEach(th=>th.onclick=()=>{const k=th.dataset.k;if(sortK===k)sortAsc=!sortAsc;else{sortK=k;sortAsc=(k==='query'||k==='position');}renderQueries();});

async function detail(url){
  const dd=await (await fetch('/api/page?days='+days()+'&url='+encodeURIComponent(url))).json();
  document.getElementById('detail').style.display='block';
  document.getElementById('d-title').textContent=path(url);
  const fill=(id,rows,first)=>{const t=document.getElementById(id);t.innerHTML='';for(const r of rows)t.insertAdjacentHTML('beforeend','<tr><td>'+(r[first]||'')+'</td><td class="num">'+fmt(r.clicks)+'</td><td class="num">'+fmt(r.impressions)+'</td><td class="num">'+posCell(r.position)+'</td></tr>');};
  fill('d-queries',dd.queries,'query');fill('d-countries',dd.countries,'country');
  document.getElementById('detail').scrollIntoView({behavior:'smooth'});
}

fetch('/api/freshness').then(r=>r.json()).then(j=>document.getElementById('fresh').textContent=j.last?('данные по '+j.last):'нет данных');
document.getElementById('period').onchange=load;
load();
</script></body></html>`;

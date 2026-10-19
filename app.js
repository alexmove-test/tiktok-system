(function(){
'use strict';
var KEY='tiktok-system-v1';
var LINKS={
 academy:['TikTok Academy — Create for TikTok (урок «5 hooks to try in your next video»)','https://www.tiktokacademy.com/student/path/2635022-create-for-tiktok'],
 creator:['TikTok Creator Academy — официальные курсы и статьи для авторов','https://www.tiktok.com/creator-academy/en/'],
 studio:['Справка TikTok: TikTok Studio и аналитика','https://support.tiktok.com/en/using-tiktok/creating-videos/creator-tools-on-tiktok']
};
var MISSIONS=[
 {id:'m1',xp:120,title:'Захвати внимание за 3 секунды',skill:'сильное начало',learn:'4 мин обучение',video:'20 сек видео',link:'academy',
  task:'Опубликуй видео, которое начинается с неожиданного вопроса или утверждения в первые 3 секунды.',
  crit:['Первая фраза звучит в первые 3 секунды','Вопрос или утверждение неожиданное, не банальное','Видео выполняет то, что обещало начало','Нет вступления «Привет, меня зовут…»']},
 {id:'m2',xp:120,title:'Первый кадр решает',skill:'первые кадры',learn:'4 мин обучение',video:'15–20 сек видео',link:'creator',
  task:'Начни видео с действия или результата прямо в первом кадре (процесс, «до/после», движение) — без статичной заставки.',
  crit:['В первом кадре есть движение или действие','Без звука понятно, о чём видео','Кадр вертикальный, резкий, хорошо освещён','К сути переходишь сразу, без разгона']},
 {id:'m3',xp:130,title:'Текст-крючок на экране',skill:'визуальный хук',learn:'4 мин обучение',video:'15–25 сек видео',link:'academy',
  task:'Добавь в первую секунду короткий текст на экране, который дополняет речь, а не повторяет её.',
  crit:['Текст читается за 1–2 секунды','Текст не перекрыт подписью и кнопками TikTok','Текст дополняет сказанное','Без ошибок и опечаток']},
 {id:'m4',xp:140,title:'Обещание и выполнение',skill:'удержание через обещание',learn:'4 мин обучение',video:'20–30 сек видео',link:'creator',
  task:'В начале пообещай конкретный результат («покажу один способ…») и выполни обещание до конца видео — без воды.',
  crit:['Обещание конкретное','Обещание выполнено','Нет лишних частей','Понятно, зачем досматривать']},
 {id:'m5',xp:160,title:'Эксперимент: другое начало',skill:'эксперимент',learn:'4 мин обучение',video:'длина как у прошлого видео',link:'creator',
  task:'Возьми тему одного из своих прошлых видео и сними её заново, изменив только начало. Гипотезу запиши до публикации.',
  crit:['Изменено только начало','Тема и длина примерно как у исходного видео','Гипотеза записана до публикации','Вывод осторожный: одна пара видео — не доказательство']},
 {id:'m6',xp:180,title:'Разбор своих начал',skill:'аналитика хуков',learn:'4 мин обучение',video:'20–30 сек видео',link:'studio',
  task:'Сравни первые секунды своих видео в TikTok Studio (удержание), выбери приём, который у тебя работает лучше, и сними с ним новое видео.',
  crit:['Сравнил минимум 3 своих видео','Выбрал приём по данным, а не по ощущению','Применил приём в новом видео','Записал, что проверить дальше']}
];
var BRANCHES=[
 {id:'hook',name:'Захват внимания',sub:'хуки, первые кадры',open:true},
 {id:'script',name:'Сценарий',sub:'структура, история'},
 {id:'voice',name:'Подача',sub:'голос, уверенность'},
 {id:'edit',name:'Монтаж',sub:'темп, переходы'},
 {id:'engage',name:'Взаимодействие',sub:'комментарии, диалог',open:true,note:'XP за отзывы участникам'},
 {id:'analytics',name:'Аналитика',sub:'гипотезы, эксперименты',open:true,note:'XP за закрытые эксперименты и статистику'}
];
var WEEKFOCUS=[
 ['Обучение и практика','Миссии 01–02. Найди 2–3 партнёров для обмена оценками.'],
 ['Практика и обратная связь','Миссии 03–04. Дай 3 оценки — получи 3.'],
 ['Измерение','Миссия 05. Внеси статистику всех видео блока из TikTok Studio.'],
 ['Улучшение','Миссия 06. Подведи итог блока и выбери, что улучшать дальше.']
];
var MODES={
 low:{name:'Почти нет сил',time:'10–15 минут',items:['Посмотреть один короткий урок к текущей миссии.','Оценить одно видео партнёра по критериям (отзыв = +25 XP).','Записать 3 варианта первой фразы для следующего видео.']},
 normal:{name:'Обычный',time:'40–60 минут',items:['Открыть текущую миссию и записать гипотезу.','Снять и смонтировать короткое видео по заданию.','Опубликовать, вставить ссылку и сделать самооценку.','Записать результат в дневник.']},
 high:{name:'Есть энергия',time:'2–3 часа',items:['Пройти полный цикл миссии: обучение → гипотеза → публикация → обмен оценками.','Внести статистику прошлых видео из TikTok Studio.','Дать 3 честных отзыва участникам.','Остановиться, когда задача выполнена, — не «пока есть силы».']}
};
var RES={'':'— ещё не ясно —',yes:'Гипотеза подтвердилась',no:'Не подтвердилась',unclear:'Данных недостаточно'};

function today(){var d=new Date();d.setMinutes(d.getMinutes()-d.getTimezoneOffset());return d.toISOString().slice(0,10);}
function blankM(){return {hyp:'',url:'',date:'',len:'',self:[0,0,0,0],peer:['','',''],peerNote:'',ai:'',stats:{views:'',avg:'',full:'',comments:'',shares:''},result:'',improve:''};}
function def(){var m={};MISSIONS.forEach(function(x){m[x.id]=blankM();});return {v:1,missions:m,helps:[],mode:'normal',days:[],reports:[],block:{n:1,start:today(),summary:''},blocks:[]};}
var S;
try{S=JSON.parse(localStorage.getItem(KEY))||def();}catch(e){S=def();}
function norm(){var d=def();for(var k in d)if(S[k]===undefined)S[k]=d[k];MISSIONS.forEach(function(x){if(!S.missions[x.id])S.missions[x.id]=blankM();var b=blankM(),m=S.missions[x.id];for(var j in b)if(m[j]===undefined)m[j]=b[j];});}
norm();
function save(){try{localStorage.setItem(KEY,JSON.stringify(S));}catch(e){}}
function $(s){return document.querySelector(s);}
function el(t,a,txt){var e=document.createElement(t);if(a)for(var k in a)e.setAttribute(k,a[k]);if(txt!=null)e.textContent=txt;return e;}
function toast(m){var t=$('#toast');t.textContent=m;t.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(function(){t.classList.remove('show');},1800);}
function num(v){var n=parseFloat(String(v).replace(',','.'));return isNaN(n)?null:n;}
function validUrl(u){return /^https?:\/\/\S+\.\S+/.test(u||'');}
function median(a){a=a.slice().sort(function(x,y){return x-y;});var n=a.length;return n%2?a[(n-1)/2]:(a[n/2-1]+a[n/2])/2;}

/* ---- логика миссий и XP ---- */
function complete(id){var m=S.missions[id];return !!(m.hyp.trim()&&validUrl(m.url)&&m.self.every(function(s){return s>0;})&&m.improve.trim());}
function hasStats(m){return num(m.stats.views)!==null&&num(m.stats.avg)!==null&&num(m.len)>0;}
function ratio(m){return num(m.stats.avg)/num(m.len);}
function compare(i){
 var m=S.missions[MISSIONS[i].id];if(!hasStats(m))return null;
 var prev=[];for(var j=0;j<i;j++){var p=S.missions[MISSIONS[j].id];if(hasStats(p))prev.push(p);}
 if(prev.length<3)return {enough:false,count:prev.length};
 var out={enough:true,count:prev.length,rows:[]};
 function row(name,val,arr,fmt){var md=median(arr);out.rows.push(name+': '+fmt(val)+' — медиана ваших прошлых видео '+fmt(md)+' → '+(val>md?'выше':val<md?'ниже':'на уровне'));return val>md;}
 out.grow=row('Доля досмотра (ср. время / длина)',ratio(m),prev.map(ratio),function(v){return Math.round(v*100)+'%';});
 row('Просмотры',num(m.stats.views),prev.map(function(p){return num(p.stats.views);}),function(v){return String(Math.round(v));});
 var pf=prev.filter(function(p){return num(p.stats.full)!==null;});
 if(num(m.stats.full)!==null&&pf.length>=3)row('Досмотрели полностью',num(m.stats.full),pf.map(function(p){return num(p.stats.full);}),function(v){return v+'%';});
 return out;
}
function missionXP(i){
 var x=MISSIONS[i],m=S.missions[x.id],r={hook:0,analytics:0,engage:0};
 if(!complete(x.id))return r;
 r.hook+=x.xp;
 m.peer.forEach(function(p){if(num(p)!==null)r.hook+=10;});
 if(hasStats(m))r.analytics+=30;
 if(m.result)r.analytics+=20;
 var c=compare(i);if(c&&c.enough&&c.grow)r.analytics+=50;
 return r;
}
function helpOk(h){return h.good&&h.good.trim()&&h.fix&&h.fix.trim();}
function totals(){
 var t={hook:0,analytics:0,engage:0};
 MISSIONS.forEach(function(x,i){var r=missionXP(i);for(var k in r)t[k]+=r[k];});
 S.helps.forEach(function(h){if(helpOk(h))t.engage+=25;});
 t.all=t.hook+t.analytics+t.engage;return t;
}
function unlocked(i){return i===0||complete(MISSIONS[i-1].id);}
function achievements(){
 var vids=MISSIONS.filter(function(x){return validUrl(S.missions[x.id].url);}).length;
 var streak=0,best=0;MISSIONS.forEach(function(x){var m=S.missions[x.id];if(complete(x.id)&&m.result){streak++;best=Math.max(best,streak);}else streak=0;});
 var grow=MISSIONS.some(function(x,i){var c=compare(i);return c&&c.enough&&c.grow;});
 var helps=S.helps.filter(helpOk).length;
 return [
  ['🎬','Первое опубликованное видео',vids>=1,Math.min(vids,1)+' / 1'],
  ['🧪','Пять последовательных экспериментов',best>=5,Math.min(best,5)+' / 5 (миссии подряд с гипотезой и выводом)'],
  ['🤝','Помог десяти участникам',helps>=10,Math.min(helps,10)+' / 10 отзывов'],
  ['📈','Улучшил собственное удержание',grow,grow?'доля досмотра выше вашей медианы':'нужно ≥3 прошлых видео со статистикой']
 ];
}

/* ---- отрисовка ---- */
function renderTop(){
 var t=totals(),lvl=Math.floor(t.all/500)+1,rest=t.all%500;
 $('#sLevel').textContent=lvl;$('#sXp').textContent=t.all;$('#sBlock').textContent=S.block.n;
 $('#sVideos').textContent=MISSIONS.filter(function(x){return validUrl(S.missions[x.id].url);}).length;
 $('#xpText').textContent=rest+' / 500 XP';$('#xpBar').style.width=(rest/5)+'%';
 var tb=$('#treeBox');tb.innerHTML='';
 BRANCHES.forEach(function(b){var xp=t[b.id]||0;var d=el('div',{'class':'branch'+(b.open?' active':'')});
  d.appendChild(el('h3',null,b.name+(b.open?'':' 🔒')));d.appendChild(el('p',null,b.sub));
  if(b.open){d.appendChild(el('p',null,'Уровень '+(Math.floor(xp/300)+1)+' · '+xp+' XP'+(b.note?' · '+b.note:'')));var mb=el('div',{'class':'mini'});var f=el('div');f.style.width=(xp%300)/3+'%';mb.appendChild(f);d.appendChild(mb);}
  else d.appendChild(el('span',{'class':'tag lock'},'откроется в следующих блоках'));
  tb.appendChild(d);});
 var ab=$('#achBox');ab.innerHTML='';
 achievements().forEach(function(a){var d=el('div',{'class':a[2]?'got':''});d.appendChild(el('b',null,a[0]+' '+a[1]));d.appendChild(el('div',{'class':'muted',style:'font-size:13px'},(a[2]?'Получено · ':'')+a[3]));ab.appendChild(d);});
}
function renderBlock(){
 var b=$('#blockBody');b.innerHTML='';
 var days=Math.floor((new Date(today())-new Date(S.block.start))/864e5);if(isNaN(days)||days<0)days=0;
 var w=Math.floor(days/7)+1;
 b.appendChild(el('p',null,'Блок '+S.block.n+' · начат '+S.block.start+' · '+(w<=4?'неделя '+w+' из 4':'4 недели прошли — подведите итог')));
 var ol=el('ol',{'class':'entries'});
 WEEKFOCUS.forEach(function(f,i){var li=el('li',null,(i+1===w?'▶ ':'')+'Неделя '+(i+1)+' — '+f[0]+'\n'+(S.block.n===1?f[1]:'Повтори приёмы ветки на новых темах или углубись в слабый критерий.'));if(i+1===w)li.style.borderColor='var(--accent)';ol.appendChild(li);});
 b.appendChild(ol);
 var lab=el('label',{style:'display:grid;gap:4px;margin-top:12px;font-size:14px;color:var(--muted)'},'Итог блока: что изменилось в навыке, что дальше');
 var ta=el('textarea',{rows:2});ta.value=S.block.summary;ta.oninput=function(){S.block.summary=ta.value;save();};lab.appendChild(ta);b.appendChild(lab);
 var btn=el('button',{'class':'btn',type:'button',style:'margin-top:8px'},'Завершить блок и начать следующий');
 btn.onclick=function(){if(!confirm('Завершить блок '+S.block.n+'? Прогресс миссий сохранится.'))return;S.blocks.push({n:S.block.n,start:S.block.start,end:today(),summary:S.block.summary});S.block={n:S.block.n+1,start:today(),summary:''};save();renderBlock();renderTop();toast('Начат блок '+S.block.n);};
 b.appendChild(btn);
 if(S.blocks.length){var h=el('ul',{'class':'entries'});S.blocks.slice().reverse().forEach(function(x){h.appendChild(el('li',null,'Блок '+x.n+': '+x.start+' — '+x.end+(x.summary?'\n'+x.summary:'')));});b.appendChild(h);}
}
function field(label,val,on,attrs){var l=el('label',null,label);var i=el(attrs&&attrs.rows?'textarea':'input',attrs||{});i.value=val;i.oninput=function(){on(i.value);};l.appendChild(i);return l;}
function renderMissions(){
 var box=$('#missionList');box.innerHTML='';
 MISSIONS.forEach(function(x,i){
  var m=S.missions[x.id],open=unlocked(i),done=complete(x.id);
  var c=el('div',{'class':'mission'+(done?' done':'')+(open?'':' locked')});
  var hd=el('div');hd.appendChild(el('span',{'class':'tag xp'},'+'+x.xp+' XP'));hd.appendChild(el('span',{'class':'tag'},'Миссия 0'+(i+1)));
  hd.appendChild(el('span',{'class':'tag'},'навык: '+x.skill));hd.appendChild(el('span',{'class':'tag'},x.learn));hd.appendChild(el('span',{'class':'tag'},x.video));hd.appendChild(el('span',{'class':'tag'},'3 оценки сообщества'));
  if(done)hd.appendChild(el('span',{'class':'tag'},'✅ выполнена'));
  c.appendChild(hd);c.appendChild(el('h3',null,x.title));c.appendChild(el('div',{'class':'task'},x.task));
  if(!open){c.appendChild(el('p',{'class':'muted'},'🔒 Откроется после выполнения предыдущей миссии.'));box.appendChild(c);return;}
  var det=el('details');if(!done&&(i===0||complete(MISSIONS[i-1].id)))det.open=!done;
  det.appendChild(el('summary',null,done?'Открыть миссию':'Выполнить миссию'));
  var f=el('div',{'class':'form'});
  var lp=el('p',null,'1. Обучение: ');var a=el('a',{href:LINKS[x.link][1],target:'_blank',rel:'noopener'},LINKS[x.link][0]);lp.appendChild(a);f.appendChild(lp);
  function upd(){save();renderTop();var st=c.querySelector('.state');if(st)st.textContent=status();}
  f.appendChild(field('2. Гипотеза (до публикации): «Если я…, то…»',m.hyp,function(v){m.hyp=v;upd();},{rows:2}));
  var r=el('div',{'class':'row'});
  r.appendChild(field('3. Ссылка на опубликованное видео',m.url,function(v){m.url=v.trim();upd();},{type:'url',placeholder:'https://www.tiktok.com/@…/video/…'}));
  r.appendChild(field('Длина видео, сек',m.len,function(v){m.len=v;upd();},{type:'number',min:'1'}));f.appendChild(r);
  // самооценка
  f.appendChild(el('b',null,'4. Самооценка по критериям (1 — плохо, 5 — отлично)'));
  var g=el('div',{'class':'crit'});g.appendChild(el('span',{'class':'h'},'Критерий'));[1,2,3,4,5].forEach(function(n){g.appendChild(el('span',{'class':'h'},String(n)));});
  x.crit.forEach(function(cr,ci){g.appendChild(el('span',null,cr));[1,2,3,4,5].forEach(function(n){var rb=el('input',{type:'radio',name:x.id+'c'+ci,value:n});rb.checked=m.self[ci]===n;rb.style.width='auto';rb.onchange=function(){m.self[ci]=n;upd();};g.appendChild(rb);});});
  f.appendChild(g);
  // оценки
  f.appendChild(el('b',null,'5. Обратная связь: участники и ИИ (вписываются вручную, 1–5)'));
  var g3=el('div',{'class':'grid3'});
  m.peer.forEach(function(p,pi){g3.appendChild(field('Участник '+(pi+1),p,function(v){m.peer[pi]=v;upd();},{type:'number',min:'1',max:'5',step:'0.5'}));});
  f.appendChild(g3);
  f.appendChild(field('Что сказали участники',m.peerNote,function(v){m.peerNote=v;save();},{rows:2}));
  f.appendChild(field('Оценка ИИ, 1–5 (по желанию: если разбирали видео с ИИ-ассистентом)',m.ai,function(v){m.ai=v;save();rc();},{type:'number',min:'1',max:'5',step:'0.5'}));
  // статистика
  f.appendChild(el('b',null,'6. Измерение: статистика из TikTok Studio (вручную)'));
  var g4=el('div',{'class':'grid3'});
  [['views','Просмотры'],['avg','Среднее время просмотра, сек'],['full','Досмотрели полностью, %'],['comments','Комментарии'],['shares','Репосты и сохранения']].forEach(function(s){g4.appendChild(field(s[1],m.stats[s[0]],function(v){m.stats[s[0]]=v;upd();rc();},{type:'number',min:'0',step:'any'}));});
  f.appendChild(g4);
  f.appendChild(el('p',{'class':'muted',style:'font-size:13px;margin:0'},'Лайки и подписки не учитываются в XP — намеренно.'));
  var cmp=el('div',{'class':'cmp'});f.appendChild(cmp);
  function rc(){
   var sv=m.self.filter(function(s){return s>0;});var pv=m.peer.map(num).filter(function(v){return v!==null;});
   var t='Четыре взгляда на видео:\n· Самооценка: '+(sv.length?(sv.reduce(function(a,b){return a+b;},0)/sv.length).toFixed(1):'—')+'\n· Участники: '+(pv.length?(pv.reduce(function(a,b){return a+b;},0)/pv.length).toFixed(1)+' ('+pv.length+' из 3)':'—')+'\n· ИИ: '+(num(m.ai)!==null?num(m.ai):'—')+'\n· Реальная статистика: '+(hasStats(m)?'доля досмотра '+Math.round(ratio(m)*100)+'%':'не внесена (нужны просмотры, среднее время и длина)');
   var co=compare(i);
   if(co&&!co.enough)t+='\n\nСравнение со своими видео: пока мало данных ('+co.count+' из 3 прошлых видео со статистикой). Выводов по одному видео не делаем.';
   if(co&&co.enough)t+='\n\nСравнение только с вашими прошлыми видео ('+co.count+' шт.):\n'+co.rows.join('\n')+(co.grow?'\n+50 XP за рост навыка удержания.':'');
   if(sv.length&&co&&co.enough&&!co.grow)t+='\n\nЕсли оценки высокие, а досмотр ниже вашей обычной доли — посмотрите на графике удержания, на какой секунде уходят зрители.';
   cmp.textContent=t;
  }
  rc();
  // итог
  f.appendChild(el('b',null,'7. Улучшение'));
  var ls=el('label',null,'Результат эксперимента');var sel=el('select');Object.keys(RES).forEach(function(k){sel.appendChild(el('option',{value:k},RES[k]));});sel.value=m.result;sel.onchange=function(){m.result=sel.value;upd();};ls.appendChild(sel);f.appendChild(ls);
  f.appendChild(field('Что улучшу в следующем видео',m.improve,function(v){m.improve=v;upd();},{rows:2}));
  function status(){var miss=[];if(!m.hyp.trim())miss.push('гипотеза');if(!validUrl(m.url))miss.push('ссылка на видео');if(!m.self.every(function(s){return s>0;}))miss.push('самооценка');if(!m.improve.trim())miss.push('«что улучшу»');var r=missionXP(i);return miss.length?'Чтобы засчитать миссию, не хватает: '+miss.join(', '):'Миссия засчитана: '+(r.hook+r.analytics)+' XP';}
  var st=el('p',{'class':'state rule'},status());f.appendChild(st);
  var nb=el('button',{'class':'btn primary',type:'button'},'Обновить');nb.onclick=function(){renderMissions();renderTop();toast(complete(x.id)?'Миссия засчитана':'Миссия сохранена');};f.appendChild(nb);
  det.appendChild(f);c.appendChild(det);box.appendChild(c);
 });
}
function renderModes(){
 var bx=$('#modeBtns');bx.innerHTML='';
 Object.keys(MODES).forEach(function(k){var m=MODES[k];var btn=el('button',{type:'button'},m.name);if(S.mode===k)btn.className='on';btn.onclick=function(){S.mode=k;save();renderModes();$('#dayForm').mode.value=k;};bx.appendChild(btn);});
 var m=MODES[S.mode]||MODES.normal,body=$('#modeBody');body.innerHTML='';
 body.appendChild(el('b',null,m.time));var ul=el('ul');m.items.forEach(function(x){ul.appendChild(el('li',null,x));});body.appendChild(ul);
}
function delBtn(arr,i,re){var b=el('button',{'class':'del',title:'Удалить',type:'button'},'×');b.onclick=function(e){e.stopPropagation();if(confirm('Удалить запись?')){arr.splice(i,1);save();re();renderTop();}};return b;}
function sortDesc(a){return a.map(function(x,i){return [x,i];}).sort(function(p,q){return p[0].date<q[0].date?1:-1;});}
function renderDays(){
 var ul=$('#dayList');ul.innerHTML='';
 sortDesc(S.days).forEach(function(p){var d=p[0];var li=el('li',null,(d.done?'✅ ':'⬜ ')+d.date+' · '+((MODES[d.mode]||{}).name||'')+'\nЗадача: '+d.task+(d.uncert?'\nНеопределённость: '+d.uncert:''));
  li.style.cursor='pointer';li.title='Нажми, чтобы отметить выполнение';li.onclick=function(){d.done=!d.done;save();renderDays();};
  li.appendChild(delBtn(S.days,p[1],renderDays));ul.appendChild(li);});
}
function renderHelps(){
 var ul=$('#helpList');ul.innerHTML='';
 sortDesc(S.helps).forEach(function(p){var h=p[0];var li=el('li',null,h.date+(h.url?' · '+h.url:'')+'\n👍 '+h.good+'\n🔧 '+h.fix);li.appendChild(delBtn(S.helps,p[1],renderHelps));ul.appendChild(li);});
}
function repText(r){return 'Еженедельный отчёт — '+r.date+'\n\n1. Чему я научился?\n'+(r.q1||'—')+'\n\n2. Что я проверил?\n'+(r.q2||'—')+'\n\n3. Что узнал о своих видео или зрителях?\n'+(r.q3||'—')+'\n\n4. Какой следующий шаг?\n'+(r.q4||'—');}
function renderReps(){
 var ul=$('#repList');ul.innerHTML='';
 sortDesc(S.reports).forEach(function(p){var li=el('li',null,repText(p[0]));var cp=el('button',{'class':'btn',type:'button',style:'margin-top:8px'},'Скопировать');cp.onclick=function(){copy(repText(p[0]));};li.appendChild(el('br'));li.appendChild(cp);li.appendChild(delBtn(S.reports,p[1],renderReps));ul.appendChild(li);});
}
function copy(t){
 function fb(){var a=el('textarea');a.value=t;document.body.appendChild(a);a.select();try{document.execCommand('copy');toast('Скопировано');}catch(e){toast('Не удалось скопировать');}a.remove();}
 if(navigator.clipboard&&window.isSecureContext)navigator.clipboard.writeText(t).then(function(){toast('Скопировано');},fb);else fb();
}
function init(){
 var df=$('#dayForm');Object.keys(MODES).forEach(function(k){df.mode.appendChild(el('option',{value:k},MODES[k].name));});
 df.date.value=today();df.mode.value=S.mode;
 df.onsubmit=function(e){e.preventDefault();S.days.push({date:df.date.value,mode:df.mode.value,task:df.task.value.trim(),uncert:df.uncert.value.trim(),done:df.done.checked});save();df.task.value='';df.uncert.value='';df.done.checked=false;renderDays();toast('Запись добавлена');};
 var hf=$('#helpForm');hf.date.value=today();
 hf.onsubmit=function(e){e.preventDefault();S.helps.push({date:hf.date.value,url:hf.url.value.trim(),good:hf.good.value.trim(),fix:hf.fix.value.trim()});save();hf.url.value='';hf.good.value='';hf.fix.value='';renderHelps();renderTop();toast('+25 XP за честный отзыв');};
 var rf=$('#repForm');rf.date.value=today();
 function cur(){return {date:rf.date.value||today(),q1:rf.q1.value.trim(),q2:rf.q2.value.trim(),q3:rf.q3.value.trim(),q4:rf.q4.value.trim()};}
 rf.onsubmit=function(e){e.preventDefault();S.reports.push(cur());save();['q1','q2','q3','q4'].forEach(function(k){rf[k].value='';});renderReps();toast('Отчёт сохранён');};
 $('#copyRep').onclick=function(){copy(repText(cur()));};
 $('#exportBtn').onclick=function(){var b=new Blob([JSON.stringify(S,null,2)],{type:'application/json'});var a=el('a',{href:URL.createObjectURL(b),download:'tiktok-system-'+today()+'.json'});document.body.appendChild(a);a.click();a.remove();};
 $('#importFile').onchange=function(e){var f=e.target.files[0];if(!f)return;var r=new FileReader();r.onload=function(){try{var d=JSON.parse(r.result);if(!d||typeof d.missions!=='object'||!Array.isArray(d.days))throw 0;if(!confirm('Заменить текущие данные импортированными?'))return;S=d;norm();save();all();toast('Данные импортированы');}catch(x){alert('Неверный файл');}};r.readAsText(f);e.target.value='';};
 $('#resetBtn').onclick=function(){if(confirm('Удалить все данные? Сначала лучше сделать экспорт.')){S=def();save();all();toast('Данные сброшены');}};
 all();
}
function all(){renderTop();renderBlock();renderMissions();renderModes();renderDays();renderHelps();renderReps();var df=$('#dayForm');if(df)df.mode.value=S.mode;}
init();
})();

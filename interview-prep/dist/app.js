import { problems, weekData } from './data.js';





const key='interview-prep-v1';
const initial      ={week:1,budget:12,done:{},move:{},hours:{},reviews:{},notes:[],mocks:[]};
function restore(raw            )       {
  if(!raw) return structuredClone(initial);
  const data=JSON.parse(raw);
  if(!data || !Number.isInteger(data.week) || data.week<1 || data.week>34 || ![10,11,12,13,14,15].includes(data.budget)) throw Error('Invalid settings');
  for(const field of ['done','move','hours','reviews']) if(!data[field] || typeof data[field]!=='object' || Array.isArray(data[field])) throw Error('Invalid tracker');
  for(const field of ['notes','mocks']) if(!Array.isArray(data[field]) || data[field].some((entry      )=>!entry || !['id','date','title','body','detail'].every(key=>typeof entry[key               ]==='string'))) throw Error('Invalid entries');
  if(Object.values(data.move).some((w    )=>!Number.isInteger(w)||w<1||w>34) || Object.values(data.hours).some((h    )=>typeof h!=='number'||h<0||h>168) || Object.values(data.done).some(v=>typeof v!=='boolean') || Object.values(data.reviews).some((r    )=>!r||typeof r.title!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(r.date)||![0,1,2,3].includes(r.step))) throw Error('Invalid progress');
  return data;
}
let state      ;
try {state=restore(localStorage.getItem(key));} catch {state=structuredClone(initial);}
const checkpointTitle='Contains Duplicate spaced review';
const checkpointId='lesson2-contains-duplicate-review';
const passed=['3A · Implement add()', '3B · Implement resize()', '3C · Integrate resize() into add()', '3D · Implement get(index)', '3E · Implement remove(index)'];
function updateLesson2(data      ){
  if(data.lesson2Updated===true)return;
  data.done.j1=true;
  data.done.j2=true;
  data.reviews[checkpointId]??={title:checkpointTitle,date:dateAfter(),step:0};
  data.lesson2Updated=true;
}
const plan       =weekData.flatMap(([,java,design],i)=>[
  {id:'j'+(i+1),title:java,week:i+1,lane:'Java'},
  {id:'d'+(i+1),title:design,week:i+1,lane:i===13||i===28?'Behavioral':'Full-stack / system design'}
]);
const problemTasks=problems.map(p=>({id:p.id,title:p.name,week:p.week,lane:p.topic}));
const future       =[
  {id:'future-nextjs',week:11,lane:'Full-stack / system design',title:'Next.js · Build a searchable UI with URL state and server-rendered results'},
  {id:'future-spring',week:16,lane:'Full-stack / system design',title:'Spring Boot microservices · Split a workflow into two services and test failure handling'},
  {id:'future-postgres',week:20,lane:'Full-stack / system design',title:'PostgreSQL · Compare query plans, indexes, and transaction isolation'},
  {id:'future-elastic',week:22,lane:'Full-stack / system design',title:'Elasticsearch · Index synthetic records and compare relevance with filters'},
  {id:'future-kibana',week:26,lane:'Full-stack / system design',title:'Kibana · Build a Discover view and dashboard from synthetic service logs'}
];
const all=[...plan,...problemTasks,...future];
const nav=[['overview','◈','Overview'],['roadmap','▤','Roadmap'],['practice','⌘','DSA & NeetCode'],['reviews','◷','Review queue'],['mocks','◇','Mock interviews'],['notes','✎','Notes']];
let view=nav.some(([id])=>id===location.hash.slice(1))?location.hash.slice(1):'overview';
let selected=state.week, query='', topic='', status='', lane='all';
const expanded=new Set        ();
const el=                       (id       )=>document.getElementById(id)     ;
const dialog=el                   ('dialog');
const esc=(value        )=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c] ));
const pad=(n       )=>String(n).padStart(2,'0');
function dateAfter(days=0){const date=new Date();date.setDate(date.getDate()+days);return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())}`;}
function save(message        ){
  try {localStorage.setItem(key,JSON.stringify(state));if(message) notice(message);} catch {notice('Browser storage is unavailable. Export a backup to keep your changes.');}
}
let timer       ;
function notice(message       ){el('notice').textContent=message;clearTimeout(timer);timer=window.setTimeout(()=>el('notice').textContent='',3500);}
const scheduled=(t     )=>state.move[t.id]??t.week;
const forWeek=(week       )=>all.filter(t=>scheduled(t)===week);
const due=()=>Object.entries(state.reviews).filter(([,r])=>r.date<=dateAfter());
const count=(tasks       )=>tasks.filter(t=>state.done[t.id]).length;
function track(value       ,max       ,label       ){const percent=max?Math.min(100,value/max*100):0;return `<div class="track" role="progressbar" aria-label="${label}" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${Math.round(percent)}"><i style="width:${percent}%"></i></div>`;}
const btn=(action       ,label       ,id='',cls='')=>`<button type="button" class="${cls}" data-action="${action}" data-id="${esc(id)}">${label}</button>`;
const heading=(title       ,sub       )=>`<div class="intro"><h1>${title}</h1><p>${sub}</p></div>`;
const empty=(message       )=>`<div class="empty">${message}</div>`;
function taskRow(task     , showMove=true){
  const problem=problems.find(p=>p.id===task.id);
  return `<div class="row"><input type="checkbox" id="check-${task.id}" data-check="${task.id}" ${state.done[task.id]?'checked':''}><div class="grow"><label class="task-label" for="check-${task.id}">${esc(task.title)}</label><small>${esc(task.lane)} · Week ${scheduled(task)}${problem?' · <a target="_blank" rel="noopener" href="https://neetcode.io/practice/practice/neetcode150">Practice list</a>':''}</small></div>${showMove&&!state.done[task.id]?btn('move','Move',task.id):''}${btn('review',state.reviews[task.id]?'Review date':'Review',task.id)}</div>`;
}
function overview(){
  const week=state.week, tasks=forWeek(week), completed=count(all), solved=count(problemTasks), hours=state.hours[week]??0;
  const upcoming=all.filter(t=>!state.done[t.id]).sort((a,b)=>scheduled(a)-scheduled(b)).slice(0,5);
  const reviewPending=Boolean(state.reviews[checkpointId]);
  return heading('Preparation dashboard','Your 8-month roadmap from easy-level practice to competitive engineering interviews.')+
    `<section class="hero"><div><span class="eyebrow">Lesson 2 · Current checkpoint</span><h2>${checkpointTitle}</h2><p>Implement containsDuplicate(int[] nums) independently in Java in expected O(n) time. Explain the time and space costs in your own words.</p><p>${reviewPending?'Review scheduled':'Review cycle complete'} · Mastery unverified</p></div>${btn('checkpoint','Resume checkpoint','','primary')}</section>
    <section class="metrics" aria-label="Progress summary">
    <div class="metric"><small>Overall progress</small><b>${Math.round(completed/all.length*100)}%</b><small>${completed} / ${all.length} tasks complete</small>${track(completed,all.length,'Overall progress')}</div>
    <div class="metric"><small>NeetCode coverage</small><b>3 / 150</b><small>Encountered at this checkpoint · ${solved} marked solved</small>${track(3,150,'NeetCode encountered at checkpoint')}</div>
    <div class="metric"><small>Interview readiness</small><b>5%</b><small>Provisional estimate</small>${track(5,100,'Provisional readiness')}</div>
    <div class="metric"><small>Hours this week</small><b>${hours} / ${state.budget}</b><small>Study hours logged</small>${track(hours,state.budget,'Weekly hours')}</div>
    <div class="metric"><small>Mock interviews</small><b>${state.mocks.filter(m=>m.detail.startsWith('Completed')).length}</b><small>Completed sessions</small></div></section>
    <div class="columns"><section class="panel"><div class="head"><h2>Upcoming tasks</h2>${btn('nav','View roadmap','roadmap')}</div>${upcoming.map(t=>taskRow(t)).join('')||empty('All planned tasks are complete.')}</section>
    <div class="stack"><section class="panel"><div class="head"><h2>DynamicArray checkpoints</h2><span class="pill">5 / 5 complete</span></div>${passed.map(label=>`<div class="row"><span class="tag" aria-label="Complete">✓</span> ${esc(label)}</div>`).join('')}</section><section class="panel"><div class="head"><h2>Week ${week} focus</h2><span class="pill">${count(tasks)} / ${tasks.length} complete</span></div><h3>${esc(weekData[week-1][0])}</h3>${track(count(tasks),tasks.length,'Current week progress')}<div class="weekly">${Array.from({length:7},(_,i)=>week+i-3).map(w=>w>=1&&w<=34?btn('week',pad(w),String(w),w===week?'selected':''):'<span></span>').join('')}</div>${btn('hours','Log study hours')}</section>
    <section class="panel"><div class="head"><h2>Reviews due</h2><span class="pill">${due().length}</span></div>${due().slice(0,3).map(([id,r])=>`<div class="row"><div class="grow">${esc(r.title)}<small>${r.date}</small></div>${btn('reviewed','Reviewed',id)}</div>`).join('')||'<p>Completing a problem schedules reviews after 1, 3 and 7 days between attempts.</p>'}<div class="toolbar">${btn('nav','Open review queue','reviews')}</div></section></div></div>`;
}
function roadmap(){
  const tasks=forWeek(selected), previous=all.filter(t=>scheduled(t)<selected&&!state.done[t.id]);
  const current=tasks.filter(t=>lane==='all'||(lane==='problem'?t.id.startsWith('p-'):t.lane===lane));
  const dsaHours=Math.ceil(state.budget/2), javaHours=state.budget>=14?3:2, designHours=state.budget-dsaHours-javaHours-1;
  return heading('Week-by-week roadmap','34 weeks of coding, Java, full-stack design, and interview practice.')+
    `<section class="panel"><div class="head"><h2>Week ${selected} · ${esc(weekData[selected-1][0])}</h2><span class="pill">${count(tasks)} / ${tasks.length} done</span></div><p>${dsaHours}h coding · ${javaHours}h Java · ${designHours}h design or mocks · 1h review</p>${track(count(tasks),tasks.length,'Selected week progress')}<div class="toolbar">${btn('current','Set current week')}${btn('roll','Move unfinished tasks')}${previous.length?btn('catchup','Catch up earlier work'):''}<select id="lane" aria-label="Filter task type">${['all','Java','problem','Full-stack / system design','Behavioral'].map(k=>`<option value="${k}" ${lane===k?'selected':''}>${k==='all'?'All tasks':k==='problem'?'NeetCode':k}</option>`).join('')}</select></div>${current.map(t=>taskRow(t)).join('')||empty('No tasks in this view.')}</section>
    <div class="week-list">${weekData.map(([title],i)=>btn('week',`Week ${i+1}<small>${esc(title)} · ${count(forWeek(i+1))}/${forWeek(i+1).length}</small>`,String(i+1),`weekbtn ${i+1===selected?'selected':''}`)).join('')}</div>`;
}
const topics=[...new Set(problems.map(p=>p.topic))];
function filterPractice(){
  const result=problems.filter(p=>(!topic||p.topic===topic)&&p.name.toLowerCase().includes(query.toLowerCase())&&(!status||Boolean(state.done[p.id])===(status==='done')));
  el('problem-list').innerHTML=topics.filter(g=>result.some(p=>p.topic===g)).map(g=>{
    const full=problemTasks.filter(t=>t.lane===g), matching=result.filter(p=>p.topic===g);
    return `<details class="panel topic" data-topic="${esc(g)}" ${expanded.has(g)||query||topic||status||g===topics[0]?'open':''}><summary>${esc(g)} · ${count(full)} / ${full.length}</summary>${track(count(full),full.length,'Topic progress')}${matching.map(p=>taskRow(all.find(t=>t.id===p.id) )).join('')}</details>`;
  }).join('')||empty('No matching problems.');
}
function practice(){
  return heading('DSA & NeetCode 150','Check off problems by pattern. Each solved problem enters the review queue.')+
    `<section class="panel"><div class="head"><h2>Problem checklist</h2><span class="pill">${count(problemTasks)} / 150 solved</span></div>${track(count(problemTasks),150,'NeetCode progress')}<div class="toolbar"><input id="query" type="search" value="${esc(query)}" placeholder="Search problems" aria-label="Search problems"><select id="topic" aria-label="Topic"><option value="">All topics</option>${topics.map(g=>`<option ${topic===g?'selected':''}>${esc(g)}</option>`).join('')}</select><select id="status" aria-label="Completion"><option value="">Any status</option><option value="todo" ${status==='todo'?'selected':''}>Unsolved</option><option value="done" ${status==='done'?'selected':''}>Solved</option></select></div><div id="problem-list"></div></section>`;
}
function reviews(){const items=Object.entries(state.reviews).sort(([,a],[,b])=>a.date.localeCompare(b.date));return heading('Review queue','Re-solve from memory, explain your approach aloud, and record any mistakes.')+`<section class="panel"><div class="head"><h2>Scheduled reviews</h2>${btn('customReview','Add review','','primary')}</div>${items.map(([id,r])=>`<div class="row"><div class="grow">${esc(r.title)}<small>${r.date} · ${r.date<=dateAfter()?'Due':'Upcoming'} · Pass ${r.step+1} / 3</small></div>${btn('review','Edit date',id)}${btn('reviewed','Reviewed',id)}</div>`).join('')||empty('Your review queue is clear.')}</section>`;}
function entries(kind                ){
  const mock=kind==='mocks';
  return heading(mock?'Mock interviews':'Mistakes & explanations',mock?'Track planned and completed coding, design, and behavioral interviews.':'Build a record of what went wrong and explain the fix in your own words.')+
    `<section class="panel"><div class="head"><h2>${mock?'Interview log':'Study notes'}</h2>${btn('entry',mock?'Add mock':'Add note',kind,'primary')}</div>${state[kind].slice().sort((a,b)=>b.date.localeCompare(a.date)).map(entry=>`<article class="row"><div class="grow"><h3>${esc(entry.title)}</h3><small>${esc(entry.date)}${mock?' · '+esc(entry.detail):''}</small><p class="pre">${esc(entry.body)}</p>${!mock&&entry.detail?`<p class="pre"><strong>My explanation</strong><br>${esc(entry.detail)}</p>`:''}</div>${btn('entry','Edit',kind+':'+entry.id)}</article>`).join('')||empty(mock?'No mock interviews logged.':'No notes yet.')}</section>`;
}
function render(){
  el('nav').innerHTML=nav.map(([id,icon,label])=>`<button type="button" data-action="nav" data-id="${id}" class="${id===view?'active':''}" ${id===view?'aria-current="page"':''}><span aria-hidden="true">${icon}</span>${label}</button>`).join('');
  el('top').innerHTML=`<span class="eyebrow">Interview preparation</span><div class="actions"><span class="pill">Week ${state.week} of 34</span>${btn('settings',state.budget+' h / week')}</div>`;
  el('page').innerHTML=view==='roadmap'?roadmap():view==='practice'?practice():view==='reviews'?reviews():view==='notes'||view==='mocks'?entries(view):overview();
  if(view==='practice')filterPractice();
}
function navigate(next       ){
  view=next;history.replaceState(null,'','#'+next);render();window.scrollTo(0,0);
}
function modal(title       ,body       ,submit                       ,label='Save'){
  dialog.innerHTML=`<div class="dialog-head"><h2 id="dialog-title">${title}</h2>${btn('close','Close')}</div><form class="form">${body}${submit?`<button class="primary" type="submit">${label}</button>`:''}</form>`;
  dialog.setAttribute('aria-labelledby','dialog-title');
  if(!dialog.open)dialog.showModal();
  dialog.querySelector('form') .onsubmit=e=>{e.preventDefault();if(submit){submit(new FormData(e.currentTarget                   ));dialog.close();render();}};
}
const input=(label       ,name       ,value        ,type='text',extra='')=>`<label>${label}<input name="${name}" type="${type}" value="${esc(value)}" required ${extra}></label>`;
const area=(label       ,name       ,value       )=>`<label>${label}<textarea name="${name}">${esc(value)}</textarea></label>`;
const field=(f         ,name       )=>String(f.get(name)??'').trim();
const weekSelect=(value       )=>`<label>Destination week<select name="week">${weekData.map(([w],i)=>`<option value="${i+1}" ${i+1===value?'selected':''}>Week ${i+1} · ${esc(w)}</option>`).join('')}</select></label>`;
function moveTasks(tasks       ,target       ){
  if(!tasks.length){notice('There are no unfinished tasks to move.');return;}
  modal('Reschedule work',`<p>Move ${tasks.length===1?esc(tasks[0].title):tasks.length+' unfinished tasks'} to a different week.</p>`+weekSelect(target),f=>{
    const week=Number(f.get('week'));tasks.forEach(t=>state.move[t.id]=week);save(`Work moved to week ${week}.`);
  },'Move work');
}
function editEntry(ref       ){
  const [kind,id]=ref.split(':')                                      , mock=kind==='mocks', entry=state[kind].find(e=>e.id===id);
  const [progress='Planned',round='Coding',score='']=entry?.detail.split(' · ')??[];
  const choice=(label       ,name       ,options         ,selected       )=>`<label>${label}<select name="${name}">${options.map(x=>`<option ${x===selected?'selected':''}>${x}</option>`).join('')}</select></label>`;
  modal(entry?(mock?'Edit mock':'Edit note'):(mock?'Add mock':'Add note'),input('Title','title',entry?.title)+input('Date','date',entry?.date??dateAfter(),'date')+
    (mock?choice('Status','status',['Planned','Completed'],progress)+choice('Round','round',['Coding','System design','Behavioral','Full loop'],round)+choice('Rating','score',['Unrated','1 / 5','2 / 5','3 / 5','4 / 5','5 / 5'],score)+area('Feedback and next steps','body',entry?.body??''):area('Mistake or observation','body',entry?.body??'')+area('Explanation in my own words','detail',entry?.detail??''))+
    (entry?btn('delete','Delete entry',ref):''), f=>{
      const data={id:id??crypto.randomUUID(),title:field(f,'title'),date:field(f,'date'),body:field(f,'body'),detail:mock?[field(f,'status'),field(f,'round'),field(f,'score')].join(' · '):field(f,'detail')};
      state[kind]=[...state[kind].filter(e=>e.id!==data.id),data];save('Entry saved.');
    });
}
function toggle(id       ,checked        ){
  state.done[id]=checked;
  const problem=problems.find(p=>p.id===id);
  if(problem&&checked&&!state.reviews[id])state.reviews[id]={title:problem.name,date:dateAfter(1),step:0};
  save();render();document.getElementById('check-'+id)?.focus({preventScroll:true});
}
document.addEventListener('toggle',e=>{const t=e.target                      ;if(t.dataset?.topic&&t.isConnected){if(t.open)expanded.add(t.dataset.topic);else expanded.delete(t.dataset.topic);}},true);
document.addEventListener('input',e=>{const t=e.target                    ;if(t.id==='query'){query=t.value;filterPractice();}});
document.addEventListener('change',async e=>{
  const t=e.target                    ;
  if(t.dataset.check){toggle(t.dataset.check,t.checked);return;}
  if(t.id==='topic'){topic=t.value;filterPractice();}
  if(t.id==='status'){status=t.value;filterPractice();}
  if(t.id==='lane'){lane=t.value;render();el('lane').focus();}
  if(t.id==='import'&&t.files?.[0]){
    try {const imported=restore(await t.files[0].text());state=imported;updateLesson2(state);selected=state.week;save('Backup imported.');dialog.close();render();}
    catch{notice('Choose a valid Interview Prep backup.');t.value='';}
  }
});
document.addEventListener('click',e=>{
  const button=(e.target               ).closest                   ('button[data-action]');if(!button)return;
  const {action,id=''}=button.dataset;
  switch(action){
    case 'nav': if(id==='roadmap')selected=state.week;navigate(id);break;
    case 'week': selected=Number(id);if(view!=='roadmap')navigate('roadmap');else render();break;
    case 'current': state.week=selected;save(`Week ${selected} is now current.`);render();break;
    case 'hours': modal('Log study hours',input('Total hours for week '+state.week,'hours',state.hours[state.week]??0,'number','min="0" max="168" step="0.25"'),f=>{state.hours[state.week]=Number(f.get('hours'));save('Hours updated.');});break;
    case 'checkpoint':
      modal('Lesson 2 · Contains Duplicate','<p>Implement <code>public boolean containsDuplicate(int[] nums)</code> independently in Java using standard collections. Aim for expected O(n) time. Test an empty array, distinct values, and a repeated value. Explain the approach and its space cost in your notes.</p>'+btn('navFromDialog','Open review queue','reviews')+btn('navFromDialog','Open notes','notes'));break;
    case 'navFromDialog': dialog.close();navigate(id);break;
    case 'move': {const task=all.find(t=>t.id===id);if(task)moveTasks([task],Math.min(34,scheduled(task)+1));break;}
    case 'roll': moveTasks(forWeek(selected).filter(t=>!state.done[t.id]),Math.min(34,selected+1));break;
    case 'catchup': moveTasks(all.filter(t=>scheduled(t)<selected&&!state.done[t.id]),selected);break;
    case 'review':
    case 'customReview': {
      const review=state.reviews[id], task=all.find(t=>t.id===id);
      modal('Schedule a review',(!review&&!task?input('Review topic','title',''):`<p>${esc(review?.title??task?.title)}</p>`)+input('Review date','date',review?.date??dateAfter(1),'date'),f=>{
        state.reviews[id||crypto.randomUUID()]={title:review?.title??task?.title??field(f,'title'),date:field(f,'date'),step:review?.step??0};save('Review scheduled.');
      });break;
    }
    case 'reviewed':{
      const r=state.reviews[id];if(!r)break;
      if(r.step>=2){delete state.reviews[id];save('Review cycle complete.');}else{r.step++;r.date=dateAfter(r.step===1?3:7);save('Next review scheduled for '+r.date+'.');}
      render();break;
    }
    case 'entry': editEntry(id);break;
    case 'delete':{
      const [kind,entry]=id.split(':')                            ;
      modal('Delete this entry?','<p>This removes the entry from the tracker.</p>',()=>{state[kind]=state[kind].filter(e=>e.id!==entry);save('Entry deleted.');},'Delete entry');break;
    }
    case 'settings': modal('Settings & backup',input('Weekly study target (hours)','budget',state.budget,'number','min="10" max="15" step="1"')+`<p>Progress, notes, reviews, and mock interviews are stored in this browser. Importing a backup replaces this browser’s tracker.</p>${btn('export','Export backup')}<label>Import a backup<input id="import" type="file" accept=".json,application/json"></label>`,f=>{state.budget=Number(f.get('budget'));save('Study target updated.');});break;
    case 'export': {
      const url=URL.createObjectURL(new Blob([JSON.stringify(state,null,2)],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download='interview-prep-backup.json';a.click();window.setTimeout(()=>URL.revokeObjectURL(url),1000);break;
    }
    case 'close': dialog.close();break;
  }
});
if(state.lesson2Updated!==true){updateLesson2(state);save();}
render();

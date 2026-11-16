const{verify,cookies}=require('./_lib');
const cut=(s,n)=>String(s||'').slice(0,n);
module.exports=async(req,res)=>{
if(req.method!=='POST')return res.status(405).json({error:'Alleen POST.'});
const s=verify(cookies(req).session);if(!s)return res.status(401).json({error:'Log eerst in met Discord.'});
const b=req.body||{};if(!b.kanaal||!b.onderwerp)return res.status(400).json({error:'Vul kanaalnaam en onderwerp in.'});
const f=(name,v)=>({name,value:cut(v,1000)||'-'});
try{const r=await fetch(process.env.DISCORD_WEBHOOK_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({allowed_mentions:{parse:[]},embeds:[{title:'Nieuwe bestelling',color:0x1F5FD6,author:{name:s.name,icon_url:s.avatar},description:`Discord: <@${s.id}> (${s.id})`,fields:[f('Kanaal',cut(b.kanaal,100)),f('Onderwerp',cut(b.onderwerp,200)),f('Aantal',cut(b.aantal,20)),f('Deadline',cut(b.deadline,20)),f('Bericht',b.bericht)],timestamp:new Date().toISOString()}]})});
if(!r.ok)throw new Error('webhook');res.json({ok:true})}catch(e){res.status(502).json({error:'Versturen mislukt. Probeer het later opnieuw.'})}};

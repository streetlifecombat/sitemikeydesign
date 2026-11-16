const{verify,cookies}=require('./_lib');const db=require('./_db');
module.exports=async(req,res)=>{
res.setHeader('Cache-Control','no-store');
const s=verify(cookies(req).session);if(!s)return res.status(401).json({error:'Niet ingelogd.'});
const key='chat:'+s.id;
try{
if(req.method==='POST'){
const text=String((req.body||{}).text||'').trim().slice(0,2000);if(!text)return res.status(400).json({error:'Leeg bericht.'});
const n=await db('INCR','rl:'+s.id);if(n===1)await db('EXPIRE','rl:'+s.id,10);if(n>8)return res.status(429).json({error:'Rustig aan, probeer het zo opnieuw.'});
const ts=Date.now();
await db('RPUSH',key,JSON.stringify({from:'k',text,ts}));await db('LTRIM',key,-200,-1);
await db('SET','meta:'+s.id,JSON.stringify({id:s.id,name:s.name,avatar:s.avatar,last:text.slice(0,80),from:'k',ts}));
await db('ZADD','chats',ts,s.id);
if(process.env.DISCORD_WEBHOOK_URL){try{await fetch(process.env.DISCORD_WEBHOOK_URL,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({allowed_mentions:{parse:[]},content:'Nieuw bericht van **'+s.name.replace(/[*_`~|>]/g,'')+'**: '+text.slice(0,300)+'\nBeantwoorden: '+(process.env.SITE_URL||'')+'/admin.html'})})}catch(e){}}
return res.json({ok:true})}
const m=await db('LRANGE',key,-100,-1);res.json({messages:(m||[]).map(x=>JSON.parse(x))})
}catch(e){res.status(500).json({error:'Chat is tijdelijk niet beschikbaar.'})}};

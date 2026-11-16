const{verify,cookies}=require('./_lib');const db=require('./_db');
const okId=v=>/^\d{5,25}$/.test(String(v));
module.exports=async(req,res)=>{res.setHeader('Cache-Control','no-store');
const s=verify(cookies(req).session);if(!s||!process.env.OWNER_DISCORD_ID||s.id!==process.env.OWNER_DISCORD_ID)return res.status(403).json({error:'Geen toegang.'});
try{
if(req.method==='POST'){const{user,text}=req.body||{};const t=String(text||'').trim().slice(0,2000);if(!okId(user)||!t)return res.status(400).json({error:'Ongeldig.'});
const ts=Date.now();await db('RPUSH','chat:'+user,JSON.stringify({from:'o',text:t,ts}));await db('LTRIM','chat:'+user,-200,-1);
const mt=await db('GET','meta:'+user);const m=mt?JSON.parse(mt):{id:String(user),name:'Klant'};m.last=t.slice(0,80);m.from='o';m.ts=ts;await db('SET','meta:'+user,JSON.stringify(m));await db('ZADD','chats',ts,String(user));return res.json({ok:true})}
const u=req.query&&req.query.user;
if(u){if(!okId(u))return res.status(400).json({error:'Ongeldig.'});const m=await db('LRANGE','chat:'+u,-100,-1);return res.json({messages:(m||[]).map(x=>JSON.parse(x))})}
const ids=await db('ZREVRANGE','chats',0,49);const metas=ids&&ids.length?await db('MGET',...ids.map(i=>'meta:'+i)):[];res.json({chats:(metas||[]).filter(Boolean).map(x=>JSON.parse(x))})
}catch(e){res.status(500).json({error:'Databasefout.'})}};

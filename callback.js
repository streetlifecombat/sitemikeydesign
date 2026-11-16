const{sign,cookies,cookie}=require('./_lib');
module.exports=async(req,res)=>{
const{code,state}=req.query||{};const c=cookies(req);
if(!code||!state||state!==c.oauth_state){res.statusCode=400;return res.end('Ongeldige login. Probeer opnieuw.')}
try{
const t=await(await fetch('https://discord.com/api/oauth2/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({client_id:process.env.DISCORD_CLIENT_ID,client_secret:process.env.DISCORD_CLIENT_SECRET,grant_type:'authorization_code',code,redirect_uri:process.env.SITE_URL+'/api/callback'})})).json();
if(!t.access_token)throw new Error('geen token');
const u=await(await fetch('https://discord.com/api/users/@me',{headers:{Authorization:'Bearer '+t.access_token}})).json();
const user={id:u.id,name:u.global_name||u.username,avatar:u.avatar?`https://cdn.discordapp.com/avatars/${u.id}/${u.avatar}.png?size=64`:'https://cdn.discordapp.com/embed/avatars/0.png'};
res.setHeader('Set-Cookie',[cookie('session',sign({...user,exp:Date.now()+7*864e5}),604800),cookie('oauth_state','',0)]);
res.writeHead(302,{Location:'/#bestel'});res.end()}catch(e){res.statusCode=500;res.end('Inloggen mislukt. Probeer opnieuw.')}};

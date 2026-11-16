const crypto=require('crypto');const{cookie}=require('./_lib');
module.exports=(req,res)=>{const state=crypto.randomBytes(16).toString('hex');
res.setHeader('Set-Cookie',cookie('oauth_state',state,600));
const p=new URLSearchParams({client_id:process.env.DISCORD_CLIENT_ID,redirect_uri:process.env.SITE_URL+'/api/callback',response_type:'code',scope:'identify',state});
res.writeHead(302,{Location:'https://discord.com/api/oauth2/authorize?'+p});res.end()};

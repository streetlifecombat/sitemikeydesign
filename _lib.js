const crypto=require('crypto');
const key=()=>process.env.SESSION_SECRET||'';
const mac=b=>crypto.createHmac('sha256',key()).update(b).digest('base64url');
exports.sign=o=>{const b=Buffer.from(JSON.stringify(o)).toString('base64url');return b+'.'+mac(b)};
exports.verify=t=>{if(!t||!key())return null;const[b,s]=t.split('.');if(!b||!s)return null;const e=Buffer.from(mac(b)),a=Buffer.from(s);if(a.length!==e.length||!crypto.timingSafeEqual(a,e))return null;try{const o=JSON.parse(Buffer.from(b,'base64url').toString());return o.exp>Date.now()?o:null}catch(x){return null}};
exports.cookies=req=>{const o={};(req.headers.cookie||'').split(';').forEach(c=>{const i=c.indexOf('=');if(i>0)o[c.slice(0,i).trim()]=c.slice(i+1).trim()});return o};
exports.cookie=(n,v,age)=>`${n}=${v}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${age}`;

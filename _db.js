const U=process.env.KV_REST_API_URL||process.env.UPSTASH_REDIS_REST_URL,T=process.env.KV_REST_API_TOKEN||process.env.UPSTASH_REDIS_REST_TOKEN;
module.exports=async(...a)=>{const r=await fetch(U,{method:'POST',headers:{Authorization:'Bearer '+T},body:JSON.stringify(a)});const j=await r.json();if(j.error)throw new Error(j.error);return j.result};

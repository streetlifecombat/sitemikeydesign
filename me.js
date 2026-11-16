const{verify,cookies}=require('./_lib');
module.exports=(req,res)=>{const s=verify(cookies(req).session);res.setHeader('Cache-Control','no-store');res.json(s?{user:{id:s.id,name:s.name,avatar:s.avatar},isOwner:!!process.env.OWNER_DISCORD_ID&&s.id===process.env.OWNER_DISCORD_ID}:{})};

import jwt from "jsonwebtoken";


function authMiddleware(req,res,next){
    try{
    const token=req.cookies.token;
    if(!token)return res.status(401).json({msg:"unauthorized"});
    const jwtData=jwt.verify(token,process.env.JWT_SECRET)
    if(jwtData.userId){
        req.user=jwtData ;
        next(); 
    }
    else {
        res.json({
            msg:"user not logged in"
        })
    }}
    catch(err){
        console.log(err);
        res.json({
            msg:err
        })
    }
}

export default authMiddleware;
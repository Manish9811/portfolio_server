export const checkUser = (req,res,next) => {
    const login = true;
    const loginUserName = "Hello everythiong is okey"

    if(login){
        req.data = loginUserName
        next()
    }
    else{
        return res.json({
            message : "Login First"
        })
    }
}
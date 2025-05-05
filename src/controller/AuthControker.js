const express = rquire ("express")
const auth = {}

//הוספה של סיסמא
auth.register = async(rec, res) => {
let newPassword = rec.body
try{
    let isOk = await usermodel.create(newPassword)
    if (isOk) {

    let ta = await usermodel.found({})
    res.status(200).json(ta)
    }
else
    res.status(500).send({error:"error"})
}
catch (error){
res.status(500)
res.send("<h1>error</h1>")
}
}
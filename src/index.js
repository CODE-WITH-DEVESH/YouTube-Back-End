import dotenv from "dotenv"
import connectDB from "./db/index.js";



dotenv.config( {
    path: './env'
})
connectDB
.then ( () =>{
    app.listen(process.env.PORT || 8000 , () =>{
        console.log(`Sever is Running at PORT : ${process.env.PORT}`)
    })

})
.catch( ( err) =>{
    console.log("MoNGO DB Connection failed !!! " ,err)

})










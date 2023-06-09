require('dotenv').config()
const express=require('express')
const mongoose=require('mongoose')
const cors =require('cors')
const fileupload = require('express-fileupload')
const cookieParser =require('cookie-parser')
const res = require('express/lib/response')

const app =express()
app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use(fileupload({
    useTempFiles:true
}))

// Routes
app.use('/user', require('./routes/userRouter'))


//connect to mongodb
const URI =process.env.MONGODB_URL
mongoose.connect(URI,{
    
    useNewUrlParser:true,
    useUnifiedTopology:true,
}
)
.then(() => console.log("DB connected"))
  .catch((err) => console.log("DB CONNECTION ERROR => ", err));
app.get('/',(req,res)=>{
    res.json({msg:"Wecome to website"})
})

const PORT = process.env.PORT ||3000
app.listen(PORT,()=>{
    console.log('Server is running on port',PORT)
})
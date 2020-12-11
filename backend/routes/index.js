const express = require("express")
const mysql = require("mysql2")
const cors = require("cors")

const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const session = require("express-session")

const app = express()

app.use(express.json())
app.use(cors({
    origin:["http://localhost:3000"],
    methods:["GET", "POST"],
    credentials: true
}))


app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))

app.use(session({
    key: "userId",
    secret: "proiect_purple_puffs",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60*60*24,
        httpOnly: false,
    },
}))

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "pass",
    database: "purple_puffs",
})

app.post('/inregistrare',(req,res)=> {
    
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    
    db.query("INSERT INTO users(username,email,password) VALUES (?,?,?)",[username ,email, password],
    (err,result)=> {
        console.log(err);
    }
    )
})

app.get("/autentificare",(req,res)=>{
    if(req.session.user){
        res.send({loggedIn:true, user:req.session.user})
    } else {
        res.send({loggedIn:false})
    }
})


app.post('/autentificare', (req,res)=> {
    
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password
    
    db.query("SELECT * FROM users WHERE username=? AND password=?",[username , password],
    (err,result)=> {
        if(err) { 
            res.send({err:err});
        } 
        
            if (result.length){
                req.session.user=result
                console.log(req.session.user)
                res.send(result)
            } else {
                res.send({message: "Parola sau username-ul este gresit!"})
            }
        }
    )
})

app.get('/logout', (req, res)=> {
    if (req.session.user) {
            res.clearCookie('userId');
            res.send({loggedIn: false})
            req.session.destroy()
        }
    })


app.listen(3001, ()=>{
    console.log("server pornit");
})
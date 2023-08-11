let express=require("express")
let app=express()
app.use(express.json())
app.use(function(req,res,next){
    res.header ("Access-Control-Allow-Origin","*")
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, OPTIONS, PUT, PATCH, DELETE, HEAD"
    )
    res.header (
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
        )
next();
})
var port=process.env.PORT||2410
app.listen(port,() =>console. log(`Node App listening on port ${port}!`))
let products=[{id:"A101",name:"Pepsi 300ml",price:20},
{id:"A232",name:"Diet Coke 300ml",price:25},
{id:"A102",name:"Pepsi 500ml",price:40},
{id:"A237",name:"Coke 750ml",price:72},
{id:"B034",name:"Fruits and Nuts - 40g",price:15},
{id:"B035",name:"Crackels - 100g",price:45},
{id:"B036",name:"Nutties - 20g",price:10},
{id:"B137",name:"25gm bar",price:35},
]
let users=[
    {username:"Jai",name:"Jai",password:"admin",role:"admin"},
    {username:"emp101",name:"Bob",password:"user",role:"admin"},
    {username:"emp102",name:"Steve",password:"user2",role:"user"},
    {username:"emp103",name:"Anna",password:"user3",role:"user"},
    {username:"emp104",name:"Marry",password:"user4",role:"user"}
]

app.get("/productApp/products",function(req,res){
    res.send(products)
})
app.get(`/productApp/products/:id`,function(req,res){
    let id=req.params.id
    res.send(products.find((a)=>a.id==id))
})
app.post("/productApp/products",function(req,res){
    let body=req.body
    let index=products.findIndex((a)=>a.id==body.id)
    if(index>=0){
        res.status(400).send("Id already Present")
    }
    else{
        products.push(body)
        res.send(body)
    }
})

app.put("/productApp/products/edit/:id",function(req,res){
    let body=req.body
    let id=req.params.id
    let index=products.findIndex((a)=>a.id==id)
    products[index]=body
    res.send(body)
})

app.delete("/productApp/products/delete/:id",function(req,res){
    let id=req.params.id
    let index=products.findIndex((a)=>a.id==id)
    products.splice(index,1)
    res.send(products)
})

app.post("/productApp/login",function(req,res){
    let body=req.body
    let index=users.findIndex((a)=>a.username==body.username&&a.password==body.password)
    index>=0?res.send(users[index]):res.status(400).send("Invalid Username or Password")
})

app.get("/productApp/users",function(req,res){
    res.send(users)
})
app.post("/productApp/users",function(req,res){
    let body=req.body
    let index=users.findIndex((a)=>a.username==body.username)
    if(index>=0){
        res.status(400).send("Username Already Exists")
    }
    else if(body.username.length<6 || body.password.length<6){
        res.status(400).send("Username and Password must have 6 characters")
    }
    else{
        users.push(body)
        res.send(body)
    }
})

app.put("/productApp/users/edit/:username",function(req,res){
    let username=req.params.username
    let body=req.body
    let index=users.findIndex((a)=>a.username==username)
    users[index]=body
    res.send(body)
})

app.delete("/productApp/users/delete/:username",function(req,res){
    let username=req.params.username
    let index=users.findIndex((a)=>a.username===username)
    users.splice(index,1)
    res.send(users)
})
app.get("/productApp/users/:username",function(req,res){
    let username=req.params.username
    let user=users.find((a)=>a.username==username)
    res.send(user)
})
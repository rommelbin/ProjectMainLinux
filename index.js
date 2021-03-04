const mongoose = require('mongoose')
const express = require('express')
const path = require('path')
const Handlebars = require('handlebars')
const exphbs = require('express-handlebars')
const BlogMainPage = require('./views/routes/BlogMainPage')
const addInfo = require('./views/routes/addInfo')
const myShop = require('./views/routes/myShop')
const myBasket = require('./views/routes/myBasket')
const addItem = require('./views/routes/addItem')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
})
const app = express()
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'img')))
app.use(express.urlencoded({extended:true}))


app.engine('hbs', exphbs({
    defaultLayout: 'main',
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'hbs')
app.set('views', 'views')

app.get('/', (req, res) => {
    res.render('index.hbs', {
        title: 'Main Page',
        isMain: true
    })
})

app.use('/blog', BlogMainPage)
app.use('/addInfo', addInfo)
app.use('/myShop', myShop)
app.use('/myBasket', myBasket)
app.use('/addItem', addItem)
async function start () { 
    try{
        const url = `mongodb+srv://rommelbin:NnZs1s0Qa6Y8yUdI@cluster0.ekelx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
        await mongoose.connect(url, {useUnifiedTopology: true, useNewUrlParser: true})
        const PORT = process.env.PORT || 3000
        app.listen(PORT, () => {
            console.log(`Server is running on ${PORT}`);
        })
    
    }
    catch(err){
        console.log(err);
    }
    
} 
start()

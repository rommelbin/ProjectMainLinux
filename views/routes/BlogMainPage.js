const {Router} = require('express')
const Article = require('../../models/Article')
const router = Router()

router.get('/', async (req, res) => {
    const articles = await Article.find()

    res.render('blog.hbs', {
        title: "Daniel's blog",
        isAdd: true,
        articles
    })
})

router.get('/:id', async (req,res) => {
    let i = {}
    const articles = await Article.find()
    articles.filter(async (c) => {
        if(req.params.id == c._id) {
            i = {
                title: c.title,
                text: c.text,
                author: c.title,
                date: c.date,
                id: req.params.id
            }
        }
    })
    console.log(i);
    res.render('article.hbs', {
        title: i.title,
        i
    })
})




module.exports = router
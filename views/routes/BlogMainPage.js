const {Router} = require('express')
const Article = require('../../models/Article')
const router = Router()

router.get('/', async (req, res) => {
    const articles = await Article.getAll()
    res.render('blog.hbs', {
        title: "Daniel's blog",
        isAdd: true,
        articles
    })
})

router.get('/:id', async (req,res) => {
    const article = await Article.getById(req.params.id)
    res.render('article', {
        title: 'Article',
        article
    })
})




module.exports = router
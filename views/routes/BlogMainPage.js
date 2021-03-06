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
                author: c.author,
                date: c.date,
                id: req.params.id
            }
        }
    })
    res.render('article.hbs', {
        title: i.title,
        i
    })
})
router.get('/:id/edit', async (req,res) => {
    let i = {}
    const articles = await Article.find()
    articles.filter(async (c) => {

        if(req.params.id == c._id) {
            i = {
                title: c.title,
                text: c.text,
                author: c.author,
                date: c.date,
                id: req.params.id
            }
        }
    })
    res.render('editInfo.hbs', {
        title: i.title,
        i
    })
})
router.post('/', async (req, res) => { //from EditInfo.hbs
    if(req.body.delete) {
        await Article.deleteOne({_id: req.body.id})
        console.log('win!');
        res.redirect('/blog')
    } else {
        await Article.findOneAndUpdate(
            {_id:req.body.id},
            {title: req.body.title, text: req.body.text, author: req.body.author, date: req.body.date},
            {useFindAndModify: false} )
        console.log('lose!');
        res.redirect(`/blog/${req.body.id}`)
    }

}) 



module.exports = router
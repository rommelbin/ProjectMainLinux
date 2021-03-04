const {Router, urlencoded} = require('express')
const router = Router()

const Article = require('../../models/Article')
router.get('/', (req, res) => {
    res.render('addInfo.hbs', {
        title: 'add Article',
        isAI: true
    })
})


router.post('/',  async (req, res) => {
    const articles = new Article({
        title: req.body.title,
        text: req.body.text,
        author: req.body.author,
        date: req.body.date
    })

    await articles.save()
    res.redirect('/myShop')
})


module.exports = router
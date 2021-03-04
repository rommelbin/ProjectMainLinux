const {Router, urlencoded} = require('express')
const router = Router()

const Article = require('../../models/Article')
router.get('/', (req, res) => {
    res.render('addInfo.hbs', {
        title: 'Additional Information',
        isAI: true
    })
})


router.post('/',  async (req, res) => {
    const articles = new Article(req.body.title, req.body.text)
    await articles.save()
    res.redirect('/blog')
})


module.exports = router
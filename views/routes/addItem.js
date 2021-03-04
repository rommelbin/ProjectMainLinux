const {Router, urlencoded} = require('express')
const Shop = require('../../models/Shop')
const router = Router()

router.get('/', (req, res) => {
    res.render('addItem.hbs', {
        title: 'Add Item',
        addI: true
    })
})


router.post('/',  async (req, res) => {

    const item = new Shop({
        title: req.body.title,
        price: req.body.price,
        img: req.body.img
    })
    try {
        await item.save()
        res.redirect('/myShop')
    } catch (e) {
        // console.log(e);
    }
})

module.exports = router
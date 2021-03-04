const {Router} = require('express')
const Basket = require('../../models/Basket')
const Items = require('../../models/Shop')
const router = Router()
router.get('/', async (req, res) => {
    const basket = await Basket.fetch()
    res.render('myBasket.hbs', {
        title: 'Basket',
        isBasket: true,
        basket
    })
})
router.delete('/remove/:id', async (req, res) => {
    const basket = await Basket.remove(req.params.id)
    res.status(200).json(basket)
    
})
module.exports = router
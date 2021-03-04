const {Router} = require('express')
const Item = require('../../models/Shop')
const Basket = require('../../models/Basket')
const router = Router()

router.get('/', async (req, res) => {
    const items = await Item.find()
    res.render('myShop.hbs', {
        title: 'My shop',
        isShop: true,
        items
    })

    
})
// router.post('/', async (req, res) => {
    
//     const item = await Item.getById(req.body.item)
//     await Basket.add(item)

//     res.redirect('/myShop')
    
// })
router.get('/edit/:id', async (req,res) => {
    let i = {}
    const items = await Item.find()

    items.filter((c) => {
        if(c._id == req.params.id) {
            i = {
                  price: c.price,
                  title: c.title,
                  img: c.img,
                  id: req.params.id
              } 
         }
    })

    res.render('itemEdit.hbs', {
        title: i.title,
        i
    })
})

router.post('/', async (req,res )  => {
    if(req.body.delete == 'delete') {
        await Item.deleteOne({_id: req.body.id})
    } else {
        try {
            await Item.findOneAndUpdate(
                    {_id: req.body.id,},
                    {title: req.body.title, price: req.body.price, img: req.body.img},
                    {useFindAndModify: false}
            )
            res.redirect('/myShop')
        } catch (e) {
            console.log(e);
        }
    }
    
})
module.exports = router
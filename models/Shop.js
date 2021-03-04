const {Schema, model} = require('mongoose')
// мы создаём определённую модель, которую регистрируем в монгусе. 
// Описываем свойства данной модели.

const item = new Schema({
    title: { // Либо так, либо стрингом
        type: String,
        required: true,   
    },
    price: {
        type: Number,
        required: true
    },
    img: String
})

module.exports = model('Items', item)
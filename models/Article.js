const {Schema, model} = require('mongoose')
// мы создаём определённую модель, которую регистрируем в монгусе. 
// Описываем свойства данной модели.

const Article = new Schema({
    title: { // Либо так, либо стрингом
        type: String,
        required: true,   
    },
    text: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: false
    }
})

module.exports = model('Articles', Article)
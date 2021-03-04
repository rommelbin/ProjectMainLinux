const { v4: uuidv4 } = require('uuid');
const fs = require('fs')
const path = require('path')
class Article {
    constructor(title = 1, text = 1) {
        this.title = title
        this.text = text
        this.id = uuidv4()
    }
    toJSON() {
        return {
            title: this.title,
            text:  this.text,
            id: this.id
        }
        
    }
    async save() {
        const articles = await Article.getAll()
        articles.push(this.toJSON())
        
        return new Promise((resolve,reject) => {
            fs.writeFile(path.join(__dirname, '..', 'data', 'articles.json'),
                JSON.stringify(articles),
                (err) => {
                    if(err) {
                        reject(err)
                    } else {
                        resolve()
                    }
                }
            )
        })
    }
    static getAll() {
        return new Promise((resolve,reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'articles.json'), 
                'utf-8',
                (err, content) => {
                    if(err) {
                        reject(err)
                    } else {
                        resolve(JSON.parse(content))
                    }
                })

        })
    }
    static async getById(id) {
        const article = await Article.getAll()
        return article.find(c => c.id === id)
    }    
}

module.exports = Article
const { createDecipher } = require('crypto');
const fs = require('fs')
const path = require('path')


class Basket {
    static async add(item) {
        const basket = await Basket.fetch()
            console.log(basket);

        const idx = basket.items.findIndex(c => c.id === item.id)
            console.log(idx);
        const candidate = basket.items[idx]
            // console.log(candidate);
        if(candidate) {
            candidate.count++
            // console.log(candidate.count);
            basket.items[idx] = candidate
        } else {
            item.count = 1
            basket.items.push(item) 
        }
        basket.price += +item.price

        return new Promise((resolve,reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'basket.json'),
                 JSON.stringify(basket),
                (err) => {
                    if(err) {
                        reject (err)
                    } else {
                        resolve()
                    }
                })
        })
    }
    static async fetch() {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path.join(__dirname, '..', 'data', 'basket.json'),
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
    static async remove(id) {
        const basket = await Basket.fetch()

        const idx = basket.items.findIndex(c => c.id === id)
        const item = basket.items[idx]
        console.log("idx", idx);
        console.log('item', item);
        if(item.count === 1) {
            // delete
            basket.items = basket.items.filter(c => c.id !== id)
        } else {
            // change the count
            basket.items[idx].count--
        }
        basket.price -= item.price
        return new Promise((resolve,reject) => {
            fs.writeFile(
                path.join(__dirname, '..', 'data', 'basket.json'),
                 JSON.stringify(basket),
                (err) => {
                    if(err) {
                        reject (err)
                    } else {
                        resolve(basket)
                    }
                })
        })
    }
}
module.exports = Basket
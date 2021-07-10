let Products = require('./model/Product')
const Express = require('express')
const Product = require('./Products')
const moment = require('moment')
const fs = require('fs')


const app = Express();
//Middlewares
app.use(Express.urlencoded({ extended: true }))
app.use(Express.json())
app.use(logger)


function logger(req, res, next) {
    let accessTime = moment().format('MMMM Do YYYY, h:mm:ss a');
    const ip = req.ip
    const path = req.path
    const logg = `User ${ip} requested resource from ${path}  ${accessTime} \n`
    fs.appendFile('./model/log.txt', logg, (err) => {
        if (err) {
            console.error(err)
            return
        }
        else console.log(logg)
    })
    next()
   
}

// get products
app.get('/products', (request, response) => {
    response.json(Products)
})
app.post('/create', (request, response) => {
    let dataBody = request.body
    let product = new Product(dataBody.name, dataBody.description, dataBody.image, dataBody.price)
    Products.push(product)
    response.json(Products)

})
app.put('/products/:id', (request, response) => {
    reqID = request.params.id
    let found = Products.find((product) => {
        return product.id=== Number(reqID)
    })
    if (!found) {
        response.send("Product record not found")
    }
    else {
        // find the index of the product
        let index = Products.indexOf(found)
        reqBody = request.body
        if (typeof reqBody.name!==undefined) {
            found.name = reqBody.name
        }
        if (reqBody.description!==undefined) {
            found.description=reqBody.description
        }
         if (reqBody.image!==undefined) {
            found.image=reqBody.image
        }
         if (reqBody.price!==undefined) {
            found.price=reqBody.price
        }
        Products[index] = found
        response.json(Products)

    }
    
})
app.delete('/products/:id', (request, response) => {
    reqID = request.params.id
    let found = Products.find((product) => {
        return product.id=== Number(reqID)
    })
    if (!found) {
        response.send("Product record not found")
    }
    else {
        let index = Products.indexOf(found)
        Products.splice(index,1)
        
        response.send(Products)
    }
})
app.get('*', (req, res) => {
    res.status(500).send('Resource not found!')
})



app.listen(9000, () => {
    console.log('Ecommerce server is listening at 127.0.0.1:9000')

})

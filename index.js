const express = require('express')
const uuid = require('uuid')
const app = express()
app.use(express.json())


const port = 3000
const order = []

const checkOrderId = (request, response, next) => {
    const { id } = request.params
    const index = order.findIndex(order => order.id === id)
    if (index < 0) {
        return response.status(404).json({ error: 'User not found' })
    }
    request.index = index
    request.id = id
    next()

}

const requestMethod = (request, response, next) => {
    const method = request.method
    const url = request.url
    console.log(` 👉 Method: ${method} 👉 URL => ${url}`)

    next()
}
app.use(requestMethod)





app.get('/order', (request, response) => {
    return response.json(order)
})

app.post('/order', (request, response) => {
    const { lost, clientName, price, status } = request.body
    const newOrder = { id: uuid.v4(), lost, clientName, price, status }
    order.push(newOrder)
    return response.status(201).json(order)
})


app.put('/order/:id', checkOrderId, (request, response) => {
    const index = request.index
    const id = request.id
    const { lost, clientName, price, status } = request.body
    const updateLost = { id, lost, clientName, price, status }


    order[index] = updateLost
    return response.json(updateLost)
})

app.delete('/order/:id', checkOrderId, (request, response) => {
    const index = request.index
    const id = request.id

    order.splice(index, 1)


    return response.status(204).json()
})
app.get('/orders/:id', checkOrderId, (request, response) => {
    const index = request.orderIndex

    const idSpecific = order[index]

    return response.json(idSpecific)


})

app.patch('/order/:id', checkOrderId, (request, response) => {
    const index = request.index
    const id = request.id
    const status = 'Pronto'
    const statuSpecific = order[index]
    statuSpecific.status = status
    return response.json(statuSpecific)
})







app.listen(port, () => {
    console.log(`🚀Server started on port ${port}🚀`)
})

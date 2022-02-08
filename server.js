const express = require('express')
const app = express()
const cors = require('cors')
const GetFunc = require('./methods/GetFunc')
const PostFunc = require('./methods/PostFunc')
const DeleteFunc = require('./methods/DeleteFunc')
const PatchFunc = require('./methods/PatchFunc')
const PutFunc = require('./methods/PutFunc')
const { TreatInfo } = require('./TreatInfo')
const { sheet } = require('./gçetSheet')
require('dotenv').config()
app.use(cors())
app.use(express.json())

const errorEndmoint = { "error": "The application did not find the specified endpoint" }
let headers = {
    "x-vtex-api-appKey": '',
    "x-vtex-api-appToken": '',
    "Content-Type": "application/json",
    "Accept": "application/json"

}
// test
app.get('/', async (req, response) => {
    response.send({ testApp: 'app is working' })
})

// get
app.get('/get', async (req, response) => {

    const sheets = await sheet()

    const arr = TreatInfo(sheets.data.values, req.query)
    if (arr.length == 0) {
        response.send(errorEndmoint)
        return
    }

    headers["x-vtex-api-appKey"] = arr[1]
    headers["x-vtex-api-appToken"] = arr[2]

    const res = GetFunc.get(arr[3], {
        headers
    });
    res.then(function (result) {
        response.statusCode = JSON.parse(result)['status']
        response.send(JSON.parse(result).data)
    })
})

// post
app.post('/post', async (req, response) => {
    const body = req.body
    const sheets = await sheet()

    const arr = TreatInfo(sheets.data.values, req.query)
    if (arr.length == 0) {
        response.send(errorEndmoint)
        return
    }

    headers["x-vtex-api-appKey"] = arr[1]
    headers["x-vtex-api-appToken"] = arr[2]

    const res = PostFunc.post(arr[3],
        body,
        headers
    );

    res.then(function (result) {
        response.statusCode = JSON.parse(result)['status']
        response.send(JSON.parse(result))
    }).catch((error) => {
        response.send(error)
    })

})

// delete
app.delete('/delete', async (req, response) => {
    const body = req.body
    const sheets = await sheet()

    const arr = TreatInfo(sheets.data.values, req.query)
    if (arr.length == 0) {
        response.send(errorEndmoint)
        return
    }

    headers["x-vtex-api-appKey"] = arr[1]
    headers["x-vtex-api-appToken"] = arr[2]

    const options = { headers: headers, data: body };
    const res = DeleteFunc.delete(arr[3],
        options
    );

    res.then(function (result) {
        response.statusCode = JSON.parse(result)['status']
        response.send(JSON.parse(result))
    }).catch((error) => {
        response.send(error)
    })

})

// patch
app.patch('/patch', async (req, response) => {
    const body = req.body
    const sheets = await sheet()

    const arr = TreatInfo(sheets.data.values, req.query)
    if (arr.length == 0) {
        response.send(errorEndmoint)
        return
    }

    headers["x-vtex-api-appKey"] = arr[1]
    headers["x-vtex-api-appToken"] = arr[2]

    const res = PatchFunc.patch(arr[3],
        body,
        headers
    );
    res.then(function (result) {
        response.statusCode = JSON.parse(result)['status']
        response.send(JSON.parse(result))
    }).catch((error) => {
        response.send(error)
    })

})

// put
app.put('/put', async (req, response) => {
    const body = req.body
    const sheets = await sheet()

    const arr = TreatInfo(sheets.data.values, req.query)
    if (arr.length == 0) {
        response.send(errorEndmoint)
        return
    }

    headers["x-vtex-api-appKey"] = arr[1]
    headers["x-vtex-api-appToken"] = arr[2]

    const res = PutFunc.put(arr[3],
        body,
        headers
    );
    res.then(function (result) {
        response.statusCode = JSON.parse(result)['status']
        response.send(JSON.parse(result))
    }).catch((error) => {
        response.send(error)
    })

})

app.listen(process.env.PORT || '4000')




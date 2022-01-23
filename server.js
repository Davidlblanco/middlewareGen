const express = require('express')
const app = express()
const cors = require('cors')
const GetFunc = require('./GetFunc')
const PostFunc = require('./PostFunc')
require('dotenv').config()
app.use(cors())
app.use(express.json())
const { google } = require('googleapis')

app.get('/', async (req, response) => {

    const sheets = await sheet()

    const arr = treatInfo(sheets.data.values, req.query)

    const res = GetFunc.get(arr[3], {
        headers: {
            "x-vtex-api-appKey": arr[1],
            "x-vtex-api-appToken": arr[2],
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    });
    res.then(function (result) {
        response.send(JSON.parse(result).data)
    })
})

//post
app.post('/post', async (req, response) => {
    const body = req.body
    const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
    const url = 'https://' + fullUrl.split('?q=')[1]


    const headers = {
        "x-vtex-api-appKey": process.env.appKey,
        "x-vtex-api-appToken": process.env.appToken,

        "accept": "application/json",
        "accept-language": "en-US,en;q=0.9,es;q=0.8,pt-BR;q=0.7,pt;q=0.6",
        "content-type": "application/json",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "cross-site"

    }

    const res = PostFunc.post(url, {
        headers: headers,
        body: body
    });


    res.then(function (result) {
        response.send(JSON.parse(result))
    }).catch((error) => {
        response.send(error)
    })

})


async function sheet() {
    const auth = new google.auth.GoogleAuth({
        keyFile: 'credentials.json',
        scopes: 'https://www.googleapis.com/auth/spreadsheets',
    })
    const client = await auth.getClient()

    const googleSheets = google.sheets({ version: 'v4', auth: client })
    const spreadsheetId = '1BkJBTVhanFaCGgaPEEkkxOZ0x8OVI7lrXq8QwpXctjM'
    const metaData = await googleSheets.spreadsheets.values.get({
        auth: auth,
        spreadsheetId: spreadsheetId,
        range: 'endpoints'// sheets' tab
    })

    return metaData
}


// info();
function treatInfo(sheets, queries) {
    const keys = Object.keys(queries)
    let arr = []
    sheets.forEach(item => {
        if (item[0] == queries.endpoint) {
            let url = item[3]
            if (keys.length > 1) {
                keys.forEach(key => {
                    url = url.replace(`{{${key}}}`, queries[key])
                    console.log('url', url)
                })
            }
            item[3] = url
            arr = item
        }
    });
    return arr
}

app.listen(process.env.PORT || '4000')




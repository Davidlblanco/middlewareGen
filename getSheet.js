const { google } = require('googleapis')
const prod = 'credentialsHeroku.js'
const dev = 'credential.json'

exports.sheet = async () => {
    const auth = new google.auth.GoogleAuth({
        keyFile: prod,
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


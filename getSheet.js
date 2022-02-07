const { google } = require('googleapis')
const GoogleAuth = require('google-auth-library');
exports.sheet = async () => {
    // const auth = new google.auth.GoogleAuth({
    //     keyFile: prod,
    //     scopes: 'https://www.googleapis.com/auth/spreadsheets',
    // })
    const auth = authorize()
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


function authorize() {
    return new Promise(resolve => {
        const authFactory = new GoogleAuth();
        const jwtClient = new authFactory.JWT(
            process.env.client_email, // defined in Heroku
            null,
            process.env.private_key, // defined in Heroku
            ['https://www.googleapis.com/auth/calendar']
        );

        jwtClient.authorize(() => resolve(jwtClient));
    });
}
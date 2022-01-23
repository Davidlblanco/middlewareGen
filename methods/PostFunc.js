const axios = require('axios')
const CircularJSON = require('circular-json')

exports.post = (req, body, headers) => {
    return axios
        .post(req, body, { headers })
        .then(res => {
            let json = CircularJSON.stringify(res);
            return json
        })
        .catch(error => {
            // console.error(error)
            return JSON.stringify(error)
        })

}




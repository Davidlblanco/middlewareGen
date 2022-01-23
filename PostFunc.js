const axios = require('axios')
const CircularJSON = require('circular-json')

exports.post = function (req, body) {
    return axios
        .post(req, body)
        .then(res => {
            let json = CircularJSON.stringify(res);
            return json
        })
        .catch(error => {
            console.error(error)
            return error
        })

}




const axios = require('axios')
const CircularJSON = require('circular-json')

exports.patch = (req, body, headers) => {
    return axios
        .delete(req, body, { headers })
        .then(res => {
            let json = CircularJSON.stringify(res);
            return json
        })
        .catch(error => {
            // console.error(error)
            return JSON.stringify(error)
        })

}




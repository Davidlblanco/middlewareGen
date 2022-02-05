const axios = require('axios')
const CircularJSON = require('circular-json')

exports.put = (req, body, headers) => {
    return axios
        .put(req, body, { headers })
        .then(res => {
            let json = CircularJSON.stringify(res);
            return json
        })
        .catch(error => {
            // console.error(error)
            return JSON.stringify(error)
        })

}




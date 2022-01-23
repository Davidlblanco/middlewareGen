const axios = require('axios')
const CircularJSON = require('circular-json')


exports.get = function (req, headers) {

    return axios
        .get(req, headers)
        .then(res => {
            let json = CircularJSON.stringify(res);
            return json
        })
        .catch(error => {
            console.error(error)
            return error
        })

}




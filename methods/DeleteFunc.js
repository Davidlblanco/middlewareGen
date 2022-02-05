const axios = require('axios')
const CircularJSON = require('circular-json')

exports.delete = (req, options) => {
    return axios
        .delete(req, options)
        .then(res => {
            let json = CircularJSON.stringify(res);
            return json
        })
        .catch(error => {
            // console.error(error)
            return JSON.stringify(error)
        })

}




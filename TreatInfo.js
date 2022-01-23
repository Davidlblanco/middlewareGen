exports.TreatInfo = (sheets, queries) => {
    const keys = Object.keys(queries)
    let arr = []
    sheets.forEach(item => {
        if (item[0] == queries.endpoint) {
            let url = item[3]
            if (keys.length > 1) {
                keys.forEach(key => {
                    url = url.replace(`{{${key}}}`, queries[key])
                })
            }
            item[3] = url
            arr = item
        }
    });
    return arr
}

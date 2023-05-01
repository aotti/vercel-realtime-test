function newPromise(req, res, data) {
    return new Promise((resolve, reject) => {
        data().then(result => {
            if(result.data != null)
                resolve(result.data)
            else if(result.error != null)
                reject(result.error)
        })
    }).then(data => {
        return res.status(200).json({
            status: 200,
            message: 'success',
            data: data
        })
    }).catch(err => {
        return res.status(500).json({
            status: 500,
            message: 'failed',
            data: err
        })
    })
}

module.exports = { newPromise }
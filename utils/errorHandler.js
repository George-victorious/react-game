module.exports = (res, error) => {
    res.status(500).json({
        massage: error.massage ? error.massage : error
    })
} 
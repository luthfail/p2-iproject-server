const errorHandler = (err, req, res, next) => {
    switch(err.name) {
        case 'Email is required':
        case 'Name is required':
        case 'Password is required':
            res.status(400).json({
                error: err.name
            })
            break
        case 'Invalid email/password':
            res.status(401).json({
                error: err.name
            })
            break
        case 'Album not found':
            res.status(404).json({
                error: err.name
            })
            break
        case 'Cart not found':
            res.status(404).json({
                error: err.name
            })
    }
}

module.exports = errorHandler
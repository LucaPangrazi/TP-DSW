import jwt from 'jsonwebtoken';
const validateToken = (req, res, next) => {
    const headerToken = req.headers['authorization'];
    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        try {
            const bearerToken = headerToken.slice(7);
            jwt.verify(bearerToken, process.env.SECRET_KEY ?? 'ClaveSuperSegura1234');
            next();
        }
        catch (error) {
            res.status(401).json({
                msg: 'token no valido'
            });
        }
    }
    else {
        res.status(401).json({
            msg: 'Acceso denegado'
        });
    }
};
export default validateToken;
//# sourceMappingURL=validate.token.js.map
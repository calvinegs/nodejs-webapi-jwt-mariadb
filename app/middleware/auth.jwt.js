const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;

const verifyToken = (req, res, next) => {
    let authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(403).send({
            message: "你未被認證!"
        });
    }
    const token = authHeader.split(" ")[1];

    jwt.verify(token, process.env.JWT_SEC, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Token 不合法!"
            });
        }
        req.userId = decoded.id;
        next();
    });
};

const isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {
        // user.getRoles().then(roles => {
        //     if (roles.findIndex((element) => element.name ==="admin") >= 0) {
        //         next();
        //         return;                
        //     }
        //     res.status(403).send({
        //         message: "需要有管理者角色!"
        //     });
        //     return;
        // });
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                if (roles[i].name === "admin") {
                    next();
                    return;
                }
            }
            res.status(403).send({
                message: "必須為管理者角色!"
            });
            return;
        });
    });
};

const authJwt = {
    verifyToken: verifyToken,
    isAdmin: isAdmin
}

module.exports = authJwt;
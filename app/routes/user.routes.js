const router = require("express").Router();
const { authJwt } = require("../middleware");

router.get("/usertest", (req, res) => {
    res.send("user test is successful!");
});

router.post("/userposttest",
    authJwt.verifyToken,
    (req, res) => {
        const username = req.body.username;
        res.send("your username is: " + username)
    });

module.exports = router;
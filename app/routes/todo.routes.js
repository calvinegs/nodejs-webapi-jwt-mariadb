const router = require("express").Router();
const todo = require("../services/todo.service");
const { authJwt } = require("../middleware");

router.post("/", authJwt.verifyToken, todo.create);
router.get("/", [authJwt.verifyToken, authJwt.isAdmin], todo.findAll);
router.get("/done", todo.findAllDoneTodos);
router.get("/:id", todo.findOne);
router.put("/:id", todo.update);
router.delete("/:id", todo.deleteOne);
router.delete("/", todo.deleteAll);

module.exports = router;
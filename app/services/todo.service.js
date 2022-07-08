const db = require("../models");

const Todo = db.todo;

const Op = db.Sequelize.Op;

const create = (req, res) => {
    if (!req.body.title) {
        res.status(400).send({
            message: "內容不得為空白！"
        });
        return;
    }
    // 新增一個 Todo
    const todo = {
        title: req.body.title,
        description: req.body.description,
        status: req.body.status ? req.body.status : false
    }

    // 將 todo 存入資料庫
    Todo.create(todo)
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "資料存檔時發生錯誤！"
            });
        });

}

const findAll = (req, res) => {
    const title = req.query.title;
    let condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    Todo.findAll({ where: condition })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "由資料庫讀取 Todo 資料時發生錯誤！"
            });
        });
};

const findOne = (req, res) => {
    const id = req.params.id;
    Todo.findByPk(id)
        .then(data => {
            if (data) {
                res.send(data)
            } else {
                res.status(400).send({
                    message: `使用id=${id}搜尋時找到不 Todo 資料!`
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                message: `使用id=${id}搜尋時找到不 Todo 資料!`
            });
        });
};

const update = (req, res) => {
    const id = req.params.id;
    Todo.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    mdssage: "Todo 更新完成！"
                });
            } else {
                res.status(500).send({
                    message: `使用 id= ${id} 更新資料時發生錯誤！`
                });
            };
        })
};

const deleteOne = (req, res) => {
    const id = req.params.id;
    Todo.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num === 1) {
                res.send({
                    message: "Todo 刪除成功！"
                })
            } else {
                res.send({
                    message: `使用 id= ${id} 刪除 Todo 時未找到任何資料！`
                })
            };
        })
        .catch(err => {
            res.status(500).send({
                message: `使用 id= ${id} 刪除 Todo 時發生錯誤！`
            })
        })
};

const deleteAll = (req, res) => {
    Todo.destroy({
        where: {},
        truncat: false
    })
        .then(nums => {
            res.send({
                message: `${nums} Todo 資料被刪除成功！`
            })
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "刪除所有資料時發生錯誤！"
            })
        })
};

const findAllDoneTodos = (req, res) => {
    Todo.findAll({ where: { status: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "讀取資料時發生錯誤！"
            })
        })
};

module.exports = { create, findAll, findOne, update, deleteAll, deleteOne, findAllDoneTodos };


Node.js + express 來建立 REST API 服務，同時為提高網路安全性採取了 JWT JSON Web Token）來實作使用者驗證機制。資料庫的部份是使用 MySQL，為方便起見，採用 Docker 來執行 MySQL。

## 專案完成後的檔案結構

```
./專案目錄
├── app/
│   ├── config/
│   │   └── db.config.js
│   ├── middleware/
│   │   ├── auth.jwt.js
│   │   ├── index.js
│   │   └── verify.signup.js
│   ├── models/
│   │   ├── index.js
│   │   ├── role.model.js
│   │   ├── todo.model.js
│   │   └── user.model.js
│   ├── routes/
│   │   ├── auth.routes.js
│   │   ├── todo.routes.js
│   │   └── user.routes.js
│   └── services/
│       ├── auth.service.js
│       ├── todo.service.js
│       └── user.service.js
├── node_modules/
├── .env
├── .gitignore
├── package.json
├── README.md
├── server.js
└── yarn-lock
```

## 專案完成後所提供的 API 端點

|Methods|Urls|Actions|
|-------|-----------------------------|-------------------------------------------------|
|POST| /api/auth/signup|註冊新使用者帳號|
|POST| /api/auth/signin|使用者帳號登入|
|GET| /api/todos|get all Todos|
|GET| /api/todos/:id|get Todo by id|
|GET| /api/todos/done|find all done Todos|
|GET| /api/todos/title=[`keyword`]|find all Todos whick title contains `keyword`|
|POST| /api/todos|add New Todo|
|PUT| /api/todos/:id|update Todo by id|
|DELETE| /api/todos/:id|remove Todo by id|
|DELETE| /api/todos|remove all Todos|

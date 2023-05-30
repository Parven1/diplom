const sqlite3 = require("sqlite3");
const fs = require("fs");

class authController {
    async getall(req, res) {
        let db = new sqlite3.Database('auth/usersDatabase.db', (err) => {
            if (err) {
                console.error(err.message);
            }

            db.get(`SELECT *
                FROM Users
                `, (err, row) => {
                if (err) {
                    console.error(err.message);
                }
                if (row) {
                    res.send(row)
                }
                else {
                }
            });
        });


    }

    async registration(req, res) {

        let db = new sqlite3.Database('auth/usersDatabase.db', (err) => {
            if (err) {
                console.error(err.message);
            }

        });

        const role = 2;
        const login = req.params.login;
        const password = req.params.password;
        console.log(login + password + role);
        db.get(`SELECT *
                    FROM Users
                    Where login = ?
           `, [login], (err) => {
            if (err) {
                console.error(err.message);
            }
            else {
                db.run(`INSERT INTO Users (login,password,role) VALUES(?,?,?)`, [login, password, role]);
                db.get(`SELECT *
                    FROM Users
                    Where login = ?
           `, [login], (err, row) => {
                    if (err) {
                        console.error(err.message);
                    }
                    if (row) {
                        res.send(row)
                    }
                });
            }
        });

    }

    async login(req, res) {

        const login = req.params.login;
        const password = req.params.password;

        let db = new sqlite3.Database('auth/usersDatabase.db', (err) => {
            if (err) {
                console.error(err.message);
            }

        });

        db.get(`SELECT *
                    FROM Users
                    Where login = ? and
                    password = ?
                    
           `, [login, password], (err, row) => {
            if (err) {
                res.send(err)
            }
            if (row) {
                res.send(row)
                console.log(row.role)

            }
            else {
                res.send("incorrect login or password")
                console.log(login)
                console.log(password)
            }
        });

    }

}

module.exports = new authController()
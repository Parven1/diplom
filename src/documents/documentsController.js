const sqlite3 = require("sqlite3");
const fs = require("fs");

class documentsController {
    async getPassport(req, res) {

        const login = req.params.login;

        let db = new sqlite3.Database('documents/usersDocuments.db', (err) => {
            if (err) {
                console.error(err.message);
            }

            db.get(`SELECT *
                FROM Passports
                Where userLogin = ?
                `, [login] , (err, row) => {
                if (err) {
                    console.error(err.message);
                }
                if (row) {
                    res.send(row)
                }
                else {
                    res.send('Ваших документов нет в нашей базе данных')
                    console.log('eroorrrr')
                }
            });
        });


    }

    async getMedicalInsurance(req, res) {

        const login = req.params.login;

        let db = new sqlite3.Database('documents/usersDocuments.db', (err) => {
            if (err) {
                console.error(err.message);
            }

            db.get(`SELECT *
                FROM MedicalInsurance
                Where userLogin = ?
                `, [login] , (err, row) => {
                if (err) {
                    console.error(err.message);
                }
                if (row) {
                    res.send(row)
                }
                else {
                    res.send('Ваших документов нет в нашей базе данных')
                    console.log('eroorrrr')
                }
            });
        });


    }
    async getVisa(req, res) {

        const login = req.params.login;

        let db = new sqlite3.Database('documents/usersDocuments.db', (err) => {
            if (err) {
                console.error(err.message);
            }

            db.get(`SELECT *
                FROM visa
                Where userLogin = ?
                `, [login] , (err, row) => {
                if (err) {
                    console.error(err.message);
                }
                if (row) {
                    res.send(row)
                }
                else {
                    res.send('Ваших документов нет в нашей базе данных')
                    console.log('eroorrrr')
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

        const role = 1;
        const login = req.params.login;
        const password = req.params.password;
        console.log(login + password + role);
        db.get(`SELECT *
                    FROM Users
                    Where name = ?
           `, [login], (err, row) => {
            if (err) {
                console.error(err.message);
            }
            if (row) {
                res.send('There is already an user with this name')
            }
            else {
                db.run(`INSERT INTO Users (role,name,password) VALUES(?,?,?)`, [login, password, role]);
                res.send("user successfully registered");
            }
        });

    }


}

module.exports = new documentsController()
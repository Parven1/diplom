const sqlite3 = require("sqlite3");
const fs = require("fs");

class documentsController {
    async getRequests(req, res) {

        const login = req.params.login;

        let db = new sqlite3.Database('requests/requestsDatabase.db', (err) => {
            if (err) {
                console.error(err.message);
            }

        })

        db.get(`SELECT *
                FROM Requests
                Where userLogin = ?
                `, [login], (err, row) => {
            if (err) {
                res.send('error has occured')
                console.error(err.message);
            }
            if (row) {
                res.send(row)
            }
            else {
                res.send('error has occured')
                console.log('eroorrrr')
            }
        });
    }

    async getPassportRequest(req, res) {

        const login = req.params.login;

        let db = new sqlite3.Database('requests/requestsDatabase.db', (err) => {
            if (err) {
                console.error(err.message);
            }

        })

        db.get(`SELECT *
                FROM PassportRequests
                `,(err, row) => {
            if (err) {
                res.send('error has occured')
                console.error(err.message);
            }
            if (row) {
                res.send(row)
                console.log(row)
            }
            else {
                res.send('error has occured')
                console.log('da')
            }
        });
    }

    async setPassportRequest(req, res) {

        const id = req.params.id;

        let db = new sqlite3.Database('requests/requestsDatabase.db', (err) => {
            if (err) {
                console.error(err.message);
            }

        })

        db.get(`UPDATE
                PassportRequests
                SET verificationFlag = ?
                Where id = ?
                `,['cheked',id],(err, row) => {
            if (err) {
                res.send('error has occured')
                console.error(err.message);
            }
            if (row) {
                res.send(row)
                console.log(row)
            }
            else {
                res.send('error has occured')
                console.log('da')
            }
        });
    }

    

    async addPassportRequest(req, res) {

        const login = req.params.login;
        const passportNumber = req.params.passportNumber;
        const surname = req.params.surname;
        const name = req.params.name;
        const nationality = req.params.nationality;
        const dateOfBirth = req.params.dateOfBirth;
        const sex = req.params.sex;
        const dateOfIssue = req.params.dateOfIssue;
        const dateOfExpiry = req.params.dateOfExpiry;
        const identificationNumber = req.params.identificationNumber;
        const placeOfBirth = req.params.placeOfBirth;
        const authority = req.params.authority;

        console.log(login)

        let db = new sqlite3.Database('requests/requestsDatabase.db', (err) => {
            if (err) {
                console.error(err.message);
            }

        })

        db.get(`INSERT INTO  PassportRequests (userLogin,passportNumber,surname,name,nationality,dateOfBirth,sex,dateOfIssue,dateOfExpiry,identificationNumber,placeOfBirth,authority)
                VALUES (?,?,?,?,?,?,?,?,?,?,?,?)
                `, [login, passportNumber, surname, name, nationality, dateOfBirth, sex, dateOfIssue, dateOfExpiry, identificationNumber, placeOfBirth, authority], (err, row) => {
            if (err) {
                console.error(err.message);
            }
            else {
                res.send('request added')
            }
        });

    }
}

module.exports = new documentsController()
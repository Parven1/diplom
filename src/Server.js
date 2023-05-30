const sqlite3 = require('sqlite3');
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const authRouter = require('./auth/authRouter')
const documentsRouter = require('./documents/documentsRouter')
const requestsRouter = require('./requests/requestsRouter')

const hostname = '127.0.0.1'
const PORT = 8000;

let db = new sqlite3.Database('auth/usersDatabase.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    else console.log('ok1')

});

let db2 = new sqlite3.Database('documents/usersDocuments.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    else console.log('ok2')

});

let db3 = new sqlite3.Database('requests/requestsDatabase.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    else console.log('ok3')

});

const app = express();
app.use(cors({
    origin: "*"
}))
app.use("/auth", authRouter)
app.use("/documents", documentsRouter)
app.use("/requests", requestsRouter)
app.get("/getall", function (req, res) {

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

});




app.get("/basket/get", function (req, res) {
    db.all(`SELECT *
        FROM Basket`, (err, row) => {
        if (err) {
            console.error(err.message);
        }
        res.send(row);
    });
});
app.get("/get/:id", function (req, res) {
    let identifier = parseInt(req.params.id);

    db.get(`SELECT *
                    FROM Servises
                    Where id = ?
           `, [identifier], (err, row) => {
        if (err) {
            console.error(err.message);
        }
        res.send(row);
    });

});
app.post("/post=:name", function (req, res) {
    let name = req.params.name;

    db.run(`INSERT INTO Servises (name) VALUES(?)`, [name]);
    res.json(name + " added");
});
app.post("/basket/post=:id", function (req, res) {
    let identifier = parseInt(req.params.id);

    db.run(`INSERT INTO Basket (id,name) VALUES(?,?)`, [identifier, identifier]);
    res.json(identifier + " added");
});
app.delete("/delete=:id", function (req, res) {
    let identifier = parseInt(req.params.id);

    db.run(`DELETE FROM Servises WHERE id = ?`, [identifier]);
    res.json(identifier + " deleted")

});
app.delete("/basket/delete=:id", function (req, res) {
    let identifier = parseInt(req.params.id);

    db.get(`SELECT *
                    FROM Basket
                    Where id = ?
           `, [identifier], (err, row) => {
        if (err) {
            console.error(err.message);
        }
        res.send(row);
    });

    db.run(`DELETE FROM Servises WHERE id = ?`, [identifier]);
    res.json(identifier + " deleted")

});

app.listen(PORT, hostname, () => {
    console.log(`server started on port: ${PORT}`);
    console.log(`server started on hostname: ${hostname}`);
});
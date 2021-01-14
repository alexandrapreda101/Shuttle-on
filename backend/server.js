const { response, request } = require('express');
const express = require('express');
const app = express();
const Sequelize = require('sequelize');
const cors = require("cors")
const mysql = require("mysql2")

const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const session = require("express-session")

const sequelize = new Sequelize('purple_puffs', 'root', 'password', {

    dialect: "mysql",
    host: "localhost"
});

sequelize.authenticate().then(() => {
    console.log("Connectat la baza de date")
}).catch((err) => {
    console.log(err)
    console.log("Conectarea la baza de date nu s-a putut efectua")
});

const Recenzie = sequelize.define('review', {
    punct_plecare: Sequelize.STRING,
    punct_sosire: Sequelize.STRING,
    mijloc_transport: Sequelize.STRING,
    numarul: Sequelize.STRING,
    ora_plecarii: Sequelize.STRING,
    durata_calatoriei: Sequelize.STRING,
    grad_aglomerare: Sequelize.STRING,
    nivel_satisfactie: Sequelize.STRING,
    alte_comentarii: Sequelize.TEXT
});

const User = sequelize.define('user', {
    username: Sequelize.STRING,
    password: Sequelize.STRING,
    email: Sequelize.STRING,
});

User.hasMany(Recenzie);
Recenzie.belongsTo(User);
app.use(express.json())
app.use(cors({
    origin: ["http://localhost:3000"],
    credentials: true
}))

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))

app.use(session({
    key: "userId",
    secret: "proiect_purple_puffs",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24,
        httpOnly: false,
    },
}))

app.use('/', express.static('frontend'));

app.get('/createdb', (request, response) => {
    sequelize.sync({ force: true }).then(() => {
        response.status(200).send('Tabele create');
    }).catch((err) => {
        console.log(err);
        response.status(200).send("Tabelele nu s-au putut crea");
    })
})

app.use(express.json());
app.use(express.urlencoded());

app.post('/formular', (request, response) => {
    Recenzie.create({...request.body,userId:request.session.user.id}).then((result) => {
        response.status(201).json(result);  
    }).catch((err) => {
        response.status(500).send("Resursa nu a fost creata");
    });
});

app.get('/formular/findAll', (request, response) => {
    Recenzie.findAll({include:{model:User}}).then((results) => {
        response.status(200).json(results);
    })
});

app.get('/formular/:id', (request, response) => {
    Recenzie.findByPk(request.params.id).then((result) => {
        if (result) {
            response.status(200).json(result);
        }
        else {
            response.status(404).send('Resursa nu a fost gasita');
        }
    }).catch((err) => {
        console.log(err);
        response.status(500).send('Eroare la baza de date');
    })
});

app.put('/formular/:id', (request, response) => {
    Recenzie.findByPk(request.params.id).then((recenzie) => {
        if (recenzie) {
            recenzie.update(request.body).then((result) => {
                response.status(201).json(result)
            }).catch((err) => {
                console.log(err);
                response.status(500).send("Eroare la baza de date");
            })
        }
        else {
            response.status(404).send('Resursa nu a fost gasita')
        }
    }).catch((err) => {
        console.log(err);
        response.status(500).send("Eroare la baza de date");
    })
});

app.delete('/formular/:id', (request, response) => {
    Recenzie.findByPk(request.params.id).then((recenzie) => {
        if (recenzie) {
            recenzie.destroy().then((result) => {
                response.status(204).send()
            }).catch((err) => {
                console.log(err);
                response.status(500).send("Eroare la baza de date");
            })
        }
        else {
            response.status(404).send('Resursa nu a fost gasita')
        }
    }).catch((err) => {
        console.log(err);
        response.status(500).send("Eroare la baza de date");
    })
});

////AUTENTIFICARE////

app.post('/inregistrare', (req, res) => {
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password

    const entry = User.create({ username: username, email: email, password: password },
        (err, result) => {
            console.log(err);
        })
})

app.delete('/inregistrare/:id', (request, response) => {
    User.findByPk(request.params.id).then((user) => {
        if (user) {
            user.destroy().then((result) => {
                response.status(204).send()
            }).catch((err) => {
                console.log(err);
                response.status(500).send("Eroare la baza de date");
            })
        }
        else {
            response.status(404).send('Resursa nu a fost gasita')
        }
    }).catch((err) => {
        console.log(err);
        response.status(500).send("Eroare la baza de date");
    })
})


app.put('/inregistrare/username/:id', (request, response) => {
    User.findByPk(request.params.id).then((user) => {
        if (user) {
            user.update(request.body).then((result) => {
                const username = request.body.username
            
                const entry = User.update({ username: username },
                    (err, result) => {
                        console.log(err);
                    })

            }).catch((err) => {
                console.log(err);
                response.status(500).send("Eroare la baza de date");
            })
        }
        else {
            response.status(404).send('Resursa nu a fost gasita')
        }
    }).catch((err) => {
        console.log(err);
        response.status(500).send("Eroare la baza de date");
    })
});

app.put('/inregistrare/email/:id', (request, response) => {
    User.findByPk(request.params.id).then((user) => {
        if (user) {
            user.update(request.body).then((result) => {
                const email = request.body.email
            
                const entry = User.update({ email: email },
                    (err, result) => {
                        console.log(err);
                    })

            }).catch((err) => {
                console.log(err);
                response.status(500).send("Eroare la baza de date");
            })
        }
        else {
            response.status(404).send('Resursa nu a fost gasita')
        }
    }).catch((err) => {
        console.log(err);
        response.status(500).send("Eroare la baza de date");
    })
});

app.put('/inregistrare/password/:id', (request, response) => {
    User.findByPk(request.params.id).then((user) => {
        if (user) {
            user.update(request.body).then((result) => {
                const password = request.body.password
            
                const entry = User.update({ password: password },
                    (err, result) => {
                        console.log(err);
                    })

            }).catch((err) => {
                console.log(err);
                response.status(500).send("Eroare la baza de date");
            })
        }
        else {
            response.status(404).send('Resursa nu a fost gasita')
        }
    }).catch((err) => {
        console.log(err);
        response.status(500).send("Eroare la baza de date");
    })
});




app.get("/autentificare", (req, res) => {
    if (req.session.user) {
        res.send({ loggedIn: true, user: req.session.user })
    } else {
        res.send({ loggedIn: false })
    }
})

app.post('/autentificare', (req, res) => {

    const username = req.body.username
    const password = req.body.password

    User.findOne({ where: { username: username, password: password } })
        .then((result) => {
            if (result) {
                req.session.user = result
                res.status(200).send(result)
            } else {
                res.status(401).send({ message: "Parola sau username-ul este gresit!" })
            }

        }).catch(err => {
            res.status(500).send({
                message: "ERROR"
            });
        });
})

app.get('/logout', (req, res) => {
    if (req.session.user) {
        res.clearCookie('userId');
        res.send({ loggedIn: false })
        req.session.destroy()
    }
})

app.listen(3001, () => {
    console.log("Server pornit");
})
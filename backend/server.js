const { response, request } = require('express');
const express = require('express');
const app = express();
const Sequelize = require('sequelize');

const sequelize = new Sequelize('purple_puffs', 'root', 'pass', {
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
    numar: Sequelize.STRING,
    ora_plecarii: Sequelize.STRING,
    durata_calatoriei: Sequelize.STRING,
    grad_aglomerare: Sequelize.STRING,
    nivel_satisfactie: Sequelize.STRING,
    alte_comentarii: Sequelize.TEXT
});

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
    Recenzie.create(request.body).then((result) => {
        response.status(201).json(result);
    }).catch((err) => {
        response.status(500).send("Resursa nu a fost creata");
    });
});

app.get('/formular', (request, response) => {
    Recenzie.findAll().then((results)=>{
        response.status(200).json(results);
    })
});

app.get('/formular/:id', (request, response) => {
    Recenzie.findByPk(request.params.id).then((result)=>{
        if(result) {
            response.status(200).json(result);
        }
        else {
            response.status(404).send('Resursa nu a fost gasita');
        }
    }).catch((err)=>{
        console.log(err);
        response.status(500).send('Eroare la baza de date');
    })
});

app.put('/formular/:id', (request, response) => {
    Recenzie.findByPk(request.params.id).then((recenzie)=>{
        if(recenzie){
            recenzie.update(request.body).then((result)=>{
                response.status(201).json(result)
            }).catch((err)=>{
                console.log(err);
                response.status(500).send("Eroare la baza de date");
            })
        }
        else{
            response.status(404).send('Resursa nu a fost gasita')
        }
    }).catch((err)=>{
        console.log(err);
        response.status(500).send("Eroare la baza de date");
    })
});

app.delete('/formular/:id', (request, response) => {
    Recenzie.findByPk(request.params.id).then((recenzie)=>{
        if(recenzie){
            recenzie.destroy().then((result)=>{
                response.status(204).send()
            }).catch((err)=>{
                console.log(err);
                response.status(500).send("Eroare la baza de date");
            })
        }
        else{
            response.status(404).send('Resursa nu a fost gasita')
        }
    }).catch((err)=>{
        console.log(err);
        response.status(500).send("Eroare la baza de date");
    })
});

app.listen(8080);


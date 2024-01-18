const express = require('express');
const router = express.Router();

const Task = require('../models/task');
const task = require('../models/task');

router.get ('/', async (req, res) => {
    const tasks = await Task.find();
    //console.log("tasks---->",tasks)
    res.render('index', {
        tasks
    }); 
});

router.post('/add', async (req, res) => {
    console.log(new Task(req.body));
    await Task.insertMany([req.body]);
    res.redirect('/');
})

/*
router.get('/done/:id', async (req, res) => {
    const { id } = req.params;    
    const task = await Task.find({"title":id});
    task.status = !task.status
    // await task.save();
    res.send(task) //devolver informacion de la consulta
    // res.redirect('/');
})
*/

router.get('/done/:id', async (req, res) => { //Define una ruta y resive dos parámetros, req (la solicitud) y res (la respuesta)
    const { id } = req.params; //resive el id como parametro
    const task = await Task.findById(id); //buscar un document por medio del id
    task.status = !task.status //actualiza el task.status
    await task.save(); //guarda la actualiza del task.satatus 
    res.redirect('/'); //redireciona a la pagina principal
})


router.get('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await Task.deleteMany({_id: id});
    res.redirect('/');
})


router.get('/edit/:id', async (req, res) => {
    const { id } = req.params; // Resive el id
    const task = await Task.findById(id); // Buscar id
    res.render('edit', {
        task
    }); // Renderisar otra vista
    
})

router.post('/edit/:id', async (req, res) => {
    const {id } = req.params;
    await Task.updateMany({_id: id}, req.body)
    res.redirect('/')
})

module.exports = router;
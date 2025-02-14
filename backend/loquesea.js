app.get("/", (req, res)=>{
    res.status(200).json("Bienvenido a la aplicacion")
})

app.post("7tareas", async(req, res)=>{
    if(!token){
        res.send("debes estar logueado para acceder a esta pagina")
    }
    else{
        const newTarea = {titulo, tarea}.req.body
        if(tarea===newTarea)
    }
})
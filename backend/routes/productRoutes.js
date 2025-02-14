const express = require ("express");
const Product = require ("../models/Product")

const router = express.Router();

//obtener todas las tareas

router.get("/", async (req, res) =>{

    const products = await Product.find();
    res.json(products);
}
);

//obtener tarea por id
router.get("/:id", async (req, res) => {
  try {
      const product = await Product.findById(req.params.id); // Buscar la tarea por ID
      if (!product) {
          return res.status(404).json({ message: "Tarea no encontrada" }); // Si no se encuentra la tarea, devolver 404
      }
      res.json(product); // Si la tarea existe, devolverla
  } catch (error) {
      res.status(500).json({ message: "Error al obtener la tarea", error });
  }
});


//crear una nueva tarea

router.post("/", async (req, res)=>{

    const newProduct = new Product(req.body);
    await newProduct .save();
    res.status(201).json(newProduct);
});

//Editar tarea

router.put("/:id", async(req, res)=>{
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.json(product);
});

//Eliminar tarea

router.delete("/:id", async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(req.params.id);
      if (!product) {
        return res.status(404).json({ message: "Tarea no encontrada" });
      }
      res.json({ message: "Tarea eliminada" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar tarea", error });
    }
  });

module.exports = router;
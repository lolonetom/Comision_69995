import { Router } from "express";
const router = Router();

// function identificarUsuario(req, res, next) {
//     next();
// }

// router.get("/usuario-privado", identificarUsuario, (req, res) => {
    
// });

router.get("/", (req, res) => {
    res.send("Hola estamos en Backend 2");
});

export default router;
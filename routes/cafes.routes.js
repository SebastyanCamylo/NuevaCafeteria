import { Router } from "express";
import { cafesController } from "../controller/cafes.controllers.js";

const router = Router();

router.get("/", cafesController.getRaiz);
router.get("/Cafes", cafesController.getAllCafes);
router.get("/cafes/:id", cafesController.getCafesId);

router.get("/cafes", cafesController.addCafes);
router.get("/cafes/:id", cafesController.detelecafes);

router.use("*", cafesController.use404);

export default router;
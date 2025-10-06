import { Router } from "express";
import compression from "express-compression";
import { usersService, petsService } from "../services/index.js";
import { generateMockUsers } from "../utils/mockingUsers.js";
import { generateMockPets } from "../utils/mockingPets.js";
import logger from "../utils/logger.js";

const router = Router();

// Middleware de compresión Brotli
router.use(compression({ brotli: { enabled: true, zlib: {} } }));

// GET /api/mocks/mockingusers
router.get("/mockingusers", (req, res, next) => {
  try {
    const users = generateMockUsers(50);
    logger.info(`Generados ${users.length} usuarios mock.`);
    res.status(200).json({ status: "success", payload: users });
  } catch (error) {
    logger.error("Error al generar usuarios mock:", error.message);
    next(error);
  }
});

// GET /api/mocks/mockingpets
router.get("/mockingpets", (req, res, next) => {
  try {
    const pets = generateMockPets(100);
    logger.info(`Generadas ${pets.length} mascotas mock.`);
    res.status(200).json({ status: "success", payload: pets });
  } catch (error) {
    logger.error("Error al generar mascotas mock:", error.message);
    next(error);
  }
});

// POST /api/mocks/generateData
router.post("/generateData", async (req, res, next) => {
  try {
    const { users = 0, pets = 0 } = req.body;

    if (users > 0) await usersService.dao.insertMany(generateMockUsers(users));
    if (pets > 0) await petsService.dao.insertMany(generateMockPets(pets));

    logger.info(
      `Inserción completada: ${users} usuarios y ${pets} mascotas en la base de datos.`
    );

    res.status(201).json({
      status: "success",
      message: `${users} usuarios y ${pets} mascotas generados e insertados correctamente.`,
    });
  } catch (error) {
    logger.error("Error al insertar datos mock:", error.message);
    next(error);
  }
});

export default router;


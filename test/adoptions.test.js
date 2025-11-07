import { expect } from "chai";
import request from "supertest";
import mongoose from "mongoose";
import app from "../src/app.js";

import userModel from "../src/dao/models/User.js";
import petModel from "../src/dao/models/Pet.js";
import adoptionModel from "../src/dao/models/Adoption.js";

describe("Adoptions Router (functional)", function () {
  this.timeout(15000);

  let server;        // supertest agent
  let userId;        // usuario válido
  let petId;         // mascota disponible
  let adoptedPetId;  // mascota ya adoptada
  let createdAdoptionId; // lo obtendremos tras el POST exitoso

  before(async () => {
    server = request(app);

    // Creamos un usuario y dos mascotas (una la vamos a dejar adoptada luego)
    const u = await userModel.create({
      first_name: "Test",
      last_name: "User",
      email: `testuser_${Date.now()}@mail.com`,
      password: "hashed-no-importa-aqui",
      role: "user",
      pets: [],
    });
    userId = u._id.toString();

    const p1 = await petModel.create({
      name: "Firulais",
      specie: "dog",
      birthDate: new Date("2020-01-01"),
      adopted: false,
      owner: null,
    });
    petId = p1._id.toString();

    const p2 = await petModel.create({
      name: "Mishi",
      specie: "cat",
      birthDate: new Date("2019-05-05"),
      adopted: true,
      owner: userId, // ya adoptada
    });
    adoptedPetId = p2._id.toString();

    // Registramos la adopción del gato para coherencia de datos
    await adoptionModel.create({ owner: userId, pet: adoptedPetId });
  });

  after(async () => {
    // Limpieza: borramos lo que creamos
    try {
      if (createdAdoptionId) {
        await adoptionModel.findByIdAndDelete(createdAdoptionId);
      }
      await adoptionModel.deleteMany({ owner: userId }); // elimina la del gato también
      await petModel.findByIdAndDelete(petId);
      await petModel.findByIdAndDelete(adoptedPetId);
      await userModel.findByIdAndDelete(userId);
    } catch (_) {}
  });

  describe("POST /api/adoptions/:uid/:pid", () => {
    it("debe adoptar una mascota disponible (200 y mensaje 'Pet adopted')", async () => {
      const res = await server.post(`/api/adoptions/${userId}/${petId}`).send();
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("status", "success");
      expect(res.body).to.have.property("message", "Pet adopted");

      // guardamos una adopción para testear GET /:aid luego
      const adop = await adoptionModel.findOne({ owner: userId, pet: petId });
      expect(adop).to.exist;
      createdAdoptionId = adop._id.toString();

      // y validamos que la mascota quedó adoptada
      const pet = await petModel.findById(petId);
      expect(pet.adopted).to.equal(true);
      expect(pet.owner.toString()).to.equal(userId);
    });

    it("debe responder 400 si la mascota ya está adoptada", async () => {
      const res = await server.post(`/api/adoptions/${userId}/${adoptedPetId}`).send();
      expect(res.status).to.equal(400);
      expect(res.body).to.have.property("status", "error");
      expect(res.body).to.have.property("error", "Pet is already adopted");
    });

    it("debe responder 404 si el usuario no existe", async () => {
      const fakeUserId = new mongoose.Types.ObjectId().toString();
      const res = await server.post(`/api/adoptions/${fakeUserId}/${petId}`).send();
      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("status", "error");
      expect(res.body).to.have.property("error", "user Not found");
    });

    it("debe responder 404 si la mascota no existe", async () => {
      const fakePetId = new mongoose.Types.ObjectId().toString();
      const res = await server.post(`/api/adoptions/${userId}/${fakePetId}`).send();
      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("status", "error");
      expect(res.body).to.have.property("error", "Pet not found");
    });
  });

  describe("GET /api/adoptions", () => {
    it("debe responder 200 y retornar un payload (array)", async () => {
      const res = await server.get("/api/adoptions").send();
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("status", "success");
      expect(res.body).to.have.property("payload").that.is.an("array");
    });
  });

  describe("GET /api/adoptions/:aid", () => {
    it("debe responder 200 y retornar la adopción creada", async () => {
      const res = await server.get(`/api/adoptions/${createdAdoptionId}`).send();
      expect(res.status).to.equal(200);
      expect(res.body).to.have.property("status", "success");
      expect(res.body).to.have.property("payload");
      expect(res.body.payload).to.have.property("_id", createdAdoptionId);
    });

    it("debe responder 404 si la adopción no existe", async () => {
      const fakeAdoptionId = new mongoose.Types.ObjectId().toString();
      const res = await server.get(`/api/adoptions/${fakeAdoptionId}`).send();
      expect(res.status).to.equal(404);
      expect(res.body).to.have.property("status", "error");
      expect(res.body).to.have.property("error", "Adoption not found");
    });
  });
});

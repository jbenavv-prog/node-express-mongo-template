const express = require("express");
const PetService = require("../services/petService");

const petAPI = (app) => {
  const route = express.Router();
  const petService = new PetService();

  app.use("/api", route);

  route.get("/getPets", async (req, res) => {
    const result = await petService.getPets();
    res.send(result);
  });
};

module.exports = petAPI;

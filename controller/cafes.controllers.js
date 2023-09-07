import { handerErrors } from "../dataBase/error.js";
import cafes from "../cafes.js";

const handerErrorResponse = (res, errorCode) => {
  const { status, message } = handleErrors(errorCode);
  res.status.json({ ok: false, error: message });
};

const getRaiz = async (req, res) => {
  try {
    res.json({ ok: true, result: "Everything is ok at the root" });
  } catch (error) {
    console.log(error);
    handerErrorResponse(res, error.code);
  }
};

const use404 = async (req, res) => {
  try {
    res
      .status(404)
      .send({ message: "The path you are trying to query does not exist" });
  } catch (error) {
    console.log(error);
    handleErrorResponse(res, error.code);
  }
};

const getAllCafes = async (req, res) => {
  try {
    res.status(200).send(cafes);
  } catch (error) {
    console.log(error);
    handerErrorResponse(res, error.code);
  }
};

const getCafesId = async (req, res) => {
  const { id } = req.params;
  try {
    const { id } = req.params;
    const cafe = cafes.find((c) => c.id == id);
    if (cafe) res.status(200).send(cafe);
    else res.status(404).send({ message: "No coffee found with that id" });
  } catch (error) {
    console.log(error);
    handleErrorResponse(res, error.code);
  }
};

const addCafes = async (req, res) => {
  const cafe = req.body;
  const { id } = cafe;
  try {
    const existeUncafeConEseId = cafes.some((c) => c.id == id);
    if (existeUncafeConEseId)
      res.status(400).send({ message: "There is already a café with that id" });
    else {
      cafes.push(cafe);
      res.status(201).send(cafes);
    }
  } catch (error) {
    console.log(error);
    handerErrorResponse(res, error.code);
  }
};

const updateCafes = async (req, res) => {
  const cafe = req.body;
  const { id } = req.params;
  try {
    if (id != cafe.id)
      return res.status(400).send({
        message:
          "The id of the parameter does not match the id of the received coffee",
      });

    const cafeIndexFound = cafes.finIndex((p) => p.id == id);
    if (cafeIndexFound >= 0) {
      cafes[cafeIndexFound] = cafe;
      res.send(cafes);
    } else {
      res.status(400).send({ message: "No coffee found with that id" });
    }
  } catch (error) {
    console.log(error);
    handleErrorResponse(res, error.code);
  }
};

const detelecafes = async (req, res) => {
  const jwt = req.header("Authorization");
  try {
    if (jwt) {
      const { id } = req.params;
      const cafeIndexFound = cafes.finIndex((c) => c.id == id);

      if (cafeIndexFound >= 0) {
        cafes.splice(cafeIndexFound, 1);
        console.log(cafeIndexFound, cafes);
        res.send(cafes);
      } else {
        res.status(404).send({ message: "No coffee found with that id" });
      }
    } else res.status(400).send({ message: "Did not receive any tokens" });
  } catch (error) {
    console.log(error);
    handerErrorResponse(res, error.code);
  }
};

export const cafesController = {
  getRaiz,
  getCafesId,
  getAllCafes,
  addCafes,
  updateCafes,
  detelecafes,
  use404,
};
"use strict";

let currSort;
module.exports = {
  query,
  add,
  remove,
  update,
  getById,
  sortToys
};

const utilService = require("./UtilService");
var toys = readToys();
const fs = require("fs");

function query(filters) {

  let srchStr = filters.srchStr ? filters.srchStr : "";

  let categories;
  if (!filters.categories || filters.categories.length === 0)
    categories = "all";
  else categories = filters.categories;

  if (srchStr === "" && filters.categories === "all") {
    return Promise.resolve(toys);
  } else {
    let filteredToys;
    if (srchStr) {
      filteredToys = toys.filter(toy =>
        toy.name.toLowerCase().includes(srchStr.toLowerCase())
      );
    }
    if (categories !== "all") {
      filteredToys = toys.filter(toy => categories.includes(toy.type));
    }

    return Promise.resolve(filteredToys);
  }
}

function sortToys({ sort }) {
  if (sort === "name") {
    toys.sort((toy1, toy2) =>
      toy1.name.toLowerCase() > toy2.name.toLowerCase() ? 1 : -1
    );
  } else toys.sort((toy1, toy2) => toy1.price - toy2.price);
  currSort = sort;
}

function readToys() {
  let toys = require("../../toys.json");
  return toys;
}
function add(toy) {
  return new Promise((resolve, reject) => {
    toy._id = utilService.makeId(8);
    toys.push(toy);
    _saveToysToFile();
    return resolve(toy);
  });
}
function update(id, toy) {
  let idx = _getIdxById(id);
  if (idx !== -1) {
    toy._id = id;
    toys[idx] = toy;
    _saveToysToFile();
    return Promise.resolve();
  }
  return Promise.reject();
}

function getById(id) {
  console.log("id in get by id", id);
  return Promise.resolve(toys.find(toy => toy._id === id));
}
function remove(id) {
  let idx = _getIdxById(id);
  if (idx !== -1) {
    toys.splice(idx, 1);
    _saveToysToFile();
    return Promise.resolve();
  }
  return Promise.reject();
}
function _getIdxById(id) {
  return toys.findIndex(toy => toy._id === id);
}

function _saveToysToFile() {
  return new Promise((resolve, reject) => {
    fs.writeFile("../toys.json", JSON.stringify(toys), err => {
      if (err) {
        return reject(err);
      }
      resolve();
    });
  });
}

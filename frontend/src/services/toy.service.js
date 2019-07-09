import utilService from "./util.service.js";
import httpService from "./http.service.js";

export default {
  query,
  update,
  save,
  remove,
  getById
};

const URL = "http://localhost:3000/api/toy/";

function query() {
  return httpService.get(_getUrl())
}
function remove(toyId) {
  return httpService.delete(_getUrl(toyId))
}
function getById(toyId) {
  return httpService.get(_getUrl(toyId))
}

function update(toy) {
  return httpService.put(_getUrl(toyId))
}

function save(toy) {
  return httpService.post(_getUrl(), toy).then((res)=>{return res})
}

function _getUrl(id = '') {
  return `toy/${id}`
}
import axios from "axios";
import utilService from "./util.service.js";

export default {
  query,
  update,
  save,
  remove,
  getById
};

const URL = "http://localhost:3000/api/toys/";

function query(filters) {
  return sendAxios("get", "", { params: filters });
}
function remove(toyId) {
  return sendAxios("delete", toyId);
}
function getById(toyId) {
  return sendAxios("get", toyId);
}

function update(toy) {
  return sendAxios("put", toy._id, toy);
}
function sendAxios(type, id = "", postData, url = URL) {
  return axios[type](url + id, postData).then(res => res.data);
}

function save(toy) {
  toy._id = utilService._makeId();
    return sendAxios('post','',toy)
}

// function _getUrl(id = "") {
//   return `http://localhost:3000/toys/${id}`;
// }

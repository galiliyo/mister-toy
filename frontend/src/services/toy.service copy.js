import axios from "axios";
import utilService from "./util.service.js";

// this is a SYNCRONOUS service! (not useful for real apps)
export default {
  query,
  update,
  save,
  remove,
  getById
};

function query(filters) {
  let {srchStr} = filters
  console.log("filters", filters);
  if (srchStr !== "") {
    return axios
      .get("http://localhost:3000/toys/" + "?q=" + srchStr)
      .then(res => res.data);
  } else

  return axios.get("http://localhost:3000/toys").then(res => res.data);
}
function remove(toyId) {
  return axios.delete(_getUrl(toyId)).then(res => res.data);
}
function getById(toyId) {
  return axios.get(_getUrl(toyId)).then(res => {
    return res.data;
  });
}

function update(toy) {
  return axios.put(_getUrl(toy._id), toy).then(res => res.data);
}

function save(toy) {
  toy._id = utilService._makeId();
  return axios.post(_getUrl(), toy).then(res => res.data);
}

function _getUrl(id = "") {
  return `http://localhost:3000/toys/${id}`;
}

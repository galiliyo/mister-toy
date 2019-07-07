'use strict';
import axios from 'axios'
export default {
    query,
    add,
    update,
    remove,
    getById,

}
const URL = 'http://localhost:3000/api/toys/'
function query(filterBy){
    return sendAxios('get','', {params:filterBy})

}

function add(toy){
 return sendAxios('post','',toy)
}
function update(toy){
 return sendAxios('put',toy._id,toy)
}
function remove(_id){
 return sendAxios('delete',_id)
}
function getById(_id){
 return sendAxios('get',_id)
}

function sendAxios(type, id = '', postData, url = URL) {
    return axios[type](url + id, postData)
        .then(res => res.data)
}
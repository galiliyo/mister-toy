import Vue from 'vue';
var eventBus = new Vue();

export const SHOW_MSG = 'show-msg';
export const TOGGLE_DRAWER = 'toggle-drawer'

eventBus.$on(TOGGLE_DRAWER, ()=>{
    console.log('TOGGLE_DRAWER')})


export default eventBus;
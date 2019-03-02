
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');
import FullCalendar from "vue-full-calendar";
import "fullcalendar/dist/fullcalendar.min.css";
Vue.use(FullCalendar);
/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */


Vue.component('example', require('./components/Example.vue'));
Vue.component('task', require('./components/Task.vue'));
Vue.component('event', require('./components/Events.vue'));
Vue.component('calendar', require('./components/Calendar.vue'));
axios.defaults.baseURL = 'http://iquall/anil/vueJs/vueCrud2/';


const app = new Vue({
    el: '#app'
});

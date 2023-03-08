// 'use strict';

import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/bootstrap.css";
import "bootstrap";


import "./assets/main.css";

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import Vue3EasyDataTable from 'vue3-easy-data-table';
import 'vue3-easy-data-table/dist/style.css';

import "./styles/main.scss";
import directives from "./directives/";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.component('Datepicker', Datepicker);

app.component('EasyDataTable', Vue3EasyDataTable);

directives(app);

app.mount("#app");



import { createApp } from 'vue';
import './style.css';
import './index.css';
import App from './App.vue';
import router from './router'; // Импортируем экземпляр маршрутизатора из файла router.ts
import ApexCharts from 'apexcharts'

const app = createApp(App);
app.use(router); // Используем маршрутизатор
app.component('apexchart', ApexCharts);
app.mount('#app');

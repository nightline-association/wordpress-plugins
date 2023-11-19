import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

createApp(App, {
    institutions: window.nightlines ? JSON.parse(window.nightlines)?.institutions : [],
}).mount('#app')

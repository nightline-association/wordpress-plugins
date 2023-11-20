import { createApp } from 'vue'
import App from './App.vue'

createApp(App, {
    institutions: window.nightlines ? JSON.parse(window.nightlines)?.institutions : [],
}).mount('#app')

import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import '@mdi/font/css/materialdesignicons.css'
import colors from 'vuetify/lib/util/colors';

Vue.use(Vuetify);

export default new Vuetify({
  icons:{
    iconfont:"mdi"
  },
  theme: {
    options: {
      customProperties: true,
    },
    themes: {
      light: {
        //cambiar color aqui
        primary: '#ce5044', //naranja
        orange: '#ce5044',
        secondary: colors.grey.darken1,
        accent: colors.shades.black,
        error: colors.red.base,
        purple: '#7052fb',
        sooft: "#44355f",
        belgrano: "#199FDF",
        consultauser: "#ebe7fd",
        consultaadmin: "#f0f0f0",
        bottomTabActiveColor:'#0096E3',
        green: '#2b8a06',
        red: '#E21519',
      },
      dark: {
        /*
        primary: '#1976D2', // Reemplaza esto con 
        accent: '#607D8B',
        secondary: '#FFC107',
        info: '#009688',
        warning: '#FF5722',
        error: '#FF5722',
        success: '#4CAF50'
        */
        primary: '#FFCA28',
        secondary: '#199FDF',
        anchor: "#fff",
        
        consultauser: "#000000",
        consultaadmin: "#000038",
        green: '#4CAF50',
        red: '#E21519',
      },
    }
  }
});

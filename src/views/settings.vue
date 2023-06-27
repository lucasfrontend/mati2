<template>
    <v-container>
      <stepperVue></stepperVue>
    </v-container>
  </template>
  
  
  <script>
import stepperVue from './app/stepper.vue';
  export default {
    name: "settings",
    components: {
      stepperVue
    },
    data() {
      return {
        //userRole: null,
        buttons: [
          {
            title: "beer",
            icon: "mdi-beer",
            action: "Gestión de morosos",
            path: "/beer",
            description: "Cervezas",
            id: 1,
            rol: 3,
          },
          {
            title: "tandas",
            icon: "mdi-parachute",
            action: "Gestión de plegados",
            path: "/tablepackers",
            description: "Plegados",
            id: 2,
            rol: 3,
          },
          {
            title: "Total",
            icon: "mdi-chart-pie",
            action: "Total de plegados",
            path: "/total",
            description: "Total",
            id: 3,
            rol: 3
          },
          {
            title: "Combus",
            icon: "mdi-gas-station",
            action: "Carga de combustible",
            path: "pilots/combus",
            description: "Total",
            id: 3,
            rol: 4
          },
          {
            title: "Peso",
            icon: "mdi-calculator",
            action: "calculo de pesos y carga alar",
            path: "/manifest/weight",
            description: "Calcular Peso",
            id: 3,
            rol: 1
          },
          {
            title: "Otro",
            icon: "mdi-television-classic",
            action: "Pantalla tandas",
            path: "/home",
            description: "Pantalla tandas",
            id: 3,
            rol: 1
          }
        ],
      };
    },
    mounted() {
    },
    methods: {
    }
  };
  </script>
  
  <style>
  .card {
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 20px;
  }
  
  .text {
    text-align: center;
    font-size: 16px;
    color: white;
    margin-top: 5px;
    padding: 20px;
  }
  </style>
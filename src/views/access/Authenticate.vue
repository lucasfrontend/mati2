<template>
   <v-app>
      <v-container bg fill-height grid-list-md text-xs-center v-if="showMesssage">
        <v-layout row wrap align-center>
          <v-flex>
            <v-card class="elevation-12" >
              <v-toolbar color="secondary" dark>
                <v-toolbar-title>
                  <v-icon dark right>
                    mdi-cancel
                </v-icon>
                  Atención
                </v-toolbar-title>
                <v-spacer></v-spacer>
              </v-toolbar>
            <v-card-text>
              <h3> {{ error }} </h3>
            </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
  </v-app>
</template>
<script>
/*Este código define un componente llamado "Authenticate" que contiene un formulario de autenticación y un mensaje de error en caso de que la autenticación falle.

El componente tiene dos propiedades, "token" y "usu_id", que se usan para autenticar al usuario. Cuando se monta el componente, se llama al método "authenticate" para iniciar el proceso de autenticación.

El método "authenticate" verifica si las propiedades "token" y "usu_id" están definidas y, si es así, crea un objeto "payload" con estas propiedades y lo pasa al método "login" de la tienda Vuex a través de una acción.

Si la respuesta del servidor es un error, se muestra el mensaje de error en la pantalla. De lo contrario, se emite un evento "loadPage" para ocultar el indicador de carga y se redirige al usuario a la página de inicio.

El componente también importa un archivo llamado "event-bus.js", que define un bus de eventos global utilizado para comunicarse entre los componentes.*/

import eventBus from "../../event-bus.js"
export default {
  name: "Authenticate",
  props:{
    token: {type: String},
    usu_id: {type: String},
  },
  data(){
    return{
      emp_id:null,
      error:null,
      showMesssage:false
    }
  },
  mounted() {
    this.authenticate();
  },
  methods: {
   async authenticate () {
     eventBus.$emit("loadPage", {show: true, message: 'Autenticando Credenciales'});
     if (this.token != undefined && this.usu_id != undefined) {
        const payload = {
        token: this.token,
        usu_id: this.usu_id,
      }

      try {
        const response = await this.$store.dispatch('login', payload)

        if(response.status === 'error'){
            this.error = response.message;
            this.showMesssage = true;
        }
        eventBus.$emit("loadPage", {show: false, message: ''});

      } catch (error) {
        console.log(error);
        eventBus.$emit("loadPage", {show: false, message: ''});
      }
     }

    }
  }
}
</script>
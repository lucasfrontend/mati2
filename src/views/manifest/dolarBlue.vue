<template>
    <v-container>
      <v-alert type="warning" dismissible>
          La mayoría de las API gratuitas que proporcionan información financiera y de divisas suelen ofrecer información sobre las tasas de cambio oficiales y no sobre las tasas de cambio no oficiales como el dólar blue. Ten en cuenta que obtener información sobre el valor del dólar blue puede ser ilegal. Recomendamos optar por ingresar manualmente el valor del dolar blue de tu país al inicio de la actividad.
      </v-alert>

      <v-card>
        <v-card-text>
          <v-card class="current-value-card" outlined>
            <v-card-text>
              <div v-if="!dolarBlue" class="current-value">No hay valor cargado</div>
              <div v-else class="current-value">Valor actual del dólar: {{ dolarBlue }}</div>
            </v-card-text>
          </v-card>
          <v-form ref="form" @submit.prevent="savedolarblue">
            <v-text-field label="Blue hoy" v-model="dolarBlue" outlined dense required prepend-inner-icon="mdi-currency-usd"></v-text-field>
            <v-btn :loading="loading" color="black" dark type="submit" block>
              <span class="yellow--text">Guardar</span>
            </v-btn>
            <v-btn color="red" class="mt-2" dark block>
              <span class="yellow--text" :hover="{background: 'black'}">Eliminar</span>
            </v-btn>
          </v-form>
        </v-card-text>
      </v-card>
    </v-container>
</template>
  
  
  <script>
  import eventBus from '../../event-bus'
  import { mapActions } from 'vuex';
  export default {
    name: "Dasboard",
    data() {
      return {
        dolarBlue: null, 
        loading: false
      };
    },
    created() {
      this.dolarBlue = this.$store.state.dolarBlue
      /*
      const lastFetchTime = this.$store.state.lastFetchTime;
      const oneDay = 24 * 60 * 60 * 1000; // Milisegundos en un día
      if (!lastFetchTime || new Date().getTime() - lastFetchTime.getTime() > oneDay) {
        this.$store.dispatch('fetchDolarBlue');
      }
      setInterval(() => {
        this.$store.dispatch('fetchDolarBlue');
      }, 60 * 60 * 1000); // Consultar cada hora
      */
    },
    mounted() {
      console.log(this.buttons, "buttons")
      //this.getData();
    },
    methods: {
      ...mapActions(['setDolarBlue']),
      savedolarblue() {
        this.loading = true;
        this.setDolarBlue(this.dolarBlue);
        eventBus.$emit('toast', { show: true, text: "Guardado correctamente", color: "green" })
        this.loading = false;
        this.$router.push('/')
      }
    },
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
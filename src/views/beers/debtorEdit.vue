<template>
    <v-container>
      <v-row class="ma-5">
        <v-col cols="12" sm="6" v-if="debtor">
          <v-card class="pa-5" elevation="10">
            <v-card-title class="text-center">
              <h1 class="mb-0">{{ debtor.fly_name }}</h1>
              <h2 class="mt-2">{{ debtor.first_name }} {{ debtor.last_name }}</h2>
            </v-card-title>
            <v-btn color="primary" @click="Pay" class="mt-3">Pagó</v-btn>
            <v-card-text class="text-center">
              <div class="subtitle-1 font-weight-bold">Debe: {{ updatedDebtor.beers.beers_q }}</div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" sm="6" class="d-flex flex-column justify-center align-center">
          <v-icon size="50" class="mx-4" @click="incrementBeerCount()">mdi-plus</v-icon>
          <div class="subtitle-1 font-weight-bold">Debe: {{ updatedDebtor.beers.beers_q }}</div>
          <v-icon size="50" class="mx-4" @click="decrementBeerCount()">mdi-minus</v-icon>
          <v-text-field v-model="reason" label="Motivo" class="mt-5"></v-text-field>
          <v-btn color="primary" @click="updateBeers" class="mt-3">Guardar</v-btn>
        </v-col>
        <v-col cols="12">
          <div class="background-pelu"></div>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  
  
  <script>
//  import store from '@/store'
  export default {
    name: 'DebtorDetails',
    props: {
    },
    data() {
        return {
          debtor: '',
          beerCount: 0,
          id: null,
          reason: ''
      }
    },
    created() {
        this.id = this.$route.params.id
        console.log(this.id, "idddd")
        this.$http.get(`http://localhost:8082/api/paracas/`)
          .then((response) => {
              console.log(response.message, "response:", response)
              let paracas = response.data.payload;
              this.debtor = paracas.find((deb) => deb._id === this.id);
              console.log(this.debtor, "this.debtor");
          }).catch((err) => {
              console.log(err);
          });
    },
    computed: {
        updatedDebtor() {
            const updatedDebtor = { ...this.debtor };
            updatedDebtor.beers.beers_q = updatedDebtor.beers.beers_q + this.beerCount;
            return updatedDebtor;
        },
    },
    methods: {
        incrementBeerCount() {
            this.beerCount++;
        },
        decrementBeerCount() {
            if (this.beerCount > 0) {
                this.beerCount--;
            }
        },
        updateBeers(){
          console.log(this.reason, "this.reason")
          this.updatedDebtor.beers.reason = this.reason
        this.$http.put(`http://localhost:8082/api/paracas/${this.id}`, this.updatedDebtor)
          .then((response) => {
              console.log(response.message, "response:", response)
              console.log(response.data.payload, "response.data.payload");
          }).catch((err) => {
              console.log(err);
          });
        }
    }
  };
  </script>

<style>
.background-pelu {
  height: 500px;
  background-image: url('../../../public/img/pelu_beer_1.png');
  background-size: cover;
  background-position: center;
}
</style>
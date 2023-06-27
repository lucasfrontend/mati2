<template>
  <v-container>
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title>Listado de Aviones</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-data-table 
        :headers="headers" 
        :items="planes" 
        :loading="loading" 
        item-key="_id" 
        class="elevation-1" 
        :no-data-text="'No hay datos disponibles'"
      >
        <template v-slot:item.action="{ item }">
          <router-link :to="{ name: 'planesForm', params: { id: item._id } }">
            <v-btn dark class="mr-2">
              <v-icon small class="yellow--text">mdi-pencil</v-icon>
            </v-btn>
          </router-link>
        </template>
      </v-data-table>
      
    </v-card>
    <v-btn color="primary" dark fab class="black--text mt-5" to="/manifest/planesForm">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>


<script>  
export default {
  name: 'planesList',
  data () {
    return {
      loading: false,
      planes: [],
      headers: [
        { text: 'Nombre', value: 'name' },
        { text: 'Modelo', value: 'model' },
        { text: '', value: 'action', sortable: false },
      ]
    }
  },
  created () {
    this.getplanes()
  },
  methods: {
    getplanes() {
      this.loading = true;
      this.$http.get(`http://localhost:8082/api/planes`)
        .then(response => {
          this.planes = response.data.payload;
          this.loading = false;
        })
        .catch(error => {
          console.log(error)
          this.loading = false;
        });
    },
  }
}
</script>

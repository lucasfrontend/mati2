<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :loading="loading"
      :items="pilots"
      item-key="_id"
      class="elevation-1"
      :no-data-text="'No hay datos disponibles'"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Listado de Pilotos</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <router-link :to="{ name: 'pilotsForm', params: { id: item._id } }">
          <v-btn class="mr-2">
            <v-icon small class="black--text">mdi-pencil</v-icon>
          </v-btn>
        </router-link>
      </template>
    </v-data-table>

    <v-btn color="primary" dark fab bottom right class="mt-5 black--text" to="/manifest/pilotsForm">
      <v-icon>mdi-plus</v-icon>
    </v-btn>

  </v-container>
</template>





<script>
export default {
  name: 'pilotsList',
  data () {
    return {
      loading: false,
      pilots: [],
      headers: [
        {
          text: 'Nombre',
          value: 'first_name'
        },
        {
          text: 'Apellido',
          value: 'last_name'
        },
        {
          text: '',
          value: 'actions',
          sortable: false
        }
      ]
    }
  },
  created () {
    this.getpilots()
  },
  methods: {
    getpilots () {
      this.loading = true;
      this.$http.get(`http://localhost:8082/api/pilots`)
        .then(response => {
          this.pilots = response.data.payload
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          console.log(error)
        })
    }
  }
}
</script>

<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="instructors"
      :loading="loading"
      item-key="_id"
      class="elevation-1"
      :no-data-text="'No hay datos disponibles'"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Listado de Instructores</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <router-link :to="{ name: 'instructorsForm', params: { id: item._id } }">
          <v-btn dark class="mr-2">
            <v-icon small class="yellow--text">mdi-pencil</v-icon>
          </v-btn>
        </router-link>
      </template>
    </v-data-table>

    <v-btn color="black" dark fab bottom right class="mt-5 yellow--text" to="/manifest/instructorsForm">
      <v-icon>mdi-plus</v-icon>
    </v-btn>

  </v-container>
</template>

  
  <script>  
  export default {
    name: 'instructorsList',
    data () {
      return {
        loading: false,
        instructors: [],
        headers: [
          { text: 'Nombre', value: 'first_name' },
          { text: 'Apellido', value: 'last_name' },
          { text: '', value: 'action', sortable: false }
        ]
      }
    },
    created () {
      this.getinstructors()
    },
    methods: {
        getinstructors() {
          this.loading = true;
          this.$http.get(`http://localhost:8082/api/instructors`)
            .then(response => {
            this.instructors = response.data.payload;
            this.loading = false;
            //
            })
            .catch(error => {
              this.loading = false;
              console.log(error)
            //
            });
        },
    }
  }
  </script>
  
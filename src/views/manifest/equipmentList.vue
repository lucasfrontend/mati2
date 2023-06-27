<template>
  <v-container>
    <v-toolbar flat>
      <v-toolbar-title>Listado de Equipos</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-data-table :headers="headers" :loading="loading" :items="equipment" class="elevation-1" :no-data-text="'No hay datos disponibles'">
      <template v-slot:item.actions="{ item }">
        <router-link :to="{ name: 'equipmentForm', params: { id: item._id } }">
          <v-btn class="mr-2">
            <v-icon small class="green--text">mdi-pencil</v-icon>
          </v-btn>
        </router-link>
      </template>

      <template v-slot:item.category="{ item }">
        <div v-if="item.category === 1">TDM</div>
        <div v-else-if="item.category === 2">ESC</div>
        <div v-else-if="item.category === 3">DEP</div>
        <div v-else>-</div>
      </template>

      <template v-slot:item.canopy="{ item }">
        <div>{{ item.canopy.name }}</div>
      </template>

      <template v-slot:item.reserve="{ item }">
        <div>{{ item.reserve.name }}</div>
      </template>
    </v-data-table>

    <v-btn color="primary" fab class="black--text mt-5" to="/manifest/equipmentForm">
      <v-icon>mdi-plus</v-icon>
    </v-btn>
  </v-container>
</template>


  
  
<script>  
export default {
  name: 'EquipmentList',
  data () {
    return {
      loading: false,
      equipment: [],
      headers: [
        { text: 'Nombre Paracaídas', value: 'name_parachute' },
        { text: 'Categoría', value: 'category' },
        { text: 'Canopy', value: 'canopy' },
        { text: 'Arnes', value: 'harness' },
        { text: 'Reserva', value: 'reserve' },
        { text: '', value: 'actions', sortable: false },
      ],
    }
  },
  created () {
    this.getEquipment()
  },
  methods: {
    getEquipment() {
      this.loading = true;
    this.$http.get(`http://localhost:8082/api/equipment`)
      .then(response => {
      this.equipment = response.data.payload;
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

<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="6" lg="3">
          <v-card-title>Pilotos</v-card-title>
          <donut :filteredTdm="filteredTdm" :dataTdm="dataTdm"></donut>
      </v-col>
      <v-col cols="12" md="6" lg="3">
          <v-card-title>Instructores</v-card-title>
          <donut :filteredTdm="filteredTdm" :dataTdm="dataTdm"></donut>
      </v-col>
      <v-col cols="12" md="6" lg="3">
          <v-card-title>Packers</v-card-title>
          <donut :filteredTdm="filteredTdm" :dataTdm="dataTdm"></donut>
      </v-col>
      <v-col cols="12" md="6" lg="3">
          <v-card-title>Card 4</v-card-title>
          <donut :filteredTdm="filteredTdm" :dataTdm="dataTdm"></donut>
      </v-col>
    </v-row>
  </v-container>
</template>





<!--
<template>
  <div>
    <donut :filteredTdm="filteredTdm" :dataTdm="dataTdm"></donut>
  </div>
  <div>
    <apexchart type="line" :options="chartOptions" :series="series"></apexchart>
  </div>
</template>
-->

<script>
//import VueApexCharts from 'vue-apexcharts'
import donut from '../graphics/donut.vue'

export default {
  name: 'Total',
  components: {
    donut: donut,
  },
  data() {
    return {
      loading: false,
      filteredTdm: [],
      dataTdm: []
    }
  },
  mounted() {
    this.getEquipment()
  },
  methods: {
    getEquipment(){
      this.loading = true;
      this.$http.get(`http://localhost:8082/api/equipment/`)
        .then(response => {
            const equipment = response.data.payload;
            this.filteredTdm = equipment.filter(item => item.category === 1);
            const data = this.filteredTdm.map(item => {
              return {
                name: item.name_parachute,
                value: item.canopy.jumps
              }
            })
            this.dataTdm = data
            console.log(data, "data")
            this.loading = false;
            console.log(this.filteredTdm, "filteredTdm")
        })
        .catch(error => {
            console.log(error);
            this.loading = false;
        });
    }

  }
}
</script>

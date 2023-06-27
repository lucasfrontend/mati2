<template>
    <v-container>
        <v-card v-if="dataLoaded">
            <apexchart type="donut" :options="chartOptions" :series="chartSeries" />
        </v-card>
  </v-container>
</template>

<script>
import VueApexCharts from 'vue-apexcharts'

export default {
components: {
  apexchart: VueApexCharts
},
data() {
  return {
    loading: false,
    chartOptions: {
      labels: [],
      legend: {
        show: true,
        position: 'bottom'
      }
    },
    chartSeries: [],
    dataLoaded: false 
  }
},
mounted() {
  this.getTdmInstructors()
},
methods: {
  getTdmInstructors(){
    this.loading = true;
    this.$http.get(`http://localhost:8082/api/tandas`)
      .then(response => {
        let tandas = response.data.payload;
        console.log(pilots)
        this.dataLoaded = true;
      })
      .catch(error => {
          console.log(error);
          this.loading = false;
      })
      .finally(() => {
        this.loading = false;
      });

  }
},
watch: {
  dataLoaded(newVal) {
if (newVal) {
  this.getTdmInstructors(); // llamamos la función para obtener los datos de la API
}
}
}
}
</script>

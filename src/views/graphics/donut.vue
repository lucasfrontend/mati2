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
        labels: ['Martin', 'Facu', 'Otro'],
        legend: {
          show: true,
          position: 'bottom'
        },
        dataLabels: {
          enabled: false,
          formatter: function (val) {
            return val.toString();
          }
        },
        colors: ['#EF5350', '#FFCA28', '#66BB6A'],
        
        //enabled: false,
        plotOptions: {
          pie: {
            donut: {
              labels: {
                show: true,
                name: {
                  show: true
                },
                formatter: function (val) {
                  return val.toString();
                }
              }
            }
          }
        }
      },
      chartSeries: [4, 5, 6],
      dataLoaded: true
    }
  }
}
</script>

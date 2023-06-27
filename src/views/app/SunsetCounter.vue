<template>
  <div v-if="show">
    <span>Hora del atardecer</span>
    <div class="hours">{{ hours }}</div>
    <div class="minutes">{{ minutes }}</div>
    <div class="seconds">{{ seconds }}</div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'totalFlyer',
  data() {
    return {
      showSunset: false,
      sunset: null,
      days: '',
      hours: '',
      minutes: '',
      seconds: '',
      endDate: null,
    };
  },
  mounted() {
    this.sunset = moment(this.$store.state.sunset, 'HH:mm:ss');
    console.log("this.sunset",this.sunset)

    if (!this.sunset) {
      this.getSunset();
      console.log("Nuevo llamado a sunset porque sunset es falsy");
    }

    this.updateCounter();

    // Actualiza el contador cada segundo
    setInterval(() => {
      this.updateCounter();
    }, 60000);
  },
  methods: {
    format(v) {
      return v.toString().padStart(2, '0');
    },
    updateCounter() {
      const currentMoment = moment();

      if (currentMoment.isBefore(this.sunset)) {
        this.showSunset = true;
        const duration = moment.duration(this.sunset.diff(currentMoment));
        this.hours = this.format(duration.hours());
        this.minutes = this.format(duration.minutes());
        this.seconds = this.format(duration.seconds());
      } else {
        // Realiza acciones cuando sea después del atardecer
        console.log("Después del atardecer");
        this.showSunset = false
      }
    },
    getSunset() {
      // Implementa tu lógica para obtener la hora del atardecer desde una API u otra fuente de datos
      // y actualiza el valor de this.sunset en consecuencia.
    },
  },
};
</script>

<style scoped>
/* Agrega tus estilos aquí */
</style>

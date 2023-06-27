<template>
  <v-container fluid>

      <h1>Cierre de Cuenta y Egreso del Visitante</h1>
  </v-container>
</template>


<script>

export default {
  name: "Exit",
  components:{
  //BackToHome
  },
  data() {
    return {
      loading: false,
    };
  },
  methods: {
    exit(){
      this.loading = true;
      //let vm = this;
      this.$http
        .post(`${process.env.VUE_APP_VISIT_EXIT}`)
        .then(response => {
          console.log('res', response)
          //const token = response.data.data.token;
          if (response) {
            console.log(response)
          }
        })
        .catch((error) => {
          console.log(error)
          this.errorMessage = error;
          console.log(this.errorMessage, "errorMessage")
          this.loading = false;
        })
      // /api/v1/degira/partners/discharge
    },
  },
};
</script>
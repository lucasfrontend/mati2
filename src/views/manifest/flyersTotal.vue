<template>
    <div>
      <v-progress-circular
          v-if="id"
          indeterminate
          size="64"
          color="primary"
        >
      </v-progress-circular>
    </div>
  </template>


  <script>
  export default {
    data() {
      return {
        flyer: null
      };
    },
    mounted() {
    const id = this.$route.params.id
    if (id) {
        this.$http.get(`http://localhost:8082/api/paracas/${id}`)
          .then(response => {
              console.log(response.data.payload, "response.data.payload")
              this.flyer = response.data.payload;
          })
          .catch(error => {
              console.log(error)
              //
          });
          } else {
              //hacer codigo para redireccionar
          console.log("erorrrrr")
        }
    },
    methods: {
      getParacas() {
      }
    },
    computed: {
    }
  };
  </script>
  
  
  
  <style>
  
  </style>
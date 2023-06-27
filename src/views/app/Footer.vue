<template>
  <div>

    <v-footer app padless class="custom-footer">
      <v-bottom-navigation v-model="route" grow color="orange" icon>
        <v-btn value="home" to="/home">
          <v-icon>mdi-home</v-icon>
        </v-btn>

        <v-btn value="tandasMain" icon to="/tandasMain">
          <v-icon>mdi-airplane-takeoff</v-icon>
        </v-btn>

        <v-btn value="flyersList" icon to="/flyersList">
          <v-icon>mdi-account-search</v-icon>
        </v-btn>

        <v-btn value="register" icon to="/registerflyer">
          <v-icon>mdi-account-plus</v-icon>
        </v-btn>

        <v-btn icon @click="showDialog = true">
          <v-icon>mdi-logout-variant</v-icon>
        </v-btn>
      </v-bottom-navigation>
    </v-footer>

    <v-dialog v-model="showDialog" persistent max-width="500px">
      <v-card>
        <v-card-title>Cerrar sesión</v-card-title>
        <v-card-text>¿Está seguro de que desea cerrar la sesión?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="showDialog = false">Cancelar</v-btn>
          <v-btn color="primary" text @click="logout">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default{
    name: "Footer",
    data() {
      return {
        showDialog: false,
      };
    },
    computed:{
      route(){
        return (['dashboard','tandasMain', 'flyerList', 'registerflyer'].includes(this.$route.name)) ? this.$route.name : 'dashboard'
      }
    },
    methods: {
      getRoute() {
        return (['dashboard', 'tandasMain', 'flyerList', 'registerFlyer'].includes(this.$route.name)) ? this.$route.name : 'dashboard'
      },
      logout(){
        this.$store.dispatch('logout')
        // Poner alert antes de salir
        .then(() => {
          this.$router.push('/login')
        })
      }
    }
}
</script>

<style>
.custom-footer {
  position: fixed;
  bottom: 0;
}
</style>

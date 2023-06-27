<template>
  <v-container>
    <SunsetCounter></SunsetCounter>
    <v-row style="display: flex; align-items: stretch;">
      <v-col v-for="button in buttons" :key="button.id" cols="6">
        <v-tooltip bottom v-if="button.action !== null && button.action !== ''">
          <template v-slot:activator="{ on }">
            <v-card elevation="4" outlined @click="$router.push(button.path)" v-on="on" class="rounded-lg d-flex justify-center align-center text-center" style="height: 130px;">
              <v-card-text class="orange--text">
                <v-icon size="40" color="primary">{{ button.icon }}</v-icon>
                <h4 class="">{{ button.description  }}</h4>
              </v-card-text>
            </v-card>
          </template>
          <span v-if="button.action">{{ button.action  }}</span>  
        </v-tooltip>
        <v-card v-else elevation="4" outlined @click="$router.push(button.path)" class="rounded-lg d-flex justify-center align-center text-center" style="height: 130px;">
          <v-card-text class="">
            <v-icon size="40" class="orange--text pb-4">{{ button.icon }}</v-icon>
            <h4>{{ button.description }}</h4>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>


<script>
import SunsetCounter from './app/SunsetCounter.vue';
export default {
  name: "Dasboard",
  components: {
    SunsetCounter
  },
  data() {
    return {
      limit: 100,
      offset: 0,
      //userRole: null,
      buttons: [
        {
          title: "beer",
          icon: "mdi-beer",
          action: "Gestión de morosos",
          path: "/beer",
          description: "Cervezas",
          id: 1,
          rol: 3,
        },
        {
          title: "tandas",
          icon: "mdi-parachute",
          action: "Gestión de plegados",
          path: "/tablepackers",
          description: "Plegados",
          id: 2,
          rol: 3,
        },
        {
          title: "Total",
          icon: "mdi-chart-pie",
          action: "Total de plegados",
          path: "/total",
          description: "Total",
          id: 3,
          rol: 3
        },
        {
          title: "Combus",
          icon: "mdi-gas-station",
          action: "Carga de combustible",
          path: "pilots/combus",
          description: "Total",
          id: 3,
          rol: 4
        },
        {
          title: "Peso",
          icon: "mdi-calculator",
          action: "calculo de pesos y carga alar",
          path: "/manifest/weight",
          description: "Calcular Peso",
          id: 3,
          rol: 1
        },
        {
          title: "Otro",
          icon: "mdi-television-classic",
          action: "Pantalla tandas",
          path: "/home",
          description: "Pantalla tandas",
          id: 3,
          rol: 1
        }
      ],
    };
  },
  mounted() {
    console.log("this.$store.state.token", this.$store.state.token)
    console.log("this.$store.state.userLoged", this.$store.state.userLoged)
    //this.getData();
    this.getLeads()
  },
  methods: {
    getLeads(){
      const status = 'standby';
      this.$http.get(`https://coterranea.nocrm.io/api/leads?status=${status}&limit=${this.limit}&offset=${this.offset}`, {
          headers: {
            'X-API-KEY': '021c22690d44a4c08868dfaaf514305c1b0742f9637603a2'
          }
        })
        .then(response => {
          console.log("response en buttons", response)
          console.log(typeof response.data.data)
          this.buttons = response.data.data;
          //
        })
        .catch(error => {
          console.log(error)
          //
        });
    },
    getData() {
      let id_user = this.$store.state.userLoged.data.id_user; 
      this.$http.get(`http://localhost:8082/api/buttons?${id_user}`)
        .then(response => {
          console.log("response en buttons", response)
          console.log(typeof response.data.data)
          this.buttons = response.data.data;
          //
        })
        .catch(error => {
          console.log(error)
          //
        });
    },
    /*
    loadbuttons() {
      let roles = this.$store.state.userLoged.data.roles;
      let rolesUser = roles.map(role => role.id_role);

      //this.userRole = rolesUser;

      // Botones para rol CAJA
      if (rolesUser.includes(1)) {
        this.buttons.push(
          { id: 2, title: "Control de Acceso por DNI", text: "Ingreso", icon: "mdi-login", path: "/access" },
          { id: 3, title: "Cierre de cuenta y egreso de un visitante", text: "Egreso", icon: "mdi-logout", path: "/exit" },
          //{ id: 3, title: "Registración de una nueva visita", text: "Registración", icon: "mdi-logout", path: "/" },
          //{ id: 3, title: "Calculo de monto consumido", text: "consumo", icon: "mdi-logout", path: "/" },

        );
      }
      // Botones para rol BARMAN
      if (rolesUser.includes(2)) {
        this.buttons.push(
          { id: 4, title: "Saber cuando lleva consumido", text: "Consumo", icon: "mdi-beer-outline", path: "/consumo" },
          { id: 5, title: "Registrar consumo", text: "Ingresar", icon: "mdi-plus", path: "/ingreso-consumo" },
        );
      }
      // Botones para rol ADMIN
      if (rolesUser.includes(3)) {
        this.buttons.push(
          { id: 6, title: "etc etc", text: "title 1", icon: "", path: "/etc" },
          { id: 7, title: "etc etc", text: "title 2", icon: "", path: "/etc etc" },
        );
      }
      // Botones para rol GUARDARROPAS
      if (rolesUser.includes(4)) {
        this.buttons.push(
          { id: 8, title: "guardarropas", text: "title 1", icon: "", path: "/etc" },
          { id: 9, title: "etc etc", text: "title 2", icon: "", path: "/etc etc" },
        );
      }
    }*/

  },
};
</script>

<style>
.card {
  border-radius: 10px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20px;
}

.text {
  text-align: center;
  font-size: 16px;
  color: white;
  margin-top: 5px;
  padding: 20px;
}
</style>
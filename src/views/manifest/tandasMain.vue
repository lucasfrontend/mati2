<template>
  <v-container fluid>
    <v-toolbar flat>
      <v-toolbar-title>Tandas</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>


    <v-data-table 
      :headers="headers" 
      :items="tandas" 
      :loading="loading" 
      class="elevation-1"
      :no-data-text="'No hay datos disponibles'"
    >

      <template v-slot:item.number_tanda="{ item }">
        <v-td class="custom">{{ item.number_tanda }}</v-td>
      </template>

      <template v-slot:item.slot="{ item }">
        <v-td class="custom">
          <ul>
            <li v-for="(slot, index) in item.slots" :key="index">{{ slot.slot.name }}</li>
          </ul>
        </v-td>
      </template>

      <template v-slot:item.altitude="{ item }">
        <td v-if="item.altitude">{{ item.altitude.altitude }}</td>
        <td v-else>-</td>
      </template>

      <template v-slot:item.pilot="{ item }">
        <td v-if="item.pilot">{{ item.pilot.name }}</td>
        <td v-else>-</td>
      </template>


      <template v-slot:item.plane="{ item }">
        <td v-if="item.plane">{{ item.plane.name }}</td>
        <td v-else>-</td>
      </template>

      <template v-slot:item.actions="{ item }">
        <router-link :to="{ name: 'tandaForm', params: { id: item._id } }">
          <v-btn dark class="mr-2">
            <v-icon small class="yellow--text">mdi-pencil</v-icon>
          </v-btn>
        </router-link>
      </template>

      <template v-slot:item.activate="{ item }">
        <v-btn
          disable
          @click="item.status.f_status === 1 || item.status.f_status === 2 ? showLandingConfirmation(item) : ''"
        >
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on">
                <!-- Mostrar el icono de avión en tierra si flight_status es 1 -->
                <template v-if="item.status.f_status === 1">
                  mdi-airplane-off
                </template>
                <!-- Mostrar el icono de despegue si flight_status es 2 -->
                <template v-else-if="item.status.f_status === 2">
                  mdi-airplane-takeoff
                </template>
                <!-- Mostrar el icono de aterrizaje si flight_status es 3 -->
                <template v-else-if="item.status.f_status === 3">
                  mdi-airplane-landing
                </template>
                <!-- Mostrar el icono de hastag si flight_status no es 1, 2 ni 3 -->
                <template v-else>
                  mdi-pound
                </template>
              </v-icon>
            </template>
            <span>
              <template v-if="item.status.f_status === 1">
                En tierra
              </template>
              <template v-else-if="item.status.f_status === 2">
                En ascenso
              </template>
              <template v-else-if="item.status.f_status === 3">
                Finalizado
              </template>
            </span>
          </v-tooltip>
        </v-btn>
      </template>

      <template v-slot:item.actions="{ item }" hide-headers>
        <router-link :to="{ name: 'tandasForm', params: { id: item._id } }">
          <v-btn dark class="mr-2" block color="white">
            <v-icon small class="black--text">mdi-pencil</v-icon>
          </v-btn>
        </router-link>
      </template>
    </v-data-table>

    <v-btn dark fab color="primary" class="black--text mt-5" to="/manifest/tandasForm">
      <v-icon>mdi-plus</v-icon>
    </v-btn>

      <!-- Diálogo de confirmación de aterrizaje -->
  <v-dialog v-model="landingConfirmation" persistent max-width="500px">
    <v-card>
      <v-card-title></v-card-title>
      <v-card-text>¿Está seguro de que desea cambiar el estado del vuelo?</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" text @click="landingConfirmation = false">Cancelar</v-btn>
        <v-btn color="primary" text @click="closeSwitchStatus">Aceptar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  </v-container>
</template>


  
  
<script>  
//import DataTableInputVue from './DataTableInput.vue'
export default {
  components: {
    //DataTableInputVue
  },
  name: 'tandasMain',
  data () {
    return {
      loading: false,
      headers: [
        {
          text: "Numero",
          value: 'number_tanda',
        },
        {
          text: "Slot 1",
          value: 'slots[0].slot.name',
        },
        {
          text: "Slot 2",
          value: 'slots[1].slot.name',
        },
        {
          text: "Slot 3",
          value: 'slots[2].slot.name',
        },
        {
          text: "Slot 4",
          value: 'slots[3].slot.name',
        },
        {
          text: "Hora",
          value: 'time',
        },
        {
          text: "Piloto",
          value: 'pilot',
        },
        {
          text: "Avión",
          value: 'plane',
        },
        {
          text: "FT",
          value: 'altitude',
        },
        {
          text: "Estado",
          value: 'activate',
        },
        {
          text: "Editar",
          value: 'actions',
          sortable: false,
        },
      ],
      tandas: [],
      landingConfirmation: false,
      selectedItem: null,
      showDialog: false
    }
  },
  mounted(){
    this.getTandas()
  },
  computed: {
    optionsFormatted() {
      return this.options.map(option => ({
        text: option,
        value: option
      }));
    }
  },
  methods: {
    getTandas () {
      this.loading = true;
      this.$http.get(`http://localhost:8082/api/tandas?today=true`)
        .then(response => {
          this.tandas = response.data.payload
          console.log(this.tandas, "this.tandas")
          this.loading = false;
        })
        .catch(error => {
          this.loading = false;
          console.log(error)
        })
    },
    edit(item) {
      this.selectedItem = item;
      this.showDialog = true;
    },
    cancelEdit() {
      this.selectedItem = null;
      this.showDialog = false;
    },
    saveEdit(value) {
      if (this.selectedItem) {
        this.selectedItem.name = value;
      }
      this.selectedItem = null;
      this.showDialog = false;
    },
    showLandingConfirmation(item) {
      this.landingConfirmation = true;
      this.selectedTanda = item
      //put para cambiar estado del vuelo
    },
    closeSwitchStatus(){
      let id = this.selectedTanda._id;
      console.log("this.selectedTanda.status.f_status", this.selectedTanda.status.f_status)
      let newData = {
        status: {
          f_status: this.selectedTanda.status.f_status === 1 ? 2 : 3
        }
      };
      this.$http.put(`http://localhost:8082/api/tandas/${id}`, newData)
        .then((response) => {
          console.log(response.data.payload, "respuesta de ediciin");
          // Cambiar el icono del botón según el nuevo valor de flight_status
          this.selectedTanda.flight_status = newData.flight_status;
          this.getTandas()

        }).catch((err) => {
          console.log(err);
          // Realizar acciones en caso de error
          // ...
        });
      this.landingConfirmation = false;
    },
  },
  
}
</script>


<style>
.custom {
  font-size: 1.5em;
}

.v-data-table-header th.sortable .v-icon {
  font-size: 5em; /* tamaño del ícono de ordenamiento */
  margin-left: 5px; /* margen izquierdo del ícono */
}

.v-data-table-header th.active {
  color: #ff9800; /* color de texto del encabezado activo */
}

.v-data-table-header th.active .v-icon {
  color: #ff9800; /* color del ícono del encabezado activo */
}
</style>
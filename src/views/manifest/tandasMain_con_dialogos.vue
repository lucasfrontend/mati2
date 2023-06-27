<template>
  <v-container fluid>
    <v-toolbar flat>
      <v-toolbar-title>Tandas</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-data-table :headers="headers" :loading="loading" :items="tandas" class="elevation-1 bg-sdch">

      <template v-slot:item.slot_1="{ item }">
        <v-btn text @click="edit(item)">{{ item.slot_1.name_slot }}</v-btn>
        <edit-dialog
          :title="'Editar ' + item.fly_name"
          :value="item.name"
          :show="showDialog"
          @cancel="cancelEdit"
          @save="saveEdit"
        ></edit-dialog>
      </template>

      <template v-slot:item.slot_2="{ item }">
        <v-td>{{ item.slot_2.name_slot }}</v-td>
      </template>

      <template v-slot:item.slot_3="{ item }">
        <v-td>{{ item.slot_3.name_slot }}</v-td>
      </template>

      <template v-slot:item.slot_4="{ item }">
        <v-td>{{ item.slot_4.name_slot }}</v-td>
      </template>

      
      <template v-slot:item.time="{ item }">
        <v-td>{{ item.time }}</v-td>
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
          @click="item.flight_status === 2 || item.flight_status === 3 ? showLandingConfirmation(item) : ''"
        >
          <v-tooltip bottom>
            <template #activator="{ on, attrs }">
              <v-icon v-bind="attrs" v-on="on">
                <!-- Mostrar el icono de avión en tierra si flight_status es 1 -->
                <template v-if="item.flight_status === 1">
                  mdi-airplane-off
                </template>
                <!-- Mostrar el icono de despegue si flight_status es 2 -->
                <template v-else-if="item.flight_status === 2">
                  mdi-airplane-takeoff
                </template>
                <!-- Mostrar el icono de aterrizaje si flight_status es 3 -->
                <template v-else-if="item.flight_status === 3">
                  mdi-airplane-landing
                </template>
                <!-- Mostrar el icono de hastag si flight_status no es 1, 2 ni 3 -->
                <template v-else>
                  mdi-pound
                </template>
              </v-icon>
            </template>
            <span>
              <template v-if="item.flight_status === 1">
                En tierra
              </template>
              <template v-else-if="item.flight_status === 2">
                En ascenso
              </template>
              <template v-else-if="item.flight_status === 3">
                Finalizado
              </template>
            </span>
          </v-tooltip>
        </v-btn>
      </template>

      <template v-slot:item.actions="{ item }" hide-headers>
        <router-link :to="{ name: 'tandaForm', params: { id: item._id } }">
          <v-btn dark class="mr-2" block>
            <v-icon small class="yellow--text">mdi-pencil</v-icon>
          </v-btn>
        </router-link>
      </template>
    </v-data-table>

    <v-btn dark fab class="yellow--text mt-5" to="/manifest/equipmentForm">
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
import editDialog from './editDialog.vue';
export default {
  components: {
    editDialog
  },
  name: 'tandasMain',
  data () {
    return {
      loading: false,
      tandas: [],
      heade: [
        { text: 'Núm', value: 'num' },
        { text: 'Slot 1', value: 'category' },
        { text: 'Slot 2', value: 'Slot 2' },
        { text: 'Slot 3', value: 'Slot 3' },
        { text: 'Slot 4', value: 'Slot 4' },
        { text: 'Hora', value: 'Hora' },
        { text: 'Piloto', value: 'pilot' },
        { text: 'Avión', value: 'Avión' },
        { text: 'En vuelo', value: 'in_flight' },
        { text: 'Hora', value: 'hora' },
        { text: '', value: 'actions' },
        { text: '', value: 'actions', sortable: false },
      ],
      headers: [
          {
            text: "Num",
            value: 'number_tanda',
          },
          {
            text: "Slot 1",
            value: 'slot_1',
          },
          {
            text: "Slot 2",
            value: 'slot_2',
          },
          {
            text: "Slot 3",
            value: 'slot_3',
          },
          {
            text: "Slot 4",
            value: 'slot_4',
          },
          {
            text: "Hora",
            value: 'time',
          },
          {
            text: "Piloto",
            value: 'Piloto',
          },
          {
            text: "Avión",
            value: 'Avion',
          },
          {
            text: "Estado",
            value: 'activate',
          },
          {
            text: "Otro",
            value: 'activate',
          },
      ],
      landingConfirmation: false,
      selectedItem: null,
      showDialog: false,
    }
  },
  mounted(){
    this.getTandas()
  },
  methods: {
    getTandas () {
      this.loading = true;
      this.$http.get(`http://localhost:8082/api/tandas`)
        .then(response => {
          this.tandas = response.data.payload
          console.log(this.tandas)
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
      let newData = {
        flight_status: this.selectedTanda.flight_status === 3 ? 2 : 3
      };
      console.log(newData, "newData", "id es", id);
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
  }
}
</script>
<style>
  .bg-sdch {
    background-color: #000000; /* Fondo negro */
    color: #ffff00; /* Letras amarillas */
  }
</style>

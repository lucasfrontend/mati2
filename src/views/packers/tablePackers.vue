<template>
  <div class="container">
    <v-data-table
      :headers="headers"
      :items="tandas"
      :loading="loading"
      class="elevation-1"
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



    </v-data-table>

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

    <v-dialog v-model="showEditModal" v-if="selectedTanda">
      <v-card class="rounded-lg text-center">
        <v-card-title>
          <span class="headline">Tanda {{ selectedTanda.number_tanda }}</span>
        </v-card-title>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <div class="d-flex flex-column">
                <span>Slot 1 {{ selectedTanda.slot_1.name_slot }}</span>
                <v-select v-model="packer1" :items="defaultPackers" label="Packer"></v-select>
                <v-select v-model="type1" :items="selectedTanda.is_tandem ? [{ value: 1, text: 'Tandem' }] : [{ value: 2, text: 'Escuela' }, { value: 3, text: 'Deportivo' }]" item-text="text" label="Tipo"></v-select>
                
              </div>
            </v-col>
            <v-col cols="6" v-if="!selectedTanda.is_tandem">
              <div class="d-flex flex-column">
                <span>Slot 2{{ selectedTanda.slot_2.name_slot}}</span>
                <v-select v-model="packer2" :items="defaultPackers" label="Packer"></v-select>
                <v-select v-model="type2" :items="[{ value: 2, text: 'Escuela' }, { value: 3, text: 'Deportivo' }]" item-text="text" label="Tipo"></v-select>
              </div>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <div class="d-flex flex-column">
                <span>Slot 3{{ selectedTanda.slot_3.name_slot}}</span>
                <v-select v-model="packer3" :items="defaultPackers" label="Packer"></v-select>
                <v-select v-model="type3" :items="selectedTanda.is_tandem_2 ? [{ value: 1, text: 'Tandem' }] : [{ value: 2, text: 'Escuela' }, { value: 3, text: 'Deportivo' }]" item-text="text" label="Tipo"></v-select>
              </div>
            </v-col>
            <v-col cols="6" v-if="!selectedTanda.is_tandem_2">
              <div class="d-flex flex-column">
                <span>Slot 4{{ selectedTanda.slot_4.name_slot }}</span>
                <v-select v-model="packer4" :items="defaultPackers" label="Packer"></v-select>
                <v-select v-model="type4" :items="[{ value: 2, text: 'Escuela' }, { value: 3, text: 'Deportivo' }]" item-text="text" label="Tipo"></v-select>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="showEditModal = false">Cancelar</v-btn>
          <v-btn color="primary" text @click="updatePlegados">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
  
  <script>
  //import eventBus from "../../event-bus";

  export default {
    data() {
      return {
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
        loading: true,
        selectedTanda: null,
        showDialog: false,
        landingConfirmation: false,
        errorMesagge: null,
        showEditModal: false,
        defaultPackers: ["Barri", "Tirri", "Jaira"],
        packers: [],
        packer1: null,
        packer2: null,
        packer3: null,
        packer4: null,
        type1: null,
        type2: null,
        type3: null,
        type4: null,
      }
    },
    mounted() {
      this.getTandas()
      /*
      if (this.selectedTanda) {
        this.packer1 = this.selectedTanda.slot_1.packer
        this.packer2 = this.selectedTanda.slot_2.packer
        this.packer3 = this.selectedTanda.slot_3.packer
        this.packer4 = this.selectedTanda.slot_4.packer
      }*/
    },
    methods: {
      getTandas () {
        this.loading = true;
        this.$http.get(`http://localhost:8082/api/tandas`)
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
      openModalPackers(item){
        this.selectedTanda = item
        console.log("itemmmm selectedTanda ", this.selectedTanda )
        this.landingConfirmation = false;
        this.showEditModal = true
      },
      updatePlegados() {
        let id = this.selectedTanda._id;
        let newData = {
          slot_1: {
            name_slot: this.selectedTanda.slot_1.name_slot,
            packer: this.packer1,
            type: this.type1
          },
          slot_2: {
            name_slot: this.selectedTanda.slot_2.name_slot,
            packer: this.packer2,
            type: this.type2
          },
          slot_3: {
            name_slot: this.selectedTanda.slot_3.name_slot,
            packer: this.packer3,
            type: this.type3
          },
          slot_4: {
            name_slot: this.selectedTanda.slot_4.name_slot,
            packer: this.packer4,
            type: this.type4
          }
        };
        this.$http.put(`http://localhost:8082/api/tandas/${id}`, newData)
          .then((response) => {
            console.log(response.data.payload, "respuesta de ediciin");
            this.showEditModal = false;
            this.getTandas();
          }).catch((err) => {
            console.log(err);
            // Realizar acciones en caso de error
            // ...
          });
      },
    },
  }

  </script>
  

  
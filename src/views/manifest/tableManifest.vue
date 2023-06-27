<template>
    <div class="container">
    <v-data-table
      :headers="headers"
      :items="tandas"
      :search="search"
      :loading="loading"
      :rows-per-page-items="[5, 10, 25]"
      :footer-props="{ showFirstLastPage: true }"
      :mobile-breakpoint="0"
      class="elevation-1"
    >
    <template v-slot:item.slot_1="{ item }">
      <v-td>{{ item.slot_1.name_slot }}</v-td>
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
  
    <template v-slot:item.activate="{ item }">
      <v-btn
        :disabled="item.flight_status !== 2 && item.flight_status !== 3"
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
              Para plegar
            </template>
          </span>
        </v-tooltip>
      </v-btn>
  
  
      <v-btn 
        class="ml-2"
        @click="openModalPackers(item)"
        v-if="item.flight_status === 3"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </template>
  
  
    </v-data-table>
  </div>
  </template>
    
    <script>
    //import eventBus from "../../event-bus";
  
    export default {
      data() {
        return {
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
              text: "Aterrizo?",
              value: 'activate',
            },
          ],
          tandas: [],
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
        getTandas() {
            this.loading = true;
            this.errorMessage = '';
            let vm = this;
              this.$http.get(`http://localhost:8082/api/tandas/`)
              .then((response) => {
                  this.tandas = response.data.payload;

                  vm.loading = false
              }).catch((err) => {
                  console.log(err);
                  this.errorMessage = 'No se encontraron paracaidistas con ese nombre';
                  vm.loading = false; // Establecer loading a true en caso de error
              });
            vm.loading = false;
        },
      },
    }
  
    </script>
    
  
    
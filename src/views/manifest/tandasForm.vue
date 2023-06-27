<template>
  <v-container>
    <v-card>
      <v-card-text dense>
        <v-icon v-if="id" @click="showDialog = true">mdi-delete</v-icon>

        <v-form @submit.prevent="submitForm">
          <v-text-field v-model="formData.number_tanda" type="number" label="Num" required outlined dense prepend-inner-icon="mdi-numeric"></v-text-field>

          <v-autocomplete
            v-model="formData.slot1"
            :items="flyersOptions"
            item-text="name"
            item-value="id"
            label="Slot 1"
            outlined
            dense
            prepend-inner-icon="mdi-magnify"
            class="mt-4"
            return-object
          ></v-autocomplete>

          <v-autocomplete
            v-model="formData.slot2"
            :items="flyersOptions"
            item-text="name"
            item-value="id"
            label="Slot 2"
            outlined
            dense
            prepend-inner-icon="mdi-magnify"
            class="mt-4"
            return-object
          ></v-autocomplete>

          <v-autocomplete
            v-model="formData.slot3"
            :items="flyersOptions"
            item-text="name"
            item-value="id"
            label="Slot 3"
            outlined
            dense
            prepend-inner-icon="mdi-magnify"
            class="mt-4"
            return-object
          ></v-autocomplete>

          <v-autocomplete
            v-model="formData.slot4"
            :items="flyersOptions"
            item-text="name"
            item-value="id"
            label="Slot 4"
            outlined
            dense
            prepend-inner-icon="mdi-magnify"
            class="mt-4"
            return-object
          ></v-autocomplete>

          <v-text-field
            v-model="formData.time"
            label="Hora"
            outlined
            dense
            prepend-inner-icon="mdi-clock-time-four-outline"
            :rules="timeValidationRules"
          ></v-text-field>

          <v-select
            v-model="formData.pilot"
            label="Piloto"
            outlined
            dense
            :items="pilotOptions"
            :item-text="'name'"
            return-object
          ></v-select>

          <v-select
            v-model="formData.plane"
            label="Avion"
            outlined
            dense
            :items="planesOptions"
            :item-text="'name'"
            return-object
          ></v-select>

          <v-select
            v-model="formData.altitude"
            label="Altura"
            outlined
            dense
            :items="altitudesOptions"
            item-text="altitude"
            item-key="value"
            :value="formData.altitude"
            return-object
          ></v-select>

          <v-select
            v-model="formData.status"
            label="Estado"
            outlined
            dense
            :items="statusOptions"
            item-text="text"
            item-key="value"
            return-object
          ></v-select>

          <v-btn type="submit" color="black" :loading="loading" dark block>
            <span class="yellow--text">{{ submitButtonTitle }}</span>
          </v-btn>

          <v-btn color="red" class="mt-2" dark block>
            <span class="yellow--text">Cancelar</span>
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
    <!-- Modal -->
    <v-dialog v-model="showDialog" persistent max-width="500px">
      <v-card>
        <v-card-title>Eliminar</v-card-title>
        <v-card-text>¿Está seguro de que desea eliminar la tanda?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="showDialog = false">Cancelar</v-btn>
          <v-btn color="primary" text @click="deleteTanda">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

  <script>
  //import DateInput from '../app/DateInput.vue';
  import eventBus from '../../event-bus'
  export default {
    name: 'tandasForm',
    data() {
      return {
        id: null,
        search: "",
        loading: false,
        showDialog: false,
        submitButtonTitle: '',
        formData: {
          number_tanda: null,
          slot1: {},
          slot2: {},
          slot3: {},
          slot4: {},
          time: null,
          pilot: {},
          plane: null,
          altitude: {},
          status: null
        },
        flyersOptions: [], // Opciones para el autocompletado de nombres
        pilotOptions: [],
        planesOptions: [],
        altitudesOptions: [], // Opciones para el select de piloto
        statusOptions: [
          { text: 'En tierra', value: 1 },
          { text: 'Ascenso', value: 2 },
          { text: 'Finalizado', value: 3 }
        ]
      };
    },
    mounted() {
      this.id = this.$route.params.id
      const id = this.$route.params.id
      console.log("id: ", id, "this.$route.params.id:", this.$route.params.id)
      this.getOptionsFlyers()
      this.getOptionsPilots()
      this.getOptionsPlanes()
      this.getOptionsAltitudes()
      if (id) {
        this.getTanda();
        this.submitButtonTitle = 'editar';
      } else {
        this.submitButtonTitle = 'Agregar tanda';
      }
      //console.log("id desde form", id)
      this.id = id
    },
    computed: {
      timeValidationRules() {
        return [
          (value) => /^\d{1,2}:\d{2}$/.test(value) || 'Formato de hora inválido. Ejemplo válido: 12:34',
        ];
      },
    },
    methods: {
      getOptionsFlyers() {
        this.loading = true;
        const url = `http://localhost:8082/api/users?names=true`;
        this.$http
          .get(url)
          .then((response) => {
            const paracas = response.data.payload;
            this.flyersOptions = paracas.map((paraca) => ({
              id: paraca.id,
              name: `${paraca.first_name} ${paraca.last_name}`
            }));
            //console.log("this.flyersOptions:", this.flyersOptions)
            this.loading = false;
          })
          .catch((error) => {
            console.log(error);
            this.loading = false;
          });
      },
      getOptionsPilots() {
        this.loading = true;
        const url = `http://localhost:8082/api/pilots`;
        this.$http
          .get(url)
          .then((response) => {
            const pilots = response.data.payload;
            this.pilotOptions = pilots.map((pilot) => ({
              id: pilot.id,
              name: `${pilot.first_name} ${pilot.last_name}`
            }));
            this.loading = false;
          })
          .catch((error) => {
            console.log(error);
            this.loading = false;
          });
      },
      getOptionsPlanes(){
        this.loading = true;
        const url = `http://localhost:8082/api/planes?list=true`;
        this.$http
          .get(url)
          .then((response) => {
            const planes = response.data.payload;
            this.planesOptions = planes
            //console.log("this.planes:", planes)
            this.loading = false;
          })
          .catch((error) => {
            console.log(error);
            this.loading = false;
          });
      },
      getOptionsAltitudes(){
        this.loading = true;
        const url = `http://localhost:8082/api/prices?listAltitude=true`;
        this.$http
          .get(url)
          .then((response) => {
            const prices = response.data.payload;
            this.altitudesOptions = prices;
            console.log("this.altitudesOptions en getOptionsAltitudes:", this.altitudesOptions)
            this.loading = false;
          })
          .catch((error) => {
            console.log(error);
            this.loading = false;
          });
      },
      getTanda() {
        console.log(this.id, "idddd")
          this.loading = true;
          this.$http.get(`http://localhost:8082/api/tandas/${this.id}`)
            .then(response => {
              //console.log("this.pilotOptions:", this.pilotOptions)
              const tanda = response.data.payload;
              console.log("this.altitudesOptions en gettanda:", this.altitudesOptions)

              //console.log("typeof ypeof this.altitudesOptions.altitudee", typeof this.altitudesOptions)
              this.formData.number_tanda = tanda.number_tanda;
              this.formData.slot1 = tanda.slots[0].slot || {};
              this.formData.slot2 = tanda.slots[1].slot || {};
              this.formData.slot3 = tanda.slots[2].slot || {};
              this.formData.slot4 = tanda.slots[3].slot || {};
              this.formData.time = tanda.time;
              this.formData.pilot = tanda.pilot;
              this.formData.plane = tanda.plane;
              this.formData.altitude = { altitude: tanda.altitude.altitude, value: tanda.altitude.value }
              this.formData.status = tanda.status.f_status;
              console.log("typeof tanda.altitude.altitude", typeof tanda.altitude.altitude)
              console.log("this.formData.altitude", this.formData.altitude)
              //this.formData = tanda;
              //this.titleFN = paraca.first_name.charAt(0).toUpperCase() + paraca.first_name.slice(1);
              //this.titleLN = paraca.last_name.charAt(0).toUpperCase() + paraca.last_name.slice(1);
              this.loading = false
  
            })
            .catch(error => {
                console.log(error);
                this.loading = false
            });
      },
      
      submitForm() {
        this.loading = true;
        let data = {
          number_tanda: this.formData.number_tanda,
          slots: [
            { slot: { name: this.formData.slot1 ? this.formData.slot1.name : '', id: this.formData.slot1 ? this.formData.slot1.id : '' } },
            { slot: { name: this.formData.slot2 ? this.formData.slot2.name : '', id: this.formData.slot2 ? this.formData.slot2.id : '' } },
            { slot: { name: this.formData.slot3 ? this.formData.slot3.name : '', id: this.formData.slot3 ? this.formData.slot3.id : '' } },
            { slot: { name: this.formData.slot4 ? this.formData.slot4.name : '', id: this.formData.slot4 ? this.formData.slot4.id : '' } },
          ],
          time: this.formData.time,
          pilot: this.formData.pilot ? this.formData.pilot : { name: '', id: '' },
          plane: this.formData.plane ? this.formData.plane : { name: '', id: '' },
          altitude: this.formData.altitude ? this.formData.altitude : { altitude: '', value: '' },
          status: { f_status: this.formData.status ? this.formData.status.value : '' } 
        };
        console.log(data, "data a enviar");
        if (this.id) {
          console.log("llega")
          try {
            this.$http.put(`http://localhost:8082/api/tandas/${this.id}`, data)
            .then(response => {
              console.log("no llega_")
              console.log(response);
              eventBus.$emit('toast', { show: true, text: "Tanda editada correctamente", color: "green" })
              this.$router.push('/home')
            })
          } catch (error) {
            console.log(error);
            console.log("por que error aca?")
          }
        } else {
            this.$http.post('http://localhost:8082/api/tandas', data)
            .then(response => {
                console.log(response, "response");
                eventBus.$emit('toast', { show: true, text: "Tanda creada correctamente", color: "green" })
                this.$router.push('/home')
            })
            .catch(error => {
                console.log(error);
                eventBus.$emit('toast', { show: true, text: `${error.response.data.error}`, color: "red" })
            });
        }
      },
      deleteTanda(){
          if (this.id) {
          this.loadingDel = true;
          this.$http.delete(`http://localhost:8082/api/tandas/${this.id}`)
            .then(response => {
              console.log(response, "response")
              eventBus.$emit('toast', { show: true, text: "Eliminado correctamente", color: "green" })
              this.$router.push('/manifest/tandasMain')
            //
            })
            .catch(error => {
              eventBus.$emit('toast', { show: true, text: "No se ha podido eliminar", color: "red" })
              console.log(error)
            //
            })
            .finally(() => {
            this.loadingDel = false; 
          });
        }
      }
    }
  };
  </script>
  
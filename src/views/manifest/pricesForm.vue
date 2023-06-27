<template>
  <v-container>
    <v-toolbar flat>
      <v-toolbar-title>titulito dinamico</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card>
      <v-card-text>
        <v-form @submit.prevent="savePrice">
          <v-row>
            <v-row v-if="priceType === 1 || slot === true">
              <v-text-field
                v-model="altitude"
                label="Altura en FT"
                required
                prepend-inner-icon="mdi-compass-outline"
              ></v-text-field>
            </v-row>
            <v-row cols="12" v-else-if="priceType === 2 || packing === true">
              <v-select
                v-model="typePacking"
                :items="packingOptions"
                label="Tipo de packing"
                required
                prepend-inner-icon="mdi-parachute"
              ></v-select>
            </v-row>
            <v-row v-else-if="priceType === 3 || equipment === true">
              <v-col cols="12">
                <v-select
                  v-model="typeRent"
                  :items="rentOptions"
                  label="Tipo de alquiler"
                  required
                  prepend-inner-icon="mdi-parachute" 
                ></v-select>
              </v-col>
            </v-row>
            <v-col cols="12" v-else>
              <v-text-field
                label="Tipo de precio"
              ></v-text-field>
            </v-col>
          </v-row>
    
          <v-row >
            <v-col cols="12">
              <v-text-field
                v-model="value"
                label="Precio en USD"
                required
                prepend-inner-icon="mdi-currency-usd"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-btn color="black" type="submit" dark block>
              <span class="yellow--text">{{ buttonText }}</span>
            </v-btn>
            <v-btn v-if="id" @click="showDialog = true" color="red" dark block class="mt-2">
              <span class="yellow--text">Eliminar</span>
            </v-btn>
          </v-row>
        </v-form>
      </v-card-text>
    </v-card>

    <v-dialog v-model="showDialog" persistent max-width="500px">
      <v-card>
        <v-card-title class="headline">Eliminar</v-card-title>
        <v-card-text>¿Está seguro de que desea eliminar este precio?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="showDialog = false">Cancelar</v-btn>
          <v-btn color="primary" text @click="deletePrice" :loading="loadingDel">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>



<script>
import eventBus from '../../event-bus'
export default {
  name: "pricesForm",
  /*props: {
  
    id: {
      type: Number,
      default: null,
    },
  },*/
  data() {
    return {
      id: this.$route.params.id,
      showDialog: false,
      equipment: this.$route.params.equipment,
      packing: this.$route.params.packing,
      slot: this.$route.params.slot,
      priceType: null,
      value: null,
      altitude: null,
      typePacking: null,
      typeRent: null,
      //pricePacking: null,
      //buttonText: "Guardar",
      packingOptions: [
        { value: 1, text: "Tandem" },
        { value: 2, text: "Escuela" },
        { value: 3, text: "Deportivo" },
      ],
      rentOptions: [
        { value: 2, text: "Escuela" },
        { value: 3, text: "Deportivo" },
      ],
    };
  },
  computed: {
    buttonText() {
      console.log(this.id, "id")
      return this.id ? "Actualizar" : "Crear";
    },
  },
  methods: {
    savePrice() {
      let data = {};

      if (this.id && this.priceType === 1) {
        data = {
          priceType: this.priceType,
          slot: {
            altitude: this.altitude, // valor que corresponda
            value: this.value, // valor que corresponda
          },
        };
      } 
      
      if (this.id && this.priceType === 2){
        data = {
          priceType: this.priceType,
          Packing: {
            typePacking: this.typePacking, // valor que corresponda
            priceType: this.priceType, // valor que corresponda
            value: this.value, // valor que corresponda
          },
        };
      } 

      if (this.id && this.priceType === 3){
        data = {
          priceType: this.priceType,
            rent: {
              typeRent: this.typeRent, // valor que corresponda
              value: this.value, // valor que corresponda
            },
        };
      } 
      if(this.slot){
        data = {
          priceType: 1,
          slot: {
            altitude: this.altitude, // valor que corresponda
            value: this.value, // valor que corresponda
          },
        };
      }
      if(this.packing){
        data = {
          priceType: 2,
          Packing: {
            typePacking: this.typePacking, // valor que corresponda
            value: this.value, // valor que corresponda
          },
        };
      }
      
      if(this.equipment){
        data = {
          priceType: 3,
          rent: {
            typeRent: this.typeRent, // valor que corresponda
            value: this.value, // valor que corresponda
          },
        };
      }

      const method = this.id ? "put" : "post";
      const url = this.id
        ? `http://localhost:8082/api/prices/${this.id}`
        : "http://localhost:8082/api/prices";

      this.$http[method](url, data)
        .then((response) => {
          console.log(response, "response");
          eventBus.$emit('toast', { show: true, text: "Guardado correctamente", color: "green" })
          this.$router.push('/manifest/pricesList')
          //this.$router.push({ name: "pricesList" });
          
        })
        .catch((error) => {
          eventBus.$emit('toast', { show: true, text: "No se ha podido guardar", color: "red" })
          console.log(error);
          // Mostrar mensaje de error al usuario
        });
    },
    deletePrice(){
      if (this.id) {
        this.$http.delete(`http://localhost:8082/api/prices/${this.id}`)
          .then(response => {
            console.log(response, "response")
            eventBus.$emit('toast', { show: true, text: "Eliminado correctamente", color: "green" })
            this.$router.push('/manifest/pricesList')
          })
          .catch(error => {
            eventBus.$emit('toast', { show: true, text: "No se ha podido eliminar", color: "red" })
            console.log(error)
          });
      }
    }
  },
  created() {
    if (this.id) {
      // Si se está editando un precio, obtener sus datos
      this.$http
        .get(`http://localhost:8082/api/prices/${this.id}`)
        .then((response) => {
          let data = response.data.payload;
          this.priceType = data.priceType;

          if (this.priceType === 1) {
            this.altitude = data.slot.altitude;
            this.value = data.slot.value;
          } else if (this.priceType === 2) {
            this.typePacking = data.Packing.typePacking;
            this.value = data.Packing.value;
          } else if (this.priceType === 3) {
            this.typeRent = data.rent.typeRent;
            this.value = data.rent.value;
          }
    
        })
        .catch((error) => {
          console.log(error);
          // Mostrar mensaje de error al usuario
        });
    }
  },
};
</script>
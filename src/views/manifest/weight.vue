<template>
  <v-container>
    <v-alert v-if="showAlert" type="red" class="mb-4" dismissible @input="onCloseAlert">
      {{ auwKg }} kg - El AUW no debe exceder las 500 libras (226.8 kg) con un paracaídas tándem VR360 instalado y no debe exceder las 550 libras (249.5 kg) con un paracaídas tándem SR 340 o SR 370 instalado.
    </v-alert>
    <v-alert v-if="showOk" type="green" class="mb-4" dismissible @input="onCloseOk"> 
      {{ auwKg }} kg. Buen Salto!
          </v-alert>
    <v-card>
      <v-card-text>
        <v-form ref="form" @submit.prevent="getKgInst">
          <v-select
            label="Instructor"
            v-model="idInstructor"
            :items="instOptions"
            item-value="id"
            item-text="name"
            outlined 
            dense 
            required 
            prepend-inner-icon="mdi-account" 
          ></v-select>

          <v-text-field 
            label="Peso del Pasajero" 
            v-model="pesoPasajero" 
            outlined 
            dense 
            required 
            ref="input1"
            prepend-inner-icon="mdi-account-outline" 
            :rules="[v => !!v || 'El campo es requerido', v => /^\d+$/.test(v) || 'El campo debe contener solo números']"
          ></v-text-field>

          <v-text-field 
            label="Peso equipo" 
            v-model="pesoEquipo" 
            outlined 
            dense 
            required 
            ref="input2"
            prepend-inner-icon="mdi-parachute" 
            :rules="[v => !!v || 'El campo es requerido', v => /^\d+$/.test(v) || 'El campo debe contener solo números']"
          ></v-text-field>

          <v-select
            label="Máximo reserva"
            v-model="reservaOptions"
            :items="opcionesMaximo"
            item-value="value"
            item-text="text"
            outlined 
            dense 
            required 
            prepend-inner-icon="mdi-account" 
          ></v-select>

          <v-btn :loading="loading" color="black" dark type="submit" block>
            <span class="yellow--text">Calcular</span>
          </v-btn>
          
          <v-card-title v-if="showAlert" class="red--text">La suma supera el máximo permitido!</v-card-title>
          <v-card-subtitle v-if="showAlert" class="red--text">{{ kgToLbs }} lb.</v-card-subtitle>
          <v-card-subtitle v-if="showOk" class="green--text">AUW: {{ kgToLbs }} lb </v-card-subtitle>
        </v-form>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        loading: false,
        instOptions: [], // opciones para el select
        idInstructor: null, // valor seleccionado en el select
        selectedInstructor: { nombre: null, peso: null },
        pesoInstructor: 0,
        pesoEquipo: 0,
        pesoPasajero: 0,
        pesoArnes: 3,
        pesoTotal: 0,
        reservaOptions: null,
        opcionesMaximo: [
          { text: 'tándem VR360 - 500 libras', value: 226.8 },
          { text: 'SR 340 o SR 370 - 550 libras', value: 249.5 },
        ],
        errorMessage: null,
        showAlert: false,
        showOk: false,
        showTotal: false,
        mostrarResultados: false,
        auwLibras: null,
        auwKg: null
      };
    },
    mounted() {
      this.getSelectOptions()
    },
    methods: {
      clean(){
        this.idInstructor = null,
        this.pesoPasajero = null,
        this.pesoEquipo = null,
        this.reservaOptions = null,
        this.$refs.input1.resetValidation()
        this.$refs.input2.resetValidation()
        // microsigma 22 kg
        // sigma 22.5 kg
        // harnes 3 y mediokg

      },
      onCloseAlert() {
        this.showAlert = false;
      },
      onCloseOk(){
        this.showOk = false;
      },
      getSelectOptions() {
        this.$http
          .get(`http://localhost:8082/api/instructors?weight=true`)
          .then((response) => {
            const instructors = response.data.payload;
            this.instOptions = instructors;
          })
          .catch((error) => {
            console.log(error);
          });
      },
      getKgInst(){
        this.loading = true;
        console.log(this.idInstructor, "instructor")
        this.$http
          .get(`http://localhost:8082/api/instructors/${this.idInstructor}`)
          .then((response) => {
            const instructor = response.data.payload;
            this.pesoInstructor = instructor.w_kg;
            console.log(this.pesoInstructor, "this.pesoInstructor")
            this.calcularAUW()
          })
          .catch((error) => {
            console.log(error);
          });
      },
      calcularAUW() {
          this.auwKg = parseFloat(this.pesoInstructor) + parseFloat(this.pesoEquipo) + parseFloat(this.pesoPasajero) + this.pesoArnes;
          if (this.reservaOptions === 226.8 && this.auwKg >= 226.8) {
            this.showAlert = true;
            this.showOk = false;
          } else if (this.reservaOptions === 249.5 && this.auwKg >= 249.5) {
            this.showOk = false;
            this.showAlert = true;
          } else {
            this.showAlert = false;
            this.showOk = true;
          }
          this.loading = false;
          this.showTotal = true
          this.clean()
          /*
        this.auwLibras = parseFloat(this.pesoInstructor) + parseFloat(this.pesoEquipo) + parseFloat(this.pesoPasajero) + this.pesoArnes;
        if(this.opcionesMaximo[0].value == this.pesoTotal && this.opcionesMaximo[0].text.includes("tándem VR360")) {
          this.showAlert = true;
          this.errorMessage = "La suma de pesos ha superado las 500 libras";
        } else if(this.opcionesMaximo[1].value == this.pesoTotal && this.opcionesMaximo[1].text.includes("SR")) {
          this.showAlert = true;
          this.errorMessage = "La suma de pesos ha superado las 550 libras";
        } else {
          this.showAlert = true;
          this.errorMessage = "OK";
        }
        this.auwKg = (this.auwLibras / 2.2046).toFixed(2);
        */
      }
    },
    computed: {
      kgToLbs(){
        const pounds = this.auwKg * 2.20462;
        return +pounds.toFixed(2).toString().substring(0, 3);
      }
      /*
      pesoTotalKg() {
        return (this.auwLibras / 2.2046).toFixed(2);
      }
      */
    },
  };
  </script>

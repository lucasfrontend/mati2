<template>
  <v-container>
    <v-alert v-if="!dolarBlue" type="red" dismissible>
      No hay valor del dolar cargado
    </v-alert>
    <v-card>
      <v-card-title>
        <div class="d-flex flex-column">
          <h2>{{ titleFN }} {{ titleLN }}</h2>
          <span>Saldo actual: {{ convertedAmount }} USD</span><v-icon @click="editing = true">mdi-pencil</v-icon>

        </div>
        <div class="ml-auto">
          <div class="d-flex flex-column">
            <h5>{{ currentDate }}</h5>

            <h4>Blue hoy: {{ this.$store.state.dolarBlue  }}</h4>
          </div>
        </div>
      </v-card-title>

      <!-- Último pago -->
      <div v-if="lastPayment.amount">
        <h3>Último pago:</h3>
        <p>Monto: {{ lastPayment.amount }} {{ lastPayment.currency }}</p>
        <p>Fecha: {{ lastPayment.date }}</p>
        <v-btn @click="removeLastPayment">Eliminar último pago</v-btn>
      </div>

      <v-card-title class="mb-2">
        <v-row align="center">
          <v-col cols="12">
            <template v-if="!addAmount">
              <v-row align="center">
                <v-col>
                  <v-btn color="yellow" dark fab bottom right class="mt-5 black--text" @click="addAmount = true">
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </v-col>
              </v-row>
            </template>
            <template v-else>
              <v-text-field v-model="inputValue" label="Monto" type="number"></v-text-field>
              <v-select v-model="selectedCurrency" :items="currencies" label="Tipo de moneda"></v-select>
              <v-btn @click="saveAvTotal">Guardar</v-btn>
              <v-btn @click="cancel">Cancelar</v-btn>
            </template>
          </v-col>
        </v-row>
      </v-card-title>

      <!-- TABLA DE SALTOS -->
      <v-card-text dense>
        <v-data-table
          :headers="headers"
          :items="jumps"
          hide-default-footer
          class="elevation-1"
        >
          <template v-slot:item.jump_height="{ item }">
            {{ item.jump_height }} m
          </template>
        </v-data-table>
      </v-card-text>


      <v-col cols="12" class="d-flex pl-15 pb-5 justify-center align-center">
        <v-divider :thickness="2" color="white"></v-divider>
      </v-col>

      <v-card-text class="d-flex">
        <div class="d-flex align-center">
          <div>
            <p>Año: <span class="white--text">nn</span></p>
            <p>Lenguaje: <span class="white--text">nn</span></p>
            <p>Duración: <span class="white--text">nn</span></p>
          </div>
        </div>
      </v-card-text>

      <v-card-actions>
        <v-row>
          <v-col cols="4">
            <p>Total de plegados:</p>
            <p>Cantidad de saltos:</p>
          </v-col>
          <v-col cols="4" class="text-center">
            <p>{{ totalPacking }}</p>
            <p>{{ jumps.length }}</p>
          </v-col>
          <v-col cols="4" class="text-right">
            <p>Total a abonar en plegados:</p>
            <p>Total a abonar en saltos:</p>
            <p>Total general:</p>
          </v-col>
        </v-row>
      </v-card-actions>

    </v-card>
    <!-- Modal -->
    <v-dialog v-model="editing" max-width="500px">
      <v-card>
        <v-card-title>
          <h3>Editar Monto disponible {{  convertedAmount }}</h3>
        </v-card-title>
        <v-card-text>
          <v-row align="center">
            <v-col cols="12">
              <v-text-field v-model="editedValue" label="Nuevo monto" type="number"></v-text-field>
            </v-col>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn color="secondary" @click="saveEditedValue">Aceptar</v-btn>
          <v-btn @click="cancelEditing">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { getCurrentDate, convertToDollars } from '../../utils/utils';

export default {
  data() {
    return {
      id: null,
      dolarBlue: this.$store.state.dolarBlue,
      loading: false,
      currentDate: getCurrentDate(),
      titleFN: '',
      titleLN: '',
      
      addAmount: false,
      amount: { type: 1, value: 100 },
      inputValue: '',
      selectedCurrency: 'USD',
      currencies: ['USD', 'ARG'],

      lastPayment: {},
      
      editing: false,
      editedValue: '',
      totalPacking: 10,

      headers: [
        { text: "Altura del salto", value: "jump_height" },
        { text: "Precio", value: "price" }
      ],
      jumps: [
        {
          id: 1,
          jump_height: 3000,
          price: 200
        },
        {
          id: 2,
          jump_height: 4000,
          price: 300
        },
        {
          id: 3,
          jump_height: 5000,
          price: 400
        }
      ],
    };
  },
  mounted() {
    const id = this.$route.params.id
    this.id = id
    if (id) {
      this.getParaca();
        this.getJumps();
      this.submitButtonTitle = 'editar';
    } else {
      this.$router.push({name: 'flyersList'})
    }
  },
  computed: {
    convertedAmount() {
      if (this.amount.type === 2 && this.selectedCurrency === 'USD') {
        const converted = convertToDollars(this.amount.value, this.$store.state.dolarBlue);
        return converted ? parseFloat(converted).toFixed(2) : '';
      }
      return this.amount.value;
    },
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    getParaca() {
      this.loading = true;
      this.$http.get(`http://localhost:8082/api/users/${this.id}`)
        .then(response => {
            const paraca = response.data.payload;
            console.log("paraca", paraca._doc.first_name)
            //this.amount.value = paraca.av_c.av_total
            this.amount.value = paraca._doc.av_c.av_total;
            this.titleFN = this.capitalizeFirstLetter(paraca._doc.first_name);
            this.titleLN = this.capitalizeFirstLetter(paraca._doc.last_name);
            console.log("this.titleName", this.titleName)

        })
        .catch(error => {
            console.log(error);
        });
    },
    getJumps(){
      this.loading = true;
      this.$http.get(`http://localhost:8082/api/tandas?idq=${this.id}&jumps=true`)
        .then(response => {
            const jumps = response.data.payload;
            console.log("jumps:", jumps)
            //this.amount.value = paraca.av_c.av_total

        })
        .catch(error => {
            console.log(error);
        });
    },
    updateParaca() {
      const updatedParaca = {
        av_c: {
          av_total: this.convertedAmount
        }
      };

      this.$http.put(`http://localhost:8082/api/users/${this.id}`, updatedParaca)
        .then(response => {
          console.log("Valor actualizado en la base de datos", response);
        })
        .catch(error => {
          console.log(error);
        });
    },
    saveAvTotal() {
      if (this.inputValue) {
        const value = parseFloat(this.inputValue);
        if (!isNaN(value)) {
          if (this.selectedCurrency === 'USD') {
            this.amount.value += value;
            this.inputValue = '';
            this.updateParaca();
            this.addAmount = false;

            this.lastPayment = {
              amount: value,
              currency: this.selectedCurrency,
              date: new Date().toLocaleString()
            };

          } else if (this.selectedCurrency === 'ARG') {
            const converted = convertToDollars(value, this.$store.state.dolarBlue);
            if (converted) {
              this.amount.value += parseFloat(converted);
              this.inputValue = '';
              this.updateParaca();
              this.addAmount = false;
            }
          }
        }
      }
    },
    cancel() {
      this.inputValue = '';
      this.addAmount = false
    },
    saveEditedValue() {
      const value = parseFloat(this.editedValue);
      if (!isNaN(value)) {
        this.amount.value = value;
        this.updateParaca();
        this.editing = false;
      }
    },
    removeLastPayment() {
      this.amount.value -= this.lastPayment.amount;
      this.updateParaca();
      this.lastPayment = {};
    },
    cancelEditing() {
      this.editedValue = '';
      this.editing = false;
    },
  },
};
</script>

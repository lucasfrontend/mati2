<template>
  <v-container>
    <v-card>
      <v-card-title class="mb-2">
        <v-col cols="12">
          <h5>{{ currentDate }}</h5>
          <h2>{{ titleFN }} {{ titleLN }}</h2>
        </v-col>
        <v-row align="center">
          <v-col cols="12">
            <span> Saldo actual: {{ getCurrencySymbol }} {{ amount.value }}</span>
            <template v-if="!editingAmount">
              <v-row align="center">
                <v-col>
                  <v-icon @click="editingAmount = true">mdi-pencil</v-icon>
                </v-col>
              </v-row>
            </template>
            <template v-else>
              <v-select v-model="currency.value" :items="currencyOptions" item-value="value" item-text="label"></v-select>
              <v-text-field v-model="newAmount.value" type="number"></v-text-field>
              <v-btn @click="cancelEdit" color="primary">Cancelar</v-btn>
              <v-btn @click="saveAmount" color="primary">Guardar</v-btn>
            </template>
          </v-col>
        </v-row>
      </v-card-title>

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

      <v-card-actions>
        <v-row>
          <v-col cols="4">
            <p>Total de plegados:</p>
            <p>Cantidad de saltos:</p>
          </v-col>
          <v-col cols="4" class="text-center">
            <p>{{ totalFolds }}</p>
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
  </v-container>
</template>

<script>
import { getCurrentDate, convertToDollars} from '../../utils/utils'
//import eventBus from '../../event-bus'
export default {
  name: 'totalFlyer',
  data() {
    return {
      id: null,
      currentDate: getCurrentDate(),
      titleFN: '',
      titleLN: '',
      submitButtonTitle: 'Enviar',
      loading: false,
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
      totalFolds: 10,
      headers: [
        { text: "Altura del salto", value: "jump_height" },
        { text: "Precio", value: "price" }
      ],
      amount: {type: 1, value: 100},
      newAmount: { value: null, label: null }, // Valor inicial del monto
      editingAmount: false,
      currencyOptions: [
        { value: 1, label: 'USD' },
        { value: 2, label: 'ARG' }
      ],
      currency: { value: null, label: null } // Opciones del campo de selección
    };
  },
  mounted() {
    const id = this.$route.params.id
    this.id = id
    if (id) {
      this.getParaca();
      this.submitButtonTitle = 'editar';
    } else {
      this.$router.push({name: 'flyersList'})
    }

      // Establecer el valor inicial de currency basado en getCurrencySymbol
    if (this.getCurrencySymbol() === 'USD') {
      this.currency = this.currencyOptions.find(option => option.value === 1);
    } else if (this.getCurrencySymbol() === 'ARG') {
      this.currency = this.currencyOptions.find(option => option.value === 2);
    } else {
      this.currency = { value: null, label: null }; // Si el valor no coincide con ninguna opción, establecerlo como objeto vacío
    }
  },
  computed: {
    getCurrencySymbol() {
      if (this.amount.type === 1) {
        return 'USD';
      } else if (this.amount.type === 2) {
        return 'ARG';
      } else {
        return '';
      }
    }
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
              this.formData = {
                username: paraca.username,
                first_name: paraca.first_name,
                last_name: paraca.last_name
              };
              this.titleFN = this.capitalizeFirstLetter(paraca._doc.first_name);
              this.titleLN = this.capitalizeFirstLetter(paraca._doc.last_name);
              console.log("this.titleName", this.titleName)

          })
          .catch(error => {
              console.log(error);
          });
    },
    cancelEdit() {
      this.editingAmount = false;
    },
    saveAmount() {
      this.amount.type = this.currency.value;
      this.convertToUSD()
      this.amount.value = this.newAmount.value; // Actualizar el valor de amount
      this.editingAmount = false;
    },
    convertToUSD() {
      if (this.currency.value === 2) {
        const convertedAmount = convertToDollars(this.newAmount.value, this.$store.state.dolarBlue);
        if (convertedAmount !== null) {
          this.newAmount.value = convertedAmount;
        }
      }
    },
  },
  watch: {
    editingAmount(value) {
      if (value) {
        this.newAmount.type = this.amount.type;
        this.newAmount.value = this.amount.value.toString(); // Asignar el valor actual de amount a newAmount cuando se cambia a la vista de edición
      }
    }
  }
};
</script>

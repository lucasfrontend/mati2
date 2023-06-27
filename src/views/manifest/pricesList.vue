<template>
  <v-container>
    <v-card>
      <v-card-title>
        <span class="headline">Precios Plazas Deportivos</span>
      </v-card-title>
      <v-data-table
        :headers="headersSlots"
        :items="pricesSlots"
        :search="search"
        :loading="loading"
        :rows-per-page-items="[5, 10, 25]"
        :footer-props="{ showFirstLastPage: true }"
        :mobile-breakpoint="0"
        class="elevation-1"
        :no-data-text="'No hay datos disponibles'"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.slot.altitude }}</td>
            <td>
              {{ item.slot.value }}
            </td>
            <td>
              <router-link :to="{ name: 'pricesForm', params: { id: item._id } }">
                <v-btn dark color="black" >
                  <v-icon small class="yellow--text">mdi-pencil</v-icon>
                </v-btn>
              </router-link>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
    <v-row>
      <v-col>
        <router-link :to="{ name: 'pricesForm', params: { slot: true } }">
          <v-btn color="black" dark fab bottom right class="mb-3 mt-3 yellow--text" >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </router-link>
      </v-col>
    </v-row>

    <v-card>
      <v-card-title>
        <span class="headline">Precios Plegados</span>
      </v-card-title>
      <v-data-table
        :headers="headersPacking"
        :items="pricesPacking"
        :search="search"
        :loading="loading"
        :rows-per-page-items="[5, 10, 25]"
        :footer-props="{ showFirstLastPage: true }"
        :mobile-breakpoint="0"
        class="elevation-1"
        :no-data-text="'No hay datos disponibles'"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.Packing.typePacking }}</td>
            <td>
              {{ item.Packing.value }}
            </td>
            <td>
              <router-link :to="{ name: 'pricesForm', params: { id: item._id } }">
                <v-btn dark color="black" >
                  <v-icon small class="yellow--text">mdi-pencil</v-icon>
                </v-btn>
              </router-link>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>
    <v-row>
      <v-col>
        <router-link :to="{ name: 'pricesForm', params: { packing: true } }">
          <v-btn color="black" dark fab bottom right class="mb-3 mt-3 yellow--text">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </router-link>
      </v-col>
    </v-row>
 
    <v-card>
      <v-card-title>
        <span class="headline">Precios Alquiler equipos</span>
      </v-card-title>
      <v-data-table
        :headers="headersRenEqu"
        :items="pricesRenEqu"
        :search="search"
        :loading="loading"
        :rows-per-page-items="[5, 10, 25]"
        :footer-props="{ showFirstLastPage: true }"
        :mobile-breakpoint="0"
        class="elevation-1"
        :no-data-text="'No hay datos disponibles'"
      >
        <template v-slot:item="{ item }">
          <tr>
            <td>{{ item.rent.typeRent }}</td>
            <td>
              {{ item.rent.value }}
            </td>
            <td>
              <router-link :to="{ name: 'pricesForm', params: { id: item._id } }">
                <v-btn dark color="black" >
                  <v-icon small class="yellow--text">mdi-pencil</v-icon>
                </v-btn>
              </router-link>
            </td>
          </tr>
        </template>
      </v-data-table>
    </v-card>

    <v-row>
      <v-col>
        <router-link :to="{ name: 'pricesForm', params: { tandems: true } }">
          <v-btn color="black" dark fab bottom right class="mb-3 mt-3 yellow--text">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </router-link>
      </v-col>
    </v-row>
    <v-card>
      <v-card-title>
        <span class="headline">Precios Tandems</span>
      </v-card-title>
    </v-card>
    <v-row>
      <v-col>
        <router-link :to="{ name: 'pricesForm', params: { equipment: true } }">
          <v-btn color="black" dark fab bottom right class="mb-3 mt-3 yellow--text" >
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </router-link>
      </v-col>
    </v-row>

    <!-- Ventana modal para editar o crear precios 
    <v-dialog v-model="showModal">
      <v-card>
        <v-card-title>
          {{ modalTitle }}
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-container>
              <v-text-field v-model="formData.type" label="Cantidad" type="number"> holi</v-text-field>
              <v-text-field v-model="formData.rent" label="Altitud" type="number"></v-text-field>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" @click="savePrice">Guardar</v-btn>
          <v-btn color="secondary" @click="closeModal">Cancelar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    -->
  </v-container>
</template>

<script>
//import PricesForm from './pricesForm.vue';

export default {
  //components: { PricesForm },
  name: "pricesList",
  data() {
    return {
      search: "",
      loading: false,
      pricesSlots: [],
      headersSlots: [
        {
          text: "Altura",
          value: "altitude",
        },
        {
          text: "USD",
          value: "q",
        },
        {
          text: "",
          value: "actions",
        },
      ],
      pricesPacking: [],
      headersPacking: [
        {
          text: "Tipo",
          value: "altitude",
        },
        {
          text: "USD",
          value: "additional_info",
        },
        {
          text: "",
          value: "actions",
        },
      ],
      pricesRenEqu: [],
      headersRenEqu: [
        {
          text: "Equipos",
          value: "altitude",
        },
        {
          text: "USD",
          value: "additional_info",
        },
        {
          text: "",
          value: "actions",
        },
      ],
      showModal: false,
      modalTitle: "",
      priceData: {},
      item: {}
    };
  },
  created() {
    this.getPrices();
  },
  methods: {
    /*
    openModal(item) {
      // Aquí configuras el modal con los datos del precio que estás editando/agregando
      this.modalTitle = item ? "Editar precio" : "Agregar precio";
      this.item = item || {};
      this.formData = {
          _id: this.item._id,
          type: this.item.type,
          rent: {
              type: this.item.rent.type,
              value: this.item.rent.value,
          },
        },
      console.log(this.formData, "this.formData")
      this.showModal = true;
    },*/
    closeModal() {
      this.showModal = false;
    },
    savePrice() {
      // Aquí haces la petición para guardar el precio y cierras el modal
      // ...
      this.showModal = false;
    },
    getPrices() {
      this.loading = true;
      this.$http
        .get(`http://localhost:8082/api/prices`)
        .then((response) => {
          const prices = response.data.payload;
          console.log(prices, "prices")
          this.pricesSlots = prices.filter((price) => price.priceType === 1);
          this.pricesPacking = prices.filter((price) => price.priceType === 2);
          this.pricesRenEqu = prices.filter((price) => price.priceType === 3);
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          this.loading = false;
        });
    },
  },
};

/*
ejemplo 1
{
  "type": 1,
  "slot": {
    "altitude": 1000,
    "value": 10
  }
}
ejemplo 2
{
  "type": 2,
  "Packing": {
    "type": 1,
    "value": 20
  }
}

ejemplo 3 
{
  "type": 3,
  "rent": {
    "type": 2,
    "value": 30
  }
}


*/

</script>


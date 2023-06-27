<template>
  <div>
    <v-text-field
      v-model="search"
      label="Buscar"
      outlined
      dense
      prepend-icon="mdi-magnify"
      class="mt-4"
    > 
    </v-text-field>

    <v-data-table 
      :headers="headers" 
      :items="filteredFlyers" 
      :loading="loading"
      class="elevation-1"
      :no-data-text="'No hay datos disponibles'"
    >

      <template v-slot:item.first_name="{ item }">
        <router-link :to="{ name: 'totalFlyer', params: { id: item.id } }" class="hover-pointer">
          <v-td class="custom">{{ item.first_name }}</v-td>
        </router-link>
      </template>

      <template v-slot:item.last_name="{ item }">
        <router-link :to="{ name: 'totalFlyer', params: { id: item.id } }" class="hover-pointer">
          <v-td class="custom">{{ item.last_name }}</v-td>
        </router-link>
      </template>

      <template v-slot:item.av_c="{ item }">
        <router-link :to="{ name: 'totalFlyer', params: { id: item.id } }" class="hover-pointer">
          <v-td class="hover-pointer">
            <v-chip
              size="small"
              :color="item.av_c.av_total === 0 ? 'primary' : 'green'"
              class="font-weight-bold"
            >
            <v-icon small>mdi-currency-usd</v-icon>
            {{ item.av_c ? item.av_c.av_total : "Sin saldo" }}
            </v-chip>
          </v-td>
        </router-link>
      </template>

      <template v-slot:item.cma_data="{ item }">
        <v-td class="">
          <v-chip
            size="small"
            :color="item.color"
          >
            <v-icon
              start
              :icon="item.cma_data.exp_date ? 'mdi-security' : 'mdi-close-octagon'"
            ></v-icon>
            {{ item.exp_date ? item.exp_date : "No hayyy" }}
          </v-chip>
        </v-td>
      </template>

      <template v-slot:item.actions="{ item }" hide-headers>
        <router-link :to="{ name: 'tandasForm', params: { id: item._id } }">
          <v-btn dark class="mr-2" block color="white" @click="navigateToEdit(flyer.id)">
            <v-icon small class="black--text">mdi-pencil</v-icon>
          </v-btn>
        </router-link>
      </template>

    </v-data-table>

    <div class="d-flex justify-center">
      <v-progress-circular
        v-if="!flyers.length"
        indeterminate
        size="64"
        color="primary"
      ></v-progress-circular>
    </div>
  </div>
</template>

<script>
import { formatDate, getExpirationColor} from '../../utils/utils'
export default {
  data() {
    return {
      loading: true,
      search: "",
      flyers: [],
      errorMessage: null,
      headers: [
        {
          text: "Nombre",
          value: 'first_name',
        },
        {
          text: "apellido",
          value: 'last_name',
        },
        {
          text: "saldo",
          value: 'av_c',
        },
        {
          text: "psicofisico",
          value: 'cma_data',
        },
        {
          text: "Editar",
          value: 'actions',
          sortable: false,
        },
      ],
      color: null
    };
  },
  mounted() {
    this.getParacas();
  },
  methods: {
    capitalize(text) {
      if (!text) return '';
      return text.charAt(0).toUpperCase() + text.slice(1);
    },
    getParacas() {
      this.loading = true;
      try {
        this.$http.get(`http://localhost:8082/api/users`)
          .then(response => {
            if (response.data.payload.length === 0) {
              this.errorMessage = "No se encontraron usuarios cargados";
            } else {
              this.flyers = response.data.payload.map(flyer => ({
                ...flyer,
                first_name: this.capitalize(flyer.first_name),
                last_name: this.capitalize(flyer.last_name),
                exp_date: formatDate("dd/mm/yyyy", flyer.cma_data.exp_date),
                color: getExpirationColor(flyer.cma_data.exp_date)
                /*
                av_c: {
                  ...flyer.av_c,
                  exp_date: FormatDate("dd-mm-yyyy", flyer.av_c.exp_date)
                }
                */
              }));
              console.log("this.flyers", this.flyers);
            }
          })
          .catch(error => {
            console.log(error);
          });
      } catch (error) {
        console.log(error);
      } finally {
        this.loading = false; // Establecer loading en false en el bloque finally
      }
    },
    navigateToEdit(_id) {
      this.$router.push({ name: 'registerFlyer', params: { id: _id } })
    }
  },
  computed: {
    filteredFlyers() {
      return this.flyers.filter(flyer => {
        return (
          flyer.first_name.toLowerCase().includes(this.search.toLowerCase()) ||
          flyer.last_name.toLowerCase().includes(this.search.toLowerCase())        
        );
      });
    }
  }
};
</script>

<style>
.custom {
  font-size: 0.9rem;
}
</style>

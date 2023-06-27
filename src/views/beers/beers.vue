<template>
  <div class="py-8">
    <v-row class="mb-3 px-5" no-gutters>
      <v-col cols="12" class="d-flex justify-center">
        <v-icon :color="`${icon.color} darken-1`" class="text-h1">{{icon.icon}}</v-icon>
      </v-col>
    </v-row>

    <v-form ref="form">
      <v-row class="px-10">
        <v-col cols="12">
          <v-text-field
            v-model="debtorQuery"
            prepend-inner-icon="mdi-account"
            placeholder="Ingrese un nombre"
            outlined
            dense
            clearable
            :disabled="loading"
            @keydown.enter="getDebtor"
            :rules='[
                (v) => !!v || "El nombre es requerido",
                (v) => /^[a-zA-Z]+$/.test(v) || "Debe ingresar solo letras"
            ]'
          />
        </v-col>
      </v-row>

      <v-row class="px-10" no-gutters>
        <v-col cols="12">
          <v-btn color="black" block dark @click="getDebtor" :loading="loadingButton">
            <v-icon left>mdi-magnify</v-icon> Buscar
          </v-btn>
        </v-col>
      </v-row>
      <v-row class="px-10" no-gutters>
          <v-col cols="12">
              <v-alert
              v-if="errorMessage"
              type="error"
              border="left"
              colored-border
              dense
              outlined
              class="my-3 px-3"
              >
                {{ errorMessage }}
              </v-alert>                
          </v-col>
      </v-row>
    </v-form>
    <div>
      <div class="">Default</div>
        <v-expansion-panels>
          <v-expansion-panel
            v-for="debtor in debtors"
            :key="debtor.id"
            title="Item"
            text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
          ></v-expansion-panel>
        </v-expansion-panels>
      <div class="text-subtitle-2 mt-4 mb-2">Accordion</div>

      <v-expansion-panels>
        <v-expansion-panel             
          v-for="debtor in debtors"
          :key="debtor.id">
            <v-expansion-panel-title disable-icon-rotate>
              Item
              <template v-slot:actions>
                <v-icon color="error" icon="mdi-alert-circle">
                </v-icon>
              </template>
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </v-expansion-panel-text>
          </v-expansion-panel>

      </v-expansion-panels>


      <v-expansion-panels variant="accordion">
        <v-expansion-panel
          v-for="debtor in debtors"
          :key="debtor.id"
          title="Item"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        ></v-expansion-panel>
      </v-expansion-panels>

      <div class="text-subtitle-2 mt-4 mb-2">Inset</div>

      <v-expansion-panels variant="inset" class="my-4">
        <v-expansion-panel
          v-for="debtor in debtors"
          :key="debtor._id"
          title="Item"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        ></v-expansion-panel>
      </v-expansion-panels>

      <div class="text-subtitle-2 mt-4 mb-2">Popout</div>

      <v-expansion-panels variant="popout" class="my-4">
        <v-expansion-panel
          v-for="debtor in debtors"
          :key="debtor._id"
          title="Item"
          text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
        ></v-expansion-panel>
      </v-expansion-panels>
    </div>

    <v-col v-for="debtor in debtors" :key="debtor._id" >
      <router-link :to="{ name: 'DebtorDetails', params: { id: debtor._id }, props: { debtors: debtors } }">
        <v-card>
          <v-card-title>
            <span class="headline">{{ debtor.first_name }}</span>
          </v-card-title>
          <v-card-text>
            <div>{{ debtor.first_name }} {{ debtor.last_name }}</div>
            <div>Beers</div>
          </v-card-text>
        </v-card>
      </router-link>
    </v-col>
  </div>
</template>

<script>
//  import eventBus from "../../event-bus";
import store from '@/store'
export default{
  data(){
    return{
      loading: false,
      loadingButton: false,
      errorMessage: '',
      //debtor: null,
      debtors: [],
      debtorQuery: '',
      username: '',
      flyer: null,
    }
  },
  mounted() {
    this.loading = true;
    this.$http.get(`http://localhost:8082/api/users?debtors=true`)
      .then(response => {
        console.log("debtors", response.data.payload);
        const options = response.data.payload.map(item => item);
        this.debtors = options;
        this.selectOptions = options;
        console.log(this.selectOptions, "optionsSelect");
      })
      .catch(error => {
        console.log(error);
        this.errorMessage = 'No se ha podido conectar'
      })
      .finally(() => {
        this.loading = false;
      });
  },
  computed:{
    icon(){
        let icon = {icon: 'mdi-beer', color: 'yellow'}
        if(this.debtor != null){
            if(this.username){
                switch (this.username) {
                    case 1: case 2: case 3: case 8:
                        icon = { color: 'green', icon: 'mdi-check-circle' }
                        break;
                    case 4:
                        icon = { color: 'info', icon: 'mdi-check-circle' }
                        break;
                    case 5: case 6: case 7:
                        icon = { color: 'red', icon: 'mdi-close-circle' }
                        break;
                }
            }else icon = { color: 'red', icon: 'mdi-close-circle' }
        }
        return icon
    },

  },
  methods:{
    clean(){
    },
    getDebtor() {
      this.loading = true;
      this.errorMessage = '';
      let vm = this;
      if(this.$refs.form.validate()){
        this.$http.get(`http://localhost:8082/api/users/${this.debtorQuery}`)
        .then((response) => {
          console.log(response.message, "response:", response)
          this.debtors = response.data.payload;
          store.commit('setDebtors', this.debtors)
          console.log(typeof(this.debtors),"debtors en beer")
          console.log(response.data.payload, "response.payload")
          // Asignar el arreglo de opciones al data del componente Vue
          //vm.partner = (res.data.data) ? res.data.data : false
          //vm.$store.commit('setPartner', res.data.data)
          vm.loading = false
        }).catch((err) => {
          console.log(err);
          this.errorMessage = 'No se encontraron paracaidistas con ese nombre';
          vm.loading = false; // Establecer loading a true en caso de error
        });
      }
      vm.loading = false;
    }
  }
}
</script> 
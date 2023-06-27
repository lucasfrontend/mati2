<template>
  <v-container>
    <v-card>
      <v-card-title class="mb-2">
        <h2 v-if="titleFN || titleLN">{{ titleFN }} {{ titleLN }}</h2>
        <h2 v-else>Nuevo paracaidista</h2>
        <v-icon v-if="id" @click="showDialog = true">mdi-delete</v-icon>
      </v-card-title>

      <v-card-text dense>
        <v-form @submit.prevent="submitForm">
        <!--
          <v-text-field
              v-model="formData.fly_name"
              label="Alias"
              required
              outlined
              dense
              prepend-inner-icon="mdi-account-circle"
              :rules="[v => !!v || 'El campo es requerido', v => /^([a-zA-ZñÑ]+\s)*[a-zA-ZñÑ]+$/.test(v) || 'El campo debe contener solo letras y espacios']"
          >
          </v-text-field>
        -->
          <v-row dense>
            <v-col cols="6">
              <v-text-field v-model="formData.first_name" label="Nombres" required outlined dense prepend-inner-icon="mdi-account" :rules="[v => !!v || 'El campo es requerido', v => /^([a-zA-ZñÑ]+\s)*[a-zA-ZñÑ]+$/.test(v) || 'El campo debe contener solo letras y espacios']"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="formData.last_name" label="Apellido" required outlined dense prepend-inner-icon="mdi-account-outline" :rules="[v => !!v || 'El campo es requerido', v => /^([a-zA-ZñÑ]+\s)*[a-zA-ZñÑ]+$/.test(v) || 'El campo debe contener solo letras y espacios']"></v-text-field>
            </v-col>
          </v-row>


          <v-row dense>
            <v-col cols="6">
              <v-text-field v-model="formData.dni" label="DNI" outlined dense prepend-inner-icon="mdi-card-account-details"></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field v-model="formData.tel" label="Teléfono en caso de accidente" outlined dense prepend-inner-icon="mdi-phone"></v-text-field>
            </v-col>
          </v-row>
          
          <v-divider class="mb-4"></v-divider>

          <v-select v-model="formData.lic" label="Licencia" outlined dense prepend-inner-icon="mdi-file-document-edit" :items="licenseOptions" return-object>
            <template #selection="{ item }">
              {{ item.text }}
            </template>
            <template #item="{ item }">
              <v-list-item-content>{{ item.text }}</v-list-item-content>
            </template>
          </v-select>

          <v-text-field outlined dense prepend-inner-icon="mdi-numeric"
            v-if="formData.lic !== null"
            v-model="formData.lic_number"
            label="Número de Licencia"
          />

          <v-row dense>
            <v-col cols="6">
              <date-input v-model="formData.exp_date" label="Fecha de expedición" :fecha="myDate" :required="false" :validationAge="false" @changeDate="handleChangeDate"/>

            </v-col>
            <v-col cols="6">
              <date-input v-model="formData.iss_date" label="Vencimiento" :fecha="myDate" :required="false" :validationAge="false" @changeDate="handleChangeDate"/>

            </v-col>
          </v-row>

          <v-row dense>
            <v-col cols="6">
              <date-input v-model="formData.pp_iss_date" label="Fecha de .. Psicofísico" :fecha="myDate" :required="false" :validationAge="false" @changeDate="handleChangeDate"/>
            </v-col>
            <v-col cols="6">
              <date-input v-model="formData.pp_exp_date" label="Vencimiento" :fecha="myDate" :required="false" :validationAge="false" @changeDate="handleChangeDate"/>
            </v-col>
          </v-row>


          <!--
          
          <v-text-field v-model="formData.country" label="Nacionalidad" outlined dense prepend-inner-icon="mdi-earth"></v-text-field>
          <v-select v-model="formData.gender" label="Género" outlined dense prepend-inner-icon="mdi-gender-male-female" :items="['H', 'M', 'Otro']">
          </v-select>
          -->

          <v-btn type="submit" color="black" :loading="loading" dark block> 
              <span class="yellow--text">{{ submitButtonTitle }}</span> <!-- agrega la clase para cambiar el color del texto a amarillo -->
          </v-btn>

          <v-btn  color="red" class="mt-2" dark block> 
              <span class="yellow--text">Cancelar</span> <!-- agrega la clase para cambiar el color del texto a amarillo -->
          </v-btn>


          <!--
          <v-btn type="submit" color="red" dark block> 
              <span class="yellow--text">{{ submitButtonTitle }}</span> 
          </v-btn>
        -->


        </v-form>
      </v-card-text>
    </v-card>

    <v-dialog v-model="showDialog" persistent max-width="500px">
      <v-card>
        <v-card-title>eliminar Paracaidista</v-card-title>
        <v-card-text>¿Está seguro de que desea eliminar al paracaidista?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="showDialog = false">Cancelar</v-btn>
          <v-btn color="primary" text @click="deleteParaca">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-container>
</template>

<script>
import DateInput from '../app/DateInput.vue';
import eventBus from '../../event-bus'
export default {
  name: 'registerFlyer',
  components: {
    'date-input': DateInput
  },
  /*
  
  - afuera  seguro medico //
  - certificado
  props: {
    id: {
      type: String,
      required: false
    }
  },
  
  */
  data() {
    return {
      id: null,
      formData: {
        email: '',
        first_name: '',
        last_name: '',
        roles: [],
        is_active: true,
        lic: null,
        lic_number: '',
        exp_date: '',
        iss_date: '',
        pp_iss_date: '',
        pp_exp_date: '',
        dni: '',
        //country: '',
        //gender: '',
    },
    licenseOptions: [
      { text: 'A', value: 'A' },
      { text: 'B', value: 'B' },
      { text: 'C', value: 'C'},
      { text: 'D', value: 'D' },
      //{ text: 'E', value: 'E' }
    ],
      formTitle: '',
      titleFN: '',
      titleLN: '',
      submitButtonTitle: 'Enviar',
      loading: false,
      showDialog: false
    };
  },
  mounted() {
    const id = this.$route.params.id
    console.log("id", id)
    this.id = id
    if (id) {
      this.getParaca();
      this.submitButtonTitle = 'editar';
    }
  },
  methods: {
    getParaca() {
      console.log(this.id, "idddd")
        this.loading = true;
        this.$http.get(`http://localhost:8082/api/users/${this.id}`)
          .then(response => {
              const paraca = response.data.payload._doc;
              console.log("paraca", paraca)
              this.formData = {
                email: paraca.email,
                username: paraca.username,
                first_name: paraca.first_name,
                last_name: paraca.last_name,
                roles: paraca.roles,
                is_active: paraca.is_active,
                lic: paraca.lic,
                tel: paraca.tel,
                country: paraca.country,
                gender: paraca.gender,
                exp_date: paraca.exp_date
              };
              this.titleFN = paraca.first_name.charAt(0).toUpperCase() + paraca.first_name.slice(1);
              this.titleLN = paraca.last_name.charAt(0).toUpperCase() + paraca.last_name.slice(1);
              this.loading = false

          })
          .catch(error => {
              console.log(error);
              this.loading = false
          });
    },
    submitForm() {
      this.loading = true;
      let data = this.formData;
      console.log(data, "data a enviar");
      if (this.id) {
          this.$http.put(`http://localhost:8082/api/paracas/${this.id}`, data)
          .then(response => {
              console.log(response);
              // Aquí puedes hacer algo con la respuesta
          })
          .catch(error => {
              console.log(error);
          });
      } else {
          this.$http.post('http://localhost:8082/api/paracas', data)
          .then(response => {
              console.log(response, "response");
              eventBus.$emit('toast', { show: true, text: "Creado correctamente", color: "green" })
              this.$router.push('/home')
          })
          .catch(error => {
              console.log(error);
              eventBus.$emit('toast', { show: true, text: `${error.response.data.error}`, color: "red" })
          });
      }
    },
    deleteParaca(){
      if (this.id) {
        this.loadingDel = true;
        this.$http.delete(`http://localhost:8082/api/users/${this.id}`)
          .then(response => {
            console.log(response, "response")
            eventBus.$emit('toast', { show: true, text: "Eliminado correctamente", color: "green" })
            this.$router.push('/manifest/flyersList')
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
  },
};
</script>

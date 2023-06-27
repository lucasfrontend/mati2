<template>
    <v-container fluid>

        <h3 class="d-flex justify-center mb-4">Registrar usuario</h3>
        <v-card tile>
            <v-card-text>
                <v-form ref="formTipo">
                    <v-row class="mt-1 px-5" no-gutters>
                        <v-col cols="12" class="px-1">
                            <label class="black--text">Alias</label>
                            <v-text-field
                                v-model="dataForm.alias"
                                outlined
                                dense
                                color="orange"
                                placeholder="Ingrese un Alias"
                                :rules='[(v) => !!v || "El Alias es requerido"]'
                            ></v-text-field>
                        </v-col>

                        <v-col cols="12" class="px-1">
                          <label class="black--text">Nombre</label>
                          <v-text-field
                              v-model="dataForm.partner_name"
                              outlined
                              dense
                              color="orange"
                              placeholder="Ingrese Nombre de socio"
                              :rules='[(v) => !!v || "El Nombre es requerido"]'
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" class="px-1">
                          <label class="black--text">DNI del Socio</label>
                          <v-text-field
                              v-model="dataForm.partner_dni"
                              outlined
                              dense
                              color="orange"
                              placeholder="Ingrese el número de DNI"
                              :rules='[
                                (v) => !!v || "El DNI es requerido",
                                (v) => /^\d+$/.test(v) || "Debe ingresar un valor numérico"
                              ]'
                          >
                          </v-text-field>
                        </v-col>
                        <!--
                        <date-input :fecha="fecha" :required="true" />
                        -->
                        <v-col cols="12" class="px-1">
                          <label class="black--text">Fecha de Nacimiento del Socio</label>
                            <v-list>
                              <v-list-item class="custom-input">
                                <v-menu
                                  v-model="partnerBirthdateOpen"
                                  :close-on-content-click="false"
                                  :nudge-right="30"
                                  transition="scale-transition"
                                  offset-y
                                  max-width="290px"
                                  min-width="auto"
                                >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field
                                      v-model="partnerBirthdateFormatted"
                                      append-icon="mdi-calendar"
                                      readonly
                                      outlined
                                      dense
                                      color="orange"
                                      class="custom-input"
                                      :rules='[(v) => !!v || "La fecha de nacimiento es requerida"]'
                                      v-bind="attrs"
                                      v-on="on"
                                  >
                                  </v-text-field>
                                </template>
                                <v-date-picker
                                  v-model="dataForm.partner_birthdate"
                                  color="orange"
                                  locale="es-ES"
                                  @input="validatePartnerAge">
                                </v-date-picker>
                                </v-menu>
                              </v-list-item>
                              <v-col v-if="partnerAgeError" cols="12">
                                <v-alert color="red" icon="mdi-close-circle-outline">
                                  La persona debe ser mayor de edad para registrarse
                                </v-alert>
                              </v-col>
                            </v-list>
                        </v-col >

                        <v-col cols="12" class="px-1">
                          <label class="black--text">Teléfono</label>
                          <v-text-field
                              v-model="dataForm.partner_phone"
                              outlined
                              dense
                              color="orange"
                              placeholder="Ingrese Número de teléfono"
                              :rules='[
                                (v) => !!v || "El DNI del afiliado es requerido",
                                (v) => /^\d+$/.test(v) || "Debe ingresar un valor numérico"
                              ]'
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" class="px-1">
                          <label class="black--text">DNI del afiliado</label>
                          <v-text-field
                              v-model="dataForm.affiliate_dni"
                              outlined
                              dense
                              color="orange"
                              placeholder="Ingrese el número de DNI del afiliado"
                              :rules='[
                                (v) => /^\d+$/.test(v) || "Debe ingresar un valor numérico"
                              ]'
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" class="px-1">
                          <label class="black--text">Nombre del afiliado</label>
                          <v-text-field
                              v-model="dataForm.affiliate_name"
                              outlined
                              dense
                              color="orange"
                              placeholder="Ingrese el nombre del afiliado"
                              :rules='[
                                (v) => !!v || "El nombre del afiliado es requerido"
                              ]'
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" class="px-1">
                          <label class="black--text">Fecha de Nacimiento del Afiliado</label>
                            <v-list>
                              <v-list-item class="custom-input">
                                <v-menu
                                  v-model="affiliateBirthdateOpen"
                                  :close-on-content-click="false"
                                  :nudge-right="40"
                                  transition="scale-transition"
                                  offset-y
                                  full-width
                                >
                                <template v-slot:activator="{ on, attrs }">
                                  <v-text-field
                                      v-model="affiliateBirthdateFormatted"
                                      append-icon="mdi-calendar"
                                      outlined
                                      dense
                                      color="orange"
                                      class="custom-input"
                                      v-bind="attrs"
                                      v-on="on"
                                  >
                                  </v-text-field>
                                </template>
                                <v-date-picker
                                  v-model="dataForm.affiliate_birthdate"
                                  color="orange"
                                  locale="es-ES"
                                  @input="validateAffiliateAge">
                                </v-date-picker>
                                </v-menu>
                              </v-list-item>
                              <v-col v-if="affiliateAgeError" cols="12">
                                <v-alert color="red" icon="mdi-close-circle-outline">
                                  La persona debe ser mayor de edad para registrarse
                                </v-alert>
                              </v-col>
                            </v-list>
                        </v-col >

                        <v-col cols="12" class="px-1">
                          <label class="black--text">Teléfono del afiliado</label>
                          <v-text-field
                              v-model="dataForm.affiliate_phone"
                              outlined
                              dense
                              color="orange"
                              placeholder="Ingrese Número de teléfono"
                              :rules='[
                                (v) => !!v || "El telénoso del afiliado es requerido",
                                (v) => /^\d+$/.test(v) || "Debe ingresar un valor numérico"
                              ]'
                          ></v-text-field>
                        </v-col>

                        <v-col cols="12" class="px-1">
                          <label class="black--text">Tipo de visita</label>
                          <v-select
                              v-model="dataForm.id_visit_type_usualy"
                              :items="visitTypes"
                              item-value="id"
                              item-text="descripcion"
                              outlined
                              dense
                              color="orange"
                              placeholder="Seleccione el tipo de visita"
                          >
                            <template #selection="{ item }">
                              {{ item.descripcion }}
                            </template>
                        </v-select>
                        </v-col>

                        <v-col cols="12" class="px-1">
                          <label class="black--text">Estado</label>
                          <v-select
                              v-model="dataForm.id_state"
                              :items="statuses"
                              item-value="id"
                              item-text="descripcion"
                              outlined
                              dense
                              color="orange"
                              placeholder="Seleccione el estado del usuario"
                          ></v-select>
                        </v-col>

                        <v-col cols="12" class="px-1">
                          <label class="black--text">Observaciones</label>
                          <v-textarea
                              v-model="dataForm.observations"
                              outlined
                              dense
                              color="orange"
                              placeholder="Ingrese cualquier observación adicional"
                          ></v-textarea>
                        </v-col>

                    </v-row>

                    <v-col cols="12" class="d-flex justify-center mb-1" v-if="errorMessage">
                      <v-alert color="red" dense outlined type="error" icon="mdi-alert-octagon-outline">
                        {{ errorMessage }}
                      </v-alert>
                    </v-col>
                    <!--
                    <v-col cols="12" class="d-flex justify-center mb-1" v-if="errorMessage">
                      <v-alert color="red" dense outlined type="error" icon="mdi-alert-octagon-outline">
                        {{ errorResponse }}
                      </v-alert>
                    </v-col>
                    -->
                    
                    <div class="d-flex justify-end">
                      <v-btn
                          :loading="loading" 
                          color="white" 
                          class="orange--text font-weight-bold mr-3 mb-4"
                          @click="clean">
                          Limpiar
                          <v-icon right dark>
                              mdi-cancel
                          </v-icon>
                      </v-btn>

                      <v-btn
                          :loading="loading" 
                          color="orange" dark
                          @click="register">
                          Guardar
                          <v-icon right dark>
                              mdi-content-save-edit
                          </v-icon>
                      </v-btn>
                  </div>

                </v-form>
            </v-card-text>
        </v-card>

        <Footer></Footer>
    </v-container>
</template>

<script>
import eventBus from "../../event-bus";
//import DateInput from "../app/DateInput.vue";

export default {
  name: "Register",
  components:{
    //DateInput
  },
  props:{  
  },
  data() {
    return {
      loading: false,
      partnerBirthdateOpen: false,
      affiliateBirthdateOpen: false,
      errorMessage: null,
      errorResponse: null,
      dataForm:{
        alias: '',
        partner_dni: '',
        partner_name: '',
        partner_birthdate: '',
        partner_phone: '',
        affiliate_dni: '',
        affiliate_name: '',
        affiliate_birthdate: '',
        affiliate_phone: '',
        id_visit_type_usualy: 1, // por defecto "Solo"
        id_state: 2, // por defecto "Normal"
        observations: '',
      },
      statuses: [
        {id: 1, descripcion: 'Miembro VIP'},
        {id: 2, descripcion: 'Normal'},
        {id: 3, descripcion: 'Turista'},
        {id: 4, descripcion: 'Observado'},
        {id: 5, descripcion: 'No frecuente'},
        //{id: 6, descripcion: 'Expulsado'},
        //{id: 7, descripcion: 'Suspendido'},
        {id: 8, descripcion: 'Invitado'},
      ],
      visitTypes: [
        {id: 1, descripcion: 'Solo'},
        {id: 2, descripcion: 'Pareja'},
        {id: 3, descripcion: 'Otro'},
        {id: 4, descripcion: 'Sola'}
      ],
      isAdultPartner: true,
      isAdultAffiliate: true,
      affiliateAgeError: false,
      partnerAgeError: false,
      isAdult: false,
    };
  },
  watch: {
    /*
    'dataForm.partner_dni': function(val) {
      if (this.isNumber(val)){
        console.log("tru")
      } else {
        console.log("fooools")
      }
    }*/
  },
  computed: {
    /*
    formate(date){
      date = date.splice(0, 10);
      return this.$moment(date).format('DD/MM/YYYY')
    },
    */
    partnerBirthdateFormatted() {
        return this.formatDate(this.dataForm.partner_birthdate, 'DD/MM/YYYY');
    },
    affiliateBirthdateFormatted() {
      return this.formatDate(this.dataForm.affiliate_birthdate, 'DD/MM/YYYY');
    }
  },
  methods: {
    clean(){
      this.dataForm.alias = '',
      this.dataForm.partner_dni = '',
      this.dataForm.partner_name = '',
      this.dataForm.partner_birthdate = '',
      this.dataForm.partner_phone = '',
      this.dataForm.affiliate_dni = '',
      this.dataForm.affiliate_name = '',
      this.dataForm.affiliate_birthdate = '',
      this.dataForm.affiliate_phone = '',
      this.dataForm.id_visit_type_usualy = '',
      this.dataForm.id_state = '',
      this.dataForm.observations = '',
      this.partnerAgeError = null;
      this.affiliateAgeError = null;
    },
    isNumber(numberData) {
      return !/\D/.test(numberData);
    },
    validateAge(date) {
      const age = this.$moment().diff(date, 'years');
      if (age < 18) {
        return "La persona debe ser mayor de edad para registrarse";
      }
      return null;
    },
    validatePartnerAge() {
      const error = this.validateAge(this.dataForm.partner_birthdate);
      this.partnerAgeError = error;
      this.partnerBirthdateOpen = false;
    },
    validateAffiliateAge() {
      const error = this.validateAge(this.dataForm.affiliate_birthdate);
      this.affiliateAgeError = error;
      this.affiliateBirthdateOpen = false;
    },
    formatDate(value, dateFormat) {
      if (value) {
        const dateOfBirth = new Date(value);
        const eighteenYears = new Date();
        eighteenYears.setFullYear(eighteenYears.getFullYear() - 18);
        if (dateOfBirth > eighteenYears) {
          this.isAdult = false; 
        } else {
          this.isAdult = true;
          return this.$moment(String(value)).format(dateFormat);
        }
      } else {
        return "";
      }
    },
    register() {
      this.errorMessage = null,
      this.loading = true;
      if (!this.dataForm.partner_name || !this.dataForm.partner_dni || !this.dataForm.alias || !this.dataForm.partner_birthdate || !this.dataForm.partner_phone || !this.dataForm.affiliate_phone) {
        this.errorMessage = 'Debe completar los campos obligatorios';
        this.loading = false;
      }
      else if (!this.isNumber(this.dataForm.partner_dni) || !this.isNumber(this.dataForm.affiliate_dni)) {
        this.errorMessage = 'El campo DNI solo acepta caracteres de tipo numérico';
        this.loading = false;
      } else if (!this.isNumber(this.dataForm.partner_phone) || !this.isNumber(this.dataForm.affiliate_phone)) {
        this.errorMessage = 'Debe ingresar un número de téfono válido'
        this.loading = false;

      } else {
        this.dataForm.partner_birthdate = this.formatDate(this.dataForm.partner_birthdate, 'DD/MM/YYYY')
        this.dataForm.affiliate_birthdate = this.formatDate(this.dataForm.affiliate_birthdate, 'DD/MM/YYYY');
        this.$http
          .post(`${process.env.VUE_APP_REGISTER}`, this.dataForm)
          .then(response => {
            console.log(response)
            eventBus.$emit('toast', { show: true, text: "Se ha dado de alta correctamente.", color: "green" });
            this.$router.push({
                path: '/access'
              });
              /*
            if (response && response.status === 'success') {
              console.log(response, 'ok')
            } else if (response && response.status === 'error') {
            console.log(response, 'error')
            }*/
          })
          .catch((error) => {
            //this.errorResponse = error.response.data.message;
            console.log(error.response.data.message, "error.response.data.message")
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
  },
};
</script>

<style>
.custom-input {
  min-height: 100%;
  padding: 0px !important;
  margin: 0px !important;
}
</style>

<template>
    <div class="py-5">
        <v-row class="mb-3 px-5" no-gutters>
          <v-col cols="12" class="text-h6 text-center font-weight-bold"> 
            
            <v-row class="justify-center pb-5"> 
                <span class="ml-1 orange--text font-weight-bold text-uppercase">{{partner.alias}}</span>:
            </v-row>

              <v-card class="pa-2 mb-3 text-start" outlined elevation="0" >

                    <div class="pa-2 text-body-2">   
                        <p class="mb-0"><b>DNI: </b> {{ partner.partner_dni }}</p>
                        <p class="mb-0"><b>Nombre: </b> {{ partner.partner_name }}</p>
                        <p class="mb-0"><b>Fecha de Nacimiento: </b> {{ formatDate(partner.partner_birthdate, 'DD/MM/YYYY') }}</p>
                        <p class="mb-0"><b>Fecha de Nacimiento: </b> {{ partner.visit_type.description }}</p>
                    </div>
              </v-card>     
              <v-card class="pa-2 mb-3" outlined elevation="0">
                    <div class="pa-2 text-body-2">
                        <p class="mb-0 text-left"><b>Tipo de visitante: </b> {{ partner.visit_type.description }}</p>
                        <p class="mb-0 text-left" ><b>Monto sugerido: </b> {{ partner.expultion_reason }}</p>
                    </div>
                </v-card>

          </v-col>
      </v-row>
        
        <v-form ref="form" class="px-5" >

            <v-row no-gutters >
                <v-col cols="12"  class="px-1">
                    <v-text-field
                    label="Monto"
                    outlined
                    dense
                    v-model="items.entry_amount_paid"
                    type="number"
                    :rules='[(v) => !!v || "El campo es requerido"]'
                />
                </v-col>
            </v-row>

            <v-row  no-gutters>
                <v-col cols="12"  class="px-1">
                    <v-text-field
                    label="Brazalete"
                    outlined
                    dense
                    type="number"
                    v-model="items.id_bracelet_1"
                    :rules='[(v) => !!v || "El campo es requerido"]'
                />
                </v-col>
            </v-row>

            <v-row no-gutters>
                <v-col cols="12" class="px-1">
                    <v-textarea
                    label="Observaciones"
                    rows="3"
                    outlined
                    dense
                    v-model="items.entry_visit_obs"
                />
                </v-col>
            </v-row>

            <v-row class="justify-center align-center pb-8">
                <v-col cols="12" class="text-center py-0 mt-2">
                    <span class="font-weight-thin" style="font-size: 1.3rem;">Otra visita</span>
                </v-col>

                <v-col cols="6"  class="d-flex pl-15 pb-5 justify-center align-center">
                    <v-divider :thickness="2" color="orange"></v-divider>
                </v-col>
                    
                <v-col cols="6"  class="d-flex pr-15 pb-5 justify-center align-center ">
                    <v-divider :thickness="2" color="orange"></v-divider>
                </v-col>
            </v-row>

            <v-row  no-gutters>
                <v-col cols="12"  class="px-1">
                    <v-text-field
                    label="Brazalete 2"
                    outlined
                    dense
                    type="number"
                    v-model="items.id_bracelet_2"
                />
                </v-col>
            </v-row>

            <v-row no-gutters>
                <v-col cols="12" class="px-1">
                    <v-textarea
                    label="Observaciones otra visita"
                    rows="3"
                    outlined
                    dense
                    v-model="items.other_visit_obs"
                />
                </v-col>
            </v-row>

            <v-row class="justify-center align-center pb-8">
                <v-col cols="12" class="text-center py-0 mt-2">
                    <span class="font-weight-thin" style="font-size: 1.3rem;">Otros pagos</span>
                </v-col>

                <v-col cols="6"  class="d-flex pl-15 pb-5 justify-center align-center">
                    <v-divider :thickness="2" color="orange"></v-divider>
                </v-col>
                    
                <v-col cols="6"  class="d-flex pr-15 pb-5 justify-center align-center ">
                    <v-divider :thickness="2" color="orange"></v-divider>
                </v-col>
            </v-row>

            <v-row no-gutters>
                <v-col cols="12" class="px-1">
                    <v-text-field
                        label="Pago extra"
                        outlined
                        dense
                        v-model="items.other_paid"
                        type="number"
                    />
                </v-col>
            </v-row>

            <v-row no-gutters>
                <v-col cols="12" class="px-1">
                    <v-textarea
                        v-if="items.other_paid"
                        label="Observaciones Otros pagos"
                        rows="3"
                        outlined
                        dense
                        v-model="items.other_paid_obs"
                        :rules="[v => !!items.other_paid || !v || 'Este campo es obligatorio', v => !!items.other_paid_obs || !items.other_paid || 'Este campo es obligatorio']"
                        
                    />
                </v-col>
            </v-row>


            <v-col v-if="errorMessage" cols="12">
                <v-alert color="red" :value="true" icon="mdi-alert-circle-outline">
                    {{ errorMessage }}
                </v-alert>
            </v-col>

            <v-row class="justify-center align-center">
                <v-col cols="4">
                    <v-btn large block :loading="loading" color="orange" class="white--text font-weight-bold" @click="entryRegister">
                        Registrar Entrada
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>            
    </div> 
</template>

<script>
import eventBus from '../../event-bus'
    export default{
        components: {
        },
        data(){
            return {
                modal: null,
                loading: false,
                selectState: null,
                selectVisit: null,
                other_visit_obs: "",
                visitTypes: [
                    {description: "Solo", id: 1},
                    {description: "Sola", id: 3},
                    {description: "Pareja", id: 2},
                    {description: "Otro", id: 4}
                ],
                partner: null,
                items: {
                    visit_date: "", // ver si se quita este campo
                    other_visit_obs: "",
                    entry_visit_obs: "",
                    entry_amount_paid: "",
                    other_paid: "",
                    other_paid_obs: "", 
                    hour_entry: "",
                    id_bracelet_1: "",
                    id_bracelet_2: ""
                },
                errorMessage: false,
            }
        },
        mounted() {
            this.loadPartnerData();
        },
        methods:{
            loadPartnerData(){
                this.partner = this.$store.state.partner;
                console.log(this.partner, "partner")

                console.log(this.partner.id_bracelet_2, "partner.id_bracelet_2", )

            },
            formatDate(date, format){
                return (date) ? this.$moment(date).format(format) : ''
            },
            icon(){
              let icon = {icon: 'mdi-qrcode-scan', color: 'orange'}
              if(this.partner != null){
                  if(this.partner){
                      switch (this.partner.state.id_state) {
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
            entryRegister() {
                if(this.$refs.form.validate()){
                    this.loading= true
                    let vm = this
                    let data = {
                        "id_partner": this.$store.state.partner.id_partner,
                        //"visit_date": this.$moment().format('YYYY-MM-DD'), averiguar si se quito este campo
                        "id_state": this.$store.state.partner.id_state,
                        "id_visit_type": this.$store.state.partner.visit_type.id_visit_type,
                        "other_visit_obs" : this.items.other_visit_obs,
                        "entry_visit_obs" : this.items.entry_visit_obs,
                        "entry_amount_paid" : this.items.entry_amount_paid,
                        "other_paid": this.items.other_paid,
                        "other_paid_obs": this.items.other_paid_obs,
                        "hour_entry": this.$moment().format('HH:mm:ss'), 
                        "id_bracelet_1": this.items.id_bracelet_1,
                        "id_bracelet_2": this.items.id_bracelet_2
                    }
                    this.$http.post(process.env.VUE_APP_ENTRY_REGISTER, data)
                        .then((response)=>{
                            console.log("response.data.status", response.data.data)

                        if(response.data.status === '200'){
                            console.log("res", response.data.data)
                        }
                        
                        if(response){
                            eventBus.$emit('toast', { show: true, text: "La visita se ha registrado correctamente", color: "green" })
                            vm.$refs.form.reset()
                            this.$router.push({
                                path: '/home'
                            });
                        }
                        vm.loading=false
                    })
                    .catch((error)=>{
                        console.log(error.response)
                        console.log(error.response.data.message)
                        eventBus.$emit('toast', { show: true, text: error.response.data.message, color: "red" })
                        vm.loading=false
                    })

                }
            },
        }
    }
</script>


<template>
  <div class="py-8">
    <v-form ref="form" class="px-md-15 px-5" >                        
        <v-row class="justify-center align-center">
            <v-col cols="4">
                <v-btn large block :loading="loading" color="orange" class="white--text font-weight-bold" @click="updatePartner">
                Reactivar membresia
                </v-btn>
            </v-col>
        </v-row>
    </v-form>  
    
    <!--
      <v-form ref="form" v-if="partner == null">
        <v-row class="px-10">
              <v-col cols="12">
                  <v-text-field
                      prepend-inner-icon="mdi-card-account-details-outline"
                      placeholder="DNI"
                      outlined
                      dense
                      clearable
                      :disabled="load"
                      v-model="dni"
                      @keydown.enter="getIPartners"
                      :rules='[(v) => !!v || "El DNI es requerido"]'
                  />
              </v-col>
          </v-row>
          <v-row class="px-10" no-gutters>
              <v-col cols="12">
                  <v-btn color="orange" block dark @click="getIPartners" :loading="load">
                      <v-icon left>mdi-magnify</v-icon> Buscar
                  </v-btn>
              </v-col>
          </v-row>
      </v-form>

      <v-col v-if="partner">
          <v-card>
            <v-card-text v-for="item, n in items" :key="'fl'+n">
              <v-icon v-if="iconClass" class="position-absolute" style="top: 0; right: 0; font-size: 5rem;" :style="{ color: iconClass.color }">{{ iconClass.icon }}</v-icon>
              <div><strong style="font-size: 1.3rem;">{{ item.alias }}</strong></div>
              <div v-if="item.observations"><strong style="font-size: 1.3rem;">{{ item.observations }}</strong></div>
              <div v-if="item.expultion_reason"><strong>Expulsado, </strong> {{ item.expultion_reason }}</div>
              <div v-if="item.suspension_reason"><strong>Suspendido, </strong> {{ item.suspension_reason }}</div>
              <div><strong style="font-size: 1rem;">{{ item.state.actions.description }}</strong></div>
              <div><strong>Alias:</strong> {{ item.alias }}</div>
              <div><strong>DNI:</strong> {{ item.partner_dni }}</div>
              <div><strong>Estado:</strong> {{ item.state.description }}</div>
              <div><strong>Tipo de visita:</strong> {{ item.visit_type.description }}</div>
              <div><strong>Socio:</strong> {{ partner ? 'Sí' : 'No' }}</div> 
              <div v-if="item.partner_phone"><strong>Teléfono:</strong> {{ item.partner_phone }}</div>
            </v-card-text>
          </v-card>
        </v-col>

    <v-form ref="form" class="px-md-15 px-5" >
        <v-row no-gutters>
            <v-col cols="12" md="4" class="px-1">
                <v-select 
                        v-model="selectVisit"
                            :items="items"
                            label="Tipo de Visitante"
                            :rules='[(v) => !!v || "El campo es requerido"]'
                            dense
                            outlined
                            item-text="description"
                            item-value="id"
                        ></v-select>  
            </v-col>
            <v-col cols="12" md="4" class="px-1">
                <v-select 
                        v-model="selectState"
                            :items="states"
                            label="Estado"
                            item-text="description"
                            item-value="id_state"
                            :rules='[(v) => !!v || "El campo es requerido"]'
                            dense
                            outlined
                        ></v-select> 
            </v-col>
            <v-col cols="12" md="4" class="px-1">
                <v-text-field 
                        label="Alias"
                        outlined
                        dense
                        v-model="nickname"
                        :rules='[(v) => !!v || "El campo es requerido"]'
                    />
            </v-col>

        
        </v-row>

        <v-row class="justify-center align-center pb-8">
            <v-col cols="12" class="text-center py-0 mt-2">
                <span class="font-weight-thin" style="font-size: 1.3rem;">Datos Miembro 1</span>
            </v-col>

            <v-col cols="6"  class="d-flex pl-15 pb-5 justify-center align-center">
                <v-divider :thickness="2" color="orange"></v-divider>
            </v-col>
                
            <v-col cols="6"  class="d-flex pr-15 pb-5 justify-center align-center ">
                <v-divider :thickness="2" color="orange"></v-divider>
            </v-col>
        </v-row>

        <v-row no-gutters >
            <v-col cols="12" md="4" class="px-1">
                <v-text-field
                label="DNI"
                outlined
                dense
                v-model="dniPartner"
                type="number"
                :rules='[(v) => !!v || "El campo es requerido"]'
            />
            </v-col>
            <v-col cols="12" md="4" class="px-1">
                <v-text-field
                label="Nombre"
                outlined
                dense
                v-model="namePartner"
                type="text"
                :rules='[(v) => !!v || "El campo es requerido"]'
            />   
            </v-col>
            <v-col cols="12" md="4" class="px-1">
                <v-text-field
                label="Apellido"
                outlined
                dense
                v-model="lastnamePartner"
                :rules='[(v) => !!v || "El campo es requerido"]'
            />
            </v-col>
        </v-row>

        <v-row  no-gutters>
            <v-col cols="12" md="6" class="px-1">
                <DateInput :fecha="datePartner" :required="true" @changeDate="datePartner = $event" :validationAge="true"/>
            </v-col>

            <v-col cols="12" md="6" class="px-1">
                <v-text-field
                label="Telefono"
                outlined
                dense
                type="number"
                v-model="phonePartner"
                :rules='[(v) => !!v || "El campo es requerido"]'
            />
            </v-col>
        </v-row>
        
        <v-row class="justify-center align-center pb-8" v-if="selectVisit === 2">
            <v-col   cols="12"  class="text-center py-0 mt-2">
                <span class="font-weight-thin" style="font-size: 1.3rem;">Datos Miembro 2</span>
            </v-col>

            <v-col cols="6"   class="d-flex pl-15 justify-center align-center">
                <v-divider :thickness="2" color="orange"></v-divider>
            </v-col>
                
            <v-col cols="6"   class="d-flex pr-15 justify-center align-center ">
                <v-divider :thickness="2" color="orange"></v-divider>
            </v-col>
        </v-row>
                        
        <v-row no-gutters v-if="selectVisit === 2">
            <v-col cols="12" md="3" class="px-1">  
                <v-text-field 
                label="DNI"
                outlined
                dense
                v-model="dniAffiliate"
                type="number"
                :rules='[(v) => !!v || "El campo es requerido"]'
            />
            </v-col>
            <v-col cols="12" md="3" class="px-1"> 
                <v-text-field
                label="Nombre"
                outlined
                dense
                v-model="nameAffiliate"
                :rules='[(v) => !!v || "El campo es requerido"]'
                />
            </v-col>
            <v-col cols="12" md="3" class="px-1">
                <v-text-field
                label="Apellido"
                outlined
                dense
                v-model="lastnameAffiliate"
                :rules='[(v) => !!v || "El campo es requerido"]'
            />
            </v-col>
            <v-col cols="12" md="3" class="px-1">
                <DateInput :fecha="dateAffiliate" :required="true" @changeDate="dateAffiliate = $event" :validationAge="true"/>
            </v-col>
        </v-row>
        
        <v-row class="justify-center align-center pb-8">
            <v-col   cols="12"  class="text-center py-0 mt-2">
                <span class="font-weight-thin" style="font-size: 1.3rem;">Otra Información</span>
            </v-col>

            <v-col cols="6"   class="d-flex pl-15 justify-center align-center">
                <v-divider :thickness="2" color="orange"></v-divider>
            </v-col>
                
            <v-col cols="6"   class="d-flex pr-15 justify-center align-center ">
                <v-divider :thickness="2" color="orange"></v-divider>
            </v-col>
        </v-row>

        <v-row no-gutters>
            <v-col cols="12" class="px-1">
                <v-textarea
                label="Observaciones"
                rows="3"
                outlined
                dense
                v-model="observations"
            />
            </v-col>
        </v-row>
                        
        <v-row class="justify-center align-center">
            <v-col cols="4">
                <v-btn large block :loading="loading" color="orange" class="white--text font-weight-bold" @click="createPartner">
                DAR DE ALTA
                </v-btn>
            </v-col>
        </v-row>
    </v-form>   
    -->
  </div>
</template>


<script>
import eventBus from "../../event-bus";
export default{
    data(){
        return{
            dni: '',
            partner: null,
            items:[],
            dniPartner: null,
            options: {
                sortDesc:[true],
                page: 1
            },
            loading: false
        }
    },
    methods:{
        clean(){
            this.partner = null
            this.dni = ''
        },
        updatePartner() {
            let vm = this;
            this.loading = true;
            let id_state = this.$store.state.partner.id_partner
            console.log(id_state, "id_state")
            let id_partner = (this.$store.state.partner.id_partner) ? this.$store.state.partner.id_partner : '';
            console.log(id_partner, "id_partner")
            // socio no frecuente id_state 5 pasa a  pasa a normal
            let data = {
                "id_state": 2,
            }
            this.$http.put(`${process.env.VUE_APP_PARTNERS_UPDATE}/${id_partner}`, data)
                .then((response) => {
                    console.log(response.data.data.msg, "respuesta")
                    eventBus.$emit('toast', { show: true, text: response.data.data.msg, color: "green" })
                    if(response.data.status === 200){
                        console.log("ok")
                    }

                    if(response.data.status == 'error'){
                        console.log("error")
                    }
                    
                    this.loading = false;
                })
                .catch((error) => {
                    console.log(error)
                    eventBus.$emit('toast', { show: true, text: "No se ha podido reactivar la membresia", color: "red" })
                    vm.loading = false;
                })
          },

    }
  }
</script> 
<template>
    <div class="py-8">
  
        <v-form ref="form">
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
                  Editar
                  </v-btn>
              </v-col>
          </v-row>
      </v-form>   
  
    </div>
  </template>
  
  
  <script>
  //import eventBus from "../../event-bus";
  export default{
      data(){
          return{
              dni: '',
              load: false,
              partner: null,
              dataDNI: null
          }
      },
      watch:{
          dataDNI(val){
              this.dni = val.identification;
              this.getIPartners()
          }
      },
      methods:{
          clean(){
              this.partner = null
              this.dni = ''
          },
          getIPartners() {
              if(this.$refs.form.validate()){
                  let vm = this;
                  this.load = true
                  let params = (this.dni != null) ? `dni=${this.dni}` : "";
                  this.$http.get(`${process.env.VUE_APP_PARTNERS}?${params}&page=1&pageSize=10`)
                      .then((res) => {
                          vm.partner = (res.data.data) ? res.data.data : false
                          vm.load = false
                      }).catch((err) => console.log(err));
              }
          }
      }
    }
  </script> 
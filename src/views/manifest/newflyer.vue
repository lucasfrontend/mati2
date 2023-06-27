<template>
    <v-container>
        <v-stepper v-model="step">
            <v-stepper-header>
            <v-stepper-step :complete="step > 1" step="1">Datos personales</v-stepper-step>
        
            <v-divider></v-divider>
        
            <v-stepper-step :complete="step > 2" step="2">Licencias</v-stepper-step>
        
            <v-divider></v-divider>
        
            <v-stepper-step step="3">Pago</v-stepper-step>
            </v-stepper-header>
        
            <v-stepper-items>
            <v-stepper-content step="1">
                <v-form ref="form" v-model="valid" lazy-validation>
                <h2>Nuevo paracaidista </h2>
                <p>Datos personales</p>
                <v-text-field
                    prepend-inner-icon="mdi-account"
                    placeholder="correo"
                    outlined
                    dense
                    class="logininput"
                    v-model="formData.email"
                    v-validate="'email'"
                    :rules="[
                      (v) => !!v || 'El correo es obligatorio', 
                      (v) => /.+@.+\..+/.test(v) || 'Ingrese un correo electrónico válido' 
                    ]"
                  />
                <v-text-field
                    prepend-inner-icon="mdi-account"
                    placeholder="Nombre"
                    outlined
                    dense
                    class="logininput"
                    v-model="formData.first_name"
                />
                <v-text-field
                  prepend-inner-icon="mdi-account-outline"
                  placeholder="Apellido"
                  outlined
                  dense
                  class="logininput"
                  v-model="formData.last_name"
                />
                <v-text-field
                  prepend-inner-icon="mdi-account-outline"
                  placeholder="DNI"
                  outlined
                  dense
                  class="logininput"
                  v-model="formData.dni"
                />
                <!--
                <v-select
                    v-model="select"
                    :items="items"
                    :rules="[v => !!v || 'Item is required']"
                    label="Item"
                    required />
                    
                <v-checkbox
                    v-model="checkbox"
                    :rules="[v => !!v || 'You must agree to continue!']"
                    label="Do you agree?"
                    required/>
                -->
                <v-btn color="black" dark block :disabled="!valid" @click="submit">
                    <span class="yellow--text">Continuar</span>
                </v-btn>

                <v-btn color="green" dark block class="mt-2"  @click.native="clear">
                    <span class="yellow--text">Limpiar</span>
                </v-btn>
                </v-form>
            </v-stepper-content>
        
            <v-stepper-content step="2">
                <v-form>
                <h2> Form Wizard </h2>
                <p>Nostrud exercitation commodo consequat.</p>
                <v-container>
                    <v-layout flex wrap row>
                    <v-flex d-flex lg6>
                        <v-text-field
                        v-model="otro"
                        label="Otro" />
                    </v-flex>
                    <v-flex d-flex lg6>
                        <v-text-field
                        v-model="otro"
                        label="Otro" />
                    </v-flex>
                    <v-flex d-flex lg6>
                        <v-text-field
                        v-model="otro"
                        label="Bla" />
                    </v-flex>
                    <v-flex d-flex lg6>
                    <v-text-field
                        v-model="formData.cma_data.exp_date"
                        label="Expiración" />
                    </v-flex>
                    <v-col cols="12" sm="3">
                        <date-input v-model="formData.cma_data.exp_date" label="Fecha de expiración" :required="true" :validationAge="false" @changeDate="handleChangeDate"/>
                    </v-col>
                    <v-flex d-flex lg2></v-flex>
                    <v-flex d-flex lg4>
                        <!--
                        <v-btn @click="step=3">
                        continuar
                        </v-btn>
                        -->
                    </v-flex>
                    <v-btn color="black" dark block :disabled="!valid" @click="step=3">
                        <span class="yellow--text">Continuar</span>
                    </v-btn>
                    <!--
                    <v-flex d-flex lg4>
                        <v-btn @click="step=1">Atras</v-btn>
                    </v-flex>
                    -->
                    <v-btn color="green" dark block class="mt-2"  @click="step=1">
                        <span class="yellow--text">Atras</span>
                    </v-btn>
                    </v-layout>
                </v-container>
                </v-form>
            </v-stepper-content>
        
            <v-stepper-content step="3">
                <h2> Aggreement </h2>
                <p style="padding-top: 25px;">
                    Nostrud exercitation commodo consequat.Nostrud exercitation commodo consequat.Nostrud exercitation commodo consequat.Nostrud exercitation commodo consequat.
                    Nostrud exercitation commodo consequat.Nostrud exercitation commodo consequat.Nostrud exercitation commodo consequat.Nostrud exercitation commodo consequat.
                    Nostrud exercitation commodo consequat.Nostrud exercitation commodo consequat.Nostrud exercitation commodo consequat.Nostrud exercitation commodo consequat.
                </p>
                <v-checkbox label="I read agreement and i have not any objection."></v-checkbox>
        
                <v-btn @click="registerNewFlyer">continue</v-btn>
            </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </v-container>
</template>

<script>
export default {
    data () {
    return {
        step: 1,
        valid: true,
        formData: {
            email: '',
            first_name: '',
            last_name: '',
            dni: '',
            cma_data: {
                exp_date: '',
                class: '',
                lic_num: ''
            },
            //exp_date: '',
            //roles: [],
            // is_active: true,
            //iss_date: '',
            //pp_iss_date: '',
            //pp_exp_date: '',
            //country: '',
            //gender: '',
            av_c: {
                av_total: ''
            },
        },
        nameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'Name must be less than 10 characters'
        ],
        emailRules: [
        v => !!v || 'E-mail is required',
        v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        select: null,
        items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4'
        ],
        checkbox: false,
        date: new Date().toISOString().substr(0, 10)
    }
    },
    methods: {
        handleChangeDate(){

        },
        registerNewFlyer() {
            //faltan campos
        //if(this.formData.email && this.formData.first_name && this.formData.last_name ){
            this.loading = true;
            //let vm = this;
            this.$http.post(`http://localhost:8082/api/users`, this.formData)
            .then(response => {
            if (response) {
                console.log("yeahh")
                console.log(response, "response")
                console.log(response.status, "response.status")
                console.log("dos")
                this.loading = false;
                this.step = 1;
                //const token = response.data.data.token;
                //this.$store.commit('setToken', token);
                //console.log(token)
                //vm.$store.commit('setSession', response.data)
            }
            })
            .catch((error) => {
            this.loading = false;
            console.log("tres")
            console.log(error, "el error ess")
            this.error = error.response.data.message;
            })
        //}else{
        //    if(!this.email) this.error = "El correo es requerido"
        //    if(!this.password) this.error = "La contraseña es requerida"
        //}    
        },
    submit () {
        if (this.$refs.form.validate()) {

        console.log("holi")
        }

        this.step = 2;
    },
    clear () {
        this.$refs.form.reset()
    }
    }
}
</script>

<style>
</style>

<template>
    <div class="py-5">
        <v-form ref="form" class="px-md-15 px-5" >

            <v-row no-gutters >
                <v-col cols="12"  class="px-1">
                    <v-text-field
                    label="Monto pagado"
                    outlined
                    dense
                    v-model="items.exit_amount_paid"
                    type="number"
                    :rules='[(v) => !!v || "El campo es requerido"]'
                />
                </v-col>
            </v-row>

            <v-row no-gutters >
                <v-col cols="12"  class="px-1">
                    <v-text-field
                    label="Cantidad pagada"
                    outlined
                    dense
                    v-model="items.exit_amount_payed"
                    type="number"
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
                    v-model="items.exit_visit_obs"
                />
                </v-col>
            </v-row>

            <v-row no-gutters>
                <v-col cols="12" class="px-1">
                    <v-textarea
                    label="Otras observaciones"
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

            <v-row no-gutters >
                <v-col cols="12"  class="px-1">
                    <v-text-field
                    label="otros pagos"
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
                    label="Observaciones - Otros pagos"
                    rows="3"
                    outlined
                    dense
                    v-model="items.other_paid_obs"
                />
                </v-col>
            </v-row>
                            
            <v-col v-if="errorMessage" cols="12">
                <v-alert color="red" :value="true" icon="mdi-alert-circle-outline">
                    {{ errorMessage }}
                </v-alert>
            </v-col>
<!--
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
                    @click="entryRegister">
                    Registrar Entrada
                    <v-icon right dark>
                        mdi-content-save-edit
                    </v-icon>
                </v-btn>
            </div>
            <v-row class="justify-center align-center">
                <v-col cols="4">
                    <v-btn large block :loading="loading" color="white" class="orange--text font-weight-bold" @click="entryRegister">
                        Limpiar
                    </v-btn>
                </v-col>
            </v-row>
        -->
            <v-row class="justify-center align-center">
                <v-col cols="4">
                    <v-btn large block :loading="loading" color="orange" class="white--text font-weight-bold" @click="exitRegister">
                        Registrar Salida
                    </v-btn>
                </v-col>
            </v-row>
        </v-form>            
    </div> 
</template>

<script>

    export default{
        components: {
        },
        data(){
            return {
                modal: null,
                loading: false,
                items: {
                    exit_visit_obs: '',
                    exit_amount_payed: '',
                    other_paid: '',
                    other_paid_obs: '',
                    exit_amount_paid: ''
                },
                errorMessage: false
            }
        },
        methods:{
            exitRegister(){
                if(this.$refs.form.validate()){
                    //let vm = this;
                    console.log("id_visit ", this.$store.state.partner.id_visit_type_usualy, "??????")
                    console.log(this.items.exit_amount_payed, "exit_amount_payed")
                    let data = {
                        "id_state": this.$store.state.partner.id_state,
                        "exit_visit_obs": this.items.other_visit_obs, 
                        "exit_amount_payed": this.items.exit_amount_payed,
                        "other_paid": this.items.other_paid,
                        "other_paid_obs": this.items.other_paid_obs,
                        "exit_amount_paid ": this.items.exit_amount_paid 
                    }
                    //enviar id de visita
                    let id_partner = 1 //(this.$store.state.partner.id_partner) ? this.$store.state.partner.id_partner : 1;
                    this.$http
                        .put(`${process.env.VUE_APP_EXIT_REGISTER}${id_partner}`, data)
                            .then( res => {
                                console.log(res.data);
                                if (res.data.status === 'ok') {
                                    console.log(res.data);
                                }
                                if (res.data.status === 'error') {
                                    console.log(res.data.status);
                                }
                            })
                            .catch( err => console.log(err))
                }
            }

        }
    }
</script>


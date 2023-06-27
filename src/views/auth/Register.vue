<template>
  <v-card color="black" dark elevation="0" height="100%" class="d-flex rounded-0 justify-center align-center">
    <div v-if="showSpinner" class="">
      <AltimeterSpinner />
    </div>
    <v-card color="transparent" elevation="0" :max-width="($vuetify.breakpoint.mdAndUp) ? '500' : ''">
      <v-row class="justify-center align-center">

          <v-col cols="12" class="d-flex justify-center pt-0 align-center" >
            <img style="max-width: 250px; color: yellow" :src="logo">
          </v-col>

          <v-col cols="12" class="text-center py-0 mb-n2 mt-2">
            <span class="font-weight-thin" style="font-size: 1.5rem; color: yellow">Registrate</span>
          </v-col>

          <v-col cols="6" class="d-flex pl-15 pb-5 justify-center align-center">
            <v-divider :thickness="2" color="white"></v-divider>
          </v-col>

          <v-col cols="6" class="d-flex pr-15 pb-5 justify-center align-center">
            <v-divider :thickness="2" color="white"></v-divider>
          </v-col>

          <v-col cols="12">
            <v-form ref="formLogin" method="POST">
              <v-row class="px-15" no-gutters>
                <v-col cols="12">
                  <v-text-field
                  prepend-inner-icon="mdi-account-circle"
                  placeholder="Nombre de usuario"
                  outlined
                  dense
                  class="logininput"
                  v-model="username"
                  />
                </v-col>

                <!-- hacer campo requerido -->
                <v-col cols="12">
                  <v-text-field
                  prepend-inner-icon="mdi-account"
                  placeholder="Nombre"
                  outlined
                  dense
                  class="logininput"
                  v-model="first_name"
                  />
                </v-col>

                <!-- hacer campo requerido -->
                <v-col cols="12">
                  <v-text-field
                  prepend-inner-icon="mdi-account-outline"
                  placeholder="Apellido"
                  outlined
                  dense
                  class="logininput"
                  v-model="last_name"
                  />
                </v-col>

                <!-- hacer campo requerido -->
                <v-col cols="12">
                  <v-text-field
                  prepend-inner-icon="mdi-email"
                  placeholder="correo"
                  outlined
                  dense
                  class="logininput"
                  v-model="email"
                  :rules="[
                    (v) => !!v || 'El correo es obligatorio', 
                    (v) => /.+@.+\..+/.test(v) || 'Ingrese un correo electrónico válido', 
                  ]"
                  />
                </v-col>
                
                <!-- hacer campo requerido -->
                <v-col cols="12">
                  <v-text-field
                  prepend-inner-icon="mdi-key"
                  placeholder="Contraseña"
                  outlined
                  dense
                  v-model="password"
                  :type="showPassword?'text':'password'"
                  @click:append="showPassword = !showPassword"
                  @keydown.enter="login"
                      :append-icon="showPassword ? 'mdi-eye':'mdi-eye-off'" >
                    </v-text-field>
                  </v-col>

                  <!-- validar igualdad de campos -->
                  <v-col cols="12">
                  <v-text-field
                    prepend-inner-icon="mdi-key"
                    placeholder="Repetir Contraseña"
                    outlined
                    dense
                    v-model="password2"
                    :type="showPassword?'text':'password'"
                    @click:append="showPassword = !showPassword"
                    @keydown.enter="login"
                    :append-icon="showPassword ? 'mdi-eye':'mdi-eye-off'" 
                  >
                    </v-text-field>
                  </v-col>

                <v-col cols="12" class="d-flex justify-center mb-1" v-if="error">
                  <v-alert color="white" dense outlined type="error" icon="mdi-alert-octagon-outline">
                     {{error}}
                  </v-alert>
                </v-col>

                <v-col cols="12">
                  <v-btn large block :loading="loading" color="yellow" class="black--text font-weight-bold" @click="Register">
                    Registrarse
                  </v-btn>
                </v-col>

                <v-col cols="12" class="text-center mt-2">
                  <span style="font-size: 0.8rem;">¿Ya tenes cuenta? <router-link to="/login">Iniciá sesión</router-link></span>
                </v-col>

              </v-row>
            </v-form>
          </v-col>
      </v-row>
    </v-card>
  </v-card>
</template>

<script>
import AltimeterSpinner from '../app/AltimeterSpinner.vue'
export default {
  name: "Register",
  components: {
    AltimeterSpinner
  },
  data(){
    return{
      logo: require('@/assets/logo_amarillo.png'),
      loading: false,
      error: null,
      showPassword: false,
      email: '',
      username: '', 
      first_name: '', 
      last_name: '',
      password: '',
      password2: '',
      showSpinner: false
    }
  },
  methods: {
    Register() {
      if(this.email && this.password && this.first_name && this.last_name && this.username){
        this.loading = true;
        //let vm = this;
        this.$http.post(`http://localhost:8082/api/session/register`, {
            username: this.username,
            first_name: this.first_name,
            last_name: this.last_name,
            email: this.email,
            password: this.password
        })
        .then(response => {
          if (response) {
            console.log("uno")
            console.log(response, "response")
            console.log(response.status, "response.status")
            console.log("dos")
            //const token = response.data.data.token;
            //this.$store.commit('setToken', token);
            //console.log(token)
            //vm.$store.commit('setSession', response.data)
            this.showSpinner = true;
            this.loading = false;
            this.$router.push({
              path: '/home'
            });
          }
        })
        .catch((error) => {
          this.loading = false;
          console.log("tres")
          console.log(error, "el error ess")
          this.error = error.response.data.message;
        })
      }else{
        if(!this.email) this.error = "El correo es requerido"
        if(!this.password) this.error = "La contraseña es requerida"
      }    
    },
  }
};
</script>

<style>

.fullscreen-spinner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); /* ajusta la opacidad del fondo */
  z-index: 9999; /* asegura que el spinner esté por encima de todo lo demás */
}
</style>
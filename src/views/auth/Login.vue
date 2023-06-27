<template>
  <v-card color="black" dark elevation="0" height="100%" class="d-flex rounded-0 justify-center align-center">
    <div v-if="showSpinner" class="">
      <AltimeterSpinner />
    </div>
    <v-card color="transparent" elevation="0" :max-width="($vuetify.breakpoint.mdAndUp) ? '500' : ''">
      <v-row class="justify-center align-center">
          <!--
          <v-col cols="12" class="text-center py-0">
            <span class="font-weight-black" style="font-size: 2rem;">BarriApp</span>
          </v-col>
          -->

          <v-col cols="12" class="d-flex justify-center pt-0 align-center" >
            <img style="max-width: 250px; color: yellow" :src="logo">
          </v-col>

          <!--
          <v-col cols="12" class="text-center py-0 mb-n2 mt-2">
            <span class="font-weight-thin" style="font-size: 1.5rem; color: yellow">Iniciá Sesión</span>
          </v-col>
-->
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
                    prepend-inner-icon="mdi-account"
                    placeholder="correo"
                    outlined
                    dense
                    class="logininput"
                    v-model="email"
                    v-validate="'email'"
                    :rules="[
                      (v) => !!v || 'El correo es obligatorio', 
                      (v) => /.+@.+\..+/.test(v) || 'Ingrese un correo electrónico válido' 
                    ]"
                  />
                </v-col>
                
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
                    :append-icon="showPassword ? 'mdi-eye':'mdi-eye-off'" 
                    :rules="[
                      (v) => !!v || 'La contraseña es requerida',
                      (v) => (v && v.length >= 6) || 'La contraseña debe tener al menos 6 caracteres'
                    ]"
                  >
                    </v-text-field>
                  </v-col>

                <v-col cols="12" class="d-flex justify-center mb-1" v-if="errorMessage">
                  <v-alert color="white" dense outlined type="error" icon="mdi-alert-octagon-outline">
                     {{ errorMessage }}
                  </v-alert>
                </v-col>

                <v-col cols="12">
                  <v-btn large block :loading="loading" color="yellow" class="black--text font-weight-bold" @click="login">
                    Iniciar Sesión
                  </v-btn>
                </v-col>

                <v-col cols="12" class="text-center mt-2">
                  <span style="font-size: 0.8rem;">¿Aún no estás registrado? <router-link to="/register">Regístrate aquí</router-link></span>
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
  name: "Login",
  components: {
    AltimeterSpinner
  },
  data(){
    return{
      logo: require('@/assets/logo_amarillo.png'),
      loading: false,
      errorMessage: null,
      showPassword: false,
      email: '',
      password: '',
      showSpinner: false
    }
  },
  methods: {
    async getSunset() {
      try {
        const response = await this.$http.get(`http://localhost:8082/api/settings?sunset=true`);
        this.sunset = response.data.sunset;
        console.log("response desde sunsetcout", this.sunset);
        this.$store.commit('SET_SUNSET', this.sunset);
      } catch (error) {
        console.error(error);
      }
    },
    async login() {
      if (this.email && this.password) {
        this.loading = true;
        try {
          const response = await this.$http.post('http://localhost:8082/api/session/login', {
            email: this.email,
            password: this.password
          });
          if (response.status === 200) {
            console.log("respuesta es:", response)
            localStorage.setItem('token', response.data.access_token)
            const token = response.data.access_token;
            console.log("token", token)
            this.$store.commit('setToken', token);
            this.$store.commit('setSession', response.data.data.user)
            this.showSpinner = true;
            this.loading = false;
            // Retraso de 3 segundos antes de redireccionar
            setTimeout(() => {
              this.$router.push({ path: '/home' });
            }, 3000);
            this.getSunset()
                // Otras acciones que se realizarán durante el retardo de 3 segundos
    // ...
          } else {
            console.log("nosep")
            this.loading = false;
          }
        } catch (error) {
          console.error(error);
          this.errorMessage = "Error al conectar con el servidor. Por favor, inténtalo nuevamente más tarde.";
          this.loading = false;
        }
      } else {
        if (!this.email) this.errorMessage = "El correo es requerido"
        if (!this.password) this.errorMessage = "La contraseña es requerida"
      }
    }
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
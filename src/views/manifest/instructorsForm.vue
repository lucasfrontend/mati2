<template>
  <v-container>
    <v-toolbar flat>
      <v-toolbar-title>titulito dinamico</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card>
      <v-card-text>
        <v-form ref="form" @submit.prevent="saveInstructor">

          <v-text-field 
            label="Nombre" 
            v-model="form.first_name" 
            outlined 
            dense 
            required 
            prepend-inner-icon="mdi-account" 
            :rules="[v => !!v || 'El campo es requerido', v => /^[a-zA-Z]+$/.test(v) || 'El campo debe contener solo letras']"
          ></v-text-field>

          <v-text-field 
            label="Apellido" 
            v-model="form.last_name" 
            outlined 
            dense 
            required 
            prepend-inner-icon="mdi-account-outline" 
            :rules="[v => !!v || 'El campo es requerido', v => /^[a-zA-Z]+$/.test(v) || 'El campo debe contener solo letras']"
          ></v-text-field>

          <v-text-field 
            label="Peso en kg" 
            v-model="form.w_kg" 
            outlined 
            dense 
            required 
            prepend-inner-icon="mdi-weight-kilogram" 
            :rules="[v => !!v || 'El campo es requerido', v => /^\d+$/.test(v) || 'El campo debe contener solo números']"
          ></v-text-field>

          <v-text-field 
            label="Licencia" 
            v-model="form.lic" 
            outlined 
            dense 
            required 
            prepend-inner-icon="mdi-file-document-edit" 
            :rules="[v => !!v || 'El campo es requerido']"
          ></v-text-field>


          <v-btn :loading="loading" color="black" dark type="submit" block>
            <span class="yellow--text">Guardar</span>
          </v-btn>
          <v-btn color="red" class="mt-2" dark block>
            <span class="yellow--text" @click="showDialog = true">Eliminar</span>
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>

    <v-dialog v-model="showDialog" persistent max-width="500px">
      <v-card>
        <v-card-title>Eliminar</v-card-title>
        <v-card-text>¿Está seguro de que desea eliminar al instructor?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="showDialog = false">Cancelar</v-btn>
          <v-btn color="primary" text @click="deleteInstructor">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

 
<script>
import eventBus from '../../event-bus'
export default {
  data() {
    return {
      id: null,
      showDialog: false,
      form: {
      },
      loading: false
    }
  },
  mounted() {
    const id = this.$route.params.id
    if (id) {
      this.id = id
      this.$http.get(`http://localhost:8082/api/instructors/${id}`)
        .then(response => {
          this.form = response.data.payload;
        })
        .catch(error => {
          console.log(error)
        //
        });
    }
  },
  methods: {
    saveInstructor() {
      if (!this.form.first_name || !this.form.last_name || !this.form.w_kg || !this.form.lic) {
        eventBus.$emit('toast', {
          show: true,
          text: 'Por favor complete todos los campos',
          color: 'red'
        })
        return
      }
      this.loading = true
      const url = this.id ? `http://localhost:8082/api/instructors/${this.id}` : 'http://localhost:8082/api/instructors';
      const method = this.id ? 'PUT' : 'POST';
      console.log(this.form , " data a enviar inst")
      this.$http({ method: method, url: url, data: this.form })
        .then(response => {
          console.log(response, this.id ? 'actualizado ok' : 'guardado ok');
          eventBus.$emit('toast', { show: true, text: "guardado correctamente", color: "green" })
          this.$refs.form.reset();
          this.$router.push('/manifest/instructorsList')
        })
        .catch(error => {
          this.loading = false
          eventBus.$emit('toast', { show: true, text: "No se ha podido guardar", color: "red" })
          console.log(error);
        });
    },
    deleteInstructor(){
      console.log(this.id, "id instru")
      if (this.id) {
        
        this.$http.delete(`http://localhost:8082/api/instructors/${this.id}`)
          .then(response => {
            console.log(response, "response")
            eventBus.$emit('toast', { show: true, text: "Eliminado correctamente", color: "green" })
            this.$router.push('/manifest/instructorsList')
          //
          })
          .catch(error => {
            eventBus.$emit('toast', { show: true, text: "No se ha podido eliminar", color: "red" })
            console.log(error)
          //
          });
      }
    }
  }
}
</script>

<template>
  <v-container>
    <v-card>
      <v-toolbar flat>
        <v-toolbar-title>titulito dinamico</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card-text>
        <v-form ref="form" @submit.prevent="savePlane">
          <v-text-field label="Nombre" v-model="form.name" outlined dense class="input-border" prepend-inner-icon="mdi-airplane"></v-text-field>
          <v-text-field label="Modelo" v-model="form.model" outlined dense class="input-border" prepend-inner-icon="mdi-file-cog"></v-text-field>
          <v-text-field label="Año" v-model="form.ye" outlined dense class="input-border" prepend-inner-icon="mdi-calendar"></v-text-field>
          <v-text-field label="Carga máxima de despegue - MWTO" v-model="form.mtow" outlined dense class="input-border" prepend-inner-icon="mdi-weight-kilogram"></v-text-field>
          <v-btn color="black" dark type="submit" block>
            <span class="yellow--text">Guardar</span>
          </v-btn>
          <v-btn v-if="id !== null" @click="showDialog = true" color="red" dark block class="mt-2">
            <span class="yellow--text">Eliminar</span>
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
    <v-dialog v-model="showDialog" persistent max-width="500px">
      <v-card>
        <v-card-title class="headline">Eliminar</v-card-title>
        <v-card-text>¿Está seguro de que desea eliminar este avión?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="showDialog = false">Cancelar</v-btn>
          <v-btn color="primary" text @click="deletePlane" :loading="loadingDel">Aceptar</v-btn>
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
        name: '',
        model: '',
        mtow: '',
        ye: ''
      },
      loading: false,
      loadingDel: false
    }
  },
  mounted() {
    const id = this.$route.params.id
    if (id) {
      this.id = id
      this.$http.get(`http://localhost:8082/api/planes/${id}`)
        .then(response => {
        this.form = response.data.payload;
        console.log(this.form, "this.planes")
        //
        })
        .catch(error => {
        console.log(error)
        //
        });
    }
  },
  methods: {
    savePlane() {
      this.loading = true;
      const url = this.id ? `http://localhost:8082/api/planes/${this.id}` : 'http://localhost:8082/api/planes';
      const method = this.id ? 'PUT' : 'POST';
      this.$http({ method: method, url: url, data: this.form })
        .then(response => {
          console.log(response, this.id ? 'actualiza ok' : 'guarda ok');
          eventBus.$emit('toast', { show: true, text: "Guardado correctamente", color: "green" })
          this.$refs.form.reset();
          this.$router.push('/manifest/planesList')
        })
        .catch(error => {
          eventBus.$emit('toast', { show: true, text: "No se ha podido guardar", color: "red" })
          console.log(error);
        })
        .finally(() => {
          this.loading = false; 
        });
    },
    deletePlane(){
      if (this.id) {
        this.loadingDel = true;
        this.$http.delete(`http://localhost:8082/api/planes/${this.id}`)
          .then(response => {
            console.log(response, "response")
            eventBus.$emit('toast', { show: true, text: "Eliminado correctamente", color: "green" })
            this.$router.push('/manifest/planesList')
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
  }
}
</script>

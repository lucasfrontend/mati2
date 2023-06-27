<template>
  <v-container>
    <v-toolbar flat>
      <v-toolbar-title>titulito dinamico</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-card>
      <v-card-text>
        <v-form ref="form">
          <v-text-field label="Nombre del paracaídas" v-model="form.name_parachute" outlined dense required prepend-inner-icon="mdi-parachute"></v-text-field>

          <v-select label="Tipo" v-model="form.category" :items="categories" item-text="text" item-value="value" outlined dense required prepend-inner-icon="mdi-account-outline">
              <template #selection="{ item }">
                  {{ item.text }}
              </template>
              <template #item="{ item }">
                  <v-list-item-content> {{ item.text}}</v-list-item-content>
              </template>
          </v-select>

          <v-text-field label="Canopy" v-model="form.canopy.name" outlined dense required prepend-inner-icon="mdi-parachute"></v-text-field>

          <v-text-field label="Cantidad de saltos" v-model="form.canopy.jumps" outlined dense required prepend-inner-icon="mdi-parachute"></v-text-field>
          
          <v-text-field label="Arnés" v-model="form.harness" outlined dense required prepend-inner-icon="mdi-parachute"></v-text-field>
          
          <v-row>
            <v-col cols="12" sm="6">
              <v-text-field label="Reserva" v-model="form.reserve.name" outlined dense required prepend-inner-icon="mdi-parachute"></v-text-field>
            </v-col>
            
            <v-col cols="12" sm="3">
              <v-text-field label="Año Reserva" v-model="form.reserve.y" outlined dense required prepend-inner-icon="mdi-parachute"></v-text-field>
            </v-col>

            <v-col cols="12" sm="3">
              <date-input v-model="form.reserve.packing_date" label="Último plegado" :required="false" :validationAge="false" @changeDate="handleChangeDate"/>
            </v-col>
          </v-row>
          
          <v-btn @click="saveEquipment" :loading="loading" color="black" dark block>
            <span class="yellow--text">Guardar</span>
          </v-btn>
          <v-btn v-if="id !== null" @click="showDialog = true" color="red" class="mt-2" dark block>
            <span class="yellow--text">Eliminar</span>
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>

    <v-dialog v-model="showDialog" persistent max-width="500px">
      <v-card>
        <v-card-title>Eliminar</v-card-title>
        <v-card-text>¿Está seguro de que desea Eliminar este equipo?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="showDialog = false">Cancelar</v-btn>
          <v-btn color="primary" text @click="deleteEquipment">Aceptar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>

</template>
 
<script>
import DateInput from '../app/DateInput.vue';
import eventBus from '../../event-bus'
export default {
  components: {
    'date-input': DateInput
  },
  data() {
    return {
      id: null,
      showDialog: false,
      form: {
        name_parachute: '',
        category: null,
        canopy: {
          name: '',
          jumps: ''
        },
        harness: '',
        reserve: {
          name: '',
          packing_date: '',
          y: ''
        }
      },
      categories: [
        { value: 1, text: 'Tandem' },
        { value: 2, text: 'Escuela' },
        { value: 3, text: 'Deportivo' }
      ],
      loading: false
    }
  },
  mounted() {
    const id = this.$route.params.id
    if (id) {
      this.id = id
      this.$http.get(`http://localhost:8082/api/equipment/${id}`)
        .then(response => {
          console.log("holi")
        this.form = response.data.payload;
        console.log(this.form, "formularioooo")
        //
        })
        .catch(error => {
        console.log(error)
        //
        });
    }
  },
  methods: {
    handleChangeDate(date) {
      console.log(date)
    },
    saveEquipment() {
      this.loading = true
      const url = this.id ? `http://localhost:8082/api/equipment/${this.id}` : 'http://localhost:8082/api/equipment';
      const method = this.id ? 'PUT' : 'POST';
      
      this.$http({ method: method, url: url, data: this.form })
        .then(response => {
        console.log(response, this.id ? 'actualiza ok' : 'guarda ok');
        eventBus.$emit('toast', { show: true, text: "Guardado correctamente", color: "green" })
        this.$refs.form.reset();
        this.$router.push('/manifest/equipmentList')
        })
        .catch(error => {
          eventBus.$emit('toast', { show: true, text: "No se ha podido guardar", color: "red" })
          this.loading = false
          console.log(error);
        });
    },
    deleteEquipment(){
      if (this.id) {
        this.$http.delete(`http://localhost:8082/api/equipment/${this.id}`)
          .then(response => {
          console.log(response, "response")
          eventBus.$emit('toast', { show: true, text: "Eliminado correctamente", color: "green" })
          this.$router.push('/manifest/equipmentList')
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

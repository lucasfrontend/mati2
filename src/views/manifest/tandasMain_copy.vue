<template>
  <v-container>
    <v-row>
      <v-col cols="8" md="6" order-xs-first>
        <v-card class="px-6 py-4" style="max-width: 600px;">
          <v-form>
            <v-text-field v-model="form.number_tanda" label="Número de tanda" type="number"></v-text-field>
            <v-text-field v-model="form.slot_1" label="Slot 1"></v-text-field>
            <v-text-field v-model="form.slot_2" label="Slot 2"></v-text-field>
            <v-text-field v-model="form.slot_3" label="Slot 3"></v-text-field>
            <v-text-field v-model="form.slot_4" label="Slot 4"></v-text-field>
            <v-text-field v-model="form.pilot" label="Piloto" rows="2"></v-text-field>
            <v-text-field v-model="form.altitude" label="Altura" rows="2"></v-text-field>
            <v-text-field v-model="form.hora" label="Horario" rows="2"></v-text-field>
            <v-select v-model="form.avion" :items="aviones" label="Avión" rows="2"></v-select>
            <v-checkbox v-model="form.combus" label="Combustible"></v-checkbox>
          </v-form>

          <v-row class="my-5">
            <v-col cols="12" md="6" offset-md="3">
              <v-row>
                <v-col cols="6" class="col mx-2">
                  <v-btn color="yellow" dark block>Aceptar</v-btn>
                </v-col>
                <v-col cols="6" class="col mx-2">
                  <v-btn color="red" dark block>Cancelar</v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>

        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card class="px-6 py-4" style="min-width: 600px;">
          <v-toolbar dense>
            <v-toolbar-title>Tabla de datos</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="primary" text>Nuevo registro</v-btn>
          </v-toolbar>
          <v-divider></v-divider>
          <v-data-table :headers="headers" :items="items"></v-data-table>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

  
  
  <script>
  export default {
    data() {
      return {
        form: {
          number_tanda: null,
          slot_1: null,
          slot_2: null,
          slot_3: null,
          slot_4: null,
          pilot: null,
          altitude: null,
          hora: null,
          avion: null,
          combus: null,
        },
        pilots: [], // Aquí vendrán los datos del pedido GET
        altitudes: ["Baja", "Media", "Alta"],
        aviones: ["Tipo 1", "Tipo 2"],
        headers: [], // Configura las cabeceras para la tabla de datos
        items: [], // Aquí vendrán los datos de la tabla de datos
      }
    },
    created() {
      // Realiza el pedido GET para obtener los datos de los pilotos
      // y actualiza la propiedad "pilots" con los datos recibidos
    },
  }
  </script>
  
  <style>
    /* Agrega aquí tus estilos personalizados */
  
    /* Para darle un fondo gris a la página completa */
    body {
      background-color: #f5f5f5;
    }
  
   
  
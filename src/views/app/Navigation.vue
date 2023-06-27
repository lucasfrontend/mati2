<template>
  <div>
    <v-card
      style="box-shadow: rgba(0, 0, 0, 0.05) 0px 25px 15px -20px"
      height="100"
      class="d-flex align-center justify-center"
    >
      <img
        v-if="this.$store.getters.isDarkMode"
        width="200"
        src="@/assets/logo_amarillo.png"
        alt=""
      />
      <img
        v-else
        width="200"
        src="@/assets/logo_amarillo.png"
        alt=""
      />
    </v-card>
    <v-list class="menu-list" nav dense>
      <div v-for="(item, index) in itemsMenu" :key="'mn' + index">
        <v-list-item 
          v-if="item.submenus.length === 0" 
          exact 
          router 
          :to="item.to" 
          color="primary"
          class="pa-1 mt-2 text-overline"
          :exact-active-class="['text--darken-1']"
        >
          <v-list-item-action class="pa-0">
            <v-icon class="primary--text text--darken-1">{{ item.icon }}</v-icon>
          </v-list-item-action>

          <v-list-item-content class="primary--text text--darken-1">
            <v-list-item-title class="subtitle-2">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
          
        <div v-else>
          <v-list-group v-model="item.active">
            <template v-slot:activator>
              <v-list-item-action class="pa-0">
                <v-icon class="primary--text text--darken-1">{{ item.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content class="primary--text text--darken-1" v-bind="attrs" v-on="on">
                <v-list-item-title class="subtitle-2" v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </template>
                
            <v-list-item
              v-for="(option, index) in item.submenus"
              :key="'smn' + index"
              router 
              exact 
              :to="option.to"
              class="pa-0"
            >
              <v-list-item-action>
                <v-icon x-small class="primary--text text--darken-1">{{ option.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content class="primary--text text--darken-1" v-bind="attrs" v-on="on">
                <v-list-item-title class="subtitle-2" v-text="option.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
        </div>
      </div>
    </v-list>
  </div>
</template>


<!--<template>
  
  <v-card height="100%" width="256" class="mx-auto card-nav">
    <v-navigation-drawer permanent>
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img :src="logo">
          </v-list-item-avatar>
          <v-list-item-content>
            <v-list-item-title>{{ empresa }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-list dense>
        <div v-for="( item,index ) in itemsMenu" :key="'mn'+index">
          <v-list-item 
            v-if="item.submenus.length == 0" 
            exact 
            router 
            :to="item.to" 
            color="primary"
            :exact-active-class="['text--darken-1']"
          >
            <v-list-item-action class="pa-0" >
              <v-icon class="primary--text text--darken-1">{{item.icon}}</v-icon>
            </v-list-item-action>

            <v-list-item-content class="primary--text text--darken-1">
              <v-list-item-title>{{item.title}}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
            
          <div v-else>
            <v-list-group v-model="item.active">
              <template v-slot:activator>
                
                <v-list-item-action class="pa-0">
                    <v-icon class="primary--text text--darken-1">{{item.icon}}</v-icon>
                </v-list-item-action>
                <v-list-item-content class="primary--text text--darken-1" v-bind="attrs" v-on="on">
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
              </template>
                  
              <v-list-item
                v-for="( option, index ) in item.submenus"
                :key="'smn'+index"
                router exact :to="option.to"
              >
                
              <v-list-item-action>
                <v-icon x-small class="primary--text text--darken-1" >{{option.icon}}</v-icon>
              </v-list-item-action>
              <v-list-item-content class="primary--text text--darken-1" v-bind="attrs" v-on="on">
                <v-list-item-title  v-text="option.title"></v-list-item-title>
              </v-list-item-content>
            
              </v-list-item>
            </v-list-group>
          </div>
      </div>
      </v-list>
    </v-navigation-drawer>
  </v-card>
</template>
-->

<script>
  export default {
    data () {
      return {
        logo: require('@/assets/logosdch.png'),
        yellow_logo: require('@/assets/logo_amarillo.png'),
        empresa: 'SkyDive CHascomús',
        right: null,
        itemsMenu: [
          { title: 'Inicio', icon: 'mdi-home', to: '/', submenus:[]},
          { title: 'Tandas', icon: 'mdi-file', to: '/tandasMain', submenus:[] },
          { title: 'new flyer', icon: 'mdi-cog-outline', to: '/manifest/newFlyer', submenus:[] },
          { title: 'CONFIGURACIÓN',
          icon: 'mdi-cog-outline',
          submenus:[
            { title: 'Aviones', to:'/manifest/planesList'},
            { title: 'Equipos', to:'/manifest/equipmentList'},
            { title: 'Dolar hoy', to:'/manifest/dolarBlue'},
            { title: 'Instructores', to:'/manifest/instructorsList'},
            { title: 'Packers', to:'/manifest/packersList'},
            { title: 'Pilotos', to:'/manifest/pilotsList'},
            { title: 'Precios', to:'/manifest/pricesList'},
          ]
        },
        { title: 'Salir', icon: 'mdi-logout-variant', to: '/logout', submenus:[] },
        ],
        attrs: null,
        on: null, //????????
      }
    },
    beforeMount(){
      //console.log('User ', this.$store.state.user);
    }
  }
</script>

<style>
  .card-nav .mdi-chevron-down::before {
    color: #563c00;
  }
</style>

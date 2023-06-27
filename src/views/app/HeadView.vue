<template>
  <v-app-bar app color="black" dark hide-toolbar>
    <v-row class="align-center">
      <v-col cols="3" >
        <v-list-item-avatar style="font-size: 2.5rem;" v-if="$route.name == 'dashboard' && drawer === false">
          <img :src="logo">
        </v-list-item-avatar>
        <v-icon @click="goBack()" v-else>mdi-arrow-left</v-icon>
      </v-col>
      <v-col cols="6" class="d-flex align-center justify-center">
        <div class="align-self-center" style="color: yellow;">
          <div v-if="$route.name !== 'dashboard'" class="text-center  ml-1" style="font-size: 0.8rem;"> {{ title }}</div>
          <div style="font-size: 0.8rem;" v-if="$route.name == 'dashboard' && $store.state.userLoged">¡Hola {{ $store.state.userLoged.username }}!</div>
        </div>
      </v-col>
      <v-col cols="3" class="d-flex justify-end">
        <v-btn icon @click="$emit('openDrawer')">
            <v-icon>mdi-menu</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-app-bar>
</template>

<script>
export default{
    name: "HeadView",
    props:{
      userName: {type: String},
      drawer: Boolean
    },
    data () {
      return {
        logo: require('@/assets/logosdch.png'),
      }
    },
    computed:{
      title(){
        console.log(this.$route)
        return (this.$route.meta.title) ? this.$route.meta.title : null
      }
    },
    methods: {
      goBack() {
        this.$router.go(-1)
      },
    }
}
</script>


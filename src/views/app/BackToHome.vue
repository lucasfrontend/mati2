<template>
  <v-col cols="6" md="6" lg="6" class="custom-button">
    <v-btn fab dark small color="primary" absolute bottom right @click="$router.push('/home')">
      <v-icon small>mdi-arrow-left</v-icon>
    </v-btn>
  </v-col>
</template>

<script>
export default {
  name: "BackToHome",
};
</script>

<style scoped>
.custom-button {
  padding-bottom: 20px;
}

</style>
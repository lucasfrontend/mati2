<template>
  <v-autocomplete
    v-model="selectedValue"
    :items="options"
    :label="inputTitle"
    :clearable="true"
    :type="inputType"
    @input="updateValue"
  />
</template>


<script>
export default {
  name: 'DataTableInput',
  props: {
    inputTitle: String,
    inputValue: [String, Number],
    inputType: {
      type: String,
      default: 'text'
    },
    options: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      selectedValue: this.inputValue,
    };
  }
};
</script>

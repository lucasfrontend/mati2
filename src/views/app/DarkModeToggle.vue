<template>
  <v-container>
    <label class="switch">
    <input type="checkbox" class="primary" v-model="internalDarkMode" @click="toggleDarkMode">
    <div>
        <span></span>
    </div>
</label>
    <!-- unoooo      
      <input type="checkbox" id="s1" @click="toggleDarkMode"/>
      <label class="slider-v1" for="s1"></label>
      -->

  </v-container>
</template>

<script>
export default {
  props: {
    darkMode: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      items: [
        { label: 'Light Mode', value: false },
        { label: 'Dark Mode', value: true }
      ],
      internalDarkMode: this.darkMode
    };
  },
  methods: {
    toggleDarkMode() {
      this.$nextTick(() => {
      this.internalDarkMode = !this.internalDarkMode;
      this.$emit('toggle-dark-mode', this.internalDarkMode);
    });
    }
  },
  watch: {
    darkMode(newVal) {
      this.internalDarkMode = newVal;
    }
  }
};
</script>

<style scoped>
.switch {
  --line: #505162;
  --dot: #F7F8FF;
  --circle: #9EA0BE;
  --duration: .3s;
  --text: #9EA0BE;
  cursor: pointer;
}

.switch input {
  display: none;
}

.switch input + div {
  position: relative;
}

.switch input + div:before,
.switch input + div:after {
  --s: 1;
  content: '';
  position: absolute;
  height: 4px;
  top: 10px;
  width: 24px;
  background: var(--line);
  transform: scaleX(var(--s));
  transition: transform var(--duration) ease;
}

.switch input + div:before {
  --s: 0;
  left: 0;
  transform-origin: 0 50%;
  border-radius: 2px 0 0 2px;
}

.switch input + div:after {
  left: 28px;
  transform-origin: 100% 50%;
  border-radius: 0 2px 2px 0;
}

.switch input + div span {
  padding-left: 56px;
  line-height: 24px;
  color: var(--text);
}

.switch input + div span:before {
  --x: 0;
  --b: var(--circle);
  --s: 4px;
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  box-shadow: inset 0 0 0 var(--s) var(--b); 
  transform: translateX(var(--x));
  transition: box-shadow var(--duration) ease, transform var(--duration) ease;
}

.switch input + div span:not(:empty) {
  padding-left: 64px;
}

.switch input:checked + div:before {
  --s: 1;
}

.switch input:checked + div:after {
  --s: 0;
}

.switch input:checked + div span:before {
  --x: 28px;
  --s: 12px;
  --b: var(--dot);
}

html {
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
}

* {
  box-sizing: inherit;
}

*::before,
*::after {
  box-sizing: inherit;
}

body {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
  background: #262730;
}

.switch + .switch {
  margin-top: 32px;
}

.dribbble {
  position: fixed;
  display: block;
  right: 20px;
  bottom: 20px;
}

.dribbble img {
  display: block;
  height: 28px;
}


</style>
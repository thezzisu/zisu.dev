<template>
  <svg class="cvs" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 252 252">
    <path
      class="cls-1"
      d="M18,18H204.23c26.45,0,42.6,25.9,28.63,45.92L139.22,198"
      transform="translate(-2 -2)"
    />
    <path
      class="cls-2"
      d="M238,238H51.89c-26.52,0-42.71-26-28.7-46L116.75,58"
      transform="translate(-2 -2)"
    />
  </svg>
</template>


<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'HomeLogo',
  mounted() {
    const cls1 = this.$el.querySelector('.cls-1') as SVGPathElement
    const cls2 = this.$el.querySelector('.cls-2') as SVGPathElement
    cls1.classList.add('animate-1')
    cls2.classList.add('animate-2')
  }
})
</script>

<style scoped>
.cvs {
  width: 96px;
  height: 96px;
}

.cls-1,
.cls-2 {
  fill: none;
  stroke-linecap: round;
  stroke-miterlimit: 10;
  stroke-width: 32px;
}

.cls-1 {
  stroke: #0d55ff;
}

.cls-2 {
  stroke: #00c9db;
}

.animate-1 {
  stroke-dasharray: 417;
  stroke-dashoffset: 417;
  animation: A1 0.5s cubic-bezier(0, 0.4, 1, 1) forwards;
}

.animate-2 {
  stroke-dasharray: 417;
  stroke-dashoffset: -417;
  animation: A1 0.5s cubic-bezier(0, 0.4, 1, 1) forwards 0.7s;
}

@keyframes A1 {
  to {
    stroke-dashoffset: 0;
  }
}
</style>

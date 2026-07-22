<script setup>
// Posições/tamanhos fixos para manter a composição visual consistente
// entre navegações (evita "pulos" aleatórios a cada troca de página).
const bubbles = [
  { size: 70, top: '8%', left: '6%', right: null, delay: '0s' },
  { size: 34, top: '18%', left: '22%', right: null, delay: '1.4s' },
  { size: 110, top: '4%', left: null, right: '10%', delay: '0.7s' },
  { size: 22, top: '30%', left: null, right: '26%', delay: '2.1s' },
  { size: 50, top: '60%', left: '4%', right: null, delay: '1.1s' },
  { size: 18, top: '78%', left: '16%', right: null, delay: '3s' },
  { size: 90, top: '66%', left: null, right: '6%', delay: '0.3s' },
]
</script>

<template>
  <div aria-hidden="true">
    <span
      v-for="(b, i) in bubbles"
      :key="i"
      class="bubble"
      :style="{
        width: b.size + 'px',
        height: b.size + 'px',
        top: b.top,
        left: b.left,
        right: b.right,
        animationDelay: b.delay,
      }"
    >
    </span>
  </div>
</template>

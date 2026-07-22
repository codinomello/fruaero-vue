<script setup>
const props = defineProps({
  // percentual de preenchimento (0-100)
  fillPercent: { type: Number, required: true },
  // texto grande no centro (já formatado)
  display: { type: [String, Number], required: true },
  // legenda pequena abaixo do número, ex. "de 1000 pontos"
  unitLabel: { type: String, default: '' },
})
const clamp = (n) => Math.max(2, Math.min(100, n))
</script>

<template>
  <div class="orb shadow-glass">
    <div class="orb-liquid" :style="{ height: clamp(props.fillPercent) + '%' }"></div>
    <div class="orb-shine"></div>
    <div class="orb-value">
      <span class="display font-800 text-4xl" style="color:var(--ink)">{{ display }}</span>
      <span v-if="unitLabel" class="text-xs font-semibold mt-1" style="color:var(--ink-soft)">{{ unitLabel }}</span>
    </div>
  </div>
</template>

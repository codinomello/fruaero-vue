<script setup>
import { reactive, ref, computed } from 'vue'
import Orb from '../components/Orb.vue'
import WaveFooter from '../components/WaveFooter.vue'

const rangeFill = (val, min, max) => ((val - min) / (max - min)) * 100 + '%'

const areas = reactive([
  { id: 'lc', nome: 'Linguagens, Códigos e suas Tecnologias', icon: '🗣️', nota: 600, peso: 1 },
  { id: 'ch', nome: 'Ciências Humanas e suas Tecnologias', icon: '🌍', nota: 600, peso: 1 },
  { id: 'cn', nome: 'Ciências da Natureza e suas Tecnologias', icon: '🧪', nota: 600, peso: 1 },
  { id: 'mt', nome: 'Matemática e suas Tecnologias', icon: '📐', nota: 600, peso: 1 },
  { id: 'red', nome: 'Redação', icon: '✍️', nota: 700, peso: 1 },
])

const presets = {
  igual: { lc: 1, ch: 1, cn: 1, mt: 1, red: 1 },
  medicina: { lc: 1, ch: 1, cn: 2, mt: 1.5, red: 2 },
  direito: { lc: 1.5, ch: 2, cn: 1, mt: 1, red: 2 },
  engenharia: { lc: 1, ch: 1, cn: 1.5, mt: 2, red: 1 },
}
const activePreset = ref('igual')

function applyPreset(name) {
  activePreset.value = name
  const p = presets[name]
  areas.forEach((a) => { a.peso = p[a.id] })
}

const media = computed(() => {
  const weightSum = areas.reduce((s, a) => s + a.peso, 0)
  if (weightSum <= 0) return 0
  const weightedSum = areas.reduce((s, a) => s + a.nota * a.peso, 0)
  return weightedSum / weightSum
})
const mediaRounded = computed(() => Math.round(media.value))
</script>

<template>
  <section class="relative px-4 sm:px-8 pt-10 sm:pt-16 pb-8 max-w-6xl mx-auto">
    <div class="text-center max-w-3xl mx-auto">
      <span class="inline-flex items-center gap-2 glass-strong rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold shadow-glass mb-5" style="color:var(--ink-soft)">
        <span class="h-2 w-2 rounded-full shadow" style="background:var(--accent-deep)"></span>
        Enem · Média ponderada por área do conhecimento
      </span>
      <h1 class="display font-800 text-4xl sm:text-6xl leading-[1.05] drop-shadow-sm" style="color:var(--ink)">
        Sua nota do Enem, <br class="hidden sm:block"> com o peso de cada curso.
      </h1>
      <p class="mt-5 text-base sm:text-lg leading-relaxed" style="color:var(--ink-soft)">
        Informe suas notas nas 5 áreas e ajuste o peso de cada uma — assim como muitas instituições fazem no SiSU
        para valorizar as competências mais importantes de cada curso.
      </p>
    </div>
  </section>

  <section class="px-4 sm:px-8 py-8 max-w-6xl mx-auto">
    <div class="glass-strong rounded-4xl sm:rounded-[2.5rem] p-5 sm:p-10 shadow-glass">

      <div class="flex flex-wrap gap-2 mb-8">
        <button
          v-for="(label, key) in { igual: 'Pesos iguais', medicina: 'Exemplo: Medicina', direito: 'Exemplo: Direito', engenharia: 'Exemplo: Engenharia' }"
          :key="key"
          type="button"
          class="btn-outline-gloss text-xs font-semibold px-4 py-2 rounded-full transition"
          :class="{ active: activePreset === key }"
          :style="activePreset !== key ? { color: 'var(--ink-soft)' } : {}"
          @click="applyPreset(key)"
        >
          {{ label }}
        </button>
      </div>

      <div class="grid lg:grid-cols-[1.3fr_0.7fr] gap-8 lg:gap-10">

        <div class="space-y-6">
          <div v-for="a in areas" :key="a.id" class="glass rounded-2xl p-4">
            <div class="flex items-center justify-between gap-3 mb-2">
              <label class="font-semibold text-sm flex items-center gap-2" style="color:var(--ink-soft)">
                <span class="text-lg">{{ a.icon }}</span> {{ a.nome }}
              </label>
              <div class="flex items-center gap-2 shrink-0">
                <input type="number" min="0" max="1000" step="1" v-model.number="a.nota" class="w-20 rounded-xl px-2 py-1.5 text-sm font-semibold text-center" style="color:var(--ink)">
                <span class="text-xs" style="color:var(--ink-soft); opacity:.7">pts</span>
              </div>
            </div>
            <input type="range" min="0" max="1000" step="1" v-model.number="a.nota" class="mb-2" :style="{ '--fill': rangeFill(a.nota, 0, 1000) }">
            <div class="flex items-center gap-2 mt-2">
              <span class="text-xs font-medium shrink-0" style="color:var(--ink-soft); opacity:.7">Peso</span>
              <input type="range" min="0" max="5" step="0.5" v-model.number="a.peso" :style="{ '--fill': rangeFill(a.peso, 0, 5) }">
              <span class="text-xs font-bold w-10 text-right" style="color:var(--accent-deep)">{{ a.peso.toFixed(1) }}×</span>
            </div>
          </div>
        </div>

        <div class="flex flex-col items-center justify-center text-center border-t lg:border-t-0 lg:border-l border-white/50 pt-8 lg:pt-0 lg:pl-10">
          <p class="uppercase tracking-widest text-xs font-semibold mb-4" style="color:var(--ink-soft)">Sua média ponderada</p>
          <Orb :fill-percent="media / 10" :display="mediaRounded" unit-label="de 1000 pontos" />
          <p class="text-xs mt-6 leading-relaxed" style="color:var(--ink-soft); opacity:.8">
            Os pesos reais variam por instituição e curso. Consulte sempre o edital do SiSU, ProUni ou Fies do processo que você vai concorrer.
          </p>
        </div>
      </div>
    </div>
  </section>

  <WaveFooter message="Feito com 💙 para quem está na correria da reta final. Não substitui o boletim oficial do Enem." />
</template>

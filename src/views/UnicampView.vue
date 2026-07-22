<script setup>
import { ref, reactive, computed } from 'vue'
import Orb from '../components/Orb.vue'
import WaveFooter from '../components/WaveFooter.vue'

const fmt = (n) => n.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
const rangeFill = (val, min, max) => ((val - min) / (max - min)) * 100 + '%'

const nf1 = ref(60)
const nr = ref(65)
const nheEnabled = ref(false)

const provas = reactive([
  { id: 'nlpl', nome: 'Língua Portuguesa e Literaturas (NLPL)', nota: 60, peso: 1 },
  { id: 'nmat', nome: 'Matemática (NMAT)', nota: 60, peso: 1 },
  { id: 'nint', nome: 'Prova Interdisciplinar (NINT)', nota: 60, peso: 1 },
  { id: 'npce1', nome: 'Conhecimentos Específicos 1 (NPCE1)', nota: 60, peso: 1 },
  { id: 'npce2', nome: 'Conhecimentos Específicos 2 (NPCE2)', nota: 60, peso: 1 },
])
const nhe = reactive({ nota: 60, peso: 1 })

const nf2 = computed(() => {
  const items = nheEnabled.value ? [...provas, nhe] : provas
  const weightSum = items.reduce((s, p) => s + p.peso, 0)
  if (weightSum <= 0) return 0
  const weightedSum = items.reduce((s, p) => s + p.nota * p.peso, 0)
  return weightedSum / weightSum
})

const npo = computed(() => nf1.value * 0.15 + nr.value * 0.2 + nf2.value * 0.65)
const notaFinal = computed(() => Math.round(npo.value * 10))

const c1 = computed(() => nf1.value * 0.15)
const c2 = computed(() => nr.value * 0.2)
const c3 = computed(() => nf2.value * 0.65)
</script>

<template>
  <section class="relative px-4 sm:px-8 pt-10 sm:pt-16 pb-8 max-w-6xl mx-auto">
    <div class="text-center max-w-3xl mx-auto">
      <span class="inline-flex items-center gap-2 glass-strong rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold shadow-glass mb-5" style="color:var(--ink-soft)">
        <span class="h-2 w-2 rounded-full shadow" style="background:var(--accent-light)"></span>
        Vestibular Unicamp
      </span>
      <h1 class="display font-800 text-4xl sm:text-6xl leading-[1.05] drop-shadow-sm" style="color:var(--ink)">
        Sua nota padronizada <br class="hidden sm:block"> de opção, na prática.
      </h1>
      <p class="mt-5 text-base sm:text-lg leading-relaxed" style="color:var(--ink-soft)">
        A Unicamp combina 1ª fase, redação e as provas da 2ª fase com pesos distintos para formar a NPO,
        usada na classificação final por curso.
      </p>
    </div>

    <div class="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="glass rounded-3xl p-5 shadow-glass">
        <div class="flex items-center gap-3"><span class="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/60 text-xl">📝</span><p class="display font-700" style="color:var(--ink)">NF1</p></div>
        <p class="mt-2 text-sm" style="color:var(--ink-soft)">Nota padronizada da 1ª fase. Peso <strong>15%</strong>.</p>
      </div>
      <div class="glass rounded-3xl p-5 shadow-glass">
        <div class="flex items-center gap-3"><span class="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/60 text-xl">✍️</span><p class="display font-700" style="color:var(--ink)">NR</p></div>
        <p class="mt-2 text-sm" style="color:var(--ink-soft)">Nota padronizada da redação. Peso <strong>20%</strong>.</p>
      </div>
      <div class="glass rounded-3xl p-5 shadow-glass">
        <div class="flex items-center gap-3"><span class="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/60 text-xl">📚</span><p class="display font-700" style="color:var(--ink)">NF2</p></div>
        <p class="mt-2 text-sm" style="color:var(--ink-soft)">Média ponderada das provas da 2ª fase. Peso <strong>65%</strong>.</p>
      </div>
    </div>
  </section>

  <section class="px-4 sm:px-8 py-8 max-w-6xl mx-auto">
    <div class="glass-strong rounded-4xl sm:rounded-[2.5rem] p-5 sm:p-10 shadow-glass grid lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-10">

      <div>
        <h2 class="display font-700 text-2xl mb-6" style="color:var(--ink)">Suas notas</h2>

        <div class="mb-7">
          <div class="flex items-center justify-between mb-2">
            <label for="nf1" class="font-semibold" style="color:var(--ink-soft)">NF1 — nota da 1ª fase (0 a 100)</label>
            <span class="display font-700 text-lg" style="color:var(--accent-deep)">{{ nf1 }}</span>
          </div>
          <input id="nf1" type="range" min="0" max="100" v-model.number="nf1" :style="{ '--fill': rangeFill(nf1, 0, 100) }">
        </div>

        <div class="mb-7">
          <div class="flex items-center justify-between mb-2">
            <label for="nr" class="font-semibold" style="color:var(--ink-soft)">NR — nota da redação (0 a 100)</label>
            <span class="display font-700 text-lg" style="color:var(--accent-deep)">{{ nr }}</span>
          </div>
          <input id="nr" type="range" min="0" max="100" v-model.number="nr" :style="{ '--fill': rangeFill(nr, 0, 100) }">
        </div>

        <div class="mb-3">
          <p class="font-semibold mb-1" style="color:var(--ink-soft)">NF2 — provas da 2ª fase (peso por prova, conforme seu curso)</p>
          <p class="text-xs mb-3" style="color:var(--ink-soft); opacity:.8">Ajuste o peso de cada prova igual à tabela do curso desejado no manual da Unicamp. O padrão abaixo usa pesos iguais.</p>

          <div class="space-y-4">
            <div v-for="p in provas" :key="p.id" class="glass rounded-2xl p-4">
              <div class="flex items-center justify-between gap-3 mb-2">
                <label class="font-semibold text-sm" style="color:var(--ink-soft)">{{ p.nome }}</label>
                <input type="number" min="0" max="100" v-model.number="p.nota" class="w-20 rounded-xl px-2 py-1.5 text-sm font-semibold text-center" style="color:var(--ink)">
              </div>
              <input type="range" min="0" max="100" v-model.number="p.nota" class="mb-2" :style="{ '--fill': rangeFill(p.nota, 0, 100) }">
              <div class="flex items-center gap-2 mt-1">
                <span class="text-xs font-medium shrink-0" style="color:var(--ink-soft); opacity:.8">Peso</span>
                <input type="range" min="0" max="5" step="0.5" v-model.number="p.peso" :style="{ '--fill': rangeFill(p.peso, 0, 5) }">
                <span class="text-xs font-bold w-10 text-right" style="color:var(--accent-deep)">{{ p.peso.toFixed(1) }}×</span>
              </div>
            </div>

            <div v-if="nheEnabled" class="glass rounded-2xl p-4">
              <div class="flex items-center justify-between gap-3 mb-2">
                <label class="font-semibold text-sm" style="color:var(--ink-soft)">Habilidades Específicas (NHE)</label>
                <input type="number" min="0" max="100" v-model.number="nhe.nota" class="w-20 rounded-xl px-2 py-1.5 text-sm font-semibold text-center" style="color:var(--ink)">
              </div>
              <input type="range" min="0" max="100" v-model.number="nhe.nota" class="mb-2" :style="{ '--fill': rangeFill(nhe.nota, 0, 100) }">
              <div class="flex items-center gap-2 mt-1">
                <span class="text-xs font-medium shrink-0" style="color:var(--ink-soft); opacity:.8">Peso</span>
                <input type="range" min="0" max="5" step="0.5" v-model.number="nhe.peso" :style="{ '--fill': rangeFill(nhe.peso, 0, 5) }">
                <span class="text-xs font-bold w-10 text-right" style="color:var(--accent-deep)">{{ nhe.peso.toFixed(1) }}×</span>
              </div>
            </div>
          </div>
        </div>

        <button type="button" class="text-xs font-semibold underline underline-offset-2 mt-2" style="color:var(--accent-deep)" @click="nheEnabled = !nheEnabled">
          Meu curso tem prova de Habilidades Específicas (NHE)
        </button>
      </div>

      <div class="flex flex-col items-center justify-center text-center border-t lg:border-t-0 lg:border-l border-white/50 pt-8 lg:pt-0 lg:pl-10">
        <p class="uppercase tracking-widest text-xs font-semibold mb-4" style="color:var(--ink-soft)">Sua NPO estimada</p>
        <Orb :fill-percent="npo" :display="notaFinal" unit-label="de 1000 pontos" />

        <div class="w-full mt-8 space-y-3 text-left">
          <div>
            <div class="flex justify-between text-xs font-semibold mb-1" style="color:var(--ink-soft)"><span>NF1 (15%)</span><span>{{ fmt(c1) }}</span></div>
            <div class="bar-track h-2.5 rounded-full overflow-hidden"><div class="bar-fill h-full" :style="{ width: Math.min(100,(c1/15)*100) + '%', background: 'linear-gradient(90deg, var(--accent-light), var(--accent-deep))' }"></div></div>
          </div>
          <div>
            <div class="flex justify-between text-xs font-semibold mb-1" style="color:var(--ink-soft)"><span>NR (20%)</span><span>{{ fmt(c2) }}</span></div>
            <div class="bar-track h-2.5 rounded-full overflow-hidden"><div class="bar-fill h-full bg-linear-to-r from-amber-300 to-orange-400" :style="{ width: Math.min(100,(c2/20)*100) + '%' }"></div></div>
          </div>
          <div>
            <div class="flex justify-between text-xs font-semibold mb-1" style="color:var(--ink-soft)"><span>NF2 (65%)</span><span>{{ fmt(c3) }}</span></div>
            <div class="bar-track h-2.5 rounded-full overflow-hidden"><div class="bar-fill h-full" :style="{ width: Math.min(100,(c3/65)*100) + '%', background: 'linear-gradient(90deg, var(--accent), var(--accent-deep))' }"></div></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="px-4 sm:px-8 py-6 max-w-6xl mx-auto">
    <details class="glass rounded-3xl p-6 shadow-glass group">
      <summary class="cursor-pointer list-none flex items-center justify-between font-semibold" style="color:var(--ink-soft)">
        <span class="display font-700 text-lg" style="color:var(--ink)">Como essa conta é feita?</span>
        <span class="transition group-open:rotate-45 text-2xl" style="color:var(--accent-deep)">＋</span>
      </summary>
      <div class="mt-4 text-sm sm:text-base leading-relaxed space-y-3" style="color:var(--ink-soft)">
        <p>A Unicamp padroniza cada nota (média 500, desvio-padrão 100 entre todos os candidatos) e depois combina as três etapas:</p>
        <p class="font-mono text-xs sm:text-sm bg-white/50 rounded-xl px-4 py-3 inline-block">NPO = (0,15 × NF1) + (0,20 × NR) + (0,65 × NF2)</p>
        <p>NF2 é, por sua vez, a média ponderada das notas padronizadas de Língua Portuguesa e Literaturas (NLPL), Matemática (NMAT), Prova Interdisciplinar (NINT), Conhecimentos Específicos 1 e 2 (NPCE1, NPCE2) e, quando houver, Habilidades Específicas (NHE) — cada uma com peso definido pelo curso escolhido.</p>
        <p>Como a padronização oficial depende da média e do desvio-padrão de todos os candidatos (só calculável após a prova), esta calculadora aplica os pesos direto sobre notas de 0 a 100, como estimativa educacional.</p>
        <p class="text-xs opacity-70">Ferramenta educacional independente, sem vínculo com a Unicamp ou a Comvest. Fonte da fórmula: manual do candidato Unicamp.</p>
      </div>
    </details>
  </section>

  <WaveFooter message="Feito com 💜 para quem está na correria da reta final. Não substitui o boletim oficial da Unicamp." />
</template>

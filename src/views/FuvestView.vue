<script setup>
import { ref, computed } from 'vue'
import Orb from '../components/Orb.vue'
import WaveFooter from '../components/WaveFooter.vue'

const fmt = (n) => n.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
const rangeFill = (val, min, max) => ((val - min) / (max - min)) * 100 + '%'

const acertos = ref(45)
const portugues = ref(30)
const redacao = ref(30)
const d2obtidos = ref(36)
const d2total = ref(60)
const ceEnabled = ref(false)
const ce = ref(0)

const f1 = computed(() => (acertos.value / 90) * 100)
const d1 = computed(() => portugues.value + redacao.value)
const d2 = computed(() => Math.min(100, (d2obtidos.value / (d2total.value || 1)) * 100))

const nf = computed(() => {
  if (ceEnabled.value) {
    return (f1.value + d1.value + d2.value + 2 * ce.value) / 5
  }
  return (f1.value + d1.value + d2.value) / 3
})
const notaFinal = computed(() => Math.round(nf.value * 10))

const warnings = computed(() => {
  const w = []
  if (acertos.value < 27) w.push('Menos de 30% de acertos na 1ª fase (mínimo 27 de 90) elimina o candidato.')
  if (redacao.value === 0) w.push('Nota zero na redação elimina o candidato.')
  if (portugues.value === 0 || d2obtidos.value === 0) w.push('Nota zero em qualquer prova da 2ª fase elimina o candidato.')
  if (ceEnabled.value && ce.value < 50) w.push('Menos de 50% na prova de Competências Específicas elimina o candidato.')
  return w
})
</script>

<template>

  <section class="relative px-4 sm:px-8 pt-10 sm:pt-16 pb-8 max-w-6xl mx-auto">
    <div class="text-center max-w-3xl mx-auto">
      <span class="inline-flex items-center gap-2 glass-strong rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold shadow-glass mb-5" style="color:var(--ink-soft)">
        <span class="h-2 w-2 rounded-full shadow" style="background:var(--accent-light)"></span>
        Vestibular Fuvest · USP
      </span>
      <h1 class="display font-800 text-4xl sm:text-6xl leading-[1.05] drop-shadow-sm" style="color:var(--ink)">
        Simule sua nota final <br class="hidden sm:block"> antes do resultado sair.
      </h1>
      <p class="mt-5 text-base sm:text-lg leading-relaxed" style="color:var(--ink-soft)">
        A Fuvest calcula a nota final como a <strong>média simples</strong> das notas normalizadas de F1, D1 e D2 —
        ou, para cursos com prova de Competências Específicas, dando peso 2 para essa prova.
      </p>
    </div>

    <div class="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="glass rounded-3xl p-5 shadow-glass">
        <div class="flex items-center gap-3"><span class="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/60 text-xl">📝</span><p class="display font-700" style="color:var(--ink)">F1 · 1ª Fase</p></div>
        <p class="mt-2 text-sm" style="color:var(--ink-soft)">90 questões objetivas, todas as áreas, normalizada para 0–100.</p>
      </div>
      <div class="glass rounded-3xl p-5 shadow-glass">
        <div class="flex items-center gap-3"><span class="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/60 text-xl">✍️</span><p class="display font-700" style="color:var(--ink)">D1 · 1º dia da 2ª fase</p></div>
        <p class="mt-2 text-sm" style="color:var(--ink-soft)">Português (50 pts) + Redação (50 pts) = nota de 0 a 100.</p>
      </div>
      <div class="glass rounded-3xl p-5 shadow-glass">
        <div class="flex items-center gap-3"><span class="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/60 text-xl">📚</span><p class="display font-700" style="color:var(--ink)">D2 · 2º dia da 2ª fase</p></div>
        <p class="mt-2 text-sm" style="color:var(--ink-soft)">Disciplinas específicas do seu curso, normalizada para 0–100.</p>
      </div>
    </div>
  </section>

  <section class="px-4 sm:px-8 py-8 max-w-6xl mx-auto">
    <div class="glass-strong rounded-4xl sm:rounded-[2.5rem] p-5 sm:p-10 shadow-glass grid lg:grid-cols-[1.15fr_0.85fr] gap-8 lg:gap-10">

      <div>
        <h2 class="display font-700 text-2xl mb-6" style="color:var(--ink)">Suas notas</h2>

        <div class="mb-7">
          <div class="flex items-center justify-between mb-2">
            <label for="acertos" class="font-semibold" style="color:var(--ink-soft)">F1 — acertos na 1ª fase (de 90 questões)</label>
            <span class="display font-700 text-lg" style="color:var(--accent)">{{ acertos }}</span>
          </div>
          <input id="acertos" type="range" min="0" max="90" v-model.number="acertos" :style="{ '--fill': rangeFill(acertos, 0, 90) }">
          <p class="text-xs mt-1" style="color:var(--ink-soft)">F1 equivalente: <span class="font-semibold">{{ fmt(f1) }}</span> / 100</p>
        </div>

        <div class="mb-7">
          <p class="font-semibold mb-2" style="color:var(--ink-soft)">D1 — 1º dia da 2ª fase</p>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <div class="flex items-center justify-between mb-1">
                <label for="portugues" class="text-sm" style="color:var(--ink-soft)">Português (0–50)</label>
                <span class="display font-700 text-sm" style="color:var(--accent)">{{ portugues }}</span>
              </div>
              <input id="portugues" type="range" min="0" max="50" v-model.number="portugues" :style="{ '--fill': rangeFill(portugues, 0, 50) }">
            </div>
            <div>
              <div class="flex items-center justify-between mb-1">
                <label for="redacao" class="text-sm" style="color:var(--ink-soft)">Redação (0–50)</label>
                <span class="display font-700 text-sm" style="color:var(--accent)">{{ redacao }}</span>
              </div>
              <input id="redacao" type="range" min="0" max="50" v-model.number="redacao" :style="{ '--fill': rangeFill(redacao, 0, 50) }">
            </div>
          </div>
          <p class="text-xs mt-2" style="color:var(--ink-soft)">D1 = <span class="font-semibold">{{ fmt(d1) }}</span> / 100</p>
        </div>

        <div class="mb-4">
          <p class="font-semibold mb-2" style="color:var(--ink-soft)">D2 — 2º dia da 2ª fase (disciplinas específicas)</p>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label for="d2obtidos" class="text-sm" style="color:var(--ink-soft)">Pontos obtidos</label>
              <input id="d2obtidos" type="number" min="0" v-model.number="d2obtidos" class="w-full rounded-xl px-3 py-2 text-sm font-semibold text-center mt-1" style="color:var(--ink)">
            </div>
            <div>
              <label for="d2total" class="text-sm" style="color:var(--ink-soft)">Pontos totais possíveis</label>
              <input id="d2total" type="number" min="1" v-model.number="d2total" class="w-full rounded-xl px-3 py-2 text-sm font-semibold text-center mt-1" style="color:var(--ink)">
            </div>
          </div>
          <p class="text-xs mt-2" style="color:var(--ink-soft)">D2 = <span class="font-semibold">{{ fmt(d2) }}</span> / 100 (regra de três sobre o total do seu curso)</p>
        </div>

        <button type="button" class="text-xs font-semibold underline underline-offset-2 mt-1" style="color:var(--accent)" @click="ceEnabled = !ceEnabled">
          Meu curso tem prova de Competências Específicas (CE)
        </button>
        <div v-if="ceEnabled" class="mt-3 glass rounded-2xl p-4">
          <div class="flex items-center justify-between mb-2">
            <label for="ce" class="font-semibold text-sm" style="color:var(--ink-soft)">Nota da prova de Competências Específicas (0 a 100)</label>
            <span class="display font-700 text-lg" style="color:var(--accent)">{{ ce }}</span>
          </div>
          <input id="ce" type="range" min="0" max="100" v-model.number="ce" :style="{ '--fill': rangeFill(ce, 0, 100) }">
          <p class="text-xs mt-2" style="color:var(--ink-soft)">A CE entra com peso 2 na fórmula: NF = [F1 + D1 + D2 + (2 × CE)] / 5.</p>
        </div>

        <div v-if="warnings.length" class="mt-5 rounded-2xl px-4 py-3 text-sm font-semibold status-warn">
          <div v-for="(w, i) in warnings" :key="i">⚠️ {{ w }}</div>
        </div>
      </div>

      <div class="flex flex-col items-center justify-center text-center border-t lg:border-t-0 lg:border-l border-white/50 pt-8 lg:pt-0 lg:pl-10">
        <p class="uppercase tracking-widest text-xs font-semibold mb-4" style="color:var(--ink-soft)">Sua nota final estimada</p>
        <Orb :fill-percent="nf" :display="notaFinal" unit-label="de 1000 pontos" />

        <div class="w-full mt-8 space-y-3 text-left">
          <div>
            <div class="flex justify-between text-xs font-semibold mb-1" style="color:var(--ink-soft)"><span>F1</span><span>{{ fmt(f1) }}</span></div>
            <div class="bar-track h-2.5 rounded-full overflow-hidden"><div class="bar-fill h-full" :style="{ width: f1 + '%', background: 'linear-gradient(90deg, var(--accent-light), var(--accent-deep))' }"></div></div>
          </div>
          <div>
            <div class="flex justify-between text-xs font-semibold mb-1" style="color:var(--ink-soft)"><span>D1</span><span>{{ fmt(d1) }}</span></div>
            <div class="bar-track h-2.5 rounded-full overflow-hidden"><div class="bar-fill h-full bg-linear-to-r from-amber-300 to-orange-400" :style="{ width: d1 + '%' }"></div></div>
          </div>
          <div>
            <div class="flex justify-between text-xs font-semibold mb-1" style="color:var(--ink-soft)"><span>D2</span><span>{{ fmt(d2) }}</span></div>
            <div class="bar-track h-2.5 rounded-full overflow-hidden"><div class="bar-fill h-full" :style="{ width: d2 + '%', background: 'linear-gradient(90deg, var(--accent), var(--accent-deep))' }"></div></div>
          </div>
          <div v-if="ceEnabled">
            <div class="flex justify-between text-xs font-semibold mb-1" style="color:var(--ink-soft)"><span>CE (peso 2)</span><span>{{ fmt(ce) }}</span></div>
            <div class="bar-track h-2.5 rounded-full overflow-hidden"><div class="bar-fill h-full bg-linear-to-r from-purple-300 to-purple-600" :style="{ width: ce + '%' }"></div></div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="px-4 sm:px-8 py-6 max-w-6xl mx-auto">
    <details class="glass rounded-3xl p-6 shadow-glass group">
      <summary class="cursor-pointer list-none flex items-center justify-between font-semibold" style="color:var(--ink-soft)">
        <span class="display font-700 text-lg" style="color:var(--ink)">Como essa conta é feita?</span>
        <span class="transition group-open:rotate-45 text-2xl" style="color:var(--accent)">＋</span>
      </summary>
      <div class="mt-4 text-sm sm:text-base leading-relaxed space-y-3" style="color:var(--ink-soft)">
        <p>A Fuvest normaliza cada etapa para uma escala de 0 a 100 e calcula a Nota Final (NF) assim:</p>
        <p class="font-mono text-xs sm:text-sm bg-white/50 rounded-xl px-4 py-3 inline-block">Sem Competências Específicas: NF = (F1 + D1 + D2) / 3</p><br>
        <p class="font-mono text-xs sm:text-sm bg-white/50 rounded-xl px-4 py-3 inline-block">Com Competências Específicas: NF = [F1 + D1 + D2 + (2 × CE)] / 5</p>
        <p>O resultado é multiplicado por 10 para chegar à escala de 0 a 1000 usada no boletim.</p>
        <p><strong>Critérios de eliminação:</strong> menos de 30% de acertos na 1ª fase, nota zero na redação ou em qualquer prova da 2ª fase, ou menos de 50% na prova de Competências Específicas (quando houver).</p>
        <p class="text-xs opacity-70">Ferramenta educacional independente, sem vínculo com a Fuvest, a Fundação Cesgranrio ou a USP. Fonte da fórmula: manual do candidato Fuvest.</p>
      </div>
    </details>
  </section>

  <WaveFooter message="Feito com 💙 para quem está na correria da reta final. Não substitui o boletim oficial da Fuvest." />
</template>

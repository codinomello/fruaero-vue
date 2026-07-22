<script setup>
import { reactive, ref, computed } from 'vue'
import Orb from '../components/Orb.vue'
import WaveFooter from '../components/WaveFooter.vue'

const fmt = (n) => n.toLocaleString('pt-BR', { minimumFractionDigits: 1, maximumFractionDigits: 1 })
const rangeFill = (val, min, max) => ((val - min) / (max - min)) * 100 + '%'

const tpsAcertos = ref(150)
const tpsErros = ref(40)
const tpsScore = computed(() => tpsAcertos.value * 1 - tpsErros.value * 0.25)

const disciplinas = reactive([
  { id: 'port', nome: 'Língua Portuguesa', nota: 70 },
  { id: 'ing', nome: 'Língua Inglesa', nota: 70 },
  { id: 'hist', nome: 'História do Brasil', nota: 70 },
  { id: 'pol', nome: 'Política Internacional', nota: 70 },
  { id: 'geo', nome: 'Geografia', nota: 70 },
  { id: 'eco', nome: 'Economia', nota: 70 },
  { id: 'dir', nome: 'Direito', nota: 70 },
])

const idiomaEnabled = ref(false)
const idioma = ref(0)

const somaDisciplinas = computed(() => disciplinas.reduce((s, d) => s + d.nota, 0))
const maxScale = computed(() => (idiomaEnabled.value ? 800 : 700))
const total = computed(() => somaDisciplinas.value + (idiomaEnabled.value ? idioma.value : 0))
const aprovado = computed(() => somaDisciplinas.value >= 480)
</script>

<template>
  <section class="relative px-4 sm:px-8 pt-10 sm:pt-16 pb-8 max-w-6xl mx-auto">
    <div class="text-center max-w-3xl mx-auto">
      <span class="inline-flex items-center gap-2 glass-strong rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold shadow-glass mb-5" style="color:var(--ink-soft)">
        <span class="h-2 w-2 rounded-full shadow" style="background:var(--accent)"></span>
        CACD · Instituto Rio Branco · Cebraspe
      </span>
      <h1 class="serif italic font-700 text-4xl sm:text-6xl leading-[1.05] drop-shadow-sm" style="color:var(--ink)">
        Rumo ao Itamaraty:<br class="hidden sm:block"> simule sua nota final.
      </h1>
      <p class="mt-5 text-base sm:text-lg leading-relaxed" style="color:var(--ink-soft)">
        O TPS (1ª fase) é só eliminatório. A nota final soma as 7 provas discursivas da 2ª fase —
        e o idioma adicional entra como bônus classificatório.
      </p>
    </div>

    <div class="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div class="glass rounded-3xl p-5 shadow-glass">
        <div class="flex items-center gap-3"><span class="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/60 text-xl">✅</span><p class="display font-700" style="color:var(--ink)">TPS</p></div>
        <p class="mt-2 text-sm" style="color:var(--ink-soft)">240 itens Certo/Errado. Acerto +1, erro −0,25. Só eliminatório.</p>
      </div>
      <div class="glass rounded-3xl p-5 shadow-glass">
        <div class="flex items-center gap-3"><span class="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/60 text-xl">✒️</span><p class="display font-700" style="color:var(--ink)">2ª Fase</p></div>
        <p class="mt-2 text-sm" style="color:var(--ink-soft)">7 provas discursivas, até 100 pts cada. Mínimo 480 pts para aprovação.</p>
      </div>
      <div class="glass rounded-3xl p-5 shadow-glass">
        <div class="flex items-center gap-3"><span class="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/60 text-xl">🇫🇷</span><p class="display font-700" style="color:var(--ink)">Idioma adicional</p></div>
        <p class="mt-2 text-sm" style="color:var(--ink-soft)">Francês ou Espanhol: classificatório, soma pontos extras.</p>
      </div>
    </div>
  </section>

  <section class="px-4 sm:px-8 py-4 max-w-6xl mx-auto">
    <div class="glass-strong rounded-4xl p-6 sm:p-8 shadow-glass">
      <h2 class="display font-700 text-xl mb-1" style="color:var(--ink)">1ª Fase — TPS (eliminatório)</h2>
      <p class="text-xs mb-5" style="color:var(--ink-soft); opacity:.85">240 itens Certo/Errado. Não entra na nota final — serve só para classificar quem avança à 2ª fase (o corte varia a cada edição, conforme número de vagas e concorrência).</p>
      <div class="grid sm:grid-cols-3 gap-4 items-end">
        <div>
          <label for="tpsAcertos" class="text-sm font-semibold" style="color:var(--ink-soft)">Acertos</label>
          <input id="tpsAcertos" type="number" min="0" max="240" v-model.number="tpsAcertos" class="w-full rounded-xl px-3 py-2 text-sm font-semibold text-center mt-1" style="color:var(--ink)">
        </div>
        <div>
          <label for="tpsErros" class="text-sm font-semibold" style="color:var(--ink-soft)">Erros</label>
          <input id="tpsErros" type="number" min="0" max="240" v-model.number="tpsErros" class="w-full rounded-xl px-3 py-2 text-sm font-semibold text-center mt-1" style="color:var(--ink)">
        </div>
        <div class="glass rounded-2xl px-4 py-3 text-center">
          <p class="text-xs font-semibold" style="color:var(--ink-soft); opacity:.7">Pontuação no TPS</p>
          <p class="display font-800 text-2xl" style="color:var(--accent-deep)">{{ fmt(tpsScore) }}</p>
        </div>
      </div>
    </div>
  </section>

  <section class="px-4 sm:px-8 py-8 max-w-6xl mx-auto">
    <div class="glass-strong rounded-4xl p-5 sm:p-10 shadow-glass grid lg:grid-cols-[1.2fr_0.8fr] gap-8 lg:gap-10">

      <div>
        <h2 class="display font-700 text-2xl mb-2" style="color:var(--ink)">2ª Fase — provas discursivas</h2>
        <p class="text-xs mb-5" style="color:var(--ink-soft); opacity:.8">Cada disciplina vale até 100 pontos.</p>

        <div class="space-y-4">
          <div v-for="d in disciplinas" :key="d.id">
            <div class="flex items-center justify-between mb-1">
              <label class="text-sm font-semibold" style="color:var(--ink-soft)">{{ d.nome }}</label>
              <span class="display font-700 text-sm" style="color:var(--accent-deep)">{{ d.nota }}</span>
            </div>
            <input type="range" min="0" max="100" v-model.number="d.nota" :style="{ '--fill': rangeFill(d.nota, 0, 100) }">
          </div>
        </div>

        <button type="button" class="text-xs font-semibold underline underline-offset-2 mt-3" style="color:var(--accent-deep)" @click="idiomaEnabled = !idiomaEnabled">
          Incluir idioma adicional (Francês ou Espanhol)
        </button>
        <div v-if="idiomaEnabled" class="mt-3 glass rounded-2xl p-4">
          <div class="flex items-center justify-between mb-2">
            <label for="idioma" class="font-semibold text-sm" style="color:var(--ink-soft)">Nota do idioma adicional (0 a 100)</label>
            <span class="display font-700 text-lg" style="color:var(--accent-deep)">{{ idioma }}</span>
          </div>
          <input id="idioma" type="range" min="0" max="100" v-model.number="idioma" :style="{ '--fill': rangeFill(idioma, 0, 100) }">
          <p class="text-xs mt-2" style="color:var(--ink-soft); opacity:.8">Classificatório: soma direto na nota final, sem entrar no corte de 480.</p>
        </div>

        <div class="mt-5 rounded-2xl px-4 py-3 text-sm font-semibold" :class="aprovado ? 'status-ok' : 'status-warn'">
          <template v-if="aprovado">
            Aprovado(a) na 2ª fase — soma das 7 disciplinas: {{ fmt(somaDisciplinas) }} pts (mínimo 480).
          </template>
          <template v-else>
            Nota da 2ª fase ({{ fmt(somaDisciplinas) }} pts) abaixo de 480 — eliminado(a).
          </template>
        </div>
      </div>

      <div class="flex flex-col items-center justify-center text-center border-t lg:border-t-0 lg:border-l border-white/50 pt-8 lg:pt-0 lg:pl-10">
        <p class="uppercase tracking-widest text-xs font-semibold mb-4" style="color:var(--ink-soft)">Sua nota final estimada</p>
        <Orb :fill-percent="(total / maxScale) * 100" :display="fmt(total)" :unit-label="'de ' + maxScale + ' pontos'" />
        <p class="text-xs mt-6 leading-relaxed" style="color:var(--ink-soft); opacity:.8">
          Corte de 480 pts refere-se apenas à soma das 7 disciplinas (sem o idioma adicional).
        </p>
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
        <p>O CACD (Cebraspe) tem duas fases. O <strong>TPS</strong> (1ª fase) é só eliminatório e classificatório para a 2ª fase — sua pontuação não soma na nota final. Pontuação do TPS:</p>
        <p class="font-mono text-xs sm:text-sm bg-white/50 rounded-xl px-4 py-3 inline-block">TPS = acertos × 1 − erros × 0,25</p>
        <p>A <strong>nota final</strong> do concurso é a soma das notas obtidas nas 7 provas discursivas da 2ª fase (Língua Portuguesa, Língua Inglesa, História do Brasil, Política Internacional, Geografia, Economia e Direito), cada uma valendo até 100 pontos:</p>
        <p class="font-mono text-xs sm:text-sm bg-white/50 rounded-xl px-4 py-3 inline-block">Nota da 2ª fase = Σ (7 disciplinas), mínimo 480 pts para aprovação</p>
        <p>O idioma adicional (Francês ou Espanhol) é avaliado de forma classificatória: soma pontos na nota final, mas não entra no corte de 480.</p>
        <p class="text-xs opacity-70">Ferramenta educacional independente, sem vínculo com o Itamaraty, o Instituto Rio Branco ou o Cebraspe. Fonte: Edital CACD.</p>
      </div>
    </details>
  </section>

  <WaveFooter message="Feito com 💛 para quem sonha com o Itamaraty. Não substitui o boletim oficial do Cebraspe." />
</template>

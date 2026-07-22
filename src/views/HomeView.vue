<script setup>
import NavBar from '../components/NavBar.vue'
import WaveFooter from '../components/WaveFooter.vue'

const cards = [
  {
    to: '/fuvest',
    icon: '💧',
    title: 'Fuvest',
    desc: 'Vestibular da USP. Nota final = média de F1, D1 e D2 — ou com peso 2 para Competências Específicas, quando houver.',
    bg: 'linear-gradient(160deg, rgba(217,244,255,0.75), rgba(127,212,242,0.35))',
    iconBg: 'linear-gradient(160deg, #eaf9ff, #7fd4f2)',
  },
  {
    to: '/unicamp',
    icon: '🔮',
    title: 'Unicamp',
    desc: 'NPO = 0,15 × NF1 + 0,20 × Redação + 0,65 × NF2, com pesos ajustáveis por prova conforme seu curso.',
    bg: 'linear-gradient(160deg, rgba(236,230,255,0.75), rgba(168,148,236,0.35))',
    iconBg: 'linear-gradient(160deg, #f5f1ff, #a99af0)',
  },
  {
    to: '/enem',
    icon: '🍃',
    title: 'Enem',
    desc: 'Média ponderada das 5 áreas, com pesos que você mesmo ajusta — como fazem várias instituições no SiSU.',
    bg: 'linear-gradient(160deg, rgba(226,251,232,0.75), rgba(134,217,200,0.35))',
    iconBg: 'linear-gradient(160deg, #eefff2, #7fd48a)',
  },
  {
    to: '/cacd',
    icon: '🌎',
    title: 'CACD',
    desc: 'Concurso de Admissão à Carreira de Diplomata. TPS eliminatório + soma das 7 provas discursivas da 2ª fase.',
    bg: 'linear-gradient(160deg, rgba(253,243,218,0.8), rgba(217,168,78,0.35))',
    iconBg: 'linear-gradient(160deg, #fff8e8, #f0d38a)',
  },
]
</script>

<template>
  <section class="relative px-4 sm:px-8 pt-12 sm:pt-20 pb-10 max-w-6xl mx-auto text-center">
    <h1 class="display font-800 text-4xl sm:text-6xl leading-[1.05] drop-shadow-sm max-w-3xl mx-auto" style="color:var(--ink)">
      Sua nota final, calculada com a fórmula certa.
    </h1>
    <p class="mt-5 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto" style="color:var(--ink-soft)">
      Escolha o processo seletivo e simule sua nota antes do resultado oficial sair —
      cada calculadora usa a fórmula real divulgada no edital ou manual do candidato de 2026.
    </p>
  </section>

  <section class="px-4 sm:px-8 pb-16 max-w-6xl mx-auto">
    <div class="grid sm:grid-cols-2 gap-6">
      <RouterLink
        v-for="c in cards"
        :key="c.to"
        :to="c.to"
        class="card glass p-7 sm:p-8 flex flex-col"
        :style="{ background: c.bg }"
      >
        <div class="card-icon mb-5" :style="{ background: c.iconBg }">{{ c.icon }}</div>
        <h2 class="display font-700 text-2xl mb-2" style="color:var(--ink)">{{ c.title }}</h2>
        <p class="text-sm leading-relaxed flex-1" style="color:var(--ink-soft)">{{ c.desc }}</p>
        <span class="mt-5 inline-flex items-center gap-2 text-sm font-semibold" style="color:var(--ink-soft)">
          Calcular minha nota <span aria-hidden="true">→</span>
        </span>
      </RouterLink>
    </div>
  </section>

  <WaveFooter
    message="Feito com 💙 para quem está na correria da reta final. Ferramentas educacionais independentes — sempre confira o resultado oficial de cada processo seletivo."
    :show-link="false"
  />
</template>

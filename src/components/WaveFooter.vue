<script setup>
defineProps({
  message: { type: String, required: true },
  showLink: { type: Boolean, default: true },
})
</script>

<template>
  <footer class="relative mt-10">
    <svg class="wave-divider" viewBox="0 0 1440 120" preserveAspectRatio="none">
      <path fill="var(--accent-deep)" fill-opacity="0.5" d="M0,64 C240,110 480,10 720,40 C960,70 1200,120 1440,60 L1440,120 L0,120 Z"></path>
      <path fill="var(--accent-deep)" d="M0,90 C240,50 480,120 720,90 C960,60 1200,20 1440,80 L1440,120 L0,120 Z"></path>
    </svg>
    <div class="pb-8 pt-2 text-center" :style="{ background: 'var(--accent-deep)' }">
      <p class="text-white/90 text-sm px-4">{{ message }}</p>
      <RouterLink
        v-if="showLink"
        to="/"
        class="inline-block mt-3 text-white font-semibold underline underline-offset-4 text-sm"
      >
        Ver todas as calculadoras →
      </RouterLink>
    </div>
  </footer>
</template>

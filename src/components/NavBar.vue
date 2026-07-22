<script setup>
defineProps({
  icon: { type: String, default: '🫧' },
})
</script>

<template>
  <header class="sticky top-0 z-40 px-4 sm:px-8 pt-4">
    <div class="max-w-6xl mx-auto glass-strong rounded-full px-3 sm:px-5 py-2.5 flex items-center justify-between shadow-glass gap-2 overflow-x-auto">
      <RouterLink to="/" class="flex items-center gap-2 shrink-0">
        <span class="flex h-8 w-8 items-center justify-center rounded-full btn-gloss text-white text-sm">
          {{ icon }}
        </span>
        <span class="display font-800 text-base sm:text-lg tracking-tight hidden sm:inline" style="color:var(--ink)">
          Fruaero
        </span>
      </RouterLink>
      <nav class="flex items-center gap-1 shrink-0">
        <RouterLink to="/" class="nav-pill">Início</RouterLink>
        <RouterLink to="/fuvest" class="nav-pill">Fuvest</RouterLink>
        <RouterLink to="/unicamp" class="nav-pill">Unicamp</RouterLink>
        <RouterLink to="/enem" class="nav-pill">Enem</RouterLink>
        <RouterLink to="/cacd" class="nav-pill">CACD</RouterLink>
      </nav>
    </div>
  </header>
</template>

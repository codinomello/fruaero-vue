<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import BubbleField from './components/BubbleField.vue'
import NavBar from './components/NavBar.vue'

const route = useRoute()

const theme = computed(() => route.meta.theme || 'home')
const icon = computed(() => route.meta.icon || '🫧')
</script>

<template>
  <div class="app-bg" :data-theme="theme">
    <BubbleField />
    <NavBar :icon="icon" />
      <RouterView v-slot="{ Component }">
      <component :is="Component" />
    </RouterView>
  </div>
</template>
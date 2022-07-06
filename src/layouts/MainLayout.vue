<template>
  <q-layout view="hHh lpR fFf">
    <app-header @toggle-left-drawer="toggleLeftDrawer"></app-header>
    <app-drawer v-model="leftDrawerOpen"></app-drawer>
    <q-page-container over>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import AppDrawer from "components/AppDrawer.vue";
import AppHeader from "components/AppHeader.vue";

const leftDrawerOpen = ref(true);
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

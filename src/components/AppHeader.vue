<template>
  <q-header bordered class="bg-blue-grey-10 text-white">
    <q-toolbar class="text-yellow-13">
      <q-btn dense flat round icon="menu" @click="$emit('toggleLeftDrawer')" />
      <q-avatar size="64px">
        <img src="../assets/star-wars-logo.svg" />
      </q-avatar>
      <q-toolbar-title> Swapi Search People </q-toolbar-title>
    </q-toolbar>
  </q-header>
</template>

<script setup>
defineEmits(["toggleLeftDrawer"]);
</script>

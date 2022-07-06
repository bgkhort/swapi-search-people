<template>
  <q-card
    class="my-card bg-blue-grey-10 text-white col-sx-6 col-sm-5 col-md-3 col-lg-2"
  >
    <q-card-section>
      <div class="text-h6">{{ name }}</div>
      <div class="text-subtitle2">{{ gender }}</div>
    </q-card-section>

    <q-card-section class="q-pa-md">
      <div class="column q-gutter-sm wrap">
        <div>Birth Year: {{ birthYear }}</div>
        <div>Height: {{ height }}</div>
        <div>Mass: {{ mass }}</div>
        <div>Hair Color: {{ hairColor }}</div>
        <div>Skin Color: {{ skinColor }}</div>
        <div>Eye Color: {{ eyeColor }}</div>
      </div>
    </q-card-section>

    <q-separator dark />
  </q-card>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: true,
  },
  height: {
    type: String,
    required: true,
  },
  mass: {
    type: String,
    required: true,
  },
  hairColor: {
    type: String,
    required: true,
  },
  skinColor: {
    type: String,
    required: true,
  },
  eyeColor: {
    type: String,
    required: true,
  },
  birthYear: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
});
</script>

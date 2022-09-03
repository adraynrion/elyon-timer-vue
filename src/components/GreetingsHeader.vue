<script setup>
defineProps({
  msg: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      Non-official timer for <span class="green">Elyon events</span> in
      <span class="green">Europe</span>!
    </h3>
  </div>
</template>

<style lang="scss" scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings {
  h1,
  h3 {
    text-align: left;
  }
}
@media (max-width: 1023px) {
  .greetings {
    h1,
    h3 {
      text-align: center;
    }
  }
}
</style>

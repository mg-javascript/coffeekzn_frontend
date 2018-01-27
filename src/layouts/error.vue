<template>
  <section class="erorr_section">
    <div class="main">
      <div class="section section-search section-white text-center">
        <img src="/coffee.png" alt="Coffeekzn" />
        <h1 class="title text-center">
          {{ error.statusCode }}
        </h1>
        <nuxt-link class="button" to="/" v-if="error.statusCode === 404">
          На главную
        </nuxt-link>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  props: ['error']
}
</script>

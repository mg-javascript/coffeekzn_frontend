<template>
  <div class="mainapp">
    <navbar/>
    <div class="main">
      <nuxt/>
    </div>
    <my-footer/>
  </div>
</template>

<script>
import Navbar from '../components/Navbar.vue'
import MyFooter from '../components/Footer.vue'

export default {
  components: {
    Navbar,
    MyFooter
  }
}
</script>

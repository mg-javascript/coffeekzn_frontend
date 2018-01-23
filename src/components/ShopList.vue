<template>
  <div class="side">
    <nuxt/>
  </div>
</template>

<script>
import MyFooter from '../components/Footer.vue'

export default {
  components: {
    MyFooter
  }
}
</script>

<style>
.container
{
  margin: 0 auto;
  width: 100%;
  max-width: 1200px;
  padding: 40px 0;
}

.page-title {
  margin: 0 25px;
}

.page-title a {
  color: #7b481e;
  text-decoration: none;
}

.page-title i {
  vertical-align: bottom;
}

</style>

import Vue from 'vue'

Vue.mixin({
  methods: {
    formatBoolean: boolean => boolean ? 'Да' : 'Нет'
  }
})

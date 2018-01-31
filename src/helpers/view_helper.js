import Vue from 'vue'

Vue.mixin({
  methods: {
    formatBoolean: boolean => boolean ? 'Да' : 'Нет',
    formatOption: option => option || 'Нет данных'
  }
})

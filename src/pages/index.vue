<template>
  <div class="section section-white section-search">
    <div class="col-md-8 col-12 ml-auto mr-auto text-center shop_col">
      <div class="row">
        <div class="text-center col-md-12 col-12 ml-auto mr-auto text-center">
          <div role="search" class="form-inline search-form">
            <div class="input-group no-border">
              <span class="input-group-addon addon-xtreme no-border" id="basic-addon1"><i class="fa fa-search"></i></span>
              <input type="text" v-model='search' class="form-control input-xtreme no-border" placeholder="Поиск" aria-describedby="basic-addon1">
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-12 event-col" v-for="place, index in filteredList">
        <div class="card" data-background="image" style="background-image: url('/bg.jpg')">
          <div class="card-body">
            <h6 class="кофейня">
            <i class="fa fa-newspaper-o"></i> кофейня</h6>
            <div class="card-title">
              <router-link :to="{ name: 'coffeeshop-id', params: { id: place.slug }}">
              {{ place.title }}
              </router-link>
            </div>
            <div class="card-description">
              <div class="col-md-12 upcase">
								{{ place.address }}
              </div>
						</div>
            <div class="card-description">
              <div class="col-md-12 upcase">
								{{ place.working_hours }}
              </div>
						</div>
            <div class="card-footer">
              <div class="col-md-12">
                <span v-for="tag, index in place.tags" class="label label-custom label_margin">#{{ tag }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import apollo from '~/lib/apollo'
import { mapDefaults } from '~/lib/const'
import gql from 'graphql-tag'
import MyFooter from '../components/Footer.vue'

export default {
  components: {
    MyFooter
  },
  async asyncData () {
    const { data } = await apollo.query({
      query: gql`{
        shops {
          id, title, description, address, tags, slug, location { lat, lng }, working_hours
        }
      }`
    })

    return {
      ...mapDefaults,
      search: '',
      shouldRender: false,
      places: data.shops
    }
  },
  computed: {
    filteredList () {
      return this.places.filter(shop => {
        return shop.title.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  mounted () {
    this.shouldRender = true
  }
}
</script>

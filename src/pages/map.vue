<template>
  <div class="map_div section">
    <div class="row">
        <div class="col-md-6 ml-auto mr-auto text-center title custom_title">
            <h2>Карта кофеен</h2>
            <h3 class="title-uppercase"><small>Расположение, контакты, часы работы</small></h3>
        </div>
    </div>
    <div class="map-container">
      <gmap-map
      :center='center'
      :zoom='12'
      :options='{ styles: styles }'
      style='width: 100%; height: 100%'
      @center_changed="updateCenter"
      v-if='shouldRender'
      >
      <gmap-info-window
        v-if='infoWindowRegistration'
        :options='infoOptions'
        :position='infoWindowPos'
        :opened='infoWinOpen'
        :place='infoWindowPlace'
        @closeclick='infoWinOpen=false'>
          <div class="coffee_info">
          <h2 class="coffee_title">
            <router-link :to="{ name: 'coffeeshop-id', params: { id: infoWindowRegistration.id }}">
              {{ infoWindowPlace.title }}
            </router-link>
          </h2>
          <h4 class="price upcase"><strong>{{ infoWindowRegistration.phone }}</strong></h4>
          <hr/>
          <p>{{ infoWindowRegistration.address }}</p>
          <br/>
          <span v-for="tag, index in infoWindowPlace.tags" class="label label-custom label_margin">#{{ tag }}</span>
          </div>
      </gmap-info-window>

      <div v-for='place in places' v-bind:data="place" v-bind:key="place.title">
        <gmap-marker
          v-for='(registration, index) in place.registrations' v-bind:data="registration" v-bind:key="registration.id"
          :position='registration.location'
          :draggable='false'
          :clickable='true'
          icon='/map.png'
          @click='toggleInfoWindow(registration, index, place)'
        ></gmap-marker>
      </div>
    </gmap-map>
    </div>
    </div>
</template>
<script>
import apollo from '~/lib/apollo'
import { mapDefaults } from '~/lib/const'
import { customMapColors } from '~/lib/colors'
import gql from 'graphql-tag'
import google from 'vue2-google-maps'
import MyFooter from '../components/Footer.vue'

export default {
  components: {
    MyFooter
  },
  async asyncData () {
    const { data } = await apollo.query({
      query: gql`{
        shops {
          id, title, description, slug, tags, registrations { phone, address,  location { lat, lng } }, working_hours
        }
      }`
    })

    return {
      ...mapDefaults,
      shouldRender: false,
      center: { lat: 55.8304307, lng: 49.0660806 },
      places: data.shops,
      styles: customMapColors
    }
  },
  watch: {
    places (places) {
      if (places.length > 2) {
        const bounds = new google.maps.LatLngBounds()
        for (let m of places) {
          bounds.extend(m.latLng)
        }
        this.$refs.map.$mapObject.fitBounds(bounds)
        this.$refs.map.$mapObject.setCenter(bounds.getCenter())
        this.$refs.map.$mapObject.event.addDomListener(window, 'resize', function () {
          this.$refs.map.$mapObject.setCenter(bounds.getCenter())
        })
      }
    }
  },
  methods: {
    updateCenter: function (center) {
      this.center = {
        lat: center.lat(),
        lng: center.lng()
      }
    },
    toggleInfoWindow: function (registration, idx, place) {
      this.infoWindowPos = registration.location
      this.infoWindowRegistration = registration
      this.infoWindowPlace = place
      // check if its the same registration that was selected if yes toggle
      if (this.currentMidx === idx) {
        this.infoWinOpen = !this.infoWinOpen
      } else {
        // if different registration set infowindow to open and reset current registration index
        this.infoWinOpen = true
        this.currentMidx = idx
      }
    }
  },

  mounted () {
    this.shouldRender = true
  }
}
</script>

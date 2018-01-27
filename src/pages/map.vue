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
        v-if='infoWindowLocation'
        :options='infoOptions'
        :position='infoWindowPos'
        :opened='infoWinOpen'
        @closeclick='infoWinOpen=false'
      >
      <div class="coffee_info">
        <h2 class="coffee_title">
          <router-link :to="{ name: 'location-id', params: { id: infoWindowLocation.id }}">
            {{ infoWindowLocation.title }}
          </router-link>
        </h2>
        <h4 class="price upcase"><strong>{{ infoWindowLocation.working_hours }}</strong></h4>
        <hr/>
        <p>{{ infoWindowLocation.address }}</p>
        <br/>
        <span v-for="tag, index in infoWindowLocation.tags" class="label label-custom label_margin">#{{ tag }}</span>
        </div>
      </gmap-info-window>

      <gmap-marker
        v-for='(m, index) in places'
        :position='m.location'
        :draggable='false'
        :clickable='true'
        icon='map.png'
        @click='toggleInfoWindow(m, index)'
      ></gmap-marker>
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
          id, title, description, address, slug, tags, location { lat, lng }, working_hours
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
  computed: {
    renderPanorama () {
      return this.infoWindowPos && this.infoWindowPos.lat && this.infoWindowPos.lng
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
    toggleInfoWindow: function (marker, idx) {
      this.infoWindowPos = marker.location
      this.infoWindowLocation = marker
      // check if its the same marker that was selected if yes toggle
      if (this.currentMidx === idx) {
        this.infoWinOpen = !this.infoWinOpen
      } else {
        // if different marker set infowindow to open and reset current marker index
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

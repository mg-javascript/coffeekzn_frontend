<template>
  <div class="map_div">
    <div class="page-header page-header-xs settings-background" style="background-image: url('/bg.jpg');">
      <div class="filter"></div>
    </div>
        
    <div class="container">
      <div class="row">
          <div class="col-md-12 ml-auto mr-auto text-center title custom_title">
              <h2 class="place_title">{{ place.title }}</h2>
              <h3 class="title-uppercase"><small>{{ place.working_hours }}</small></h3>
              <h3>{{ place.address }}</h3>
              <br/>
              <div class="col-md-12">
                <button v-if='place.website' class="btn btn-just-icon btn-link btn-twitter">
                    <i class="fa fa-safari" aria-hidden="true"></i>
                </button>
                <button v-if='place.twitter' class="btn btn-just-icon btn-link btn-twitter">
                    <i class="fa fa-twitter" aria-hidden="true"></i>
                </button>
                <button v-if='place.facebook' class="btn btn-just-icon btn-link btn-facebook">
                    <i class="fa fa-facebook" aria-hidden="true"></i>
                </button>
                <button v-if='place.instagram' class="btn btn-just-icon btn-link btn-instagram">
                    <i class="fa fa-instagram" aria-hidden="true"></i>
                </button>
							</div>
          </div>
      </div>
      <div class="row" v-if='place.email'>
        <div class="col-md-6 ml-auto mr-auto text-center title custom_title">
            <div class="title-uppercase text-center"><a :href="`mailto:${place.email}`">{{ place.email }}</a></div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 ml-auto mr-auto text-center title custom_title">
            <div class="title-uppercase text-left">{{ place.description }}</div>
        </div>
      </div>
    </div>

    <div class="map-container-page">
      <gmap-map
      :center='place.location'
      :zoom='15'
      :options='{ styles: styles }'
      style='width: 100%; height: 300px'
      v-if='shouldRender'
      >
      <gmap-marker
        :position='place.location'
        :draggable='false'
        :clickable='true'
      ></gmap-marker>
    </gmap-map>
    </div>
    </div>
</template>
<script>
import apollo from '~/lib/apollo'
import { mapDefaults } from '~/lib/const'
import gql from 'graphql-tag'
import google from 'vue2-google-maps'

export default {
  async asyncData ({ params }) {
    const { data } = await apollo.query({
      query: gql`{
        shop(id:"${params.id}") {
          id, title, description, address, slug, tags, location { lat, lng }, working_hours, instagram, twitter, facebook, website, email
        }
      }`
    })

    return {
      ...mapDefaults,
      shouldRender: false,
      center: { lat: 55.8304307, lng: 49.0660806 },
      place: data.shop,
      styles: [
        {
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#f5f5f5'
            }
          ]
        },
        {
          'elementType': 'labels.icon',
          'stylers': [
            {
              'visibility': 'off'
            }
          ]
        },
        {
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#616161'
            }
          ]
        },
        {
          'elementType': 'labels.text.stroke',
          'stylers': [
            {
              'color': '#f5f5f5'
            }
          ]
        },
        {
          'featureType': 'administrative.land_parcel',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#bdbdbd'
            }
          ]
        },
        {
          'featureType': 'poi',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#eeeeee'
            }
          ]
        },
        {
          'featureType': 'poi',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#757575'
            }
          ]
        },
        {
          'featureType': 'poi.park',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#e5e5e5'
            }
          ]
        },
        {
          'featureType': 'poi.park',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#9e9e9e'
            }
          ]
        },
        {
          'featureType': 'road',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#ffffff'
            }
          ]
        },
        {
          'featureType': 'road.arterial',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#757575'
            }
          ]
        },
        {
          'featureType': 'road.highway',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#dadada'
            }
          ]
        },
        {
          'featureType': 'road.highway',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#616161'
            }
          ]
        },
        {
          'featureType': 'road.local',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#9e9e9e'
            }
          ]
        },
        {
          'featureType': 'transit.line',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#e5e5e5'
            }
          ]
        },
        {
          'featureType': 'transit.station',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#eeeeee'
            }
          ]
        },
        {
          'featureType': 'water',
          'elementType': 'geometry',
          'stylers': [
            {
              'color': '#c9c9c9'
            }
          ]
        },
        {
          'featureType': 'water',
          'elementType': 'labels.text.fill',
          'stylers': [
            {
              'color': '#9e9e9e'
            }
          ]
        }
      ]
    }
  },
  computed: {
    renderPanorama () {
      return this.infoWindowPos && this.infoWindowPos.lat && this.infoWindowPos.lng
    }
  },
  watch: {
    place (place) {
      if (place) {
        const bounds = new google.maps.LatLngBounds()
        // for (let m of places) {
        //   bounds.extend(m.latLng)
        // }
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

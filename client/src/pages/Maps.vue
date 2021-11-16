<template>
  <gmap-map
    id="map"
    :center="center"
    :zoom="14"
    :options="options"
    map-type-id="hybrid"
  >
    <gmap-marker :position="center"> </gmap-marker> 

    <gmap-polyline v-bind:path.sync="path" v-bind:options="{ strokeColor:'#008000'}"></gmap-polyline>
    <!-- <gmap-polyline v-bind:path.sync="path2" v-bind:options="{ strokeColor:'#F05432'}"></gmap-polyline>
    <gmap-polyline v-bind:path.sync="path3" v-bind:options="{ strokeColor:'#F0F032'}"></gmap-polyline> -->

    <!-- <gmap-marker
      :key="index"
      :draggable="true"
      :icon="{ url: require('../../public/img/icons/favicon-32x32.png')}"
      v-for="(m, index) in markers"
      :position="m.position"
      @click="toggleInfoWindow(m,index)">
    </gmap-marker> -->

    <gmap-marker
      :key="index"
      v-for="(m, index) in markers"
      :position="m.position"
      :aria-label="index"
      @click="toggleInfoWindow(m,index)">
    </gmap-marker>

    <!-- Info window para mostrar la informacion detallada de las locomotoras -->
    <gmap-info-window
      :options="infoOptions"
      :position="infoWindowPos"
      :opened="infoWinOpen"
      @closeclick="infoWinOpen=false"
    >
      <div v-html="infoContent"></div>
    </gmap-info-window>

    <!-- Info Window para mostrar la informacion basica de las locomotoras -->
    <gmap-info-window
      :options="infoOptions"
      :position="infoWindowPos"
      :opened="infoWinOpen_LessInfo"
      @closeclick="infoWinOpen_LessInfo=true"
    >
      <div v-html="infoContent_LessInfo"></div>
    </gmap-info-window>

  </gmap-map>

</template>

<script>

import {API_KEY} from './Maps/API_KEY';
import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';

import client, { paths2, paths3, latitud, longitud, markers} from './apiData/BackendData';

import api from './apiData/getApiData';

  Vue.use(VueGoogleMaps, {
    load: {
      key: API_KEY
    }
  })
  
  export default {
    data () {
      return {
        center: { lat: latitud, lng: longitud }, // Coordenadas de la Minerva en Guadalajara
        // center: {lat: 19.384460, lng: -99.181999}, // Coordenadas ciudad de mexico, depto en jose clemente orozco
        path: null,
        // path2: paths2,
        // path3: paths3,
        options: {
          styles: [{
            'featureType': 'water',
            'stylers': [{'saturation': 43}, {'lightness': -11}, {'hue': '#0088ff'}]
          }, {
            'featureType': 'road',
            'elementType': 'geometry.fill',
            'stylers': [{'hue': '#ff0000'}, {'saturation': -100}, {'lightness': 99}]
          }, {
            'featureType': 'road',
            'elementType': 'geometry.stroke',
            'stylers': [{'color': '#808080'}, {'lightness': 54}]
          }, {
            'featureType': 'landscape.man_made',
            'elementType': 'geometry.fill',
            'stylers': [{'color': '#ece2d9'}]
          }, {
            'featureType': 'poi.park',
            'elementType': 'geometry.fill',
            'stylers': [{'color': '#ccdca1'}]
          }, {
            'featureType': 'road',
            'elementType': 'labels.text.fill',
            'stylers': [{'color': '#767676'}]
          }, {
            'featureType': 'road',
            'elementType': 'labels.text.stroke',
            'stylers': [{'color': '#ffffff'}]
          }, {'featureType': 'poi', 'stylers': [{'visibility': 'off'}]}, {
            'featureType': 'landscape.natural',
            'elementType': 'geometry.fill',
            'stylers': [{'visibility': 'on'}, {'color': '#b8cb93'}]
          }, {'featureType': 'poi.park', 'stylers': [{'visibility': 'on'}]}, {
            'featureType': 'poi.sports_complex',
            'stylers': [{'visibility': 'on'}]
          }, {'featureType': 'poi.medical', 'stylers': [{'visibility': 'on'}]}, {
            'featureType': 'poi.business',
            'stylers': [{'visibility': 'simplified'}]
          }]
        },
        infoContent: '',
        infoContent_LessInfo: '',
        infoWindowPos: {
          lat: 0,
          lng: 0
        },
        infoWinOpen: false,
        infoWinOpen_LessInfo: false,
        currentMidx: null,
        //optional: offset infowindow so it visually sits nicely on top of our marker
        infoOptions: {
          pixelOffset: {
            width: 0,
            height: -35
          }
        },
        // markers: markers,
        markers: null,
      }
    },
    mounted() {
    //   //set bounds of the map
    //   this.$refs.gmap.$mapPromise.then((map) => {
    //     const bounds = new google.maps.LatLngBounds()
    //     for (let m of this.markers) {
    //       bounds.extend(m.position)
    //     }
    //     map.fitBounds(bounds);
    //   });

    // this.deployInfoWindows();
    },
    methods: {

      deployInfoWindows(){

        this.infoWinOpen_LessInfo = false;
      },

      toggleInfoWindow: function (marker, idx) {

        /**
         * Queda pendiente el detalle de reiniciar las variables a su estado original para que se muestren las "infoWindows" en el orden correcto.
         */

        this.infoWindowPos = marker.position;
        this.infoContent = this.getInfoWindowContent(marker);
        this.infoContent_LessInfo = this.getInfoWindowContentLessInfo(marker);
        
        //check if its the same marker that was selected if yes toggle
        if (/* this.currentMidx == idx && this.infoWinOpen && !this.infoWinOpen_LessInfo || */ this.currentMidx == idx && !this.infoWinOpen && this.infoWinOpen_LessInfo) {
          this.infoWinOpen = !this.infoWinOpen;
          this.infoWinOpen_LessInfo = !this.infoWinOpen_LessInfo;
        }

        else if( this.currentMidx == idx && this.infoWinOpen && !this.infoWinOpen_LessInfo ){

          this.infoWinOpen = false;
          this.infoWinOpen_LessInfo = true;
        }

        //if different marker set infowindow to open and reset current marker index
        else {
          this.infoWinOpen = false;
          this.infoWinOpen_LessInfo = true;
          this.currentMidx = idx;
        }
      },

      getInfoWindowContent: function (marker) {
        return (`<div class="">
                    <div>
                      <p class="title is-4">${marker.locomotora}</p>
                      <hr>
                    </div>
                  
                  <div class="content">
                    
                    <p class="cardContent"><b>Velocidad:</b> ${marker.velocidad} </p>
                    <p class="cardContent"><b>Kilometraje:</b> ${marker.kilometraje} </p>
                    <p class="cardContent"><b>Voltajes:</b> ${marker.voltajes} </p>
                    <p class="cardContent"><b>Direccion:</b> ${marker.direccion} </p>
                    <p class="cardContent"><b>Motor:</b> ${marker.motor} </p>
                    <p class="cardContent"><b>Vel. Engranada:</b> ${marker.engranaje} </p>
                    <p class="cardContent"><b>Nvl. Diesel (%):</b> ${marker.n_combustible} </p>
                    <p class="cardContent"><b>Geoposicion:</b> lat: ${marker.position['lat']}, lng: ${marker.position['lng']} </p>

                    <b>Fecha:</b> 
                    <time datetime="2016-1-1">${marker.fecha}</time>
                
                  </div>
              </div>`);
      },

      getInfoWindowContentLessInfo: function (marker) {
        return (`<div class="">
                    <div>
                      <p class="title is-4">${marker.locomotora}</p>
                      <hr>
                    </div>
                  
                  <div class="content">
                    <p class="cardContent"><b>Velocidad:</b> ${marker.velocidad} </p>
                    <p class="cardContent"><b>Nvl. Diesel (%):</b> ${marker.n_combustible} </p>
                  </div>
              </div>`);
      },

      dataPaths(){

        setInterval(() => {

          // let dataCoordinates = JSON.parse(api.obtainCoordinatesTrains());
          let dataCoordinates = JSON.parse(api.testDataToShowInMap());

          // console.log( dataCoordinates );

          this.path = dataCoordinates[0];
          this.markers = dataCoordinates[1];
        }, 2000)
      }
    },

    mounted(){

      this.dataPaths();

      api.obtainDataFromMySQL();
    }
  }

</script>

<style>
  #map {
    min-height: calc(100vh - 123px);
  }
  .cardContent{
    font-family: 'Courier New';
    font-size: 1.062em
  }
</style>


<template>

  <div>
    <gmap-map
      id="map"
      :center="center"
      :zoom="13"
      :options="options"
      map-type-id="hybrid"
    >

    <gmap-marker :position="center"> </gmap-marker> 

    <gmap-polyline v-bind:path.sync="path" v-bind:options="{ strokeColor:'#008000'}"></gmap-polyline>

    </gmap-map>

    <div id="floating-panel">
      <div class="row">
        <div class="col-md-4">
          
          <select id="mode" class="form-control">
            <option value="DRIVING">Locomotora 1</option>
            <option value="DRIVING">Locomotora 2</option>
            <option value="DRIVING">Locomotora 3</option>
            <option value="DRIVING">Locomotora 4</option>
            <option value="DRIVING">Locomotora 5</option>
          </select>

        </div>

        <div class="col-md-3">
          <date-picker v-model="startDate" valueType="format" format="DD/MM/YYYY"></date-picker>
        </div>

        <div class="col-md-3">
          <date-picker v-model="endDate" valueType="format" format="DD/MM/YYYY"></date-picker>
        </div>

        <div class="col-md-2">
          <button id="searchTrayectos" class="btn btn-primary" @click="obtainDataHistoricos()">Buscar</button>
        </div>

      </div>
    </div>

  </div>

</template>

<style>

  #floating-panel {
    position: absolute;
    top: 4rem;
    left: 1%;
    z-index: 5;
    background-color: #fff;
    padding: 5px;
    border: 1px solid #999;
    text-align: center;
    font-family: "Roboto", "sans-serif";
    line-height: 30px;
    padding-left: 10px;
    /* display: inline-flex; */
    /* width: auto; */
  }

  #floating-panel .col-md-3 .mx-datepicker{
    display: contents;
  }

</style>

<script>

import {API_KEY} from './Maps/API_KEY';
import Vue from 'vue';
import * as VueGoogleMaps from 'vue2-google-maps';
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css'; 

import api, {today} from './apiData/getApiData';

  Vue.use(VueGoogleMaps, {
    load: {
      key: API_KEY
    }
  })
  
  export default {
    components:{
      DatePicker
    },
    data () {
      return {
        startDate: today,
        endDate: today,

        center: { lat: 20.674375, lng: -103.387843 }, // Coordenadas de la Minerva en Guadalajara
        path: null,
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
        }
      }
    },
    methods:{

      obtainDataHistoricos(){

        // let dataHistorico = api.testDataHistoricos();
        let dataHistorico = JSON.parse(api.testDataHistoricos());

        console.log( dataHistorico );

        this.path = dataHistorico;
      }
    },
    // mounted(){

    //   this.obtainDataHistoricos();
    // }
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

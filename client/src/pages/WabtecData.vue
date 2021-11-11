<template>
  <div class="content">
    <div class="container-fluid">

      <div class="row">
        <div class="col-md-12">
          <card class="card">

            <div class="row">

              <div class="col-md-2">
                  <label for="">Locomotoras</label>
                  <select id="" class="form-control">
                    <option value="">Seleccione una opcion</option>
                    <option value="">Locomotora 1</option>
                  </select>
              </div>

              <!-- <div class="col-md-2">
                  <label for="">Tipo Reporte</label>
                  <select id="groupByChart" class="form-control">
                    <option value="diesel">Solo Diesel</option>
                    <option value="kilometer">Solo Kilometraje</option>
                  </select>
              </div>

              <div class="col-md-2">
                  <label for="">Agrupado por</label>
                  <select id="typeChart" class="form-control">
                    <option value="day">Dia</option>
                    <option value="month">Mensual</option>
                    <option value="year">Anual</option>
                  </select>
              </div> -->

              <div class="col-md-2">
                  <label for="">Fecha Inicial</label>
                  <template>
                    <div id="startDate">
                      <date-picker v-model="startDate" valueType="format" format="DD/MM/YYYY"></date-picker>
                    </div>
                  </template>
              </div>

              <div class="col-md-2">
                  <label for="">Fecha Final</label>
                  <template>
                    <div id="endedDate">
                      <date-picker v-model="endedDate" valueType="format" format="DD/MM/YYYY"></date-picker>
                    </div>
                  </template>
              </div>

              <div class="col-md-2">
                  <button id="btnCharts" @click="obtainDataWabtec()" class="btn-reportes btn btn-primary">Buscar</button>
              </div>

            </div>
                
            </card>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title">Informacion del WabTec</h4>
            </template>
            <l-table class="table-hover table-striped"
                     :columns="table1.columns"
                     :data="table1.data">
            </l-table>
          </card>

        </div>

      </div>

    </div>  
  </div>
</template>

<script>

  import LTable from 'src/components/Table.vue'
  import Card from 'src/components/Cards/Card.vue'

  import api, {today} from './apiData/getApiData';
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';

  const tableColumns = ['Id', 'Date', 'Time', 'Kilometer', 'Meters', 'Speed_km_h', 'Load_amps', 'voltaje_volts', 'power_kw', 'eab_bp_psi', 'eab_bc_psi', 'fuel_liters', 'Throttle', 'pcs_open', 'dir_call', 'wheel_slip', 'ground_relay']

  export default {
    components: {
      LTable,
      Card,
      DatePicker,
    },
    data() {
        return {
          startDate: today,
          endedDate: today,

          table1: {
            columns: [...tableColumns],
            data: null
          },
        }
    },
    methods:{
      obtainDataWabtec(){

        let apiData = api.obtainDataWabtec();

        // console.log(JSON.parse(apiData));

        this.table1.data = [...JSON.parse(apiData)];
      }
    },
    mounted(){

      this.obtainDataWabtec();
    }
  }
</script>
<style>

</style>
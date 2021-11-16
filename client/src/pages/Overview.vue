<template>
  <div class="content">
    <div class="container-fluid">
      
      <!-- <div class="row">
        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-warning">
              <i class="nc-icon nc-chart text-warning"></i>
            </div>
            <div slot="content">
              <p class="card-category">Capacity</p>
              <h4 class="card-title">105GB</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-refresh"></i>Updated now
            </div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-success">
              <i class="nc-icon nc-light-3 text-success"></i>
            </div>
            <div slot="content">
              <p class="card-category">Revenue</p>
              <h4 class="card-title">$1,345</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-calendar-o"></i>Last day
            </div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-danger">
              <i class="nc-icon nc-vector text-danger"></i>
            </div>
            <div slot="content">
              <p class="card-category">Errors</p>
              <h4 class="card-title">23</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-clock-o"></i>Last day
            </div>
          </stats-card>
        </div>

        <div class="col-xl-3 col-md-6">
          <stats-card>
            <div slot="header" class="icon-info">
              <i class="nc-icon nc-favourite-28 text-primary"></i>
            </div>
            <div slot="content">
              <p class="card-category">Followers</p>
              <h4 class="card-title">+45</h4>
            </div>
            <div slot="footer">
              <i class="fa fa-refresh"></i>Updated now
            </div>
          </stats-card>
        </div>

      </div> -->

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

              <div class="col-md-2">
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
              </div>

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
                  <button id="btnCharts" @click="obtainDatacharts()" class="btn-reportes btn btn-primary">Buscar</button>
              </div>

            </div>
                
            </card>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12">
          <chart-card :chart-data="lineChart.data"
                      :chart-options="lineChart.options"
                      :responsive-options="lineChart.responsiveOptions">
            <template slot="header">
              <h4 class="card-title">{{encabezado}}</h4>
              <p class="card-category">{{tipoReporte}}</p>
            </template>
            <template slot="footer">
              <div class="legend">
                <!-- <i class="fa fa-circle text-info"></i> Datos Consumos dat -->
                <!-- <i class="fa fa-circle text-danger"></i> Datos Consumo sensor -->
                <!-- <i class="fa fa-circle text-warning"></i> Click Second Time -->
              </div>
              <hr>
              <div class="stats">
                <i class="fa fa-history"></i>Data sent 2 Min ago
              </div>
            </template>
          </chart-card>
        </div>
      </div>

      <div class="row">
        <!-- <div class="col-md-4">
          <chart-card :chart-data="pieChart.data" chart-type="Pie">
            <template slot="header">
              <h4 class="card-title">Consumo acumulado de combustible</h4>
              <p class="card-category">Diario</p>
            </template>
            <template slot="footer">
              <div class="legend">
                <i class="fa fa-circle text-info"></i> Datos Consumo PLC (Sin promediar)
                <i class="fa fa-circle text-danger"></i> Datos Consumo Promediados
              </div>
              <hr>
              <div class="stats">
                <i class="fa fa-clock-o"></i> Data sent 2 Min ago
              </div>
            </template>
          </chart-card>
        </div> -->
      <!-- </div>

      <div class="row"> -->
        <div class="col-md-12">
          <chart-card
            :chart-data="barChart.data"
            :chart-options="barChart.options"
            :chart-responsive-options="barChart.responsiveOptions"
            chart-type="Bar">
            <template slot="header">
              <h4 class="card-title">{{encabezadoAvg}}</h4>
              <p class="card-category">{{tipoReporte}}</p>
            </template>
            <template slot="footer">
                <!-- <i class="fa fa-circle text-info"></i> Datos Consumos dat -->
                <!-- <i class="fa fa-circle text-danger"></i> Datos Consumo sensor -->
              <hr>
              <div class="stats">
                <i class="fa fa-history"></i> Data sent 2 Min ago
              </div>
            </template>
          </chart-card>
        </div>

        <!-- <div class="col-md-6">
          <card>
            <template slot="header">
              <h5 class="title">Tasks</h5>
              <p class="category">Backend development</p>
            </template>
            <l-table :data="tableData.data"
                     :columns="tableData.columns">
              <template slot="columns"></template>

              <template slot-scope="{row}">
                <td>
                  <base-checkbox v-model="row.checked"></base-checkbox>
                </td>
                <td>{{row.title}}</td>
                <td class="td-actions text-right">
                  <button type="button" class="btn-simple btn btn-xs btn-info" v-tooltip.top-center="editTooltip">
                    <i class="fa fa-edit"></i>
                  </button>
                  <button type="button" class="btn-simple btn btn-xs btn-danger" v-tooltip.top-center="deleteTooltip">
                    <i class="fa fa-times"></i>
                  </button>
                </td>
              </template>
            </l-table>
            <div class="footer">
              <hr>
              <div class="stats">
                <i class="fa fa-history"></i> Updated 3 minutes ago
              </div>
            </div>
          </card>

        </div> -->
      </div>
    </div>

    <!-- Element to call notifications -->
    <div>
      <button id="btnNotification" class="btn-reportes btn btn-primary" @click="notifyVue('top', 'right')" style="display: none">Notifications</button>
      <input type="hidden" id="messageNotif" value="This is a test message">
      <input type="hidden" id="iconMessage" value="nc-icon nc-email-85">
      <input type="hidden" id="colorMessage" value="1">
    </div>
    <!-- END -->

  </div>

</template>
<script>
  import ChartCard from 'src/components/Cards/ChartCard.vue'
  import StatsCard from 'src/components/Cards/StatsCard.vue'
  import LTable from 'src/components/Table.vue'
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';
  import Card from 'src/components/Cards/Card.vue';
  import api, {today} from './apiData/getApiData';

  api.obtainDataFromMySQL();
  api.obtainDataFromDatFile();

  export default {
    components: {
      LTable,
      ChartCard,
      StatsCard,
      DatePicker,
      Card
    },
    data () {
      return {
        startDate: today,
        endedDate: today,

        encabezado: null,
        encabezadoAvg: null,
        tipoReporte: null,

        editTooltip: 'Edit Task',
        deleteTooltip: 'Remove',
        // pieChart: {
        //   data: {
        //     labels: ['40%', '60%'],
        //     series: [40, 60]
        //   }
        // },
        lineChart: {
          data: {
            labels: null,
            series: null
          },
          options: {
            low: 0,
            high: 800,
            showArea: false,
            height: '245px',
            axisX: {
              showGrid: false
            },
            lineSmooth: true,
            showLine: true,
            showPoint: true,
            fullWidth: true,
            chartPadding: {
              right: 50
            }
          },
          responsiveOptions: [
            ['screen and (max-width: 640px)', {
              axisX: {
                labelInterpolationFnc (value) {
                  return value[0]
                }
              }
            }]
          ]
        },
        barChart: {
          data: {
            labels: null,
            series: null
          },
          options: {
            seriesBarDistance: 1,
            axisX: {
              showGrid: false
            },
            height: '245px'
          },
          responsiveOptions: [
            ['screen and (max-width: 640px)', {
              seriesBarDistance: 1,
              axisX: {
                labelInterpolationFnc (value) {
                  return value[0];
                }
              }
            }]
          ]
        },

        type: ['', 'info', 'success', 'warning', 'danger'],
        notifications: {
          topCenter: false
        }
        // tableData: {
        //   data: [
        //     {title: 'Sign contract for "What are conference organizers afraid of?"', checked: false},
        //     {title: 'Lines From Great Russian Literature? Or E-mails From My Boss?', checked: true},
        //     {
        //       title: 'Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit',
        //       checked: true
        //     },
        //     {title: 'Create 4 Invisible User Experiences you Never Knew About', checked: false},
        //     {title: 'Read "Following makes Medium better"', checked: false},
        //     {title: 'Unfollow 5 enemies from twitter', checked: false}
        //   ]
        // }
      }
    },
    methods: {
      notifyVue (verticalAlign, horizontalAlign) {
        const color = document.getElementById("colorMessage").value
        this.$notifications.notify(
          {
            message: '<span>' + document.getElementById('messageNotif').value + '</span>',
            icon: document.getElementById('iconMessage').value,
            horizontalAlign: horizontalAlign,
            verticalAlign: verticalAlign,
            type: this.type[color]
          })
      },
      obtainDatacharts(){

        let groupBy = document.getElementById('groupByChart').value;
        let typeChart = document.getElementById('typeChart').value;

        let dataLineChart = JSON.parse(api.obtainDataChartLine());
        let dataBarChart = JSON.parse(api.obtainDataChartBars());

        switch(groupBy){

          case "diesel":
            this.encabezado = "Consumo acumulado de diesel";
            this.encabezadoAvg = "Consumo Promediado de diesel";
            break;

          case "kilometer":
            this.encabezado = "Consumo acumulado de kilometros";
            this.encabezadoAvg = "Consumo Promediado de kilometros";
            break;
        }

        switch(typeChart){

          case "day": 
            this.tipoReporte = "Del Día";
            break;

          case "month": 
            this.tipoReporte = "Mensual";
            break;

          case "year": 
            this.tipoReporte = "Anual";
            break;
        }

        this.lineChart.data.labels = dataLineChart[0];
        this.lineChart.data.series = dataLineChart[1];

        this.barChart.data.labels = dataBarChart[0];
        this.barChart.data.series = dataBarChart[1];
      },

      showNotifications(){

        this.notifyVue('top', 'right');
      }
    },
    mounted(){

      this.obtainDatacharts();

      // Testing the option of the alarms in the platform
      // this.showNotifications();
    }
  }

</script>

<style>
.btn-reportes{
  margin-top: 1.5rem;
}
</style>

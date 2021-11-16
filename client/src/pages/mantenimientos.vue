<template>
  <div class="content">
    <div class="container-fluid">

      <div class="row">
        <div class="col-12">
          <card class="strpied-tabled-with-hover"
                body-classes="table-full-width table-responsive"
          >
            <template slot="header">
              <h4 class="card-title"> Mantenimientos a Locomotoras </h4>
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

  import {today} from './apiData/getApiData';
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';

  let ultimo_mantenimiento = 250000;
  let manto_cada = 70000;

  // const tableColumns = ['Numero', 'Locomotora', 'Kilometraje_Acumulado', 'Ultimo_KM_Mantenimiento', 'Mantenimiento_Cada', 'Proximo_Mantenimiento', 'Estatus', 'Acciones']
  const tableColumns = ['Numero', 'Locomotora', 'Kilometraje_Acumulado', 'Ultimo_KM_Mantenimiento', 'Mantenimiento_Cada', 'Proximo_Mantenimiento', 'Estatus']
  const tableData = [{
    numero: 1,
    locomotora: 'Loc_001',
    kilometraje_acumulado: '300,000',
    ultimo_km_mantenimiento: '250,000',
    mantenimiento_cada: '70,000',
    proximo_mantenimiento: (ultimo_mantenimiento + manto_cada).toLocaleString(),
    estatus: 'Proximo',
    acciones: '--'
  },
  {
    numero: 2,
    locomotora: 'Loc_002',
    kilometraje_acumulado: '300,000',
    ultimo_km_mantenimiento: '250,000',
    mantenimiento_cada: '70,000',
    proximo_mantenimiento: (ultimo_mantenimiento + manto_cada).toLocaleString(),
    estatus: 'Proximo',
    acciones: '--'
  },
  {
    numero: 3,
    locomotora: 'Loc_003',
    kilometraje_acumulado: '300,000',
    ultimo_km_mantenimiento: '250,000',
    mantenimiento_cada: '70,000',
    proximo_mantenimiento: (ultimo_mantenimiento + manto_cada).toLocaleString(),
    estatus: 'Proximo',
    acciones: '--'
  },
  {
    numero: 4,
    locomotora: 'Loc_004',
    kilometraje_acumulado: '300,000',
    ultimo_km_mantenimiento: '250,000',
    mantenimiento_cada: '70,000',
    proximo_mantenimiento: (ultimo_mantenimiento + manto_cada).toLocaleString(),
    estatus: 'Proximo',
    acciones: '--'
  },
  {
    numero: 5,
    locomotora: 'Loc_005',
    kilometraje_acumulado: '300,000',
    ultimo_km_mantenimiento: '250,000',
    mantenimiento_cada: '70,000',
    proximo_mantenimiento: (ultimo_mantenimiento + manto_cada).toLocaleString(),
    estatus: 'Proximo',
    acciones: '--'
  }]
  export default {
    components: {
      LTable,
      Card,
      DatePicker,
    },
    data () {
      return {
        startDate: today,
        endDate: today,

        table1: {
          columns: [...tableColumns],
          data: [...tableData]
        },
        // table2: {
        //   columns: [...tableColumns],
        //   data: [...tableData]
        // }
      }
    }
  }
</script>
<style>
</style>

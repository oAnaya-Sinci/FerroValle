<template>
  <div class="content">
    <div class="container-fluid">

      <div class="row">
        <div class="col-md-12">
          <card class="card">

            <div class="row">

              <div class="col-md-3">
                  <label for="">Locomotoras</label>
                  <select name="" id="" class="form-control">
                    <option value="">Seleccione una opcion</option>
                    <option value="">Locomotora 1</option>
                    <option value="">Locomotora 2</option>
                    <option value="">Locomotora 3</option>
                    <option value="">Locomotora 4</option>
                  </select>
              </div>

              <div class="col-md-3">
                  <label for="">Tipo alerta</label>
                  <select name="" id="" class="form-control">
                    <option value="">Seleccione una opcion</option>
                    <option value="">aviso</option>
                    <option value="">Advertencia</option>
                    <option value="">Error</option>
                    <option value="">Exito</option>
                  </select>
              </div>
                
              <div class="col-md-2">
                  <label for="">Fecha Inicial</label>
                  <tempalte>
                    <div>
                      <date-picker v-model="startDate" valueType="format" format="DD/MM/YYYY"></date-picker>
                    </div>
                  </tempalte>
              </div>

              <div class="col-md-2">
                  <label for="">Fecha Final</label>
                  <tempalte>
                    <div>
                      <date-picker v-model="endDate" valueType="format" format="DD/MM/YYYY"></date-picker>
                    </div>
                  </tempalte>
              </div>

              <div class="col-md-2">
                  <button class="btn-reportes btn btn-primary">Buscar</button>
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
              <h4 class="card-title">Historial de Notificaciones</h4>
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

  import {today} from './apiData/BackendData';
  import DatePicker from 'vue2-datepicker';
  import 'vue2-datepicker/index.css';

  const tableColumns = ['Id', 'Alerta', 'Locomotora', 'Fecha', 'Tipo', 'Ubicacion']
  const tableData = [{
    id: 1,
    alerta: 'Engranaje 5 velocidad',
    locomotora: 'Loc_001',
    fecha: '31/10/2021',
    tipo: 'advertencia',
    ubicacion: '--'
  },
  {
    id: 2,
    alerta: 'Exceso tiempo holgado',
    locomotora: 'Loc_003',
    fecha: '31/10/2021',
    tipo: 'error',
    ubicacion: '--'
  },
  {
    id: 3,
    alerta: 'Engranaje 6 velocidad',
    locomotora: 'Loc_006',
    fecha: '31/10/2021',
    tipo: 'advertencia',
    ubicacion: '--'
  },
  {
    id: 4,
    alerta: 'Sensores desconectados',
    locomotora: 'Loc_001',
    fecha: '31/10/2021',
    tipo: 'error',
    ubicacion: '--'
  },
  {
    id: 5,
    alerta: 'Descenso abruto de combustible',
    locomotora: 'Loc_002',
    fecha: '31/10/2021',
    tipo: 'error',
    ubicacion: '--'
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

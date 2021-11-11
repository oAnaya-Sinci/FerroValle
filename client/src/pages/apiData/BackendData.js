// import Vue from 'vue'
import axios from "axios";

const apiURL = "/api";

// *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

/**
 * Codigo de prueba para la obtencion de datos
 * esta es otra manera de obtener de la informacion a traves de Axios.
 * */

// const client = axios.create({
//     baseURL: 'http://localhost:5000/api/',
//     json: true
// })

// export default {

//     execute(method, resource, data) {

//         return client({
//                 method,
//                 url: resource,
//                 data,
//             }).then(req => {
//                 console.log();
//                 return req.data
//             })
//             .catch(
//                 error => { console.log("An error ocurred: " + error) }
//             )
//     },

//     getCoordinates() {
//         return this.execute('get', 'obtainCoordinates/')
//     }
// }

// *-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*

/**
 * Variables de prueba
 */

// export const dataGps = getCoordinates();

/**
 * Variables n ecesarias para el proyecto
 */

var _today = new Date();
var dd = String(_today.getDate()).padStart(2, '0');
var mm = String(_today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = _today.getFullYear();
_today = dd + '/' + mm + '/' + yyyy;

// END

/**
 * Export with info to continue the production of the platform of FerroValle until i fix the error about to get the info of a promise in JS
 */

export const today = _today;

export const latitud = 20.674375;
export const longitud = -103.387843;

export const paths = [
    { lat: 20.674330, lng: -103.387832 },
    { lat: 20.674265, lng: -103.387805 },
    { lat: 20.674250, lng: -103.387773 },
    { lat: 20.674100, lng: -103.387806 },
    { lat: 20.674034, lng: -103.387832 },
    { lat: 20.673944, lng: -103.387875 },
    { lat: 20.673874, lng: -103.387913 },
    { lat: 20.671006, lng: -103.389896 },
    { lat: 20.670645, lng: -103.390096 },
    { lat: 20.669310, lng: -103.390965 },
    { lat: 20.667051, lng: -103.392413 },
    { lat: 20.667031, lng: -103.392971 },
    { lat: 20.666840, lng: -103.393175 },
    { lat: 20.666489, lng: -103.393347 },
    { lat: 20.666258, lng: -103.393239 },
    { lat: 20.666047, lng: -103.393132 },
    { lat: 20.661971, lng: -103.395803 },
    { lat: 20.659602, lng: -103.397380 },
    { lat: 20.657173, lng: -103.398979 },
    { lat: 20.653730, lng: -103.401211 },
    { lat: 20.650989, lng: -103.403110 },
    { lat: 20.647907, lng: -103.405041 },
];

export const paths2 = [
    { lat: 20.674761, lng: -103.387097 },
    { lat: 20.678493, lng: -103.384609 },
    { lat: 20.684596, lng: -103.380489 },
    { lat: 20.688661, lng: -103.377903 },
];

export const paths3 = [
    { lat: 20.674761, lng: -103.387097 },
    { lat: 20.679006, lng: -103.393240 },
];

export const markers = [{
    locomotora: "Locomotora Test 1",
    velocidad: CalculateSpeed() + " K/H",
    kilometraje: "200 000",
    motor: "Encendido",
    direccion: "Preguntar que es",
    engranaje: "4",
    voltajes: "120 v",
    n_combustible: "80",
    fecha: today,
    position: { lat: 20.647907, lng: -103.405041 },
}, {
    locomotora: "Locomotora Test 2",
    velocidad: CalculateSpeed() + " K/H",
    kilometraje: "200 000",
    motor: "Encendido",
    direccion: "Preguntar que es",
    engranaje: "4",
    voltajes: "120 v",
    n_combustible: "80",
    fecha: today,
    position: { lat: 20.688661, lng: -103.377903 }
}, {
    locomotora: "Locomotora Test 3",
    velocidad: CalculateSpeed() + " K/H",
    kilometraje: "200 000",
    motor: "Encendido",
    direccion: "Preguntar que es",
    engranaje: "4",
    voltajes: "120 v",
    n_combustible: "80",
    fecha: today,
    position: { lat: 20.679006, lng: -103.393240 }
}, ]

/**
 * Informacion para la creacion de las graficas para el proyecto
 */

const dataReports = [{ "id": 1, "nivel_Tanque": 200, "nivel_Tanque_Porc": 100, "velocidad": 95, "latitud": 19.5605, "longitud": -99.24733333333333 }, { "id": 2, "nivel_Tanque": 200, "nivel_Tanque_Porc": 100, "velocidad": 80, "latitud": 20.643805, "longitud": -103.437207 }, { "id": 3, "nivel_Tanque": 190, "nivel_Tanque_Porc": 93, "velocidad": 90, "latitud": 20.642972, "longitud": -103.432926 }, { "id": 4, "nivel_Tanque": 175, "nivel_Tanque_Porc": 86, "velocidad": 85, "latitud": 20.641314, "longitud": -103.432964 }, { "id": 5, "nivel_Tanque": 150, "nivel_Tanque_Porc": 75, "velocidad": 92, "latitud": 20.640355, "longitud": -103.432625 }, { "id": 6, "nivel_Tanque": 120, "nivel_Tanque_Porc": 59, "velocidad": 95, "latitud": 20.639638, "longitud": -103.431319 }, { "id": 7, "nivel_Tanque": 200, "nivel_Tanque_Porc": 100, "velocidad": 80, "latitud": 20.643805, "longitud": -103.437207 }, { "id": 8, "nivel_Tanque": 190, "nivel_Tanque_Porc": 93, "velocidad": 90, "latitud": 20.642972, "longitud": -103.432926 }, { "id": 9, "nivel_Tanque": 175, "nivel_Tanque_Porc": 86, "velocidad": 85, "latitud": 20.641314, "longitud": -103.432964 }, { "id": 10, "nivel_Tanque": 150, "nivel_Tanque_Porc": 75, "velocidad": 92, "latitud": 20.640355, "longitud": -103.432625 }, { "id": 11, "nivel_Tanque": 120, "nivel_Tanque_Porc": 59, "velocidad": 95, "latitud": 20.639638, "longitud": -103.431319 }, { "id": 12, "nivel_Tanque": 200, "nivel_Tanque_Porc": 100, "velocidad": 80, "latitud": 20.643805, "longitud": -103.437207 }, { "id": 13, "nivel_Tanque": 190, "nivel_Tanque_Porc": 93, "velocidad": 90, "latitud": 20.642972, "longitud": -103.432926 }, { "id": 14, "nivel_Tanque": 175, "nivel_Tanque_Porc": 86, "velocidad": 85, "latitud": 20.641314, "longitud": -103.432964 }, { "id": 15, "nivel_Tanque": 150, "nivel_Tanque_Porc": 75, "velocidad": 92, "latitud": 20.640355, "longitud": -103.432625 }, { "id": 16, "nivel_Tanque": 120, "nivel_Tanque_Porc": 59, "velocidad": 95, "latitud": 20.639638, "longitud": -103.431319 }, { "id": 17, "nivel_Tanque": 200, "nivel_Tanque_Porc": 100, "velocidad": 80, "latitud": 20.643805, "longitud": -103.437207 }, { "id": 18, "nivel_Tanque": 190, "nivel_Tanque_Porc": 93, "velocidad": 90, "latitud": 20.642972, "longitud": -103.432926 }, { "id": 19, "nivel_Tanque": 175, "nivel_Tanque_Porc": 86, "velocidad": 85, "latitud": 20.641314, "longitud": -103.432964 }, { "id": 20, "nivel_Tanque": 150, "nivel_Tanque_Porc": 75, "velocidad": 92, "latitud": 20.640355, "longitud": -103.432625 }, { "id": 21, "nivel_Tanque": 120, "nivel_Tanque_Porc": 59, "velocidad": 95, "latitud": 20.639638, "longitud": -103.431319 }, { "id": 22, "nivel_Tanque": 200, "nivel_Tanque_Porc": 100, "velocidad": 80, "latitud": 20.643805, "longitud": -103.437207 }, { "id": 23, "nivel_Tanque": 190, "nivel_Tanque_Porc": 93, "velocidad": 90, "latitud": 20.642972, "longitud": -103.432926 }, { "id": 24, "nivel_Tanque": 175, "nivel_Tanque_Porc": 86, "velocidad": 85, "latitud": 20.641314, "longitud": -103.432964 }, { "id": 25, "nivel_Tanque": 150, "nivel_Tanque_Porc": 75, "velocidad": 92, "latitud": 20.640355, "longitud": -103.432625 }, { "id": 26, "nivel_Tanque": 120, "nivel_Tanque_Porc": 59, "velocidad": 95, "latitud": 20.639638, "longitud": -103.431319 }, { "id": 27, "nivel_Tanque": 200, "nivel_Tanque_Porc": 100, "velocidad": 80, "latitud": 20.643805, "longitud": -103.437207 }, { "id": 28, "nivel_Tanque": 190, "nivel_Tanque_Porc": 93, "velocidad": 90, "latitud": 20.642972, "longitud": -103.432926 }, { "id": 29, "nivel_Tanque": 175, "nivel_Tanque_Porc": 86, "velocidad": 85, "latitud": 20.641314, "longitud": -103.432964 }, { "id": 30, "nivel_Tanque": 150, "nivel_Tanque_Porc": 75, "velocidad": 92, "latitud": 20.640355, "longitud": -103.432625 }, { "id": 31, "nivel_Tanque": 120, "nivel_Tanque_Porc": 59, "velocidad": 95, "latitud": 20.639638, "longitud": -103.431319 }, { "id": 32, "nivel_Tanque": 200, "nivel_Tanque_Porc": 100, "velocidad": 80, "latitud": 20.643805, "longitud": -103.437207 }, { "id": 33, "nivel_Tanque": 190, "nivel_Tanque_Porc": 93, "velocidad": 90, "latitud": 20.642972, "longitud": -103.432926 }, { "id": 34, "nivel_Tanque": 175, "nivel_Tanque_Porc": 86, "velocidad": 85, "latitud": 20.641314, "longitud": -103.432964 }, { "id": 35, "nivel_Tanque": 150, "nivel_Tanque_Porc": 75, "velocidad": 92, "latitud": 20.640355, "longitud": -103.432625 }, { "id": 36, "nivel_Tanque": 120, "nivel_Tanque_Porc": 59, "velocidad": 95, "latitud": 20.639638, "longitud": -103.431319 }]

/** exports with the data of the line chart on the dashboard */
let dataLC = dataLineChar("day");
export const labelsLineCharts = dataLC[0];
export const seriesLineChart = dataLC[1];

/** exports with the data of the bar chart on the dashborad */
let dataBC = dataBarChar("year");
export const labelsBarCharts = dataBC[0]
export const seriesBarChart = dataBC[1];

function dataLineChar(type) {

    let labels;
    let data = [];

    switch (type) {

        case "minute":
            labels = minutes();
            data.push([800, 750, 710, 675, 665, 658, 634, 605, 588, 570, 550, 510, 495, 440, 400, 320, 280, 220, 200, 180, 165, 155, 140, 80]);
            break;

        case "day":
            labels = ['0:00', '01:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
            data.push([800, 750, 710, 675, 665, 658, 634, 605, 588, 570, 550, 510, 495, 440, 400, 320, 280, 220, 200, 180, 165, 155, 140, 80]);
            break;

        case "month":
            labels = daysInMonth();
            data.push([1800, 750, 710, 675, 665, 658, 634, 605, 588, 570, 550, 510, 495, 440, 400, 320, 280, 220, 200, 180, 165, 155, 140, 80]);
            break;

        case "year":
            labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'ago', 'Sep', 'Oct', 'Nov', 'Dic'];
            data.push([1800, 750, 710, 675, 665, 658, 634, 605, 588, 570, 550, 510, 495, 440, 400, 320, 280, 220, 200, 180, 165, 155, 140, 80]);
            break;
    }

    return [labels, data];
}

function dataBarChar(type) {

    let labels;
    let data = [];

    switch (type) {

        case "minute":
            labels = minutes();
            data.push([800, 750, 710, 675, 665, 658, 634, 605, 588, 570, 550, 510, 495, 440, 400, 320, 280, 220, 200, 180, 165, 155, 140, 80]);
            break;

        case "day":
            labels = ['0:00', '01:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
            data.push([0, 120, 300, 450, 600, 750, 870, 1000, 1100, 1250, 1380, 1500, 1700, 1790, 1910, 2013, 2021, 2150, 2300, 2500, 2700, 3000, 3200, 3600]);
            break;

        case "month":
            labels = daysInMonth();
            data.push([0, 120, 300, 450, 600, 750, 870, 1000, 1100, 1250, 1380, 1500, 1700, 1790, 1910, 2013, 2021, 2150, 2300, 2500, 2700, 3000, 3200, 3600]);
            break;

        case "year":
            labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'ago', 'Sep', 'Oct', 'Nov', 'Dic'];
            data.push([0, 120, 300, 450, 600, 750, 870, 1000, 1100, 1250, 1380, 1500]);
            break;
    }

    return [labels, data];
}

// export const dataMaps = obtainDataMaps();

// END

/**
 * Function to obtain the days of the month
 */

function minutes() {

    let minutes = [];

    for (var i = 0; i < 60; i++)
        minutes.push(i);

    return minutes;
}

function daysInMonth() {

    // instantiate a date object
    var dt = new Date();

    // dt.getMonth() will return a month between 0 - 11
    // we add one to get to the last day of the month 
    // so that when getDate() is called it will return the last day of the month
    var month = dt.getMonth() + 1;
    var year = dt.getFullYear();

    // this line does the magic (in collab with the lines above)
    var days = new Date(year, month, 0).getDate();

    var daysInMonth = [];

    for (var d = 1; d <= days; d++)
        daysInMonth.push(d);

    return daysInMonth;
}

/**
 * Funcitons to calculate the speed of the train
 */
function CalculateSpeed(d1 = 163028, d2 = 201749) {

    let date1 = tranformDate(new Date(d1 * 1000));
    let date2 = tranformDate(new Date(d2 * 1000));

    let distance = calculateDistance(20.674070, -103.387645, 20.665995, -103.393046);
    let seconds = timeTraveled(date1, date2);

    // speed = (distance * 1000) / time; //Se obtiene la velocidad promedio en Metros sobre Segundos
    let speed = ((distance * 1000) / seconds) * 3.6;

    return speed.toFixed(1);
}

function calculateDistance(lat1, lon1, lat2, lon2) {

    Number.prototype.toRad = function() {
        return this * Math.PI / 180;
    }

    var R = 6371; // km 
    //has a problem with the .toRad() method below.
    var x1 = lat2 - lat1;
    var dLat = x1.toRad();
    var x2 = lon2 - lon1;
    var dLon = x2.toRad();
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var distance = R * c;

    return distance;
}

/**
 * Obtain time traveled for the train
 */
function timeTraveled(startD, finishD) {

    startD = startD.split(" ");
    finishD = finishD.split(" ");

    let date1 = startD[0];
    let date2 = finishD[0];

    var st = startD[1];
    var et = finishD[1];

    var rd = 0;
    var cd = 0;
    var dd = 1;

    date1 = date1.split("-");
    rd = date1[0];
    date1 = date1[2] + "-" + date1[1] + "-" + date1[0];
    date1 = new Date(date1);
    date1.setDate(date1.getDate() + 1);

    date2 = date2.split("-");
    cd = date2[0];
    date2 = date2[2] + "-" + date2[1] + "-" + date2[0];
    date2 = new Date(date2);
    date2.setDate(date2.getDate() + 1);

    dd = ((parseInt(cd) - parseInt(rd)) * 24);

    date1 = Date.parse(date1) / 1000;
    date2 = Date.parse(date2) / 1000;

    st = st.split(':');
    et = et.split(':');

    if (date1 < date2)
        et[0] = parseInt(et[0]) + parseInt(dd);

    var tt_h = parseInt(et[0]) - parseInt(st[0]);
    var tt_m = 0;
    var tt_s = 0;

    if (parseInt(et[1]) < parseInt(st[1]) && tt_h > 0) {

        tt_h -= 1;
        tt_m = (parseInt(et[1]) + 60) - parseInt(st[1]);
        tt_s = parseInt(et[2]) - parseInt(st[2]);

    } else {
        tt_m = parseInt(et[1]) - parseInt(st[1])
        tt_s = parseInt(et[2]) - parseInt(st[2]);
    }

    // var tt = (tt_h < 10 ? "0" + tt_h : tt_h) + ":" + (tt_m < 10 ? "0" + tt_m : tt_m) + ":" + (tt_s < 10 ? "0" + tt_s : tt_s);
    // console.log( tt );

    /**
     * Option to transform hours and minutes to seconds
     */
    var tts = 0;

    // Transform hour to minuts and add the minutes
    tts = (tt_h * 60) + tt_m;

    // Tranform minutos to second and add secconds
    tts = (tts * 60) + tt_s;

    return tts;
}

function tranformDate(date) {

    let day = date.getDate();
    let month = (date.getMonth() + 1);
    let year = date.getFullYear();

    let hour = date.getHours();
    let minutes = date.getMinutes();
    let seconds = date.getSeconds();

    date = day + "-" + month + "-" + year + " " + hour + ":" + minutes + ":" + seconds;

    return date;
}

// function obtainDataMaps() {

//     setInterval(function() { console.log("DataMaps") }, 3000);
// }

/**
 * Functions to obtain data from Backend with FETCH
 */

const client = axios.create({
    baseURL: 'api/',
    json: true
})

export default {

    // obtainDataFetch() {

    //     try {

    //         const dataFectch = fetch(apiURL + '/obtainCoordinates')
    //         const response = dataFectch.json();

    //         return response;

    //     } catch (error) {
    //         console.log(error);
    //     }

    // },

    // async getCoordinates() {

    //     // const allPromise = Promise.all(axios.get(apiURL + "/obtainCoordinates"));

    //     // console.log(allPromise);

    //     // try {
    //     //     const values = await allPromise;
    //     //     values; // [valueOfPromise1, valueOfPromise2, ...]
    //     //     console.log(values);
    //     // } catch (error) {
    //     //     error; // rejectReason of any first rejected promise
    //     // }

    //     // return allPromise.then(
    //     //         response => {
    //     //             console.log(response);
    //     //             return response
    //     //         })
    //     //     .catch(
    //     //         error => {
    //     //             console.log("Test to see if the cath function execute: " + error)
    //     //         }
    //     //     );

    //     // const gpsData = await axios.get(apiURL + "/obtainCoordinates").then(
    //     //         response => {
    //     //             return response.data
    //     //         })
    //     //     .catch(
    //     //         error => {
    //     //             console.log("Test to see if the cath function execute: " + error)
    //     //         }
    //     //     );

    //     return await axios({
    //         method: 'GET',
    //         url: apiURL + '/obtainCoordinates'
    //     }).then(response => {
    //         // console.log(response.data);
    //         axiosDataTest = response.data;
    //         testAxiosData(response.data);

    //         return response;
    //     }).catch(err => console.log(err));

    //     // return "Omar Anaya";
    // },

    execute(method, resource, data) {

        return client({
                method,
                url: resource,
                data,
            }).then(req => {
                console.log(req.data);
                return req.data
            })
            .catch(
                error => { console.log("An error ocurred: " + error) }
            )
    },

    getCoordinates() {
        return this.execute('get', 'obtainCoordinates/')
    },

    getDieselAVG() {

        let startDate = 222427;
        let endDate = 235220;
        let type = "day";

        let results = this.execute('get', 'obtainCoordinates/obtainAVGDiesel/' + startDate + '/' + endDate + '/' + type);

        return results;
    },

    getDieselAcumulado() {

        let startDate = 222427;
        let endDate = 235220;
        let type = "day";

        let results = this.execute('get', 'obtainCoordinates/obtainAcumuladoDiesel/' + startDate + '/' + endDate + '/' + type);

        return results;
    },

    getKilometersAVG() {

        let startDate = 222427;
        let endDate = 235220;
        let type = "day";

        let results = this.execute('get', 'obtainCoordinates/obtainAVGDiesel/' + startDate + '/' + endDate + '/' + type);

        return results;
    },

    getKilometersAcumulado() {

        let startDate = 222427;
        let endDate = 235220;
        let type = "day";

        let results = this.execute('get', 'obtainCoordinates/obtainAcumuladoDiesel/day' + startDate + '/' + endDate + '/' + type);

        return results;
    },

    saveLogAlarms() {

        this.execute('get', 'obtainCoordinates/saveLogAlarms/');

        return false;
    }
}
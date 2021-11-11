const $ = require('jquery');

// Return de actual date to the platform
var _today = new Date();
var dd = String(_today.getDate()).padStart(2, '0');
var mm = String(_today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = _today.getFullYear();
_today = dd + '/' + mm + '/' + yyyy;
// END

let dataCoordinates = [];

export default {

    obtainDataChartLine() {

        let typeChart = $('#typeChart').val();
        let groupBy = $('#groupByChart').val();
        let startDate = $('#startDate .mx-datepicker .mx-input').val();
        let endedDate = $('#endedDate .mx-datepicker .mx-input').val();

        let urlGroupBy;
        switch (groupBy) {

            case "diesel":
                urlGroupBy = 'api/obtainCoordinates/obtainAcumuladoDiesel/';
                break;

            case "kilometer":
                urlGroupBy = 'api/obtainCoordinates/obtainAcumuladoKilometers/';
                break;
        }

        let dataRes;

        $.ajax({
            url: urlGroupBy,
            type: 'GET',
            async: false,
            data: { startDate: startDate, endedDate: endedDate, type: typeChart },
            success: function(response) {

                dataRes = dataChars(typeChart, groupBy, response);
            },
            error: function(ex) {
                console.log(ex.statusText);
                showAlarms('4', 'nc-icon nc-notification-70', ex.statusCode + " - " + ex.statusText);
            }
        });

        return JSON.stringify(dataRes);
    },

    obtainDataChartBars() {

        let typeChart = $('#typeChart').val();
        let groupBy = $('#groupByChart').val();
        let startDate = $('#startDate .mx-datepicker .mx-input').val();
        let endedDate = $('#endedDate .mx-datepicker .mx-input').val();

        let urlGroupBy;
        switch (groupBy) {

            case "diesel":
                urlGroupBy = 'api/obtainCoordinates/obtainAVGDiesel/';
                break;

            case "kilometer":
                urlGroupBy = 'api/obtainCoordinates/obtainAVGKilometers/';
                break;
        }

        let dataRes;

        $.ajax({
            url: urlGroupBy,
            type: 'GET',
            async: false,
            data: { startDate: startDate, endedDate: endedDate, type: typeChart },
            success: function(response) {

                dataRes = dataChars(typeChart, response);
            },
            error: function(ex) {
                console.log(ex.statusText);
                showAlarms('4', 'nc-icon nc-notification-70', ex.statusCode + " - " + ex.statusText);
            }
        });

        return JSON.stringify(dataRes);
    },

    obtainCoordinatesTrains() {

        let startDate = $('#startDate .mx-datepicker .mx-input').val();
        let endedDate = $('#endedDate .mx-datepicker .mx-input').val();

        let markets;

        $.ajax({
            url: 'api/obtainCoordinates/',
            type: 'GET',
            async: false,
            data: { startDate: startDate, endedDate: endedDate },
            success: function(response) {

                markets = obtainDataMarkets(response[0].latitud, response[1].latitud, response[0].longitud, response[1].longitud, response[0].fechaGps, response[1].fechaGps);

                dataCoordinates.push({ lat: response[1].latitud, lng: response[1].longitud });
            },
            error: function(ex) {
                console.log(ex.statusText);
                showAlarms('4', 'nc-icon nc-notification-70', ex.statusCode + " - " + ex.statusText);
            }
        });

        return JSON.stringify([dataCoordinates, markets]);
    },

    getDataMarkets() {


    },

    obtainDataFromMySQL() {

        // setInterval(() => {

        //     $.ajax({
        //         url: 'api/obtainCoordinates/saveDataFromMySQL/',
        //         type: 'GET',
        //         async: false,
        //         success: function() {},
        //         error: function(ex) {
        //             console.log(ex.statusText);
        //             showAlarms('4', 'nc-icon nc-notification-70', ex.statusCode + " - " + ex.statusText);
        //         }
        //     });

        // }, 5000);
    },

    obtainDataFromDatFile() {

        // setInterval(() => {

        //     $.ajax({
        //         url: 'api/obtainCoordinates/obtainDataFromCSV/',
        //         type: 'POST',
        //         async: false,
        //         success: function() {},
        //         error: function(ex) {
        //             console.log(ex.statusText);
        //             showAlarms('4', 'nc-icon nc-notification-70', ex.statusCode + " - " + ex.statusText);
        //         }
        //     });

        // }, 300000);
    },

    obtainDataWabtec() {

        let startDate = $('#startDate .mx-datepicker .mx-input').val();
        let endedDate = $('#endedDate .mx-datepicker .mx-input').val();

        let datFile;

        $.ajax({
            url: 'api/obtainCoordinates/obtainDataWabtec',
            type: 'GET',
            async: false,
            data: { startDate: startDate, endedDate: endedDate },
            success: function(response) {

                datFile = response;
            },
            error: function(ex) {
                console.log(ex.statusText);
                showAlarms('4', 'nc-icon nc-notification-70', ex.statusCode + " - " + ex.statusText);
            }
        });

        return JSON.stringify(datFile);
    },

    // Function test, delete ahead
    testDataToShowInMap() {

        let dataPath = [
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

        return JSON.stringify(dataPath);
    },
}

/** */

function obtainDataMarkets(latitud1, latitud2, longitud1, longitud2, date1, date2) {

    let markers = [];

    let data = {
        locomotora: "Locomotora Test 1",
        velocidad: CalculateSpeed(latitud1, latitud2, longitud1, longitud2, date1, date2) + " K/H",
        kilometraje: "200 000",
        motor: "Encendido",
        direccion: "Preguntar que es",
        engranaje: "4",
        voltajes: "120 v",
        n_combustible: "80",
        fecha: _today,
        position: { lat: latitud1, lng: longitud1 },
    }

    markers.push(data);

    return markers;
}

// END 

/**
 * This function Show the alert of the ajax petition
 */
function showAlarms(color, icon, message) {

    $('#colorMessage').val(color);
    $('#iconMessage').val(icon);
    $('#messageNotif').val(message);

    $('#btnNotification').click();
}

/**
 * Funtion to show the alarms
 */

/**
 * This export has data for the function of the platform
 */

// This export return the actual date

export const today = _today;
// END

/**
 * This functions return the data of the charts 
 */

function dataChars(type, groupBy, response) {

    let labels;
    let data = [];
    let arrayD;

    switch (groupBy) {

        case "minute":
            labels = minutes();
            arrayD = type == 'diesel' ? setDataDieselToArray(response) : setDataKilometersToArray(response);
            data.push(arrayD);
            break;

        case "day":
            labels = ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00', '6:00', '7:00', '8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00'];
            arrayD = type == '' ? setDataDieselToArray(response) : setDataKilometersToArray(response);
            data.push(arrayD);
            break;

        case "month":
            labels = daysInMonth();
            arrayD = type == 'diesel' ? setDataDieselToArray(response) : setDataKilometersToArray(response);
            data.push(arrayD);
            break;

        case "year":
            labels = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'ago', 'Sep', 'Oct', 'Nov', 'Dic'];
            arrayD = type == 'diesel' ? setDataDieselToArray(response) : setDataKilometersToArray(response);
            data.push(arrayD);
            break;
    }

    return [labels, data];
}

/**
 * This function set the data to a array
 */

function setDataDieselToArray(response) {

    let array = [];

    $.each(response, function(index, value) {

        array.push(value.nivel_Tanque);
    });

    return array;
}

function setDataKilometersToArray(response) {

    let array = [];

    $.each(response, function(index, value) {

        array.push(value.nivel_Tanque);
    });

    return array;
}

/**
 * Funcitons to calculate the speed of the train
 */
function CalculateSpeed(latitud1, latitud2, longitud1, longitud2, d1, d2) {

    let date1 = tranformDate(new Date(d1 * 1000));
    let date2 = tranformDate(new Date(d2 * 1000));

    let distance = calculateDistance(latitud1, longitud1, latitud2, longitud2);
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
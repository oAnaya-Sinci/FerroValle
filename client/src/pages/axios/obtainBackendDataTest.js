import axios from "axios";

const apiURL = "/api";
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

// export default {

//     async getCoordinates() {

//         let response = await axios.get(apiURL + "/obtainCoordinates")
//             .then(
//                 (res) => {
//                     return res.data
//                 }
//             ).catch(
//                 error => {
//                     console.log("Test to see if the cath function execute: " + error)
//                 }
//             );

//         console.log(response);

//         return response;
//     }
// }

/**
 * Ruta para el api, las lineas anteriores funcionan
 */

// getCoordinates();

// async function getCoordinates() {

//     return await axios.get(apiURL + "/obtainCoordinates")
//         .then(
//             response => {
//                 return response.data
//             }).
//     catch(
//         error => {
//             console.log("Test to see if the cath function execute: " + error)
//         }
//     );
// }

/**
 * Export with info to continue the production of the platform of FerroValle until i fix the error about to get the info of a promise in JS
 */

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
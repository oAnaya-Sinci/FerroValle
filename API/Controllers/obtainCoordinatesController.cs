using System;
using System.IO;
using System.Net;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;

using MySql.Data.MySqlClient;

namespace API.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class obtainCoordinatesController : ControllerBase
  {
    private MySqlConnectionController _MySqlConn;
    private readonly DataContext _context;

    public obtainCoordinatesController(DataContext context)
    {
      _context = context;
    }

    public void connectToMySQL(string server, string database, string uid, string password, string port = "3306"){

      _MySqlConn = new MySqlConnectionController(server, database, uid, password, port);
    }

    [HttpGet]
    public ActionResult<IEnumerable<datosReporte>> obtainDataCharts(){

      return _context.datosReporte.OrderByDescending(dr => dr.fechaRegistro).Take(2).ToList();
    }

    [HttpGet("obtainDataWabtec")]
    public ActionResult<IEnumerable<datFileInformation>> obtainDataWabtec(string startDate, string endedDate){

      string startTime = "00:00:00";
      string endedTime = "11:59:59";

      int startD = this.unixTimeStamp(startDate.Split('/'), startTime);
      int endedD = this.unixTimeStamp(endedDate.Split('/'), endedTime);

      // return _context.datFileInformation.Take(200).ToList();

      var dataWapTec = _context.datFileInformation.Where(t => t.dateSpan >= startD && t.dateSpan <= endedD).Select(dataWT => new datFileInformation{
            id = Convert.ToInt32(dataWT.id),
            date = Convert.ToDateTime( dataWT.date ),
            time = Convert.ToDateTime( "01/01/1969 " + dataWT.time ),
            kilometer = Convert.ToInt32(dataWT.kilometer),
            meters = Convert.ToInt32(dataWT.meters),
            speed_km_h = Convert.ToInt32(dataWT.speed_km_h),
            load_amps = Convert.ToInt32(dataWT.load_amps),
            voltaje_volts = Convert.ToInt32(dataWT.voltaje_volts),
            power_kw = Convert.ToInt32(dataWT.power_kw),
            eab_bp_psi = Convert.ToInt32(dataWT.eab_bp_psi),
            eab_bc_psi = Convert.ToInt32(dataWT.eab_bc_psi),
            fuel_liters = Convert.ToInt32(dataWT.fuel_liters),
            throttle = dataWT.throttle,
            pcs_open = dataWT.pcs_open,
            dir_call = dataWT.dir_call,
            wheel_slip = dataWT.wheel_slip,
            ground_relay = dataWT.ground_relay,
          }).ToList();

      return dataWapTec;

      // .Where(t => t.dateSpan >= startD && t.dateSpan <= endedD)

      // List<datFileInformation> datFile = new List<datFileInformation>();

      // foreach (var dataWT in dataWapTec){

      //       datFile.Add( new datFileInformation{
      //       id = Convert.ToInt32(dataWT.id),
      //       date = Convert.ToDateTime( dataWT.date ),
      //       time = Convert.ToDateTime( "01/01/1969 " + dataWT.time ),
      //       kilometer = Convert.ToInt32(dataWT.kilometer),
      //       meters = Convert.ToInt32(dataWT.meters),
      //       speed_km_h = Convert.ToInt32(dataWT.speed_km_h),
      //       load_amps = Convert.ToInt32(dataWT.load_amps),
      //       voltaje_volts = Convert.ToInt32(dataWT.voltaje_volts),
      //       power_kw = Convert.ToInt32(dataWT.power_kw),
      //       eab_bp_psi = Convert.ToInt32(dataWT.eab_bp_psi),
      //       eab_bc_psi = Convert.ToInt32(dataWT.eab_bc_psi),
      //       fuel_liters = Convert.ToInt32(dataWT.fuel_liters),
      //       throttle = dataWT.throttle,
      //       pcs_open = dataWT.pcs_open,
      //       dir_call = dataWT.dir_call,
      //       wheel_slip = dataWT.wheel_slip,
      //       ground_relay = dataWT.ground_relay,
      //     } );  
      // }

      // return datFile;
    } 

    public int unixTimeStamp(string[] date, string time){

      string[] timeSepareted = time.Split(":");

      int H = Convert.ToInt32(timeSepareted[0]);
      int M = Convert.ToInt32(timeSepareted[1]);
      int S = Convert.ToInt32(timeSepareted[2]);

      TimeSpan epochTicks = new TimeSpan(new DateTime(1970, 1, 1, 0, 0, 0).Ticks);
      TimeSpan unixTicks = new TimeSpan(new DateTime(Convert.ToInt32(date[2]), Convert.ToInt32(date[1]), Convert.ToInt32(date[0]), H, M, S).Ticks) - epochTicks;
      int unixTimestamp = Convert.ToInt32(unixTicks.TotalSeconds);

      return unixTimestamp;
    }

    [HttpGet("{id}")]
    public ActionResult<datosReporte> obtainCoordinatesById(int id){
        
      return _context.datosReporte.Find(id);
    }

    [HttpGet("obtainAcumuladoDiesel")]
    public ActionResult<IEnumerable<datosAcumulado>> acumuladoDiesel(string startDate, string endedDate, string type){

      string startTime = "00:00:00";
      string endedTime = "11:59:59";

      int startD = this.unixTimeStamp(startDate.Split('/'), startTime);
      int endedD = this.unixTimeStamp(endedDate.Split('/'), endedTime); 

      string groupby;

      switch(type){
        
        case "minute":
          groupby = "dsl.minutesGps";
          break;
        
        case "hour":
          groupby = "dsl.hoursGps";
          break;

        case "day":
          groupby = "dsl.daysGps";
          break;

        case "month":
          groupby = "dsl.monthsGps";
          break;

        default:
         groupby = "dsl.date";
         break;
      }

      var dataReport = _context.datosReporte.Where(t => t.fechaGps >= startD && t.fechaGps <= endedD).AsEnumerable().GroupBy(dsl => groupby);

      List<datosAcumulado> AVGResults = new List<datosAcumulado>();
      foreach(var data in dataReport){

        AVGResults.Add( new datosAcumulado{ label = "1", acumulado = data.Sum(nvl => nvl.nivel_Tanque) } );
      }

      return AVGResults; 
    }

    [HttpGet("obtainAVGDiesel")]
    public ActionResult<IEnumerable<datosAVG>> avgDiesel(string startDate, string endedDate, string type){

      string startTime = "00:00:00";
      string endedTime = "11:59:59";

      int startD = this.unixTimeStamp(startDate.Split('/'), startTime);
      int endedD = this.unixTimeStamp(endedDate.Split('/'), endedTime);

      string groupby;

      switch(type){
        
        case "minute":
          groupby = "dsl.minutesGps";
          break;
        
        case "hour":
          groupby = "dsl.hoursGps";
          break;

        case "day":
          groupby = "dsl.daysGps";
          break;

        case "month":
          groupby = "dsl.monthsGps";
          break;

        default:
          groupby = "dsl.date";
          break;
      }

      var dataReport = _context.datosReporte.Where(t => t.fechaGps >= startD && t.fechaGps <= endedD).AsEnumerable().GroupBy(dsl => groupby); // This line obtain the AVG order by the hours

      List<datosAVG> AVGResults = new List<datosAVG>();
      foreach(var data in dataReport){

        AVGResults.Add( new datosAVG{ label = "1", avg = data.Average(nvl => nvl.nivel_Tanque) } );
      }

      return AVGResults;
    }

    [HttpGet("obtainAcumuladoKilometers")]
    public ActionResult<IEnumerable<datosAcumulado>> acumuladoKilometros(int startD, int endD, string type){

      string groupby;

      switch(type){
        
        case "minute":
          groupby = "km.minutesGps";
          break;
        
        case "hour":
          groupby = "km.hoursGps";
          break;

        case "day":
          groupby = "km.daysGps";
          break;

        case "month":
          groupby = "km.monthsGps";
          break;

        default:
         groupby = "km.date";
         break;
      }

      var startDate = UnixTimeStampToDateTime( startD );
      var endDate = UnixTimeStampToDateTime( endD );

      var dataReport = _context.datFileInformation.Where(t => t.date >= startDate && t.date <= endDate).AsEnumerable().GroupBy(km => groupby);

      List<datosAcumulado> AVGResults = new List<datosAcumulado>();
      foreach(var data in dataReport){

        AVGResults.Add( new datosAcumulado{ label = "1", acumulado = data.Sum(nvl => nvl.kilometer) } );
      }

      return AVGResults; 
    }

    [HttpGet("obtainAVGKilometers")]
    public ActionResult<IEnumerable<datosAVG>> avgKilometros(int startD, int endD, string type){

      string groupby;

      switch(type){
        
        case "minute":
          groupby = "km.minutesGps";
          break;
        
        case "hour":
          groupby = "km.hoursGps";
          break;

        case "day":
          groupby = "km.daysGps";
          break;

        case "month":
          groupby = "km.monthsGps";
          break;

        default:
         groupby = "km.date";
         break;
      }

      var startDate = UnixTimeStampToDateTime( startD );
      var endDate = UnixTimeStampToDateTime( endD );

      var dataReport = _context.datFileInformation.Where(t => t.date >= startDate && t.date <= endDate).AsEnumerable().GroupBy(km => groupby); 

      List<datosAVG> AVGResults = new List<datosAVG>();
      foreach(var data in dataReport){

        AVGResults.Add( new datosAVG{ label = "1", avg = data.Average(nvl => nvl.kilometer) } );
      }

      return AVGResults;
    }

    // END

    // Driver Code
    // [HttpPost("calculateSpeed")]
    // public string calculateSpeed( /* double lat1, double lon1, double lat2, double lon2, double timestamp1, double timestamp2 */ )
    // {
    //   double lat1 = 20.674070;
    //   double lon1 = -103.387645;
    //   double lat2 = 20.665995;
    //   double lon2 = -103.393046;

    //   double timestamp1 = 163028;
    //   double timestamp2 = 201749;

    //   double distance = calculateDistance(lat1, lon1, lat2, lon2);
    //   double time = traveledTime( timestamp1, timestamp2 );

    //   Console.WriteLine( time );

    //   // double speed = (distance * 1000) / time; //Se obtiene la velocidad promedio en Metros sobre Segundos
    //   double speed = ( (distance * 1000) / time ) * 3.6; // Se obtiene la velocidad promedio en Kilometros Sobre Hora

    //   return String.Format("{0:0.0}", speed);
    // }

    /**
    * Function to obtain the datetime from the timestamp
    */
    // public double traveledTime( double unixTimeStamp1, double unixTimeStamp2 ){

    //   var date1 = UnixTimeStampToDateTime( unixTimeStamp1 );
    //   var date2 = UnixTimeStampToDateTime( unixTimeStamp2 );

    //   DateTime fecha1 = Convert.ToDateTime(date1);
    //   DateTime fecha2 = Convert.ToDateTime(date2);

    //   Console.WriteLine( fecha2.Subtract(fecha1));
    //   Console.WriteLine( fecha2.Subtract(fecha1).TotalHours );

    //   double segundos = fecha2.Subtract(fecha1).TotalSeconds;

    //   return segundos;
    // }

    public DateTime UnixTimeStampToDateTime( int unixTimeStamp )
    {
        // Unix timestamp is seconds past epoch
        System.DateTime dtDateTime = new DateTime(1970, 1, 1, 0, 0, 0, 0, System.DateTimeKind.Utc);
        dtDateTime = dtDateTime.AddSeconds( unixTimeStamp ).ToLocalTime();

        return dtDateTime;
    }
    // END

    /**
    * Funcion para obtener la distancia entre dos puntos caardinales
    */
    // static double calculateDistance(double lat1, double lon1, double lat2, double lon2)
    // {
    //   // haversine Formulate, this the math form to calculate distance with coordinates
    //   // distance between latitudes and longitudes
    //   double dLat = (Math.PI / 180) * (lat2 - lat1);
    //   double dLon = (Math.PI / 180) * (lon2 - lon1);

    //   // convert to radians
    //   lat1 = (Math.PI / 180) * (lat1);
    //   lat2 = (Math.PI / 180) * (lat2);

    //   // apply formulae
    //   double a = Math.Pow(Math.Sin(dLat / 2), 2) + Math.Pow(Math.Sin(dLon / 2), 2) * Math.Cos(lat1) * Math.Cos(lat2);
    //   double rad = 6371;
    //   double c = 2 * Math.Asin(Math.Sqrt(a));
      
    //   return rad * c;
    // }
    // END

    /**
    * Function to obtain the information saved in MySql
    */

    // [HttpGet("saveCoordinatesFromMySql")]
    // public async Task<ActionResult<datosReporte>> saveCoordinatesFromMySql(){

    //   _MySqlConn.OpenConnection();

    //   var query = "SELECT * FROM table_data";

    //   MySqlCommand command = new MySqlCommand(query, _MySqlConn.connection);
    //   MySqlDataReader dataReader = command.ExecuteReader();

    //   while(dataReader.Read()){

    //       var coordinates = new datosReporte{

    //         nivel_Tanque = Convert.ToInt32(dataReader["nivel_tque_lts"]),
    //         nivel_Tanque_Porc = Convert.ToInt32(dataReader["nivel_tque_porcent"]),
    //         latitud = this.convertCoordinatesToDecimal(Convert.ToString(dataReader["latitud"])),
    //         longitud = (this.convertCoordinatesToDecimal(Convert.ToString(dataReader["longitud"])) * -1),
    //         fechaGps = Convert.ToInt32(dataReader["fecha"]) + Convert.ToInt32(dataReader["time_stamp"]),
    //         fechaRegistro = DateTime.Now,
    //       };

    //       _context.datosReporte.Add(coordinates);
    //       await _context.SaveChangesAsync();
    //   }

    //   _MySqlConn.CloseConnection();

    //   return null;
    // }

    [HttpGet("saveDataFromMySQL")]
    public string saveCoordinatesFromTrain(){

      connectToMySQL( "localhost", "ferrevalle", "root", "" );

      _MySqlConn.OpenConnection();

      var query = "SELECT * FROM datos_reporte";

      MySqlCommand command = new MySqlCommand(query, _MySqlConn.connection);
      MySqlDataReader dataReader = command.ExecuteReader();

      while(dataReader.Read()){

          var coordinates = new datosReporte{

            nivel_Tanque = Convert.ToInt32(dataReader["nivel_tanque"]),
            nivel_Tanque_Porc = Convert.ToInt32(dataReader["nivel_tanque_porc"]),
            latitud = this.convertCoordinatesToDecimal(Convert.ToString(dataReader["latitud"])),
            longitud = (this.convertCoordinatesToDecimal(Convert.ToString(dataReader["longitud"])) * -1),
            fechaGps = Convert.ToInt32(dataReader["fecha"]),
            timeGps = Convert.ToInt32(dataReader["time_stamp"]),
            fechaRegistro = DateTime.Now,

            // This lines was to agroup the data in te reports}
            minutesGps = Convert.ToInt32( UnixTimeStampToDateTime( (Convert.ToInt32(dataReader["fecha"]) + Convert.ToInt32(dataReader["time_stamp"])) ).Minute ),
            hoursGps = Convert.ToInt32( UnixTimeStampToDateTime( (Convert.ToInt32(dataReader["fecha"]) + Convert.ToInt32(dataReader["time_stamp"])) ).Hour ),
            daysGps = Convert.ToInt32( UnixTimeStampToDateTime( (Convert.ToInt32(dataReader["fecha"]) + Convert.ToInt32(dataReader["time_stamp"])) ).Day ),
            monthsGps = Convert.ToInt32( UnixTimeStampToDateTime( (Convert.ToInt32(dataReader["fecha"]) + Convert.ToInt32(dataReader["time_stamp"])) ).Month ),
          };

          _context.datosReporte.Add(coordinates);
          _context.SaveChangesAsync();
      }

      _MySqlConn.CloseConnection();

      return "Data obtained Successfully from MySQL";
    }

    /** 
    * Function para tranformar Lat°-Long° MM' SSSS(en Decimal) a coordenadas decimales
    */
    // [HttpPost("transformCoordinates/{coordinateGps}")]
    public double convertCoordinatesToDecimal(string coordinateGps){
      
      string[] dataCoordinate = coordinateGps.Split(".");

      var totChars = dataCoordinate[0].Length;
      var minutos = Convert.ToString(dataCoordinate[0][(totChars-2)]) + Convert.ToString(dataCoordinate[0][(totChars-1)]);
  
      string coordinate = "";
      for (int i = 0; i < (totChars - 2); i++)
          coordinate += dataCoordinate[0][i];
      
      // Lineas para tranformar minutos con segundos incluidos en decimales y se concatena el grado de latitud o longitud
      minutos = minutos + "." + dataCoordinate[1];
      var coordenadaDecimal = Convert.ToInt16( coordinate ) + (Convert.ToDouble(minutos) / 60);
      
      return coordenadaDecimal;
    }

    /**
      * Function para tranformar Lat°-Long° MM' SSSS" a coordenadas decimales

      [HttpPost("transformCoordinates/{coordinate}")]
      public double convertCoordinatesToDecimal(string coordinate){

        coordinate = coordinate.Replace("°", "|");
        coordinate = coordinate.Replace("'", "|");
        coordinate = coordinate.Replace('"', '|');

        string[] dataCoordinate = coordinate.Split("|");

        Double transformCoordiante = 0;
        if(Convert.ToInt16(dataCoordinate[0]) > 0)
          transformCoordiante = Convert.ToInt16(dataCoordinate[0]) + ( (Convert.ToDouble(dataCoordinate[1]) / 60) + (Convert.ToDouble(dataCoordinate[2]) / 3600) );

        else
          transformCoordiante = Convert.ToInt16(dataCoordinate[0]) - ( (Convert.ToDouble(dataCoordinate[1]) / 60) + (Convert.ToDouble(dataCoordinate[2]) / 3600) );
        
        return transformCoordiante;
      }
    */

    /**
    * Function to execute command lines to obtain the data from .dat file into a .csv file
    */
    [HttpGet("obtainDataFromDAT")]
    public void obtainDataFromDatToCsv(){
      
      executeCommands("START datFile_to_csvFile.bat");
    }

    public string executeCommands(string _Command){

      //Indicamos que deseamos inicializar el proceso cmd.exe junto a un comando de arranque. 
      //(/C, le indicamos al proceso cmd que deseamos que cuando termine la tarea asignada se cierre el proceso).
      //Para mas informacion consulte la ayuda de la consola con cmd.exe /? 
      System.Diagnostics.ProcessStartInfo procStartInfo = new System.Diagnostics.ProcessStartInfo("cmd", "/c " + _Command);
      // Indicamos que la salida del proceso se redireccione en un Stream
      procStartInfo.RedirectStandardOutput = true;
      procStartInfo.UseShellExecute = false;
      //Indica que el proceso no despliegue una pantalla negra (El proceso se ejecuta en background)
      procStartInfo.CreateNoWindow = false;
      //Inicializa el proceso
      System.Diagnostics.Process proc = new System.Diagnostics.Process();
      proc.StartInfo = procStartInfo;
      proc.Start();
      //Consigue la salida de la Consola(Stream) y devuelve una cadena de texto
      string result = proc.StandardOutput.ReadToEnd();
      //Muestra en pantalla la salida del Comando
      Console.WriteLine(result);

      return result;
    }

    [HttpPost("obtainDataFromCSV")]
    public async Task<ActionResult<datosReporte>> readFileCsv(){

      // path to the csv file
      string path = "D:/SINCI FOLDER/Sinci_Proyects/FerroValle/Documentacion/data_dat_file_test.csv";

      int x = 1;
      string[] lines = System.IO.File.ReadAllLines(path);
      foreach(string line in lines)
      {
        if(x > 3){
          
          string[] columns = line.Split(',');
          var datInfo = new datFileInformation{

            date = Convert.ToDateTime( columns[0].Replace("\"", "") + " 00:00:00" ),
            time = Convert.ToDateTime( "01/01/1969 " + columns[1].Replace("\"", "") ),
            kilometer = Convert.ToInt32(columns[2].Replace("\"", "")),
            meters = Convert.ToInt32(columns[3].Replace("\"", "")),
            speed_km_h = Convert.ToInt32(columns[4].Replace("\"", "")),
            load_amps = Convert.ToInt32(columns[5].Replace("\"", "")),
            voltaje_volts = Convert.ToInt32(columns[6].Replace("\"", "")),
            power_kw = Convert.ToInt32(columns[7].Replace("\"", "")),
            eab_bp_psi = Convert.ToInt32(columns[8].Replace("\"", "")),
            eab_bc_psi = Convert.ToInt32(columns[9].Replace("\"", "")),
            fuel_liters = Convert.ToInt32(columns[10].Replace("\"", "")),
            throttle = columns[11].Replace("\"", ""),
            pcs_open = columns[12].Replace("\"", ""),
            dir_call = columns[13].Replace("\"", ""),
            wheel_slip = columns[14].Replace("\"", ""),
            ground_relay = columns[15].Replace("\"", ""),

            // This lines was to agroup the data in te reports}
            dateSpan = unixTimeStamp( (columns[0].Replace("\"", "")).Split("/"), columns[1].Replace("\"", "") ),
            minutesGps = Convert.ToDateTime( "01/01/1969 " + columns[1].Replace("\"", "") ).Minute,
            hoursGps =Convert.ToDateTime( "01/01/1969 " + columns[1].Replace("\"", "") ).Hour,
            daysGps = Convert.ToDateTime( columns[0].Replace("\"", "") + " 00:00:00" ).Day,
            monthsGps = Convert.ToDateTime( columns[0].Replace("\"", "") + " 00:00:00" ).Month,
          }; 
 
          await _context.datFileInformation.AddAsync(datInfo);
          await _context.SaveChangesAsync();       
        }

        x++;
      }

      try
      {
        FileInfo fileD = new FileInfo(path);
        fileD.Delete();
      }
      catch (Exception e)
      {
        Console.WriteLine("Error al borrar archivo: {0}", e.ToString());
      }

      return null;
    }

    /**
    * Funcion para obtener los archivos dat del servidor
    */
    [HttpGet("obtainDatFromServer")]
    public void obtainDatFileFromServer(){

      WebClient webClient = new WebClient();
      try
      {
        webClient.DownloadFile("http://192.168.144.128/0003625.dat", @"D:\SINCI FOLDER\Sinci_Proyects\FerroValle\Documentacion\dataDatFromServer.dat");
      }
      catch (ArgumentException ae)
      {
        Console.WriteLine("{0} - {1}", ae.GetType(), ae.Message);
      }
      catch (WebException webEx)
      {
        Console.WriteLine("{0} - {1}", webEx.GetType(), webEx.Message);
        Console.WriteLine("Destination not found!");
      }
      catch (NotSupportedException supportEx)
      {
        Console.WriteLine("{0} - {1}", supportEx.GetType(), supportEx.Message);
        Console.WriteLine(supportEx.Message);
      }
      catch (Exception allExp)
      {
        Console.WriteLine("{0} - {1}", allExp.GetType(), allExp.Message);
      }
    }

    /**
    * Codigo para obtener informacion de servidor FTP
    */
    // public void testFTP(){

    //   int bufferdes = 1000;

    //   try
    //   {
    //       FtpWebRequest reqFTP;
    //       reqFTP = (FtpWebRequest)FtpWebRequest.Create("ftp://192.168.144.128/" + "0003625.DAT_27052021_1547.dat");
    //       reqFTP.Credentials = new NetworkCredential("cgtamayo", "Server2106");
    //       reqFTP.KeepAlive = false;
    //       reqFTP.Method = WebRequestMethods.Ftp.DownloadFile;
    //       reqFTP.UseBinary = true;
    //       reqFTP.Proxy = null;
    //       reqFTP.UsePassive = true;
    //       FtpWebResponse response = (FtpWebResponse)reqFTP.GetResponse();
    //       Stream responseStream = response.GetResponseStream();
    //       FileStream writeStream = new FileStream(@"D:\SINCI FOLDER\Sinci_Proyects\FerroValle\Documentacion", FileMode.Create);
    //       int Length = bufferdes;
    //       Byte[] buffer = new Byte[Length];
    //       int bytesRead = responseStream.Read(buffer, 0, Length);
    //       while (bytesRead > 0)
    //       {
    //           writeStream.Write(buffer, 0, bytesRead);
    //           bytesRead = responseStream.Read(buffer, 0, Length);
    //       }
    //       writeStream.Close();
    //       response.Close();
    //   }
    //   catch (WebException wEx)
    //   {
    //       throw wEx;
    //   }
    //   catch (Exception ex) 
    //   {
    //       throw ex;

    //   }
    // }

    /**
    * Function to save the alarms log 
    */

    [HttpPost("saveLogAlarms")]
    public async Task<ActionResult<datosReporte>> saveAlarmsLogs(){

      var alarmLog = new alarmsLogs{

        dateAlarm = DateTime.Now,
        alarmDetail = "Texto de prueba de una alarma",
        idTrain = 1,
      };

      await _context.alarmsLogs.AddAsync(alarmLog);
      await _context.SaveChangesAsync();

      return null;
    }
  }
}
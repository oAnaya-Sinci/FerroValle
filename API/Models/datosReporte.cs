using System;

namespace API.Models
{
    public class datosReporte
    {
      public int id { get; set; }  
      public int nivel_Tanque { get; set; }
      public int nivel_Tanque_Porc { get; set; }
      public double latitud { get; set; }
      public double longitud { get; set; }
      public int fechaGps { get; set; }
      public int timeGps { get; set; }
      public int minutesGps { get; set; }
      public int hoursGps { get; set; }
      public int daysGps { get; set; }
      public int monthsGps { get; set; }
      public DateTime fechaRegistro { get; set; }
    }
}
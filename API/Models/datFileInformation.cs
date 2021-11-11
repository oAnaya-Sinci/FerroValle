using System;

namespace API.Models
{
    public class datFileInformation
    {
        public int id { get; set; }
        public DateTime date { get; set; }
        public DateTime time { get; set; }
        public int kilometer { get; set; }
        public int meters { get; set; }
        public int speed_km_h { get; set; }
        public int load_amps { get; set; }
        public int voltaje_volts { get; set; }
        public int power_kw { get; set; }
        public int eab_bp_psi { get; set; }
        public int eab_bc_psi { get; set; }
        public int fuel_liters { get; set; }
        public string throttle { get; set; }
        public string pcs_open { get; set; }
        public string dir_call { get; set; }
        public string wheel_slip { get; set; }
        public string ground_relay { get; set; }
        public int dateSpan { get; set; }
        public int minutesGps { get; set; }
        public int hoursGps { get; set; }
        public int daysGps { get; set; }
        public int monthsGps { get; set; }
    }
}
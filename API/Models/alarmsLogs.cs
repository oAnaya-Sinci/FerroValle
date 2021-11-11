using System;

namespace API.Models
{
    public class alarmsLogs
    {
        public int id { get; set; }
        public DateTime dateAlarm { get; set; }
        public string alarmDetail { get; set; }
        public int idTrain { get; set; }
    }
}
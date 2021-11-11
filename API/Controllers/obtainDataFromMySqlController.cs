using System;
using System.IO;
using System.Net;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Controllers;
using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using API.Models;
using API.Data;

using System.Text.Json;
using System.Text.Json.Serialization;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class obtainDataFromMySqlController : ControllerBase
    {
        public obtainDataFromMySqlController(DataContext context, obtainCoordinatesController coordinates){

        }
    }
}
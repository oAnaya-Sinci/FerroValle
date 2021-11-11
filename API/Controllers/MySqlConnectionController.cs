using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using MySql.Data.MySqlClient;

namespace API.Controllers
{
    public class MySqlConnectionController{

        public MySqlConnection connection;

        //Constructor
        public MySqlConnectionController(string server, string database, string uid, string password, string port){

            Initialize(server, database, uid, password, port);
        }

        //Initialize values
        private void Initialize( string server, string database, string uid, string password, string port ){
            
            string connectionString;
            connectionString = "SERVER=" + server + ";" + "DATABASE=" + database + ";" + "PORT = " + port + ";" + "UID=" + uid + ";" + "PASSWORD=" + password + ";";

            connection = new MySqlConnection(connectionString);
        }

        //open connection to database
        public void OpenConnection(){

            try{
                connection.Open();
            }
            catch(Exception err){

                Console.WriteLine( err );
            }
        }

        //Close connection
        public void CloseConnection(){

            try{
                connection.Close();
            }
            catch(Exception err){

                Console.WriteLine( err );
            }
        }

        //Insert statement
        // public void Insert(){}

        //Update statement
        // public void Update(){}

        //Delete statement
        // public void Delete(){}

        //Select statement
        // public List <string> [] Select(){}

        //Count statement
        // public int Count(){}

        //Backup
        // public void Backup(){}

        //Restore
        // public void Restore(){}
    }
}
using Newtonsoft.Json;
using SampleTest.Models;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace SampleTest.Controllers
{
    public class ValuesController : ApiController
    {

        SqlConnection con = new SqlConnection(@"server=CHV4F4DM45\MSSQLSERVER2019; database=EmployeeManagement;Integrated security=true");
       
        // GET api/values
        public string Get()
        {
            SqlDataAdapter da = new SqlDataAdapter("Select * from Employees",con);
            DataTable dt = new DataTable();
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                return JsonConvert.SerializeObject(dt);
            }
            else
            {
                return "No data Found";
            }
        }

        // GET api/values/5
        public string Get(int id)
        {
            
            SqlDataAdapter da = new SqlDataAdapter("Select * from Employees where Id='"+id+"'", con);
            DataTable dt = new DataTable();
            da.Fill(dt);
            if (dt.Rows.Count > 0)
            {
                return JsonConvert.SerializeObject(dt);
            }
            else
            {
                return "No data Found";
            }

        }

        // POST api/values
        public string Post([FromBody] Contact value)  //add
        {
            // return value +"Added Successfully";
              SqlCommand cmd = new SqlCommand("Insert into Employees(EmployeeCode,Name,Email,Designation,JoiningDate,PermanentAdd1,PermanentAdd2,CommunicationAdd1,CommunicationAdd2) values('" + value.EmployeeCode+"','"+value.Name + "','"+ value.Email + "','" + value.Designation + "','" + value.JoiningDate + "','" + value.PermanentAdd1 + "','" + value.PermanentAdd2 + "','" + value.CommunicationAdd1 + "','" + value.CommunicationAdd2 + "')",con);
              con.Open();
              int i = cmd.ExecuteNonQuery();
              con.Close();
              if (i == 1)
              {
                  return "record Inserted With the value As " + value;
              }
              else
              {
                  return "Try-again no data inserted";
              }
           
        }

        // PUT api/values/5
        public string Put(int id, [FromBody] Contact value) //update
        {
            //return value+ "Update successfully with Id "+ id
            SqlCommand cmd = new SqlCommand("Update Employees set EmployeeCode='" + value.EmployeeCode + "', Name='" + value.Name + "', Email='" + value.Email + "',Designation='" + value.Designation + "',JoiningDate='" + value.JoiningDate + "',PermanentAdd1='" + value.PermanentAdd1 + "',PermanentAdd2='" + value.PermanentAdd2 + "',CommunicationAdd1='" + value.CommunicationAdd1 + "',CommunicationAdd2='" + value.CommunicationAdd2 + "' where ID='" + id +"' ", con);
            con.Open();
            int i = cmd.ExecuteNonQuery();
           
            con.Close();
            if (i == 1)
            {
                return  "record Updated With the value As " +  value +" and Id as "+ id;
            }
            else
            {
                return " Try-again no data inserted ";
            }
        }

        // DELETE api/values/5
        public string Delete(int id)
        {
            // return "Delete successfully "+ id;
            SqlCommand cmd = new SqlCommand("Delete From Employees where ID='" + id +"' ", con);
            con.Open();
            int i = cmd.ExecuteNonQuery();
            con.Close();
            if (i == 1)
            {
                SqlDataAdapter da = new SqlDataAdapter("Select * from Employees", con);
                DataTable dt = new DataTable();
                da.Fill(dt);
                if (dt.Rows.Count > 0)
                {
                    return JsonConvert.SerializeObject(dt);
                }
                else
                {
                    return "No data Found";
                }
            }
            else
            {
                return "Try-again no data inserted";
            }
        }
    }
}

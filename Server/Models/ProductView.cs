using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;


namespace Server.Models
{

    public class ProductView
    {
        public ObjectId _id { get; set; }
        public string Name { get; set; }
        public int Price { get; set; }
        public String Username { get; set; }

        public String State{get;set;}

        public String Tag{get;set;}
        public string Product { get; set; }
        public string ImgUrl { get; set; }
        public ProductView()
        {
          
        }

    }
}
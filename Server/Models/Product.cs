using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Driver;


namespace Server.Models
{

    public class Product
    {
        public ObjectId _id { get; set; }
        public string ImgUrl { get; set; }
        public int Price { get; set; }

        public string Description { get; set; }
        public string Name { get; set; }

         public List<CustomAttribute> CustomAttributes { get; set; }
       
        public Product()
        {
            CustomAttributes = new List<CustomAttribute>();
        }

    }
}
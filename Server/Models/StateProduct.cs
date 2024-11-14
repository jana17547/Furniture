using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

namespace Server.Models
{
    public class StateProduct
    {
        public ObjectId _id { get; set; }
        public String States { get; set; }
         public List<ObjectId> Products { get; set; }


         public StateProduct()
        {
            Products = new List<ObjectId>();
        }

    }
}
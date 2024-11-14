using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using MongoDB.Driver;

namespace Server.Models
{
    public class Tags
    {
        public ObjectId _id { get; set; }
        public String Tag { get; set; }
         public List<ObjectId> Products { get; set; }


         public Tags()
        {
            Products = new List<ObjectId>();
        }

    }
}
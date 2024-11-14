using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Driver;

namespace Server.Services
{

    public class MongoSession
    {
        private IMongoDatabase session;
        public IMongoDatabase Session
        {
            get
            {
                if (session == null)
                {
                    var settings = MongoClientSettings.FromConnectionString("mongodb+srv://mongoDB:mongoDB@cluster0.p2uzjes.mongodb.net/?retryWrites=true&w=majority");
                    var client = new MongoClient(settings);
                    session = client.GetDatabase("mongodb");
                }

                return session;
            }
        }
    }
}

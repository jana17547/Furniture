using MongoDB.Bson;

namespace Server.Models
{
    public class Notification
    {
        public ObjectId _id { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ProductName { get; set; }
        public string ProductId { get; set; }
        public int Price { get; set; }
        public bool Offer { get; set; }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using MongoDB.Driver.Builders;
using Server.Models;



namespace Server.Services
{



    public class DataProvider
    {
        public IMongoDatabase Session { get; set; }
        public DataProvider()
        {
            Session = new MongoSession().Session;
        }




        public User Register(User user)
        {
            var collection = Session.GetCollection<User>("Users");



            var u = collection.Find(x => x.Username == user.Username).FirstOrDefault();



            if (u == null)
            {
                User r = new User
                {
                    Username = user.Username,
                    Password = user.Password,
                    FirstName = user.FirstName,
                    LastName = user.LastName,
                    City = user.City,
                    Contact = user.Contact,
                    Money = 0
                };



                collection.InsertOne(r);
                return r;
            }
            return null;
        }



        public User LogIn(string username, string password)
        {
            var collection = Session.GetCollection<User>("Users");



            var u = collection.Find(x => x.Username == username && x.Password == password).FirstOrDefault();



            return u;
        }



        public object CreateProduct(string username,string state,string tags,Product product)
        {
            var collectionProduct = Session.GetCollection<Product>("Products");
            var collectionProductView = Session.GetCollection<ProductView>("ProductsViews");
            var collectionUser = Session.GetCollection<User>("Users");
            var collectionState=Session.GetCollection<StateProduct>("States");
            var collectionTags=Session.GetCollection<Tags>("Tags");

            var user = collectionUser.Find(x => x.Username == username).FirstOrDefault();
            var states=collectionState.Find(x=>x.States==state).FirstOrDefault();
            var tag=collectionTags.Find(x=>x.Tag==tags).FirstOrDefault();


            Product p = new Product
            {
                ImgUrl = product.ImgUrl,
                Description = product.Description,
                Price = product.Price,
                Name = product.Name,
                CustomAttributes=product.CustomAttributes
                
              
            };

            collectionProduct.InsertOne(p);

            ProductView pv = new ProductView
            {
                Name = product.Name,
                Price = product.Price,
                Username = user.Username,
                State=states.States,
                Tag= tag.Tag,
                ImgUrl = product.ImgUrl,
                Product = p._id.ToString()
            };


            collectionProductView.InsertOne(pv);

            user.Products.Add(pv._id);
            states.Products.Add(pv._id);
            tag.Products.Add(pv._id);

            var filter = Builders<User>.Filter.Eq("Username", user.Username);
            var update = Builders<User>.Update.Set("Products", user.Products);
            collectionUser.UpdateOne(filter, update);

            var filter1 = Builders<StateProduct>.Filter.Eq("States", states.States);
            var update1 = Builders<StateProduct>.Update.Set("Products", states.Products);
            collectionState.UpdateOne(filter1, update1);

            var filter2 = Builders<Tags>.Filter.Eq("Tags", tag.Tag);
            var update2 = Builders<Tags>.Update.Set("Products", tag.Products);
            collectionTags.UpdateOne(filter2, update2);
            return new { productView = pv._id.ToString(), product = pv.Product };
        }
        public StateProduct CreateState(StateProduct state)
        {
            var collectionState=Session.GetCollection<StateProduct>("States");
            StateProduct st=new StateProduct{
                States= state.States,
                Products =state.Products
            };
            collectionState.InsertOne(st);

            return st;
        }
        public Tags CreateTag(Tags tag)
        {
            var collectionTag=Session.GetCollection<Tags>("Tags");
            Tags st=new Tags{
                Tag= tag.Tag,
                Products =tag.Products
            };
            collectionTag.InsertOne(st);

            return st;
        }

        internal bool CreateOfferNotification(Notification notif, string username)
        {
            var collectionUser = Session.GetCollection<User>("Users");

            var collectionNotification = Session.GetCollection<Notification>("Notifications");

            Console.WriteLine(notif.Username);
            var seller = collectionUser.Find(x => x.Username == username).FirstOrDefault();

            var buyer = collectionUser.Find(x => x.Username == notif.Username).FirstOrDefault();


            if (buyer.Money < notif.Price)
                return false;



            Notification notification = new Notification
            {
                FirstName = notif.FirstName,
                LastName = notif.LastName,
                Offer = notif.Offer,
                Price = notif.Price,
                ProductName = notif.ProductName,
                Username = notif.Username,
                ProductId = notif.ProductId
            };



            collectionNotification.InsertOne(notification);



            seller.Notifications.Add(notification._id);



            var filter = Builders<User>.Filter.Eq("_id", seller._id);
            var update = Builders<User>.Update.Set("Notifications", seller.Notifications);
            collectionUser.UpdateOne(filter, update);



            var filter2 = Builders<User>.Filter.Eq("_id", buyer._id);
            var update2 = Builders<User>.Update.Set("Money", buyer.Money - notification.Price);
            collectionUser.UpdateOne(filter2, update2);

            return true; 
        }



        internal bool ChangeCity(string username, string city)
        {
            var collectionUser = Session.GetCollection<User>("Users");



            var user = collectionUser.Find(x => x.Username == username).FirstOrDefault();



            var filter = Builders<User>.Filter.Eq("Username", username);
            var update = Builders<User>.Update.Set("City", city);
            collectionUser.UpdateOne(filter, update);



            return true;
        }
        
    


        internal Dictionary<string, Notification> GetNotifications(string username)
        {
            var collectionUser = Session.GetCollection<User>("Users");
            var user = collectionUser.Find(x => x.Username == username).FirstOrDefault();
            var tmp = user.Notifications;

            Dictionary<string, Notification> dict = new Dictionary<string, Notification>();


            var collectionNotification = Session.GetCollection<Notification>("Notifications");



            for (int i = user.Notifications.Count - 1; i > user.Notifications.Count - 8; i--)
            {
                if (i < 0)
                    break;
                var notif = collectionNotification.Find<Notification>(x => x._id == user.Notifications[i]).FirstOrDefault<Notification>();
                dict[notif._id.ToString()] = notif;

                if (notif.Offer == false)
                {
                    var filter = Builders<Notification>.Filter.Eq("_id", user.Notifications[i]);
                    collectionNotification.DeleteOne(filter);
                    tmp.Remove(user.Notifications[i]);
                }
            }



            var filter2 = Builders<User>.Filter.Eq("Username", username);
            var update = Builders<User>.Update.Set("Notifications", tmp);
            collectionUser.UpdateOne(filter2, update);



            return dict;
        }



        internal bool OfferAnswer(string id, bool answer, string username)
        {
            var collectionNotification = Session.GetCollection<Notification>("Notifications");
            var notif = collectionNotification.Find<Notification>(x => x._id == ObjectId.Parse(id)).FirstOrDefault<Notification>();
            var collectionUser = Session.GetCollection<User>("Users");



            var buyer = collectionUser.Find(x => x.Username == notif.Username).FirstOrDefault();



            var seller = collectionUser.Find(x => x.Username == username).FirstOrDefault();

            List<ObjectId> tmp = new List<ObjectId>();
            foreach (var item in seller.Notifications)
            {
                tmp.Add(item);
            }
            var filterSeller = Builders<User>.Filter.Eq("Username", username);
            if (answer)
            {


                var update = Builders<User>.Update.Set("Money", seller.Money + notif.Price);
                collectionUser.UpdateOne(filterSeller, update);



                DeleteProduct(notif.ProductId, false);



                Notification n = new Notification
                {
                    Offer = false,
                    FirstName = seller.FirstName,
                    LastName = seller.LastName,
                    Price = notif.Price,
                    ProductName = notif.ProductName,
                    Username = "Accepted"
                };



                CreateNotification(n, buyer._id.ToString());

                //duplicates
                foreach (var item in seller.Notifications)
                {
                    var duplicate = collectionNotification.Find<Notification>(x => x._id == item && x._id != ObjectId.Parse(id)).FirstOrDefault<Notification>();
                    if (duplicate != null)
                    {
                        if (duplicate.ProductId == notif.ProductId)
                        {
                            var buyerDup = collectionUser.Find(x => x.Username == duplicate.Username).FirstOrDefault();
                            var filterDup = Builders<User>.Filter.Eq("Username", buyerDup.Username);
                            var updated = Builders<User>.Update.Set("Money", buyerDup.Money + duplicate.Price);

                            collectionUser.UpdateOne(filterDup, updated);

                            tmp.Remove(duplicate._id);
                            collectionNotification.DeleteOne(Builders<Notification>.Filter.Eq("_id", duplicate._id));

                            Notification nd = new Notification
                            {
                                Offer = false,
                                FirstName = seller.FirstName,
                                LastName = seller.LastName,
                                Price = duplicate.Price,
                                ProductName = duplicate.ProductName,
                                Username = "Declined"
                            };
                            CreateNotification(nd, buyerDup._id.ToString());

                        }
                    }
                }
            }
            else
            {
                    Console.WriteLine(id);
                Notification n = new Notification
                {
                    Offer = false,
                    FirstName = seller.FirstName,
                    LastName = seller.LastName,
                    Price = notif.Price,
                    ProductName = notif.ProductName,
                    Username = "Declined"
                };



                var filterbuyer = Builders<User>.Filter.Eq("Username", buyer.Username);
                var update = Builders<User>.Update.Set("Money", buyer.Money + notif.Price);
                collectionUser.UpdateOne(filterbuyer, update);



                CreateNotification(n, buyer._id.ToString());
            }



            tmp.Remove(notif._id);



            var update2 = Builders<User>.Update.Set("Notifications", tmp);
            collectionUser.UpdateOne(filterSeller, update2);



            collectionNotification.DeleteOne(Builders<Notification>.Filter.Eq("_id", notif._id));
            return true;
        }

        private void DeleteNotificationsByProduct(string ownerUsername, string productId)
        {
            var collectionUser = Session.GetCollection<User>("Users");
            var collectionNotification = Session.GetCollection<Notification>("Notifications");

            var seller = collectionUser.Find(x => x.Username == ownerUsername).FirstOrDefault();

            List<ObjectId> tmp = new List<ObjectId>();
            foreach (var item in seller.Notifications)
            {
                tmp.Add(item);
            }
            var filterSeller = Builders<User>.Filter.Eq("Username", ownerUsername);

            foreach (var item in seller.Notifications)
            {
                var duplicate = collectionNotification.Find<Notification>(x => x._id == item && x.ProductId == productId).FirstOrDefault<Notification>();

                if (duplicate != null)
                {

                    var buyerDup = collectionUser.Find(x => x.Username == duplicate.Username).FirstOrDefault();
                    var filterDup = Builders<User>.Filter.Eq("Username", buyerDup.Username);
                    var updated = Builders<User>.Update.Set("Money", buyerDup.Money + duplicate.Price);

                    collectionUser.UpdateOne(filterDup, updated);

                    tmp.Remove(duplicate._id);
                    collectionNotification.DeleteOne(Builders<Notification>.Filter.Eq("_id", duplicate._id));

                    Notification nd = new Notification
                    {
                        Offer = false,
                        FirstName = seller.FirstName,
                        LastName = seller.LastName,
                        Price = duplicate.Price,
                        ProductName = duplicate.ProductName,
                        Username = "Declined"
                    };
                    CreateNotification(nd, buyerDup._id.ToString());


                }
            }

            var update2 = Builders<User>.Update.Set("Notifications", tmp);
            collectionUser.UpdateOne(filterSeller, update2);
        }



        private void CreateNotification(Notification n, string v)
        {
            var collectionUser = Session.GetCollection<User>("Users");



            var collectionNotification = Session.GetCollection<Notification>("Notifications");



            var receiver = collectionUser.Find(x => x._id == ObjectId.Parse(v)).FirstOrDefault();




            collectionNotification.InsertOne(n);



            receiver.Notifications.Add(n._id);



            var filter = Builders<User>.Filter.Eq("_id", receiver._id);
            var update = Builders<User>.Update.Set("Notifications", receiver.Notifications);
            collectionUser.UpdateOne(filter, update);
        }



        internal bool GiveMeMoney(string username, int cash)
        {
            var collectionUser = Session.GetCollection<User>("Users");



            var user = collectionUser.Find(x => x.Username == username).FirstOrDefault();



            var filter = Builders<User>.Filter.Eq("Username", username);
            var update = Builders<User>.Update.Set("Money", user.Money + cash);
            collectionUser.UpdateOne(filter, update);



            return true;
        }



        internal List<String> GetUserDetails(string id)
        {
            var collectionUser = Session.GetCollection<User>("Users");
            var user = collectionUser.Find(x => x.Username == id).FirstOrDefault();
            List<string> vs = new List<string>();
            vs.Add(user.FirstName);
            vs.Add(user.LastName);
            vs.Add(user.City);
            vs.Add(user.Contact);


            return vs;
        }

        internal List<StateProduct> GetStates()
        {
            var collectionState=Session.GetCollection<StateProduct>("States");
            List<StateProduct> states = collectionState.AsQueryable().ToList();
            return states;
            
        }

        internal List< ProductView> GetSearchResults(string tag,string state, int minPrice, int maxPrice)
        {
            var collectionProductView = Session.GetCollection<ProductView>("ProductsViews");
            var collectionProduct = Session.GetCollection<Product>("Products");
            List< ProductView> result = new List<ProductView>();
            List<ProductView> list;
           
                 list = (from productView in collectionProductView.AsQueryable()
                          where productView.Price >= minPrice &&
                          productView.Price <= maxPrice &&
                          productView.Tag.Contains(tag)&&
                          productView.State.Contains(state)
                          orderby productView.Price ascending
                          select productView).Take<ProductView>(5).ToList<ProductView>();
           

           
            return list;
        }

        internal bool ChangeContact(string username, string contact)
        {
            var collectionUser = Session.GetCollection<User>("Users");



            var user = collectionUser.Find(x => x.Username == username).FirstOrDefault();



            var filter = Builders<User>.Filter.Eq("Username", username);
            var update = Builders<User>.Update.Set("Contact", contact);
            collectionUser.UpdateOne(filter, update);



            return true;
        }





        internal void DeleteProduct(string id, bool notif = true)
        {
            var collectionProduct = Session.GetCollection<Product>("Products");
            var collectionProductView = Session.GetCollection<ProductView>("ProductsViews");
            var collectionUser = Session.GetCollection<User>("Users");




            ObjectId objectId = ObjectId.Parse(id);



            ProductView p = collectionProductView.Find<ProductView>(x => x.Product == id).FirstOrDefault<ProductView>();



            User u = collectionUser.Find<User>(x => x.Username == p.Username).FirstOrDefault<User>();

            if (notif)
                this.DeleteNotificationsByProduct(p.Username, id);

             System.Console.WriteLine(notif);

            u.Products.Remove(objectId);



            var filter = Builders<User>.Filter.Eq("Username", u.Username);
            var update = Builders<User>.Update.Set("Products", u.Products);
            collectionUser.UpdateOne(filter, update);



            collectionProduct.DeleteOne<Product>(x => x._id == ObjectId.Parse(p.Product));
            collectionProductView.DeleteOne<ProductView>(x => x.Product == id);
        }

        public List<ProductView> GetMyProducts(string username)
        {
            var collectionUser = Session.GetCollection<User>("Users");
            var user = collectionUser.Find(x => x.Username == username).FirstOrDefault();
            List<ProductView> list = new List<ProductView>();



            var collectionProductView = Session.GetCollection<ProductView>("ProductsViews");
            List<ProductView> p = collectionProductView.Find(x=>x.Username==username).ToList();
           
            return p;

           
        }

        public User GetUser(string username)
        {
            var collection = Session.GetCollection<User>("Users");
            User user = collection.Find(x => x.Username== username).FirstOrDefault();
            return user;
        }

        public Product GetProductDetails(string id)
        {
            var collection = Session.GetCollection<Product>("Products");
            Product product = collection.Find(x => x._id == ObjectId.Parse(id)).FirstOrDefault();
            return product;
        }
        
         internal List<Tags> GetTags()
        {
            var collectionState=Session.GetCollection<Tags>("Tags");
            List<Tags> tag = collectionState.AsQueryable().ToList();
            return tag;
            
        }



        internal bool CheckNotification(string usernameSeller, string usernameBuyer, string idProduct)
        {
            var collectionUser = Session.GetCollection<User>("Users");
            var user = collectionUser.Find(x => x.Username == usernameSeller).FirstOrDefault();

            var collectionNotification = Session.GetCollection<Notification>("Notifications");



            for (int i = 0; i < user.Notifications.Count; i++)
            {
                var notif = collectionNotification.Find<Notification>(x => x._id == user.Notifications[i] && x.Username == usernameBuyer && x.ProductId == idProduct).FirstOrDefault<Notification>();
                if(notif!=null)
                    return false;
            }
            return true;

        }
    }
}
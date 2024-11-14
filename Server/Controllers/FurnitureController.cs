using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using MongoDB.Driver;
using Server.Models;
using Server.Services;

namespace Server.Controllers
{
    [ApiController]
    [Route("[controller]")]

    public class FurnitureController : ControllerBase
    {
        public DataProvider data { get; set; }

        public FurnitureController()
        {
            data = new DataProvider();
        }


        [HttpGet]
        [Route("LogIn/{username}&{password}")]
        public IActionResult LogIn(string username, string password)
        {
            var a = data.LogIn(username, password);
            if (a != null)
                return Ok(a);
            return BadRequest();
        }
        [HttpGet]
        [Route("GetStates")]
        public List<StateProduct> GetStates()
        {
            return data.GetStates();
        }
        [HttpGet]
        [Route("GetUser/{username}")]
        public User GetUser(string username)
        {
            return data.GetUser(username);
        }
        [HttpPost]
        [Route("Register")]
        public IActionResult Register([FromBody] User user)
        {
            Console.WriteLine(user.ToJson());
            var a = data.Register(user);
            if (a != null)
                return Ok(a);
            return BadRequest();
        }

        [HttpPost]
        [Route("CreateProduct/{username}/{states}/{tags}")]
        public object CreateProductAsync(string username,string states,string tags,[FromBody]Product product)
        {
            return data.CreateProduct(username,states,tags,product);
        }

        [HttpPost]
        [Route("CreateState")]
        public object CreateStateAsync([FromBody] StateProduct state)
        {
            return data.CreateState(state);
        }
        [HttpPost]
        [Route("CreateTags")]
        public object CreateTagsAsync([FromBody] Tags tag)
        {
            return data.CreateTag(tag);
        }

        [HttpPost]
        [Route("CreateNotification/{username}")]
        public IActionResult CreateNotification([FromBody] Notification notif, string username)
        {
            if (data.CreateOfferNotification(notif, username))
                return Ok();
            return BadRequest();
        }

        [HttpGet]
        [Route("CheckNotification/{usernameSeller}&{usernameBuyer}&{idProduct}")]
        public IActionResult GetMyProducts(string usernameSeller, string usernameBuyer, string idProduct)
        {
            if(data.CheckNotification(usernameSeller, usernameBuyer, idProduct))
                return Ok();
            return BadRequest();

        }

        [HttpGet]
        [Route("GetMyProducts/{username}")]
        public List< ProductView> GetMyProducts(string username)
        {
            return data.GetMyProducts(username);

        }

        [HttpGet]
        [Route("GetTags")]
        public List<Tags> GetTags()
        {
            return data.GetTags();

        }

        [HttpGet]
        [Route("GetProductDetails/{id}")]
        public Product GetProductDetails(string id)
        {
            return data.GetProductDetails(id);

        }



        [HttpDelete]
        [Route("DeleteProduct/{id}")]
        public void DeleteProduct(string id)
        {
            data.DeleteProduct(id);
        }


        [HttpPatch]
        [Route("ChangeCity/{username}&{City}")]
        public IActionResult ChangeCity(string username, string City)
        {
            if (data.ChangeCity(username, City))
                return Ok();
            else return BadRequest();
        }

        [HttpPatch]
        [Route("ChangeContact/{username}&{Contact}")]
        public IActionResult ChangeContact(string username, string Contact)
        {
            if (data.ChangeContact(username, Contact))
                return Ok();
            else return BadRequest();
        }

        [HttpPut]
        [Route("GiveMeMoney/{username}&{Cash}")]
        public IActionResult GiveMeMoney(string username, int Cash)
        {
            if (data.GiveMeMoney(username, Cash))
                return Ok();
            else return BadRequest();
        }

        [HttpGet]
        [Route("GetSearchResults/{tag}/{state}/{minPrice}/{maxPrice}")]
        public List<ProductView> GetSearchResults(string tag, string state,int minPrice, int maxPrice)
        {
            return data.GetSearchResults(tag,state, minPrice, maxPrice);

        }

        [HttpGet]
        [Route("GetUserDetails/{id}")]
        public List<String> GetUserDetails(string id)
        {
            return data.GetUserDetails(id);

        }

        [HttpGet]
        [Route("GetNotifications/{username}")]
        public Dictionary<string,Notification> GetNotifications(string username)
        {
            return data.GetNotifications(username);

        }

        [HttpPut]
        [Route("OfferAnswer/{id}&{answer}&{ownerUsername}")]
        public IActionResult OfferAnswer(string id, bool answer, string ownerUsername)
        {
            return Ok(data.OfferAnswer(id, answer, ownerUsername));

        }
    }
}
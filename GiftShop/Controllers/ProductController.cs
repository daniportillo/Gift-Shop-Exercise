using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;
using System.Web.Http;
using System.Web.Http.Description;
using GiftShop.Models;
using Newtonsoft.Json;

namespace GiftShop.Controllers
{
    [RoutePrefix("api/product")]
    public class ProductController : ApiController
    {
        private gift_shopEntities4 giftEntities = new gift_shopEntities4();

        /*Get all products*/
        [HttpGet]
        public HttpResponseMessage getAll()
        {
            var serializedData = JsonConvert.SerializeObject(giftEntities.products.ToList());
            var response = new HttpResponseMessage(HttpStatusCode.OK);
            response.Content = new StringContent(serializedData);
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return response;
        }

        /* Get a product from ID Value */
        [HttpGet]
        [Route("{id}")]
        public HttpResponseMessage getProduct(int id)
        {
            var serializedData = JsonConvert.SerializeObject(giftEntities.products.Find(id));
            var response = new HttpResponseMessage(HttpStatusCode.OK);
            response.Content = new StringContent(serializedData);
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            return response;
        }

        /*Create a new product*/
        /*[HttpPost]
        public void newProduct(product _product)
        {
            giftEntities.products.Add(_product);
            giftEntities.SaveChanges();
        }*/
        // POST api/product
        [System.Web.Http.AcceptVerbs("POST")]
        [System.Web.Http.HttpPost]
        [ResponseType(typeof(product))]
        public HttpResponseMessage Post(product model)
        {

            if (ModelState.IsValid)
            {
                var startWorkingDay = JsonConvert.DeserializeObject<product>(HttpContext.Current.Request.Form["startWorkingDay"]);
                giftEntities.products.Add(startWorkingDay);
                giftEntities.SaveChanges();
                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, startWorkingDay);
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        /* Update a product */
        [HttpPut]
        public void updateProduct(product _product)
        {
            giftEntities.Entry<product>(_product).State = System.Data.Entity.EntityState.Modified;
            giftEntities.SaveChanges();
        }

        /* Delete a product */
        [HttpDelete]
        [Route("{id}")]
        public void deleteProduct(int id)
        {
            giftEntities.products.Remove(giftEntities.products.Find(id));
            giftEntities.SaveChanges();
        }
    }
}

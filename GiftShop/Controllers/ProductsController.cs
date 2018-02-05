using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace GiftShop.Controllers
{
    public class ProductsController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }
        public ActionResult  Management()
        {
            /*if (Session["role"].ToString() == "admin")
            {
                
            }*/
            
               // return RedirectToAction("Login", "Login");

            return View();



        }
    }
}
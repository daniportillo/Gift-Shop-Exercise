using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Mvc;
using GiftShop.Models;
using System.Web;
using System.Text;
using System.Web.Security;

namespace GiftShop.Controllers
{

    public class LoginController : Controller
    {
        // GET: /Login/  
        public ActionResult Login()
        {
            return View();
        }
        
        [HttpPost]
        public string Login(user data)
        {
            bool isPasswordCorrect = false;
            string un = data.username;
            string Password = data.password;
            using (userEntity entity = new userEntity())
            {
                var user = entity.users.Where(u => u.username == un).FirstOrDefault();
                if (user != null)
                {
                    if (Password == user.password)
                    {
                        Session["LoginID"] = user.id;
                        Session["Username"] = user.username;
                        Session["role"] = user.role;
                        return user.id.ToString();
                    }
                    else
                    {
                        return "0";
                    }
                }
                else
                {
                    return "-1";
                }
            }
        }
    }
}

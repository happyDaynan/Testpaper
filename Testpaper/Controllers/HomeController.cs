using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Testpaper.Models;
using Testpaper.Toolman;

namespace Testpaper.Controllers
{
    public class HomeController : Controller
    {
        testerEntities db = new testerEntities();
        
        // GET: Home
        public ActionResult Index()
        {
            ViewBag.Classno = Tools.PaperClass();

            return View();
        }

        
    }
}
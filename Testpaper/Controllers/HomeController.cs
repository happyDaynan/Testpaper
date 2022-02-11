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
            var data = db.CN_PaperCode.ToArray();

            ViewBag.Classno = Tools.PaperClass();
            ViewBag.Corrugated = Tools.Corrugated();
            // ViewBag.data = data;

            return View(data);
        }

        
    }
}
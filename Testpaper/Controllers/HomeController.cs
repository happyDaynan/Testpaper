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
            ViewBag.data = db.CN_PaperCode.Where(m => m.invalid != true)
                           .Select(m => new { m.id, m.avgWet, m.remark}).ToArray();

            ViewBag.Corrugateddetail = db.corrugatedTypedetail.ToArray();

            ViewBag.ringruptureindex = db.basepaper_physicalproperty.ToArray();

            ViewBag.Classno = Tools.PaperClass();
            ViewBag.Corrugated = Tools.Corrugated();
            ViewBag.Corepaper = Tools.Corepaper();

            // ViewBag.data = data;

            return View();
        }

        
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Mvc;
using Testpaper.Models;

namespace Testpaper.Toolman
{
    public class Tools
    {
        public static List<SelectListItem> PaperClass()
        {
            using (testerEntities db = new testerEntities())
            {
                var classlist = db.PaperClass.ToArray();

                List<SelectListItem> classselect = new List<SelectListItem>();

                foreach (var item in classlist.Select(m => new { m.Id, m.ClassNo}))
                {
                    classselect.Add(new SelectListItem()
                    {
                        Text = item.ClassNo,
                        Value = item.Id.ToString()
                    });
                }

                return classselect;
            }

        }
    }
}

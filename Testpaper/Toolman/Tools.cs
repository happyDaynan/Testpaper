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
                
                var classlist = db.CN_PaperCode.Where(m => !m.invalid.HasValue).ToArray();

                List<SelectListItem> classselect = new List<SelectListItem>();

                foreach (var item in classlist.OrderByDescending(m => m.remark).Select(m => new { m.code, m.id, m.avgWet }))
                {
                    classselect.Add(new SelectListItem()
                    {
                        Text = item.code,
                        Value = item.id.ToString()
                    });
                }

                return classselect;
            }

        }

        // 楞型
        public static List<SelectListItem> Corrugated() {
            using (testerEntities db = new testerEntities())
            {
                var Corrugatedlist = db.corrugatedTypedetail.ToArray();

                List<SelectListItem> Corrugatedselect = new List<SelectListItem>();

                foreach (var item in Corrugatedlist)
                {
                    Corrugatedselect.Add(new SelectListItem()
                    {
                        Text = item.corrugatedType,
                        Value = item.Id.ToString()
                    });
                }

                return Corrugatedselect;
            }
        }

    }
}

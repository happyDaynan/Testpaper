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

                foreach (var item in classlist.Select(m => new { m.code, m.remark }))
                {
                    classselect.Add(new SelectListItem()
                    {
                        Text = item.code,
                        Value = item.remark.ToString()
                    });
                }

                return classselect;
            }

        }
    }
}

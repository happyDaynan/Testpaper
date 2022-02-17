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
        // 產生處理過的paperCode
        //public static List<CN_PaperCode> PaperCodes()
        //{
        //    using (testerEntities db = new testerEntities())
        //    {
        //        var a = db.CN_PaperCode.Where(m => !m.invalid.HasValue).ToArray();

        //        return a;
        //    }
        //}

        public static List<SelectListItem> PaperClass()
        {
            using (testerEntities db = new testerEntities())
            {
                List<string> Core = new List<string>()
                {
                    "302",
                    "307"
                };


                var classlist = db.CN_PaperCode.Where(m => !m.invalid.HasValue && !Core.Contains(m.remark)).ToArray();

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

        // 芯紙
        public static List<SelectListItem> Corepaper()
        {
            using (testerEntities db = new testerEntities())
            {
                List<string> Core = new List<string>()
                {
                    "302",
                    "307"
                };

                var Corelist = db.CN_PaperCode.Where(m => !m.invalid.HasValue && Core.Contains(m.remark)).ToArray();

                List<SelectListItem> Coreselect = new List<SelectListItem>();

                foreach(var item in Corelist)
                {
                    Coreselect.Add(new SelectListItem() {
                        Text = item.code,
                        Value = item.id.ToString()
                    });
                }


                return Coreselect;
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

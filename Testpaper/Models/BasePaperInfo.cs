//------------------------------------------------------------------------------
// <auto-generated>
//     這個程式碼是由範本產生。
//
//     對這個檔案進行手動變更可能導致您的應用程式產生未預期的行為。
//     如果重新產生程式碼，將會覆寫對這個檔案的手動變更。
// </auto-generated>
//------------------------------------------------------------------------------

namespace Testpaper.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class BasePaperInfo
    {
        public int Id { get; set; }
        public int SortId { get; set; }
        public int BasePaperNo { get; set; }
        public Nullable<decimal> RuptureValue { get; set; }
        public Nullable<decimal> PressureValue { get; set; }
    
        public virtual PaperSort PaperSort { get; set; }
    }
}

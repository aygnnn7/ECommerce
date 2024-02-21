using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ECommerceAPI.Infrastructure.Operations
{
    public class NameOperation
    {
        public static string CharacterRegulatory(string name)
        {
            try
            {
                return name.Replace("/", "")
                .Replace("\\", "")
                .Replace("!", "")
                .Replace("\"", "")
                .Replace("£", "")
                .Replace("$", "")
                .Replace("%", "")
                .Replace("^", "")
                .Replace("&", "")
                .Replace("*", "")
                .Replace("(", "")
                .Replace(")", "")
                .Replace("+", "")
                .Replace("}", "")
                .Replace("{", "")
                .Replace("[", "")
                .Replace("]", "")
                .Replace("#", "")
                .Replace("'", "")
                .Replace(";", "")
                .Replace(",", "")
                .Replace("_", "")
                .Replace("<", "")
                .Replace(">", "")
                .Replace(".", "_");
            }
            catch (Exception e)
            {

                throw e;
            }
              
        }
           
        
    }
}

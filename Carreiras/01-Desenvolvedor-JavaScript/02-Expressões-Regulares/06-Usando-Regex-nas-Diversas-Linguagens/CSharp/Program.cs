using System;
using System.Collection.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace JavaScript {
    class Program {
        static void main (string[] args) {
            string alvo = "11a22b33c";
            string pattern = @"(\d\d)(\w)";

            Regex regex = new Regex (pattern); //criando o objeto da expressão regular
            Match match = regex.Match(alvo); //criando o match (grupos encontrados)

            Console.WriteLine(match.Groups[0].Value);
            Console.WriteLine(match.Groups[1].Value);
            Console.WriteLine(match.Groups[2].Value);
            Console.WriteLine(match.Index);
            Console.WriteLine(match.Length);
        }
    }
}

/*Como podemos, através de regex alterar o formato de uma data 2007-12-31 para 31/12/2007?
using System.Text.RegularExpressions;

namespace Rextester
{
    public class Program
    {
        public static void Main(string[] args)
        {
           string alvo = "2007-12-31";
           Regex regexp = new Regex(@"(\d{4})(-)(\d{2})(-)(\d{2})");

            MatchCollection resultados = regexp.Matches(alvo);
            foreach(Match resultado in resultados)
            {

                string ano = resultado.Groups[1].Value;
                string mes = resultado.Groups[3].Value;
                string dia = resultado.Groups[5].Value;

                string separador1 = resultado.Groups[2].Value;
                string separador2 = resultado.Groups[4].Value;

                Console.WriteLine(string.Format("{0}/{1}/{2}", dia, mes, ano));
            }
        }
    }
}
*/

/*
 "Alura".replaceAll("[Aa]", "*") //*lur*

Como podemos fazer para trocar o separador - por /?

 using System.Text.RegularExpressions;

namespace Rextester
{
    public class Program
    {
        public static void Main(string[] args)
        {
           string alvo = "2007-12-31";
           Regex regexp = new Regex(@"(\d{4})(-)(\d{2})(-)(\d{2})");

            MatchCollection resultados = regexp.Matches(alvo);
            foreach(Match resultado in resultados)
            {

                string ano = resultado.Groups[1].Value;
                string mes = resultado.Groups[3].Value;
                string dia = resultado.Groups[5].Value;

                string separador1 = resultado.Groups[2].Value;
                string separador2 = resultado.Groups[4].Value;

                string novaData = string.Format("{0}{1}{2}{3}{4}", dia, separador1, mes, separador2, ano).Replace("-", "/");
                Console.WriteLine(novaData);
            }
        }
    }
}
*/
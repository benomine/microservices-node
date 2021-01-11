using System;
using System.Collections.Generic;
using System.Text;

namespace ClientService
{
    public class Conversion
    {
        public string Nom { get; set; }
        public string NomUser { get; set; }
        public double Valeur { get; set; }
        public DateTime DateAppel { get; set; }
        public int Sens { get; set; }

        public Conversion()
        {
        }

        public Conversion(string nom, string nomUser, double valeur, DateTime dateAppel, int sens)
        {
            Nom = nom;
            NomUser = nomUser;
            Valeur = valeur;
            DateAppel = dateAppel;
            Sens = sens;
        }
    }
}

using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Text;

namespace ClientAdmin
{
    [BsonIgnoreExtraElements]
    public class Conversion
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string Id { get; set; }
        [BsonElement("nom")]
        public string Nom { get; set; }
        [BsonElement("nomUser")]
        public string NomUser { get; set; }
        [BsonElement("valeur")]
        public double Valeur { get; set; }
        [BsonElement("dateAppel")]
        public DateTime DateAppel { get; set; }

        [BsonConstructor]
        public Conversion(string nom, string nomUser, double valeur, DateTime dateAppel)
        {
            Nom = nom;
            NomUser = nomUser;
            Valeur = valeur;
            DateAppel = dateAppel;
        }
    }
}

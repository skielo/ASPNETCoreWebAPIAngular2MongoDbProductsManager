using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
 
namespace WebAPIApplication.Models
{
    public class Product: StorableObject
    {
        [BsonElement("ProductId")]
        public int ProductId { get; set; }
        [BsonElement("ProductName")]
        public string ProductName { get; set; }
        [BsonElement("Price")]
        public int Price { get; set; }
        [BsonElement("Category")]
        public string Category { get; set; }
    }
}
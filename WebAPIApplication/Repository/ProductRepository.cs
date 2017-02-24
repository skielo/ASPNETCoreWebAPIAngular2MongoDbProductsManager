
using System.Collections.Generic;
using System.Linq;
using MongoDB.Driver;
using WebAPIApplication.Models;
using WebAPIApplication.Repository.Abstract;

namespace WebAPIApplication.Repository
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {

        public ProductRepository(): base ("Products")
        {
        }
        public Product InsertProduct(Product obj)
        {
            return base.Insert(obj);
        }

        public List<Product> SelectAllProducts()
        {
            return base.SelectAll();//.Select(p => p as Product).ToList();
        }

        public new List<Product> Filter(string jsonQuery)
        {
            return base.Filter(jsonQuery);//.Select(p => p as Product).ToList();
        }

        public Product GetProduct(string id)
        {
            return base.Get(id);// as Product;
        }
        public Product UpdateProduct(string id, Product obj)
        {
            return base.Update(id, obj);// as Product;
        }

        public bool RemoveProduct(string id){
            return base.Remove(id);
        }
        
    }
}
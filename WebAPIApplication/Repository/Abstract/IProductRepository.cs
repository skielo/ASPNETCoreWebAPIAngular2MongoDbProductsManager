using System.Collections.Generic;
using WebAPIApplication.Models;

namespace WebAPIApplication.Repository.Abstract
{
    public interface IProductRepository
    {
            Product InsertProduct(Product obj);

            List<Product> SelectAllProducts();

            List<Product> Filter(string jsonQuery);

            Product GetProduct(string id);
            Product UpdateProduct(string id, Product obj);

            bool RemoveProduct(string id);
    }
}
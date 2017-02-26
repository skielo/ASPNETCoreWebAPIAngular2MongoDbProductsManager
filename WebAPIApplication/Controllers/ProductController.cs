using System.Collections.Generic;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using WebAPIApplication.Models;
using WebAPIApplication.Repository.Abstract;

namespace WebAPIApplication.Controllers
{
    [EnableCors("AllowAll")]
    [Route("api/[controller]")]
    public class ProductsController : Controller
    {
        private readonly IProductRepository _repo;
        private readonly ILogger _logger;
 
        public ProductsController(IProductRepository repo, ILogger<ProductsController> logger)
        {
            _repo = repo; 
            _logger = logger;
        }
 
        [HttpGet]
        public IEnumerable<Product> Get()
        {
            _logger.LogInformation("Listing all products");
            return _repo.SelectAllProducts();
        }
        [HttpGet("{id:length(24)}")]
        public IActionResult Get(string id)
        {
            var product = _repo.GetProduct(id);
            if (product == null)
            {
                return NotFound();
            }
            return new ObjectResult(product);
        }
 
        [HttpPost]
        public IActionResult Post([FromBody]Product p)
        {
            _repo.InsertProduct(p);
            return new OkObjectResult(p);
        }
        [HttpPut("{id:length(24)}")]
        public IActionResult Put(string id, [FromBody]Product p)
        {
            var product = _repo.GetProduct(id);
            if (product == null)
            {
                return  new NotFoundResult();
            }
            
            _repo.UpdateProduct(id, p);
            return new OkResult();
        }
 
        [HttpDelete("{id:length(24)}")]
        public IActionResult Delete(string id)
        {
            var product = _repo.GetProduct(id);
            if (product == null)
            {
                return NotFound();
            }
 
            _repo.RemoveProduct(id);
            return new OkResult();
        }
    }
}
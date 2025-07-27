using Microsoft.AspNetCore.Mvc;
using Models;
using Services;

namespace Controllers
{
    [ApiController]
    [Route("api/Products")]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }

        [HttpGet]
        public ActionResult<List<Product>> listProducts()
        {
            var products = _productService.GetProducts();
            return products == null ? NotFound() : Ok(products);
        }

        [HttpGet("{id}")]
        public ActionResult<Product> GetProductById(int id)
        {
            var product = _productService.GetById(id);
            return product == null ? NotFound() : Ok(product);
        }

        [HttpPost]
        public ActionResult<Product> createProduct([FromBody] Product product)
        {
            try
            {
                var newProduct = _productService.CreateProduct(product);
                return newProduct;

            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }



    }
}

using Models;

namespace Services
{
    public interface IProductService
    {
        List<Product> GetProducts();
        Product GetById(int id);
        Product CreateProduct(Product model);
    }
}

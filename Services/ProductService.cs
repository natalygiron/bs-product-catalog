using Models;

namespace Services
{
    public class ProductService : IProductService
    {
        private readonly List<Product> _products = new();
        private int _id = 1;

        public Product CreateProduct(Product product)
        {
            ValidateProduct(product);

            var newProduct = new Product
            {
                Id = _id++,
                Name = product.Name.Trim(),
                Description = product.Description?.Trim(),
                Price = product.Price,
                Category = product.Category.Trim(),
                CreatedAt = DateTime.UtcNow
            };

            _products.Add(newProduct);
            return product;
        }

        public List<Product> GetProducts()
        {
            return _products;
        }

        public Product GetById(int id)
        {
            return _products.FirstOrDefault(u => u.Id == id);
        }

        private void ValidateProduct(Product product)
        {
            if (product == null)
            {
                throw new ArgumentNullException(nameof(product), "El producto no puede ser nulo.");
            }
            if (product.Price < 0)
            {
                throw new Exception("El precio debe ser mayor que 0.");
            }
            if (string.IsNullOrWhiteSpace(product.Category) || string.IsNullOrEmpty(product.Category))
            {
                throw new ArgumentException("El campo categoría es requerido.", nameof(product.Category));
            }

            if (string.IsNullOrWhiteSpace(product.Name) || string.IsNullOrEmpty(product.Name))
            {
                throw new ArgumentException("El campo nombre es requerido.", nameof(product.Name));
            }
        }

    }
}

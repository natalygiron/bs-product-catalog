import { useEffect, useState } from 'react';
import './App.css';
import SearchBar from './components/SearchbarComponent';
import AddProductButton from './components/AddButtonComponent';

interface Products {
    id: number,
    name: string,
    description: string,
    price: number,
    category: number,
    createdAt: string
}

function App() {
    const [products, setProducts] = useState<Products[]>([]);
    const [search, setSearch] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Products>();

    const ConsumirAPI = async () => {
        const response = await fetch("https://localhost:7233/api/Products");
        if (response.ok) {
            const data = await response.json();
            setProducts(data);
        }
    }

    useEffect(() => {
        ConsumirAPI();
    }, []);

    const filteredProducts = products.filter(
        product => product.name.toLowerCase().includes(search.toLowerCase())
    );

    function formatoFecha(fecha: Date): string {
        const day = fecha.getDate().toString().padStart(2, '0');
        const month = (fecha.getMonth() + 1).toString().padStart(2, '0');
        const year = fecha.getFullYear();
        return `${day}-${month}-${year}`;
    }

    const handleRowClick = async (product: Products) => {
        try {
            const response = await fetch(`https://localhost:7233/api/products/${product.id}`);
        if (!response.ok) {
                throw new Error('No se pudo obtener el producto');
            }
            const data = await response.json();
            setSelectedProduct(data);
            setShowModal(true);
        } catch (error) {
            console.error('Error al obtener el producto:', error);
        }
    };

    const contents = <table className="table table-striped" aria-labelledby="tableLabel">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Nombre</th>
                    <th>Descripción</th>
                    <th>Precio</th>
                    <th>Categoría</th>
                    <th>Fecha</th>
                </tr>
            </thead>
            <tbody >
                {filteredProducts && filteredProducts.map(item => (
                    <tr key={item.id} onClick={() => handleRowClick(item)} style={{ cursor: "pointer" }}>
                        <td>{item.id}</td>
                        <td>{item.name}</td>
                        <td>{item.description}</td>
                        <td>{item.price}</td>
                        <td>{item.category}</td>
                        <td>{formatoFecha(new Date(item.createdAt))}</td>
                    </tr>
                ))}
            </tbody>
        </table>;

    return (
        <div className="app-container">
            <h1 id="tableLabel">Catálogo de productos</h1>
            <div className="container">
                <SearchBar onSearch={setSearch} ></SearchBar>
                <AddProductButton onProductAdded={ConsumirAPI} />
            </div>
            {contents}

            {showModal && selectedProduct && (
                <div className="custom-modal-overlay">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Detalles del Producto</h5>
                            </div>
                            <div className="modal-body">
                                <p><strong>ID:</strong> {selectedProduct.id}</p>
                                <p><strong>Nombre:</strong> {selectedProduct.name}</p>
                                <p><strong>Descripción:</strong> {selectedProduct.description}</p>
                                <p><strong>Precio:</strong> {selectedProduct.price}</p>
                                <p><strong>Categoría:</strong> {selectedProduct.category}</p>
                                <p><strong>Fecha:</strong> {formatoFecha(new Date(selectedProduct.createdAt))}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cerrar</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default App;
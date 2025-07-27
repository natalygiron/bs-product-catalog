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
            <tbody>
                {filteredProducts && filteredProducts.map(item => (
                    <tr key={item.id}>
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
        </div>
    );
}

export default App;
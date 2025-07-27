import React, { useState } from "react";
import "./AddButtonComponent.css";

interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    category: string;
    createdAt: string;
}

interface Props {
    onProductAdded: () => void;
}

const AddProductButton: React.FC<Props> = ({ onProductAdded }) => {
    const [showModal, setShowModal] = useState(false);
    const [newProduct, setNewProduct] = useState<Product>({
        id: 0,
        name: "",
        description: "",
        price: 0,
        category: "",
        createdAt: new Date().toISOString(),
    });

    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [alertType, setAlertType] = useState("danger");

    const handleAddProduct = async () => {
        try {
            const response = await fetch("https://localhost:7233/api/Products", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newProduct),
            });
            const data = await response.json().catch(() => null);

            if (response.ok) {
                setShowModal(false);
                onProductAdded();
            } else {
                setAlertMessage(data?.message || "Error al agregar producto.");
                setAlertType("danger");
                setShowAlert(true);
                setTimeout(() => {
                    setShowAlert(false);
                }, 3000);
            }
        } catch {
            setAlertMessage("No se pudo conectar con el servidor.");
            setAlertType("danger");
            setShowAlert(true);
            setTimeout(() => {
                setShowAlert(false);
            }, 3000);
        }
        newProduct.name = "";
        newProduct.description = "";
        newProduct.price = 0;
        newProduct.category = "";
    };

    return (
        <>
            {showAlert && (
                <div className={`alert alert-${alertType} floating-alert`} role="alert">
                    {alertMessage}
                 </div >
            )}

            <button onClick={() => setShowModal(true)} className="btn btn-primary">Añadir Producto</button>

            {showModal && (
                <div className="modal-backdrop">
                    <div className="modal-content">
                        <h2 className="title">Agregar Producto</h2>
                        <input
                            type="text"
                            placeholder="Nombre"
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        />
                        <input
                            type="text"
                            placeholder="Descripción"
                            value={newProduct.description}
                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                        />
                        <input
                            type="number"
                            min="0"
                            placeholder="Precio"
                            value={newProduct.price}
                            onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })}
                        />
                        <input
                            type="text"
                            placeholder="Categoría"
                            value={newProduct.category}
                            onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                        />
                        <div className="button-container">
                            <button className="btn btn-success" onClick={handleAddProduct}>
                                Guardar
                            </button>
                            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddProductButton;

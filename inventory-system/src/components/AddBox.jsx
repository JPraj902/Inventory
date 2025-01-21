import React, { useState, useEffect } from "react";
import QRCode from "react-qr-code";

const AddBox = () => {
  const [boxName, setBoxName] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [qrCode, setQrCode] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleSubmit = () => {
    const uniqueId = Date.now().toString();
    const qrData = `Box: ${boxName}, Products: ${selectedProducts.join(", ")}`;

    fetch("http://localhost:5000/add-box", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: boxName, productIds: selectedProducts, uniqueId, qrCode: qrData }),
    })
      .then((res) => res.json())
      .then(() => {
        setQrCode(qrData);
        alert("Box added successfully!");
      });
  };

  return (
    <div>
      <h2>Add Box</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Box Name:
          <input value={boxName} onChange={(e) => setBoxName(e.target.value)} />
        </label>
        <label>
          Select Products:
          <select multiple onChange={(e) => setSelectedProducts([...e.target.selectedOptions].map((o) => o.value))}>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </label>
        <button onClick={handleSubmit}>Add Box</button>
      </form>
      {qrCode && <QRCode value={qrCode} />}
    </div>
  );
};

export default AddBox;

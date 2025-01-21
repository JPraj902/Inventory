import React, { useState } from "react";
import QRCode from "react-qr-code";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [weight, setWeight] = useState("");
  const [qrCode, setQrCode] = useState(null);

  const handleSubmit = () => {
    const uniqueId = Date.now().toString();
    const qrData = `Product: ${name}, ID: ${uniqueId}`;

    fetch("http://localhost:5000/add-product", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, size, weight, uniqueId, qrCode: qrData }),
    })
      .then((res) => res.json())
      .then(() => {
        setQrCode(qrData);
        alert("Product added successfully!");
      });
  };

  return (
    <div>
      <h2>Add Product</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <label>
          Name:
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Size:
          <input value={size} onChange={(e) => setSize(e.target.value)} />
        </label>
        <label>
          Weight:
          <input value={weight} onChange={(e) => setWeight(e.target.value)} />
        </label>
        <button onClick={handleSubmit}>Add Product</button>
      </form>
      {qrCode && <QRCode value={qrCode} />}
    </div>
  );
};

export default AddProduct;

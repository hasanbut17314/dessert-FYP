const Products = () => {
    const dummyProducts = [
      {
        name: "Vanilla Ice Cream",
        price: "$5",
        category: "Ice Cream",
        image: "https://via.placeholder.com/150",
      },
      {
        name: "Chocolate Shake",
        price: "$4",
        category: "Drinks",
        image: "https://via.placeholder.com/150",
      },
    ];
  
    return (
      <>
        <h2>Products</h2>
        <button style={{ marginBottom: "20px" }}>+ Add Product</button>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {dummyProducts.map((product, idx) => (
            <div key={idx} style={{ border: "1px solid #ccc", padding: "10px", width: "200px" }}>
              <img src={product.image} alt={product.name} style={{ width: "100%" }} />
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              <p><strong>{product.category}</strong></p>
            </div>
          ))}
        </div>
      </>
    );
  };
  
  export default Products;
  
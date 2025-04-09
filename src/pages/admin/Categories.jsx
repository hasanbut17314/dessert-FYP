const Categories = () => {
    return (
      <>
        <h2>Categories</h2>
        <button style={{ marginBottom: "20px" }}>+ Add Category</button>
        <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
          {/* Dummy data */}
          {["Ice Cream", "Drinks", "Cakes"].map((cat, index) => (
            <div key={index} style={{ border: "1px solid #ccc", padding: "10px" }}>
              <h3>{cat}</h3>
            </div>
          ))}
        </div>
      </>
    );
  };
  
  export default Categories;
  

function CategoryCard({ category }) {
  return (
    <div className="amazon-card">
      <h2>{category.title}</h2>

      <div className="card-grid">
        {category.items.map((item, index) => (
          <div className="grid-item" key={index}>
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
          </div>
        ))}
      </div>

      <a href="#">See More</a>
    </div>
  );
}

export default CategoryCard;
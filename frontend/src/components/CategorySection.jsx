import categories from "../data/categories";
import CategoryCard from "./CategoryCard";

function CategorySection() {
  return (
    <section className="category-section">
      {categories.map((category) => (
        <CategoryCard
          key={category.id}
          category={category}
        />
      ))}
    </section>
  );
}

export default CategorySection;
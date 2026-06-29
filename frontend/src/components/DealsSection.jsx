import deals from "../data/deals";

function DealsSection() {
  return (
    <section className="deals-section">
      <div className="section-header">
        <h2>Today's Deals</h2>
        <a href="#">See all deals</a>
      </div>

      <div className="deals-container">
        {deals.map((deal) => (
          <div className="deal-card" key={deal.id}>
            <img src={deal.image} alt={deal.title} />
            <span className="discount">{deal.discount}</span>
            <p>{deal.title}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default DealsSection;
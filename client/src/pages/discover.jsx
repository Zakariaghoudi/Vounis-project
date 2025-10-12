import { useSelector } from "react-redux";
import "../styles/discover.css"
function Discover() {
  const opportunities = useSelector((state) => state.opportunity.opportunity);
  console.log(opportunities);

  return (
    <div className="discover-page">
      <h1>Available Opportunities</h1>

      {opportunities && opportunities.length > 0 ? (
        <div className="opp-container">
          {opportunities.map((opportunity) => (
            <div key={opportunity?._id} className="opp-card">
              <span>Title:<h4>{opportunity?.title}</h4></span>
              <span>Description: {opportunity?.description}</span>
              <span>Location: {opportunity?.location}</span>
              <span>Skills required: {opportunity?.skills}</span>
              <span>Status: {opportunity?.status}</span>
            </div>
          ))}
        </div>
      ) : (
        <p>No opportunities available.</p>
      )}
    </div>
  );
}

export default Discover;

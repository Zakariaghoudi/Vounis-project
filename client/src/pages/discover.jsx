import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { getOpportunity } from "../app/Slices/opportunitySlice";

function Discover() {
  const dispatch = useDispatch();
  const opportunity = useSelector(
    (state) => state.opportunity.opportunity
  );
  console.log(opportunity);

  useEffect(() => {
    dispatch(getOpportunity());
  }, []);
  //const items = opportunity.map((item) => {
    return (
   <div>

   </div> 
    );
  };
  
export default Discover;

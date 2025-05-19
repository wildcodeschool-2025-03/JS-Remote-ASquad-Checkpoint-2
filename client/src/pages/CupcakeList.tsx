import { useEffect, useState } from "react";
import Cupcake from "../components/Cupcake";

/* ************************************************************************* */

/* you can use sampleCupcakes if you're stucked on step 1 */
/* if you're fine with step 1, just ignore this ;) */
/* ************************************************************************* */
function CupcakeList() {
  type Cupcake = {
    id: number;
    accessory_id: string;
    accessory: string;
    color1: string;
    color2: string;
    color3: string;
    name: string;
  };

  const [cupcakes, setCupcakes] = useState<Cupcake[]>([]);

  useEffect(() => {
    const fetchCupcakes = async () => {
      try {
        const response = await fetch("http://localhost:3310/api/cupcakes");
        const data = await response.json();
        console.info("Cupcakes fetched:", data);
        setCupcakes(data);
      } catch (error) {
        console.error("Failed to fetch cupcakes:", error);
      }
    };

    fetchCupcakes();
  }, []);

  // Step 1: get all cupcakes

  // Step 3: get all accessories

  // Step 5: create filter state

  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          {/* Step 5: use a controlled component for select */}
          Filter by{" "}
          <select id="cupcake-select">
            <option value="">---</option>
            {/* Step 4: add an option for each accessory */}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {/* Step 2: Render a card for each cupcake */}
        {cupcakes.map((cupcake) => (
          <li key={cupcake.id} className="cupcake-card">
            <Cupcake data={cupcake} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default CupcakeList;

import { useEffect, useState } from "react";
import Cupcake from "../components/Cupcake";

/* ************************************************************************* */

type CupcakeType = {
  id: number;
  accessory_id: string;
  accessory: string;
  color1: string;
  color2: string;
  color3: string;
  name: string;
};

type AccessoryType = {
  id: number;
  name: string;
  slug: string;
};

/* you can use sampleCupcakes if you're stucked on step 1 */
/* if you're fine with step 1, just ignore this ;) */
/* ************************************************************************* */

function CupcakeList() {
  // Step 1: get all cupcakes
  const [cupcakes, setCupcakes] = useState<CupcakeType[]>([]);
  const [accessories, setAccessories] = useState<AccessoryType[]>([]);
  const [filter, setFilter] = useState<string>("");

  const filteredCupcakes = filter
    ? cupcakes.filter((cupcake) => cupcake.accessory_id === filter)
    : cupcakes;

  useEffect(() => {
    fetch("http://localhost:3310/api/cupcakes")
      .then((response) => response.json())
      .then((data) => setCupcakes(data))
      .catch((error) => console.log("error", error));
  }, []);

  // Step 3: get all accessories

  useEffect(() => {
    fetch("http://localhost:3310/api/accessories")
      .then((response) => response.json())
      .then((data) => setAccessories(data))
      .catch((error) => console.log("error", error));
  }, []);

  // Step 5: create filter state

  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          {/* Step 5: use a controlled component for select */}
          Filter by{" "}
          <select
            id="cupcake-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">---</option>
            {/* Step 4: add an option for each accessory */}
            {accessories.map((accessory) => (
              <option key={accessory.id} value={accessory.id}>
                {accessory.name}
              </option>
            ))}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {/* Step 2: repeat this block for each cupcake */}
        {/* Step 5: filter cupcakes before repeating */}
        {filteredCupcakes.map((cupcake) => (
          <li key={cupcake.id} className="cupcake-item">
            <Cupcake data={cupcake} />
          </li>
        ))}
        {/* end of block */}
      </ul>
    </>
  );
}

export default CupcakeList;

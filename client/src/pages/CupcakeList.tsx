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
  type Accessories = {
    id: number;
    name: string;
    slug: string;
  };

  const [cupcakes, setCupcakes] = useState<Cupcake[]>([]);
  const [accessories, setAccessories] = useState<Accessories[]>([]);
  const [selection, setSelection] = useState("");
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
  useEffect(() => {
    const fetchCupcakes = async () => {
      try {
        const response = await fetch("http://localhost:3310/api/accessories");
        const data = await response.json();
        console.info("Accessories fetched:", data);
        setAccessories(data);
      } catch (error) {
        console.error("Failed to fetch accessoires:", error);
      }
    };

    fetchCupcakes();
  }, []);
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelection(event.target.value);
  };
  const filterCupcakes = selection
    ? cupcakes.filter((cupcake) => cupcake.accessory_id.includes(selection))
    : cupcakes;

  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          {/* Step 5: use a controlled component for select */}
          Filter by{" "}
          <select id="cupcake-select" value={selection} onChange={handleChange}>
            <option value="">---</option>
            {accessories.map((accessory) => (
              <option key={accessory.id} value={accessory.id}>
                {" "}
                {accessory.name}
              </option>
            ))}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {filterCupcakes.map((cupcake) => (
          <li key={cupcake.id} className="cupcake-card">
            <Cupcake data={cupcake} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default CupcakeList;

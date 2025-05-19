import { useEffect, useState } from "react";
import Cupcake from "../components/Cupcake";

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
  id: string;
  name: string;
  slug: string;
};
function CupcakeList() {
  const [cupcakes, setCupcakes] = useState<CupcakeType[]>([]);
  const [accessories, setAccessories] = useState<AccessoryType[]>([]);

  useEffect(() => {
    fetch("http://localhost:3310/api/cupcakes")
      .then((res) => res.json())
      .then((data) => {
        console.info("Cupcakes", data);
        setCupcakes(data);
      })
      .catch((error) => console.error("Erreur Cupcakes", error));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3310/api/accessories")
      .then((res) => res.json())
      .then((data) => {
        console.info("Accessoires", data);
        setAccessories(data);
      })
      .catch((error) => console.error("Erreur Accessoires", error));
  }, []);
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
        {cupcakes.map((cupcake) => (
          <li key={cupcake.id} className="cupcake-item">
            <Cupcake data={cupcake} />
          </li>
        ))}
        {/* Step 5: filter cupcakes before repeating */}
      </ul>
    </>
  );
}

export default CupcakeList;

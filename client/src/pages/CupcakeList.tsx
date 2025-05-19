import { useEffect, useState } from "react";
import Cupcake from "../components/Cupcake";

type CupcakeType = {
  id: number;
  name: string;
  accessory_id: string;
  accessory: string;
  color1: string;
  color2: string;
  color3: string;
};

type AccessoryArray = { id: number; name: string; slug: string }[];

function CupcakeList() {
  // Step 1: get all cupcakes
  const [cupcakes, setCupcakes] = useState<CupcakeType[]>([]);

  useEffect(() => {
    fetch("http://localhost:3310/api/cupcakes")
      .then((res) => res.json())
      .then((data) => {
        setCupcakes(data);
      })
      .catch((err) => {
        console.error("Error fetch", err);
      });
  }, []);
  console.info(cupcakes);

  // Step 3: get all accessories
  const [accessories, setAccessories] = useState<AccessoryArray>([]);

  useEffect(() => {
    fetch("http://localhost:3310/api/accessories")
      .then((res) => res.json())
      .then((data) => {
        setAccessories(data as AccessoryArray);
      })
      .catch((err) => {
        console.error("Error fetch accessories", err);
      });
  }, []);
  console.info(accessories);

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
            {accessories.map((accessory) => (
              <option key={accessory.id} value={accessory.id}>
                {accessory.name}
              </option>
            ))}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {/* Step 2: display all cupcakes using the Cupcake component */}
        {cupcakes.map((c) => (
          <li key={c.id} className="cupcake-item">
            <Cupcake data={c} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default CupcakeList;

import { useEffect, useState } from "react";
import Cupcake from "../components/Cupcake";

// Step 0: define types
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
  const [selectedAccessory, setSelectedAccessory] = useState<string>("");

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedAccessory(event.target.value);
  };

  const filteredCupcakes = selectedAccessory
    ? cupcakes.filter((c) => c.accessory_id === selectedAccessory)
    : cupcakes;

  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          {/* Step 5: use a controlled component for select */}
          Filter by{" "}
          <select
            id="cupcake-select"
            value={selectedAccessory}
            onChange={handleChange}
          >
            <option value="">---</option>
            {/* Step 4: add an option for each accessory */}
            {accessories.map((a) => (
              <option key={a.id} value={a.id.toString()}>
                {a.name}
              </option>
            ))}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {/* Step 2: display all cupcakes using the Cupcake component */}
        {/* Step 5: filter cupcakes before repeating */}
        {filteredCupcakes.map((c) => (
          <li key={c.id} className="cupcake-item">
            <Cupcake data={c} />
          </li>
        ))}
        {/* end of block */}
      </ul>
    </>
  );
}

export default CupcakeList;

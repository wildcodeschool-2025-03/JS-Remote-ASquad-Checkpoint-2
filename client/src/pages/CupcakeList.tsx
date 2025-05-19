import { useEffect, useState } from "react";
import Cupcake from "../components/Cupcake";

/* ************************************************************************* */

type AccessoryArray = { id: number; name: string; slug: string }[];

const sampleCupcakes: CupcakeArray = [
  {
    id: 10,
    accessory_id: "4",
    accessory: "wcs",
    color1: "blue",
    color2: "white",
    color3: "red",
    name: "France",
  },
  {
    id: 11,
    accessory_id: "4",
    accessory: "wcs",
    color1: "yellow",
    color2: "red",
    color3: "black",
    name: "Germany",
  },
  {
    id: 27,
    accessory_id: "5",
    accessory: "christmas-candy",
    color1: "yellow",
    color2: "blue",
    color3: "blue",
    name: "Sweden",
  },
];

/* you can use sampleCupcakes if you're stucked on step 1 */
/* if you're fine with step 1, just ignore this ;) */
/* ************************************************************************* */

function CupcakeList() {
  const [cupcakes, setCupcakes] = useState<Cupcake[]>([]);
  const [accessories, setAccessories] = useState<AccessoryArray>([]);
  const [selectedAccessory, setSelectedAccessory] = useState("");


  useEffect(() => {
    fetch("http://localhost:3310/api/cupcakes")
      .then((response) => response.json())
      .then((data) => setCupcakes(data))
      .catch(() => {
        "Erreur lors du chargement";
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3310/api/accessories")
      .then((response) => response.json())
      .then((data) => setAccessories(data))
      .catch(() => {
        "Erreur lors du chargement";
      });
  }, []);

  // Step 5: create filter state
  const filteredCupcakes =  selectedAccessory
  ? cupcakes.filter(c => c.accessory_id === selectedAccessory)
  : cupcakes;
 
  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          {/* Step 5: use a controlled component for select */}
          Filter by{" "}
          <select id="cupcake-select"
            value={selectedAccessory}
            onChange={(e) => setSelectedAccessory(e.target.value)}>
            <option value="">---</option>
            {accessories.map((a) => (
              <option key={a.id} value={a.id}>
                {a.name}
              </option>
            ))}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {filteredCupcakes.map((c) => (
          <li key={c.id}>
            <Cupcake data={c} />
          </li>
        ))}
        {/* Step 5: filter cupcakes before repeating */}
        <li className="cupcake-item">
          <Cupcake data={sampleCupcakes[0]} />
        </li>
        {/* end of block */}
      </ul>
    </>
  );
}

export default CupcakeList;

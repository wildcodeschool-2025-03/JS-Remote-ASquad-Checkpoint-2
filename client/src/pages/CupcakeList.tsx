import { useEffect, useState } from "react";
import Cupcake from "../components/Cupcake";

/* ************************************************************************* */
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

type CupCakeType = {
  id: number;
  accessory_id: string;
  accessory: string;
  color1: string;
  color2: string;
  color3: string;
  name: string;
};

type CupCakeArray = CupCakeType[];

type AccessoryArray = { id: number; name: string; slug: string }[];

/* you can use sampleCupcakes if you're stucked on step 1 */
/* if you're fine with step 1, just ignore this ;) */
/* ************************************************************************* */

function CupcakeList() {
  const [cupCake, setCupCake] = useState<CupCakeArray>(sampleCupcakes);
  const [accessories, setAccessories] = useState<AccessoryArray>([]);
  const [filter, setFilter] = useState("");

  // Step 1: get all cupcakes
  useEffect(() => {
    fetch("http://localhost:3310/api/cupcakes")
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data: CupCakeArray) => {
        console.info(data);
        setCupCake(data);
      })
      .catch((error) => console.error(error));
  }, []);

  // Step 3: get all accessories
  useEffect(() => {
    fetch("http://localhost:3310/api/accessories")
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data: AccessoryArray) => {
        console.info(data);
        setAccessories(data);
      })
      .catch((error) => console.error(error));
  }, []);

  // Step 5: create filter state
  let filterAccessories: CupCakeArray;
  if (filter === "") {
    filterAccessories = cupCake;
  } else {
    filterAccessories = cupCake.filter((f) => f.accessory === filter);
  }

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
            onChange={(f) => setFilter(f.target.value)}
          >
            <option value="">---</option>
            {/* Step 4: add an option for each accessory */}
            {accessories.map((accessory) => (
              <option key={accessory.id} value={accessory.slug}>
                {accessory.name}
              </option>
            ))}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {
          /* Step 2: repeat this block for each cupcake */
          filterAccessories.map((cupcake) => (
            <li className="cupcake-card" key={cupcake.id}>
              <Cupcake data={cupcake} />
            </li>
          ))
        }
        {/* Step 5: filter cupcakes before repeating */}

        {/* end of block */}
      </ul>
    </>
  );
}

export default CupcakeList;

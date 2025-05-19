import { useEffect, useState } from "react";
import Cupcake from "../components/Cupcake";

type AccessoryArray = { id: number; name: string; slug: string }[];

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

/* you can use sampleCupcakes if you're stucked on step 1 */
/* if you're fine with step 1, just ignore this ;) */
/* ************************************************************************* */

function CupcakeList() {
  // Step 1: get all cupcakes

  const [cupcakes, setCupcakes] = useState<Cupcake[]>([]);

  useEffect(() => {
    fetch("http://localhost:3310/api/cupcakes")
      .then((response) => response.json())
      .then((data) => setCupcakes(data))
      .catch((err) => console.error(err));
  }, []);
  //console.info(cupcakes);

  // Step 3: get all accessories
  const [accessories, setAccessories] = useState<AccessoryArray>([]);

  useEffect(() => {
    fetch("http://localhost:3310/api/accessories")
      .then((response) => response.json())
      .then((data) => setAccessories(data))
      .catch((err) => console.error(err));
  }, []);
  //console.info(accessories);

  // Step 5: create filter state
  const [selected, setSelected] = useState("");
 

  return (
    <>
      <h1>My cupcakes</h1>
      <form className="center">
        <label htmlFor="cupcake-select">
          {/* Step 5: use a controlled component for select */
          }
          Filter by{" "}
          <select id="cupcake-select"
          value={selected}
          onChange={(e) => {setSelected(e.target.value)}}
          >
            <option value="">---</option>
            {
              /* Step 4: add an option for each accessory */
              accessories.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))
            }
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
    

        {/* Step 5: filter cupcakes before repeating */
        selected? cupcakes.filter((c)=> c.accessory_id ===selected).map((c) => (
          <Cupcake key={c.id} data={c}/> )) : cupcakes.map((c) => (
          <Cupcake key={c.id} data={c}/> ))}
        <li className="cupcake-item">
          <Cupcake data={sampleCupcakes[0]} />
        </li>
        {/* end of block */}
      </ul>
    </>
  );
}

export default CupcakeList;

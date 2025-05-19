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

/* you can use sampleCupcakes if you're stucked on step 1 */
/* if you're fine with step 1, just ignore this ;) */
/* ************************************************************************* */
type data = {
  id: number;
  name: string;
  accessory_id: number;
  accessory: string;
  color1: string;
  color2: string;
  color3: string;
};
type AccessoryArray = { id: number; name: string; slug: string };

function CupcakeList() {
  const [list, setList] = useState<data[]>([]);
  const [accessories, setAccessories] = useState<AccessoryArray[]>([]);
  const filter = accessories.map((c) => c.name);
  const uniqueSet = new Set(filter);
  const filterCupcake = [...uniqueSet];

  useEffect(() => {
    fetch("http://localhost:3310/api/cupcakes")
      .then((response) => response.json())
      .then((data) => setList(data))
      .catch(() => {
        "Erreur de chargement";
      });
  }, []);

  useEffect(() => {
    fetch("http://localhost:3310/api/accessories")
      .then((response) => response.json())
      .then((data) => setAccessories(data))
      .catch(() => {
        "Erreur de chargement";
      });
  }, []);
  // Step 3: get all accessories

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
            onChange={(e) =>
              setList(
                e.target.value
                  ? list.filter((s) => s.accessory.includes(e.target.value))
                  : list
              )
            }
          >
            <option value="">---</option>
            {/* Step 4: add an option for each accessory */}
            {filterCupcake.map((a) => (
              <option value={a} key={a}>
                {a}
              </option>
            ))}
          </select>
        </label>
      </form>
      <ul className="cupcake-list" id="cupcake-list">
        {/* Step 2: repeat this block for each cupcake */}
        {/* Step 5: filter cupcakes before repeating */}
        <li className="cupcake-item">
          <Cupcake data={sampleCupcakes[0]} />
        </li>{" "}
        {list.map((l) => (
          <Cupcake
            key={l.id}
            data={{
              id: l.id,
              accessory_id: l.accessory,
              accessory: l.accessory,
              color1: l.color1,
              color2: l.color2,
              color3: l.color3,
              name: l.name,
            }}
          />
        ))}
        {/* end of block */}
      </ul>
    </>
  );
}

export default CupcakeList;

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import "../components/Cupcake.css";

type CupcakeType = {
  id: number;
  accessory_id: string;
  accessory: string;
  color1: string;
  color2: string;
  color3: string;
  name: string;
};

function CupcakeDetails() {
  const { id } = useParams();
  const [selectedCupcake, setSelectedCupcake] = useState<CupcakeType | null>(
    null,
  );

  useEffect(() => {
    fetch(`http://localhost:3310/api/cupcakes/${id}`)
      .then((response) => response.json())
      .then((data) => setSelectedCupcake(data))
      .catch((error) => console.log("error", error));
  }, [id]);

  return (
    <div className="cupcake-container">
      <div className="cupcake">
        <div className={`accessory ${selectedCupcake?.accessory}`} />
        <div className="cream">
          <div
            className="cream-1"
            style={{
              backgroundColor: selectedCupcake?.color1,
            }}
          />
          <div
            className="cream-2"
            style={{
              backgroundColor: selectedCupcake?.color2,
            }}
          />
          <div
            className="cream-3"
            style={{
              backgroundColor: selectedCupcake?.color3,
            }}
          />
        </div>
        <div className="bottom">
          <div className="bottom-in">
            <div className="face">
              <div className="eyes">
                <div className="left-eye" />
                <div className="right-eye" />
              </div>
              <div className="mouth" />
            </div>
          </div>
        </div>
      </div>
      <div className="cupcake-name">{selectedCupcake?.name}</div>
    </div>
  );
}

export default CupcakeDetails;

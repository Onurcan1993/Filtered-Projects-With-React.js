import { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";
import Cart from "./Cart";

function App() {
  const [data, setData] = useState([]);
  const [clickedData, setClickedData] = useState([]);

  useEffect(() => {
    axios
      .get("/data.json") // Not: public klasörden çekiyorsan başına `./` değil, `/` gelmeli
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function removeHandler(id) {
    const filtered = clickedData.filter((item) => item !== id);
    setClickedData(filtered);
  }

  function clearFilters() {
    setClickedData([]);
  }

  // Filtrelenmiş veri
  const filteredData = clickedData.length
    ? data.filter((item) =>
        clickedData.every((tag) =>
          [
            item.role,
            item.level,
            ...(item.languages || []),
            ...(item.tools || []),
          ].includes(tag)
        )
      )
    : data;

  return (
    <div className="h-full bg-gray-50 min-h-screen">
      <Header />

      {/* Filtre Etiketleri */}
      {clickedData.length > 0 && (
        <div className="flex flex-wrap gap-4 justify-center items-center mt-10 bg-white p-4 rounded-md shadow-md mx-4">
          {clickedData.map((item, index) => (
            <div
              key={index}
              className="flex gap-2 items-center rounded-md p-2 bg-teal-400 hover:bg-teal-600 cursor-pointer text-white"
            >
              <span>{item}</span>
              <button
                onClick={() => removeHandler(item)}
                className="bg-black p-1 rounded-md"
              >
                <img src="/images/icon-remove.svg" alt="remove" />
              </button>
            </div>
          ))}
          <button
            onClick={clearFilters}
            className="ml-auto bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Kartlar */}
      <div className="flex flex-col gap-4 justify-center items-center mt-10">
        {filteredData.map((item, index) => (
          <Cart
            key={index}
            {...item}
            setClickedData={setClickedData}
            clickedData={clickedData}
          />
        ))}
      </div>
    </div>
  );
}

export default App;

import React from "react";

function Cart({
  company,
  logo,
  new: isNew,
  featured,
  position,
  role,
  level,
  postedAt,
  contract,
  location,
  languages = [],
  tools = [],
  setClickedData,
  clickedData,
}) {
  function selectHandler(e) {
    const id = e.currentTarget.id;
    if (!clickedData.includes(id)) {
      setClickedData([...clickedData, id]);
    }
  }

  const tags = [role, level, ...languages, ...tools];

  return (
    <div
      className={`flex justify-between items-center bg-white p-8 w-5/6 drop-shadow-2xl rounded border-l-4 ${
        featured ? "border-teal-500" : "border-transparent"
      }`}
    >
      <div className="flex gap-4 items-center">
        <img src={logo} alt={company} className="w-12 h-12 md:w-16 md:h-16" />
        <div className="flex flex-col gap-2">
          <div className="flex gap-2 items-center">
            <span className="text-teal-600 font-bold">{company}</span>
            {isNew && (
              <span className="text-xs bg-teal-600 text-white px-2 py-1 rounded-full">
                NEW!
              </span>
            )}
            {featured && (
              <span className="text-xs bg-black text-white px-2 py-1 rounded-full">
                FEATURED
              </span>
            )}
          </div>
          <h1 className="font-bold text-lg">{position}</h1>
          <div className="flex gap-4 text-gray-400 text-sm">
            <span>{postedAt}</span>
            <span>•</span>
            <span>{contract}</span>
            <span>•</span>
            <span>{location}</span>
          </div>
        </div>
      </div>

      <div className="flex gap-3 flex-wrap justify-end">
        {tags.map((tag, index) => (
          <button
            key={index}
            id={tag}
            onClick={selectHandler}
            className="bg-teal-100 text-teal-700 font-semibold px-2 py-1 rounded hover:bg-teal-300"
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Cart;

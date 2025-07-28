"use client";

const cardColors = [
  "bg-[#8c9ca2]",
  "bg-[#5c6150]",
  "bg-[#8c8b91]",
  "bg-[#8c8584]"
];

export default function ProductRow() {
  const categories = [
    {
      title: 'Best Sellers',
      options: {
        option1: 'shop men',
        option2: 'shop women'
      }
    },
    {
      title: 'New Arrivals',
      options: {
        option1: 'shop men',
        option2: 'shop women'
      }
    },
    {
      title: 'Mens',
      options: {
        option1: 'shop men'
      }
    },
    {
      title: 'Womans',
      options: {
        option1: 'shop women'
      }
    },
  ];

  return (
    <div className="relative w-screen min-h-[60vh] md:min-h-[70vh] flex items-center justify-center px-0 py-0 mt-24 md:mt-1">
      <div className="relative h-[70vh] w-full max-w-[95%] mx-auto overflow-hidden flex gap-6  p-8">
        {categories.map((cat, idx) => (
          <div
            key={cat.title}
            className={`rounded-lg shadow p-6 flex flex-col items-center min-w-[200px] justify-between hover:rounded-full transition-all duration-700 ease-in-out ${cardColors[idx % cardColors.length]}`}
          >
            <h3 className=" text-lg text-white mb-2">{cat.title}</h3>
            <div className="flex flex-col gap-2 w-2xl ">
              {Object.values(cat.options).map((opt, i) => (
                <button key={i} className=" text-gray-800 px-4 py-2 rounded transition">
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
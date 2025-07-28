"use client";

const cardColors = [
  "bg-neutral-100",
  "bg-neutral-200",
  "bg-neutral-300",
  "bg-neutral-400"
];

export default function productRow() {
  const categories = [
    {
      title: 'Best Sellers',
      options: {
        option1 : 'shop men',
        option2 : 'shop women'
      }
    },
    {
      title: 'New Arrivals',
      options: {
        option1 : 'shop men',
        option2 : 'shop women'
      }
    },
    {
      title: 'Mens',
      options: {
        option1 : 'shop men'
      }
    },
    {
      title: 'Womans',
      options: {
        option1 : 'shop women'
      }
    },
  ]

  return(
    <div className="relative w-screen min-h-[60vh] md:min-h-[70vh] flex items-center justify-center px-0 py-0 mt-24 md:mt-5">
      <div className="relative h-[70vh] w-full max-w-[95%] mx-auto overflow-hidden ">
        {categories.map((cat, idx) => (
          <div
            key={cat.title}
            className={`rounded-lg shadow p-6 flex flex-col items-center min-w-[180px] ${cardColors[idx % cardColors.length]}`}
          >
            <h3 className="font-bold text-lg mb-2">{cat.title}</h3>
            <div className="flex flex-col gap-2">
              {Object.values(cat.options).map((opt, i) => (
                <button key={i} className="bg-amber-500 text-white px-4 py-2 rounded hover:bg-amber-700 transition">
                  {opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
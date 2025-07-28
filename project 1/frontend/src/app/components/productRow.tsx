"use client";

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
    <div className="relative w-screen min-h-[60vh] md:min-h-[70vh] flex items-center justify-center px-0 py-0 mt-24 md:mt-5 bg-amber-950">
      <div className=""></div>
    </div>
  )
}
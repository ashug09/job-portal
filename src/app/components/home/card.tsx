"use client";
const data = [
  {
    image:
      "https://images.pexels.com/photos/4050320/pexels-photo-4050320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "100% Job Guarantee",
  },
  {
    image:
      "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Software engineering jobs",
  },
  {
    image:
      "https://images.pexels.com/photos/1181401/pexels-photo-1181401.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Friendly work environment",
  },
  {
    image:
      "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Simple & easy process",
  },
  {
    image:
      "https://images.pexels.com/photos/392018/pexels-photo-392018.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Easy application form filling",
  },
  {
    image:
      "https://images.pexels.com/photos/3756678/pexels-photo-3756678.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Interview notification",
  },
];

export function CardsCarousel() {
  return (
    <div className="flex overflow-x-auto my-2">
      {data.map((item)=>{
        return(
          <div className="relative shrink-0 mx-5" key={item.title}>
            <img className=" rounded-xl h-96 w-full " src={item.image} alt="intro-image"/>
          <h1 className="absolute top-10 left-4 text-white text-4xl font-semibold">{item.title}</h1>
          </div>
        )
      })}
    </div>
  );
}

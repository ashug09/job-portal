import SearchBar from "./searchBar";
import { CardsCarousel } from "./card";
import MarqueeIcons from "./marquee";
import FeaturedJobs from "./featuredJobs";
import { Reviews } from "./reviews";
export default function Page() {
  return (
    <div>
      <SearchBar />
      <CardsCarousel />
      <MarqueeIcons />
      <FeaturedJobs />
      <Reviews />
    </div>
  );
}

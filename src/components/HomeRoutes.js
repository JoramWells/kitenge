import React from "react";
import CarouselItems from "./CarouselItems";
import RecentItemsBar from "./RecentItemsBar";
import CarouselHeader from "./CarouselHeader";

export default function HomeRoutes() {
  return (
    <div>
      <CarouselHeader />
      <RecentItemsBar title="Recent products" />
      <CarouselItems />
      <RecentItemsBar title="Trending Products" />
      <CarouselItems />
    </div>
  );
}

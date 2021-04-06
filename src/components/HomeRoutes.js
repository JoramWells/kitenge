import React from "react";
import CarouselItems from "./CarouselItems";
import RecentItemsBar from "./RecentItemsBar";
import CarouselHeader from "./CarouselHeader";
import { LazyLoadComponent } from "react-lazy-load-image-component";

export default function HomeRoutes() {
  return (
    <div>
      <CarouselHeader />
      <RecentItemsBar title="Recent products" />
      <CarouselItems />
      <LazyLoadComponent>
        <RecentItemsBar title="Trending Products" />
        <CarouselItems />
      </LazyLoadComponent>
    </div>
  );
}

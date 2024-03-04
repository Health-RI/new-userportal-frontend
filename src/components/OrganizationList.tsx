// SPDX-FileCopyrightText: 2024 PNED G.I.E.
//
// SPDX-License-Identifier: Apache-2.0

"use client";

import React, { useState } from "react";
import { organizationList } from "@/services/ckan/index.server";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

interface OrganizationNames {
  organizations: string[];
}

export const OrganizationList: React.FC<OrganizationNames> = ({
  organizations,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === organizations.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? organizations.length - 1 : prevIndex - 1,
    );
  };

  return (
    <div className="mx-auto w-full lg:max-w-5xl">
      <Carousel className="relative">
        <CarouselContent
          style={{
            transform: `translateX(-${activeIndex * 100}%)`,
            transition: "transform 0.5s ease-in-out",
          }}
        >
          {organizations.map((orgName, index) => (
            <CarouselItem key={orgName} className="w-full">
              <Card>
                <CardContent className="aspect-banner flex items-center justify-center">
                  <span>{orgName}</span>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious onClick={prevSlide} />
        <CarouselNext onClick={nextSlide} />
      </Carousel>
      <div className="mt-4 flex justify-center">
        {organizations.map((_, index) => (
          <span
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`mx-2 h-4 w-4 cursor-pointer rounded-full ${
              index === activeIndex ? "bg-indigo-500" : "bg-gray-400"
            }`}
          ></span>
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const organizations = await organizationList();
  return {
    props: {
      organizations,
    },
  };
}

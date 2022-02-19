import React, { useMemo } from "react";
import { getHeroesByPublisher } from "../../helpers/getHeroesByPublisher";
import { HeroCard } from "./HeroCard";

export const HeroList = ({ publisher }) => {
  const heroes = useMemo(() => getHeroesByPublisher(publisher), [publisher]);

  return (
    <div className="animate__animated animate__fadeIn row rows-cols-1 row-cols-md-3 g-4">
      {heroes.map((hero) => (
        <HeroCard key={hero.id} {...hero}>
          {hero.superhero}
        </HeroCard>
      ))}
    </div>
  );
};

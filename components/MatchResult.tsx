"use client";
import React from "react";
import useEmblaCarousel from "embla-carousel-react";

type Match = {
  id: number;
  league: string;
  home: string;
  away: string;
  score: string;
};

const matches: Match[] = [
  {
    id: 1,
    league: "Premier League",
    home: "Arsenal",
    away: "Man City",
    score: "2:1",
  },
  {
    id: 2,
    league: "La Liga",
    home: "Real Madrid",
    away: "Barcelona",
    score: "0:0",
  },
  {
    id: 3,
    league: "Bundesliga",
    home: "Bayern",
    away: "Dortmund",
    score: "3:3",
  },
  {
    id: 4,
    league: "Serie A",
    home: "Milan",
    away: "Inter",
    score: "1:1",
  },
];

export default function MatchesCarousel() {
  const [emblaRef] = useEmblaCarousel({ align: "start", dragFree: true });

  return (
    <div className="relative w-full bg-[var(--color-bg-card)] md:h-80 mt-3">
      {/* Carousel */}
      <div className="overflow-hidden  h-full" ref={emblaRef}>
        <div className="flex gap-4 items-center h-full md:px-8 ">
          {matches.map((match) => (
            <div
              key={match.id}
              className="min-w-[320px] w-[320px] h-[200px] bg-[var(--color-bg-card)] rounded shadow relative flex flex-col "
            >
              {/* League Name - Top Right 11px */}
              <p className="absolute top-4 right-4 text-[11px] text-gray-400">
                {match.league}
              </p>

              {/* Teams and Score Middle */}
              <div className="flex justify-between items-center mt-5 px-6 h-[80%] ">
                {/* Home Team */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    <img
                      src={`https://picsum.photos/seed/${match.home}/48/48`}
                      alt={match.home}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-700">
                    {match.home}
                  </span>
                </div>

                {/* Result Score - 30px */}
                <span className="font-bold text-[30px] leading-none text-[var(--color-primary)] ">
                  {match.score}
                </span>

                {/* Away Team */}
                <div className="flex flex-col items-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                    <img
                      src={`https://picsum.photos/seed/${match.away}/48/48`}
                      alt={match.away}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-medium text-gray-700">
                    {match.away}
                  </span>
                </div>
              </div>

              {/* Match Details Link - Full width 30px height */}
              <div className="h-[36px] w-full text-[12px] flex items-center justify-center rounded-b border-t border-gray-100  mt-2 text-[var(--color-primary)] bg-[var(--color-primary-light)]">
                Match Details
              </div>
            </div>
          ))}

          {/* Discover Card - Same width and height */}
          <div className="min-w-[320px] w-[320px] h-[200px] flex items-center justify-center border-2 border-dashed rounded-2xl text-gray-400">
            Discover
          </div>
        </div>
      </div>

      {/* Gradient Blur Right */}
      <div className="pointer-events-none absolute top-0 right-0 h-full w-24 bg-gradient-to-l from-white to-transparent" />
    </div>
  );
}

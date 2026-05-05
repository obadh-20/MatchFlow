import React from 'react';
import Image from 'next/image';

const Navbar = () => {
  return (
    <nav className="w-full bg-[#FFF8EC] border-b border-[#e6d8c0] h-auto md:h-[72px] px-4 md:px-8">
      <div className="h-full flex items-center justify-between flex-col md:flex-row gap-3 py-3 md:py-0">
        {/* Left Section: Logo, Title & Navigation Links */}
        <div className="flex items-center w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10">
                <Image
                  src="/Logo.png"
                  alt="MatchFlow Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <h1 className="text-[23px] font-semibold text-[#546B41]">
                MatchFlow
              </h1>
            </div>

            {/* Navigation Links (Desktop Only) */}
            <div className="hidden md:flex items-center gap-6">
              <a
                href="/leagues"
                className="text-[14px] text-[#171A1F] hover:text-[#171A1F]/70 transition-colors font-medium"
              >
                Leagues
              </a>
              <a
                href="/teams"
                className="text-[14px] text-[#171A1F] hover:text-[#171A1F]/70 transition-colors font-medium"
              >
                Teams
              </a>
              <a
                href="/players"
                className="text-[14px] text-[#171A1F] hover:text-[#171A1F]/70 transition-colors font-medium"
              >
                Players
              </a>
              <a
                href="/standings"
                className="text-[14px] text-[#171A1F] hover:text-[#171A1F]/70 transition-colors font-medium"
              >
                Standings
              </a>
            </div>
          </div>
        </div>

        {/* Search Bar - Right Side */}
        <div className="w-full md:w-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search matches, teams, players..."
              className="w-full md:w-64 px-4 py-2 pl-10 rounded-lg bg-[rgba(220,204,172,0.3)] border border-[#e6d8c0] text-[14px] text-[#546B41] placeholder:text-[#9a8f7a] focus:outline-none focus:ring-2 focus:ring-[#546B41]/20 focus:border-[#546B41]"
            />
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9a8f7a]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
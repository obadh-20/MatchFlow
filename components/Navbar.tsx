"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import type { ApiRapidSearchResults } from "@/types/api";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [results, setResults] = useState<ApiRapidSearchResults | null>(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce: wait 300ms after user stops typing
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Fetch results when debounced term changes
  useEffect(() => {
    if (debouncedTerm.trim().length === 0) {
      setResults(null);
      setShowDropdown(false);
      return;
    }

    const controller = new AbortController();

    const fetchResults = async () => {
      setSearchLoading(true);
      setSearchError(null);
      try {
        const response = await fetch(
          `/api/search?q=${encodeURIComponent(debouncedTerm)}`,
          { signal: controller.signal }
        );
        if (!response.ok) throw new Error("Search failed");
        const data = await response.json();
        const searchResults = data?.response ?? data?.results ?? null;
        setResults(searchResults);
        setShowDropdown(true);
      } catch (err) {
        if (err instanceof DOMException && err.name === "AbortError") {
          return;
        }
        setResults(null);
        setSearchError("Search failed. Please try again.");
        setShowDropdown(true);
      } finally {
        setSearchLoading(false);
      }
    };

    fetchResults();

    return () => {
      controller.abort();
    };
  }, [debouncedTerm]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close dropdown on Escape
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowDropdown(false);
        inputRef.current?.blur();
      }
    },
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleFocus = () => {
    if (results && debouncedTerm.trim().length > 0) {
      setShowDropdown(true);
    }
  };

  const totalResults =
    (results?.players?.length ?? 0) +
    (results?.teams?.length ?? 0) +
    (results?.leagues?.length ?? 0) +
    (results?.matches?.length ?? 0);

  return (
    <nav className="w-full bg-[#FFF8EC] border-b border-[#e6d8c0] h-auto md:h-[72px] px-4 md:px-8">
      <div className="h-full flex items-center justify-between flex-col md:flex-row gap-3 py-3 md:py-0">
        {/* Left Section: Logo, Title & Navigation Links */}
        <div className="flex items-center w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-3">
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
            </Link>

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
                href="/news"
                className="text-[14px] text-[#171A1F] hover:text-[#171A1F]/70 transition-colors font-medium"
              >
                News
              </a>
            </div>
          </div>
        </div>

        {/* Search Bar - Right Side */}
        <div className="w-full md:w-auto relative" ref={dropdownRef}>
          <div className="relative">
            <input
              ref={inputRef}
              type="text"
              value={searchTerm}
              onChange={handleInputChange}
              onFocus={handleFocus}
              onKeyDown={handleKeyDown}
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

            {/* Loading spinner */}
            {searchLoading && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2">
                <div className="w-4 h-4 border-2 border-[#546B41] border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>

          {/* Search Dropdown */}
          {showDropdown && (
            <div className="absolute top-full right-0 mt-2 w-full md:w-96 bg-[#FFF8EC] border border-[#e6d8c0] rounded-xl shadow-lg z-50 max-h-[70vh] overflow-y-auto">
              {searchError ? (
                <div className="p-4 text-center text-sm text-red-500">
                  {searchError}
                </div>
              ) : totalResults === 0 && !searchLoading ? (
                <div className="p-4 text-center text-sm text-gray-400">
                  No results found for &ldquo;{debouncedTerm}&rdquo;
                </div>
              ) : (
                <div className="p-2">
                  {/* Players */}
                  {results?.players && results.players.length > 0 && (
                    <div className="mb-1">
                      <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#546B41]">
                        Players
                      </div>
                      {results.players.slice(0, 5).map((player) => (
                        <Link
                          key={`player-${player.id}`}
                          href={`/player/${player.id}`}
                          onClick={() => {
                            setShowDropdown(false);
                            setSearchTerm("");
                          }}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--color-primary-light)] transition-colors"
                        >
                          <div className="w-8 h-8 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                            <div className="w-full h-full flex items-center justify-center bg-[var(--color-primary-light)] text-[var(--color-primary)] font-bold text-xs">
                              {player.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .slice(0, 2)
                                .toUpperCase()}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-[#171A1F] truncate">
                              {player.name}
                            </div>
                            <div className="text-[11px] text-gray-400 truncate">
                              {player.position} · {player.teamName}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Teams */}
                  {results?.teams && results.teams.length > 0 && (
                    <div className="mb-1">
                      <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#546B41]">
                        Teams
                      </div>
                      {results.teams.slice(0, 5).map((team) => (
                        <Link
                          key={`team-${team.id}`}
                          href={`/teams`}
                          onClick={() => {
                            setShowDropdown(false);
                            setSearchTerm("");
                          }}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--color-primary-light)] transition-colors"
                        >
                          <div className="relative w-8 h-8 rounded-full bg-gray-100 flex-shrink-0 overflow-hidden">
                            {team.logo ? (
                              <Image
                                src={team.logo}
                                alt={team.name}
                                fill
                                className="object-contain"
                                unoptimized
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-gray-400">
                                {team.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <span className="text-sm font-medium text-[#171A1F]">
                            {team.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Leagues */}
                  {results?.leagues && results.leagues.length > 0 && (
                    <div className="mb-1">
                      <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#546B41]">
                        Leagues
                      </div>
                      {results.leagues.slice(0, 5).map((league) => (
                        <Link
                          key={`league-${league.id}`}
                          href={`/league/${league.id}`}
                          onClick={() => {
                            setShowDropdown(false);
                            setSearchTerm("");
                          }}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--color-primary-light)] transition-colors"
                        >
                          <div className="relative w-8 h-8 rounded-full bg-gray-100 flex-shrink-0 overflow-hidden">
                            {league.logo ? (
                              <Image
                                src={league.logo}
                                alt={league.name}
                                fill
                                className="object-contain p-1"
                                unoptimized
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-gray-400">
                                {league.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium text-[#171A1F] truncate">
                              {league.name}
                            </div>
                            <div className="text-[11px] text-gray-400">
                              {league.country}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}

                  {/* Matches */}
                  {results?.matches && results.matches.length > 0 && (
                    <div className="mb-1">
                      <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#546B41]">
                        Matches
                      </div>
                      {results.matches.slice(0, 5).map((match) => (
                        <Link
                          key={`match-${match.id}`}
                          href={`/match/${match.id}`}
                          onClick={() => {
                            setShowDropdown(false);
                            setSearchTerm("");
                          }}
                          className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[var(--color-primary-light)] transition-colors"
                        >
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <div className="relative w-6 h-6 rounded-full bg-gray-100 flex-shrink-0 overflow-hidden">
                              {match.homeLogo ? (
                                <Image
                                  src={match.homeLogo}
                                  alt={match.homeTeam}
                                  fill
                                  className="object-contain"
                                  unoptimized
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-[8px] font-bold text-gray-400">
                                  {match.homeTeam.charAt(0)}
                                </div>
                              )}
                            </div>
                            <span className="text-xs font-medium text-[#171A1F] truncate">
                              {match.homeTeam}
                            </span>
                            <span className="text-xs text-gray-400">vs</span>
                            <span className="text-xs font-medium text-[#171A1F] truncate">
                              {match.awayTeam}
                            </span>
                            <div className="relative w-6 h-6 rounded-full bg-gray-100 flex-shrink-0 overflow-hidden">
                              {match.awayLogo ? (
                                <Image
                                  src={match.awayLogo}
                                  alt={match.awayTeam}
                                  fill
                                  className="object-contain"
                                  unoptimized
                                />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-[8px] font-bold text-gray-400">
                                  {match.awayTeam.charAt(0)}
                                </div>
                              )}
                            </div>
                          </div>
                          <span
                            className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full flex-shrink-0 ${
                              match.status === "Finished"
                                ? "bg-gray-100 text-gray-500"
                                : match.status === "Live"
                                ? "bg-red-100 text-red-600"
                                : "bg-blue-100 text-blue-600"
                            }`}
                          >
                            {match.status}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
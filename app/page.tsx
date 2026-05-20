import React from "react";
import MatchResult from "@/components/MatchResult"
import type { Match } from "@/types/index";
import Matches from "@/components/Matches";
const page = () => {
  
  return (
    <div className="w-full ">
      <Matches/>
      <MatchResult />
    </div>
  );
};

export default page;

import React from 'react';
import { ShimmerButton } from "@/components/magicui/shimmer-button";

function Box({ text, selected, onClick }: { text: string; selected: boolean; onClick: () => void }) {
  return (
    <div>
      {selected ? (
      <ShimmerButton className="shadow-2xl " shimmerSize="0.20em" borderRadius="50px">
          <span className="whitespace-pre-wrap  text-[15px] text-center text-sm leading-none tracking-wide text-white dark:from-white dark:to-slate-900/10 lg:text-lg font-sans">
        {text}
        </span>
      </ShimmerButton>
      ) : (
      <div
        className="bg-white/30 backdrop-blur-md flex items-center justify-center text-center text-white rounded-l-full text-[15px] rounded-r-full p-1 font-darker px-2 font-mono tracking-wide"
        onClick={onClick}
      >
        {text}
      </div>
      )}
    </div>
  );
}

export default Box;
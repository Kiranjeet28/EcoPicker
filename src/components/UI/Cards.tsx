"use client";

import React, { useEffect, useState } from "react";
import { WobbleCard } from "../magicui/wobble-card";
import { useGlobalContext } from "@/context/GlobalContext";
import Image from "next/image";
type NewsArticle = {
    title: string;
    description: string;
    urlToImage?: string;
    url: string;
};

export function EconomicCardList() {
    const { topic } = useGlobalContext();

    const [cards, setCards] = useState<NewsArticle[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await fetch(`/api/getData?topic=${topic}`);
                const data = await res.json();
                setCards(data.newsArticles); // make sure each article includes 'url'
            } catch (error) {
                console.error("Error fetching economic data:", error);
            }
        };

        fetchData();
    }, [topic]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
            {cards.map((article, index) => (
                <a
                    key={index}
                    href={article.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                >
                    <WobbleCard
                        containerClassName={`col-span-1 ${index % 3 === 0 ? "lg:col-span-2 bg-pink-800" : "bg-blue-900"
                            } min-h-[300px] relative transition hover:scale-[1.02]`}
                    >
                        <div className="relative z-10 p-4">
                            <h2 className="max-w-80 text-left text-balance text-xl md:text-xxl lg:text-3xl font-bold tracking-[-0.015em]  text-white">
                                {article.title}
                            </h2>
                            <p className="mt-4 max-w-[26rem] text-left text-base/6 text-neutral-200">
                                <span className="p-2 rounded text-white">
                                    {article.description}
                                </span>
                            </p>
                        </div>
                        {
                            article.urlToImage && 
                            <Image
                                src={`/api/image?url=${encodeURIComponent(article.urlToImage ?? '')}`}
                                width={500}
                                height={500}
                                alt="article"
                                className="absolute right-0 bottom-0 object-contain rounded-2xl grayscale pointer-events-none opacity-30"
                            />
                        }
                        
                    </WobbleCard>
                </a>
            ))}
        </div>
    );
}
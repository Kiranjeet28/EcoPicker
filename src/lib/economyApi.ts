// lib/economyApi.ts

import axios from 'axios';

// Removed unused TRADING_ECONOMICS_API_KEY
const NEWS_API_KEY = process.env.NEWS_API_KEY;

export async function getTradingEconomicsData(topic: string) {
    try {
        const apiKey = process.env.TRADING_ECONOMICS_API_KEY; // from .env
        const client = process.env.TRADING_ECONOMICS_CLIENT_EMAIL; // optional for email+token combo

        const url = `https://api.tradingeconomics.com/${topic}?c=${client}:${apiKey}`;

        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Trading Economics API Error:', error);
        throw error;
    }
  }

export const getWorldBankData = async (indicatorCode: string = 'NY.GDP.MKTP.CD', country: string = 'WLD') => {
    const url = `https://api.worldbank.org/v2/country/${country}/indicator/${indicatorCode}?format=json`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('World Bank API Error:', error);
        throw new Error('Failed to fetch World Bank data');
    }
};

export const getEconomicNews = async (topic: string = 'economy') => {
    const url = `https://newsapi.org/v2/everything?q=${encodeURIComponent(topic)}&language=en&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`;

    try {
        const response = await axios.get(url);
        return response.data.articles;
    } catch (error) {
        console.error('News API Error:', error);
        throw new Error('Failed to fetch economic news');
    }
};

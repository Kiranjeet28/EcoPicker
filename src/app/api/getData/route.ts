// app/api/getData/route.ts
import { NextRequest } from 'next/server';
import { getTradingEconomicsData, getWorldBankData, getEconomicNews } from '@/lib/economyApi';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const topic = searchParams.get('topic') || 'gdp';

        const [teData, wbData, news] = await Promise.all([
            getTradingEconomicsData(topic),
            getWorldBankData(),
            getEconomicNews(topic),
        ]);

        return Response.json({
            tradingEconomics: teData,
            worldBank: wbData,
            newsArticles: news,
        });
    } catch {
        return new Response(JSON.stringify({ error: 'Error fetching economic data' }), {
            status: 500,
        });
    }
}

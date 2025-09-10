const express = require('express');
const router = express.Router();
const ccxtService = require('../services/ccxtService');

router.get('/market-data/:symbol?', async (req, res) => {
  try {
    const symbol = req.params.symbol || 'BTC/USDT';
    console.log(`🔍 Fetching market data for ${symbol}...`);
    
    const marketData = await ccxtService.getMarketData(symbol);
    
    console.log(`✅ Market data fetched for ${symbol}:`, {
      price: marketData.price,
      change: marketData.percentage
    });
    
    res.json({
      success: true,
      data: marketData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error fetching market data:', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

router.get('/exchange-info', async (req, res) => {
  try {
    console.log('🔍 Fetching exchange info...');
    
    const exchangeInfo = await ccxtService.getExchangeInfo();
    
    console.log('✅ Exchange info fetched:', {
      exchange: exchangeInfo.exchangeName,
      markets: exchangeInfo.marketCount
    });
    
    res.json({
      success: true,
      data: exchangeInfo,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error fetching exchange info:', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

router.get('/multiple-markets', async (req, res) => {
  try {
    console.log('🔍 Fetching multiple market data...');
    
    const marketsData = await ccxtService.getMultipleMarkets();
    
    console.log('✅ Multiple markets data fetched:', marketsData.length, 'markets');
    
    res.json({
      success: true,
      data: marketsData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Error fetching multiple markets:', error.message);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
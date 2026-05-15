export const predictStockDepletion = (currentStock, dailyUsageArray) => {
    // Logic: Calculate average burn rate
    const avgUsage = dailyUsageArray.reduce((a, b) => a + b, 0) / dailyUsageArray.length;
    
    // Requirement #9: Stock prediction
    const daysRemaining = Math.floor(currentStock / avgUsage);
    
    return {
      status: daysRemaining < 3 ? 'CRITICAL' : 'STABLE',
      predictedDays: daysRemaining,
      suggestedOrderDate: new Date(Date.now() + (daysRemaining - 2) * 24 * 60 * 60 * 1000)
    };
  };
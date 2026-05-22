# Recharts Width Error Fix

**Date:** November 18, 2025
**Status:** Complete ✅
**Issue:** "The width(-1) and height(-1) of chart should be greater than 0" error in Recharts.

## Problem
This error occurs when `ResponsiveContainer` is rendered inside a parent container that has no dimensions (width/height = 0) at the time of mounting. This commonly happens when charts are:
1. Inside `TabsContent` (hidden by default)
2. Inside flex containers without `min-width: 0`
3. Rendered before the layout is fully calculated

## Solution Applied
We updated all instances of `ResponsiveContainer` to include `minWidth={0}`. This tells Recharts that a width of 0 is acceptable as a minimum, preventing it from calculating negative values or throwing errors during initial render of hidden tabs.

We also updated the `ChartContainer` wrapper in `components/ui/chart.tsx` to include `min-w-0` in its class list to ensure flexbox containers handle it correctly.

## Files Updated
- `/components/ui/chart.tsx` (Added `min-w-0` to wrapper)
- `/components/StocksFundamentalsMission.tsx` (2 charts)
- `/components/RetirementCalculator.tsx` (1 chart)
- `/components/InvestmentMission.tsx` (2 charts)
- `/components/TSPMission.tsx` (2 charts)
- `/components/ProgressScreen.tsx` (2 charts)
- `/components/BondsFixedIncomeMission.tsx` (2 charts)
- `/components/CommoditiesTradingMission.tsx` (1 chart)
- `/components/AssetAllocationMission.tsx` (2 charts)
- `/components/MarketAnalysisMission.tsx` (1 chart)
- `/components/GovernmentTradingTracker.tsx` (2 charts)

## Verification
- Search for `<ResponsiveContainer` in codebase confirms all instances now have `minWidth={0}` or use the updated `ChartContainer`.
- Code changes applied to all mission components and trackers.

## Next Steps
If charts still appear blank when switching tabs, a `window.dispatchEvent(new Event('resize'))` might be needed on tab change, but `minWidth={0}` usually solves the crash/error.

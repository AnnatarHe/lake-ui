function getPercentile(arr: number[], percentile: number): number {
  const index = Math.ceil((percentile / 100) * arr.length) - 1
  return arr[Math.max(0, Math.min(index, arr.length - 1))]
}

export function percentilesOf(activities: number[]): {
  p25: number
  p50: number
  p75: number
  p90: number
} {
  if (!activities.length) {
    return { p25: 0, p50: 0, p75: 0, p90: 0 }
  }

  // Sort counts in ascending order
  const sortedCounts = activities.sort((a, b) => a - b)

  return {
    p25: getPercentile(sortedCounts, 25),
    p50: getPercentile(sortedCounts, 50),
    p75: getPercentile(sortedCounts, 75),
    p90: getPercentile(sortedCounts, 90),
  }
}

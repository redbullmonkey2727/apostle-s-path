import { useCallback } from "react";

const ANALYTICS_KEY = "nt-map-analytics";

interface AnalyticsData {
  cityViews: Record<string, number>;
  topicViews: Record<string, number>;
}

function getAnalytics(): AnalyticsData {
  try {
    const raw = localStorage.getItem(ANALYTICS_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { cityViews: {}, topicViews: {} };
}

function saveAnalytics(data: AnalyticsData) {
  localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data));
}

export function useLocalAnalytics() {
  const trackCityView = useCallback((cityId: string) => {
    const data = getAnalytics();
    data.cityViews[cityId] = (data.cityViews[cityId] || 0) + 1;
    saveAnalytics(data);
  }, []);

  const trackTopicView = useCallback((topic: string) => {
    const data = getAnalytics();
    data.topicViews[topic] = (data.topicViews[topic] || 0) + 1;
    saveAnalytics(data);
  }, []);

  const getPopularCities = useCallback((top = 3): string[] => {
    const data = getAnalytics();
    return Object.entries(data.cityViews)
      .sort(([, a], [, b]) => b - a)
      .slice(0, top)
      .map(([id]) => id);
  }, []);

  const getPopularTopics = useCallback((top = 3): string[] => {
    const data = getAnalytics();
    return Object.entries(data.topicViews)
      .sort(([, a], [, b]) => b - a)
      .slice(0, top)
      .map(([t]) => t);
  }, []);

  return { trackCityView, trackTopicView, getPopularCities, getPopularTopics };
}

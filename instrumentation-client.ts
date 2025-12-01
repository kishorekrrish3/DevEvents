import posthog from "posthog-js";

if (typeof window !== "undefined" && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  try {
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: "/ingest",
      ui_host: "https://us.posthog.com",
      person_profiles: "identified_only",
      capture_pageview: false, // We'll capture pageviews manually in the app
      capture_pageleave: true,
      capture_exceptions: true,
      // Disable debug to reduce console noise from abort errors
      debug: false,
      loaded: (posthog) => {
        if (process.env.NODE_ENV === "development") {
          console.log("PostHog initialized successfully");
        }
      },
    });
  } catch (error) {
    // Silently handle initialization errors
    if (process.env.NODE_ENV === "development") {
      console.warn("PostHog initialization error:", error);
    }
  }
}
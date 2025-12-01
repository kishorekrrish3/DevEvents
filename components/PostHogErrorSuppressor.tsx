"use client";

import { useEffect } from "react";

/**
 * Component to suppress PostHog AbortError warnings in the console.
 * These errors occur when PostHog requests are aborted during page navigation
 * or hot reloads in development, and are harmless.
 */
export default function PostHogErrorSuppressor() {
    useEffect(() => {
        // Store the original console.error
        const originalError = console.error;

        // Override console.error to filter out PostHog AbortErrors
        console.error = (...args: any[]) => {
            // Check if this is a PostHog AbortError
            const errorMessage = args[0]?.toString() || "";
            const stack = args[0]?.stack || "";

            if (
                errorMessage.includes("AbortError") &&
                (errorMessage.includes("signal is aborted") ||
                    stack.includes("posthog"))
            ) {
                // Silently ignore PostHog AbortErrors
                return;
            }

            // Call the original console.error for all other errors
            originalError.apply(console, args);
        };

        // Cleanup: restore original console.error when component unmounts
        return () => {
            console.error = originalError;
        };
    }, []);

    return null;
}

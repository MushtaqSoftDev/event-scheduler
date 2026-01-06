# PostHog post-wizard report

The wizard has completed a deep integration of your Next.js event scheduling project. PostHog has been configured using the modern `instrumentation-client.ts` approach (recommended for Next.js 15.3+), which provides automatic initialization on client-side load. The integration includes event tracking for key user interactions, automatic pageview capture, and error tracking via `capture_exceptions`.

## Integration Summary

The following files were created or modified:

| File | Change Type | Description |
|------|-------------|-------------|
| `.env` | Created | Environment variables for PostHog API key and host |
| `instrumentation-client.ts` | Created | Client-side PostHog initialization with error tracking enabled |
| `components/ExploreBtn.tsx` | Modified | Added `explore_events_clicked` event capture |
| `components/EventCard.tsx` | Modified | Added `event_card_clicked` event capture with event properties |
| `components/Navbar.tsx` | Modified | Added navigation click events for logo and nav items |

## Events Instrumented

| Event Name | Description | File Path |
|------------|-------------|-----------|
| `explore_events_clicked` | User clicked the 'Explore Events' CTA button to view featured events | `components/ExploreBtn.tsx` |
| `event_card_clicked` | User clicked on an event card to view event details (includes event_title, event_slug, event_location, event_date, event_time properties) | `components/EventCard.tsx` |
| `logo_clicked` | User clicked the logo in the navigation bar | `components/Navbar.tsx` |
| `nav_home_clicked` | User clicked the Home navigation link | `components/Navbar.tsx` |
| `nav_events_clicked` | User clicked the Events navigation link | `components/Navbar.tsx` |
| `nav_create_event_clicked` | User clicked the Create Event navigation link - top of funnel for event creation | `components/Navbar.tsx` |

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

### Dashboard
- [Analytics basics](https://us.posthog.com/project/279573/dashboard/980808) - Main dashboard with key analytics for the Event Schedule app

### Insights
- [Event Card Clicks](https://us.posthog.com/project/279573/insights/Zf7ywmzI) - Track which events users are clicking on, broken down by event title
- [Explore Events CTA Performance](https://us.posthog.com/project/279573/insights/EB8invIX) - Track how many users click the Explore Events button
- [Navigation Pattern Analysis](https://us.posthog.com/project/279573/insights/Xa8DzxXD) - Compare navigation clicks across Home, Events, Create Event, and Logo
- [Event Discovery Funnel](https://us.posthog.com/project/279573/insights/TjC8KwVl) - Conversion funnel from Explore Events click to Event Card click
- [Create Event Intent](https://us.posthog.com/project/279573/insights/FcTI0RSX) - Track users showing intent to create events

## Additional Notes

- **Automatic Pageviews**: PostHog is configured with `defaults: '2025-05-24'` which enables automatic pageview and pageleave tracking
- **Error Tracking**: Exception capture is enabled via `capture_exceptions: true`
- **Debug Mode**: Debug logging is enabled in development mode for easier troubleshooting
- **Environment Variables**: Make sure to add the environment variables to your production hosting provider (Vercel, Netlify, etc.)

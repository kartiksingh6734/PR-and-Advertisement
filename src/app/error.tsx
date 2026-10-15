"use client";
import { Button } from "@/components/ui";
export default function ErrorPage({ reset }: { reset: () => void }) {
  return (
    <section className="container page-header">
      <span className="eyebrow">LET’S TRY THAT AGAIN</span>
      <h1>This page couldn’t load.</h1>
      <p>
        Your request could not be completed. Please retry or return to the home
        page.
      </p>
      <div className="button-row">
        <button className="button" onClick={reset}>
          Try again
        </button>
        <Button href="/" secondary>
          Back to Home
        </Button>
      </div>
    </section>
  );
}

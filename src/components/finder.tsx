"use client";
import { useState } from "react";
import { questions, recommend } from "@/lib/assessment";
import { Button } from "./ui";
export function GrowthPlanFinder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(5).fill(""));
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  if (done) {
    const r = recommend(answers);
    return (
      <div className="assessment result">
        <span className="eyebrow">YOUR ILLUSTRATIVE STARTING POINT</span>
        <h2>{r.plan}</h2>
        <p>{r.why}</p>
        <h3>Suggested starting services</h3>
        <ul>
          {r.services.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <h3>Your next steps</h3>
        <p>{r.next}</p>
        <p className="notice">
          Illustrative rule-based recommendations, not professional guarantees
          or a quote. Final scope and suitability require a discussion.
        </p>
        <Button
          href={`/contact?plan=${encodeURIComponent(r.plan)}&assessment=${encodeURIComponent(questions.map((q, i) => `${q.title} ${answers[i]}`).join("\n"))}`}
        >
          Send my assessment
        </Button>
        <button
          className="text-link restart"
          onClick={() => {
            setDone(false);
            setStep(0);
          }}
        >
          Review answers
        </button>
      </div>
    );
  }
  return (
    <div className="assessment">
      <div className="progress-label">
        <span>YOUR BUSINESS, IN FIVE QUESTIONS</span>
        <span>0{step + 1} / 05</span>
      </div>
      <progress value={step + 1} max={5} aria-label="Assessment progress" />
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!answers[step]) {
            setError("Please choose an answer to continue.");
            return;
          }
          setError("");
          if (step === 4) setDone(true);
          else setStep(step + 1);
        }}
      >
        <fieldset>
          <legend>{questions[step].title}</legend>
          <div className="answer-options">
            {questions[step].options.map((o) => (
              <label className={answers[step] === o ? "selected" : ""} key={o}>
                <input
                  type="radio"
                  name={`question-${step}`}
                  checked={answers[step] === o}
                  value={o}
                  onChange={() => {
                    setAnswers(answers.map((v, i) => (i === step ? o : v)));
                    setError("");
                  }}
                />
                {o}
                <span>↗</span>
              </label>
            ))}
          </div>
        </fieldset>
        {error && (
          <p role="alert" className="error">
            {error}
          </p>
        )}
        <div className="step-controls">
          <button
            type="button"
            className="button secondary"
            disabled={step === 0}
            onClick={() => {
              setStep(step - 1);
              setError("");
            }}
          >
            Back
          </button>
          <button className="button" type="submit">
            {step === 4 ? "See my recommendation" : "Continue"} →
          </button>
        </div>
      </form>
    </div>
  );
}

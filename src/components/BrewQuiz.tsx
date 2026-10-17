"use client";

import Link from "next/link";
import { useState } from "react";
import { getItem } from "@/data/menu";
import { useCart } from "@/context/CartContext";
import { formatPrice } from "@/lib/ingredients";
import CupIllustration from "./CupIllustration";

type Answer = { label: string; scores: Record<string, number> };

const QUESTIONS: { q: string; answers: Answer[] }[] = [
  {
    q: "How do you spend a perfect morning at court?",
    answers: [
      { label: "Straight to council — no delays", scores: { "crown-espresso": 3, "regents-cortado": 2 } },
      { label: "A slow stroll through the spice gardens", scores: { "cinnamon-court-latte": 3, "velvet-latte": 1 } },
      { label: "By the sea, breeze in my hair", scores: { "coconut-kingsguard": 3, "kithul-iced-latte": 1 } },
      { label: "A grand feast, dessert first", scores: { "queens-mocha": 2, "gilded-affogato": 3 } },
    ],
  },
  {
    q: "Choose a jewel for your crown.",
    answers: [
      { label: "Onyx — dark and serious", scores: { "crown-espresso": 2, "highland-cold-brew": 2 } },
      { label: "Amber — warm and glowing", scores: { "cinnamon-court-latte": 2, "kithul-iced-latte": 2 } },
      { label: "Pearl — soft and luminous", scores: { "coconut-kingsguard": 2, "velvet-latte": 2 } },
      { label: "Gold — nothing less", scores: { "gilded-affogato": 3, "queens-mocha": 1 } },
    ],
  },
  {
    q: "The weather in the kingdom today?",
    answers: [
      { label: "Blazing sun", scores: { "highland-cold-brew": 3, "kithul-iced-latte": 3 } },
      { label: "Misty highlands", scores: { "kandyan-cappuccino": 3, "cinnamon-court-latte": 1 } },
      { label: "Monsoon rain", scores: { "queens-mocha": 3, "regents-cortado": 1 } },
      { label: "A perfect, golden evening", scores: { "coconut-kingsguard": 2, "gilded-affogato": 1, "velvet-latte": 1 } },
    ],
  },
];

export default function BrewQuiz() {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState<Record<string, number>>({});
  const { addItem, openCart } = useCart();

  const done = step >= QUESTIONS.length;
  const winner = done ? Object.entries(scores).sort((a, b) => b[1] - a[1])[0]?.[0] : undefined;
  const result = winner ? getItem(winner) : undefined;

  const choose = (a: Answer) => {
    setScores((prev) => {
      const next = { ...prev };
      for (const [k, v] of Object.entries(a.scores)) next[k] = (next[k] ?? 0) + v;
      return next;
    });
    setStep((s) => s + 1);
  };

  const reset = () => {
    setScores({});
    setStep(0);
  };

  return (
    <div className="gilded mx-auto max-w-4xl bg-ink-2/80 p-8 sm:p-12">
      {!done ? (
        <div key={step} className="animate-fade-up">
          <div className="flex items-center justify-between">
            <p className="eyebrow">
              Question {step + 1} of {QUESTIONS.length}
            </p>
            <div className="flex gap-1.5">
              {QUESTIONS.map((_, i) => (
                <span key={i} className={`h-1 w-8 rounded-full transition-colors ${i <= step ? "bg-gold" : "bg-line"}`} />
              ))}
            </div>
          </div>
          <h3 className="mt-6 font-display text-3xl sm:text-4xl">{QUESTIONS[step].q}</h3>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {QUESTIONS[step].answers.map((a) => (
              <button
                key={a.label}
                onClick={() => choose(a)}
                className="border border-line px-5 py-4 text-left text-lg transition-all hover:-translate-y-0.5 hover:border-gold hover:bg-gold/5 hover:text-gold-bright"
              >
                {a.label}
              </button>
            ))}
          </div>
        </div>
      ) : (
        result && (
          <div className="animate-fade-up grid items-center gap-8 sm:grid-cols-[200px_1fr]">
            {result.recipe && <CupIllustration recipe={result.recipe} steam className="mx-auto h-56 w-auto" title={result.name} />}
            <div>
              <p className="eyebrow">The court has decided — you are</p>
              <h3 className="mt-3 font-display text-4xl text-gold-bright italic sm:text-5xl">{result.name}</h3>
              <p className="mt-4 text-lg text-ivory/80">{result.description}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    addItem({
                      key: `${result.slug}:regal`,
                      slug: result.slug,
                      name: result.name,
                      price: result.price,
                      detail: "Regal · 8 oz",
                      recipe: result.recipe,
                    });
                    openCart();
                  }}
                  className="btn-gold"
                >
                  Order it · {formatPrice(result.price)}
                </button>
                <Link href={`/menu/${result.slug}`} className="btn-ghost">
                  Learn more
                </Link>
                <button onClick={reset} className="px-3 text-base text-muted underline-offset-4 hover:text-ivory hover:underline">
                  Ask again
                </button>
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}

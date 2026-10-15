export const questions = [
  {
    title: "What type of business do you run?",
    options: [
      "Restaurant/Café",
      "Retail/Shop",
      "Startup",
      "Manufacturing/B2B",
      "Service Business",
      "Other",
    ],
  },
  {
    title: "What is your biggest challenge?",
    options: [
      "Getting customers",
      "Building brand awareness",
      "Marketing and advertising",
      "Launching a business/product",
      "Finding business partners",
      "Improving overall growth",
    ],
  },
  {
    title: "What is your monthly working budget?",
    options: [
      "Under ₹5,000",
      "₹5,000–₹15,000",
      "₹15,000–₹30,000",
      "Above ₹30,000",
    ],
  },
  {
    title: "What stage is your business at?",
    options: [
      "Just starting",
      "Operating but struggling",
      "Growing steadily",
      "Ready to scale",
    ],
  },
  {
    title: "What is your priority?",
    options: [
      "More enquiries",
      "Better visibility",
      "Better branding",
      "More partnerships",
      "A complete growth plan",
    ],
  },
];
export function recommend(a: string[]) {
  if (a.length !== 5 || a.some((v, i) => !questions[i].options.includes(v)))
    throw new Error("Complete all five questions.");
  const budget = questions[2].options.indexOf(a[2]);
  const picks = new Set<string>();
  if (a[0] === "Manufacturing/B2B") picks.add("B2B Lead Generation");
  if (a[1] === "Finding business partners" || a[4] === "More partnerships")
    picks.add("Business Partnerships");
  if (a[1] === "Launching a business/product")
    picks.add("Product & Business Launches");
  if (a[4] === "Better branding" || a[3] === "Just starting")
    picks.add("Branding & Graphic Design");
  if (a[4] === "Better visibility" || a[1] === "Building brand awareness")
    picks.add("Social Media Marketing");
  if (a[4] === "More enquiries" || a[1] === "Getting customers")
    picks.add(
      a[0] === "Manufacturing/B2B"
        ? "B2B Lead Generation"
        : "Website Development",
    );
  if (a[1] === "Marketing and advertising")
    picks.add("Paid Advertising Management");
  if (!picks.size || a[4] === "A complete growth plan")
    picks.add("Business Growth Strategy");
  return {
    plan:
      budget === 0
        ? "Growth Audit"
        : budget === 1
          ? "Essential Growth"
          : budget === 2
            ? "Business Growth"
            : "Growth Partner+",
    services: [...picks],
    why: `For a business that is ${a[3].toLowerCase()}, the first priority is ${a[4].toLowerCase()}. ${budget === 0 ? "Your working budget is limited, so begin with an assessment rather than a recurring commitment." : "This coordination tier leaves scope to discuss a focused roadmap before committing to execution."}`,
    next: "Confirm your priorities in a consultation. Request a written scope and reserve a separate budget for media, providers and implementation. The working budget is not assumed to cover all recommended services.",
  };
}

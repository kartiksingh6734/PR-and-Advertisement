import { Button } from "@/components/ui";
export default function NotFound() {
  return (
    <section className="container page-header">
      <span className="eyebrow">404 / A DIFFERENT DIRECTION</span>
      <h1>This page isn’t here.</h1>
      <p>Let’s get you back to a useful starting point.</p>
      <Button href="/">Back to Home</Button>
    </section>
  );
}

import { Hero, Nav } from "@/components/Hero";
import { Closing, Principles, Tools } from "@/components/Sections";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Tools />
        <Principles />
      </main>
      <Closing />
    </>
  );
}

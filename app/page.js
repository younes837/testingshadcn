import Hero from "@/components/hero";
import Hero2 from "@/components/hero2";
import NavBar from "@/components/navBar";

import Image from "next/image";
import { ReactLenis, useLenis } from "lenis/react";
export default function Home() {
  return (
    <ReactLenis root>
      <NavBar />
      <Hero />
      <Hero2 />
    </ReactLenis>
  );
}

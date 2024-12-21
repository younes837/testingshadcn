import React from "react";
import Wrapper from "./global/wrapper";
import Container from "./global/container";

import {
  ArrowRight,
  Rocket,
  ScanFace,
  ScanFaceIcon,
  UserIcon,
  WandSparkles,
} from "lucide-react";
import Marquee from "./ui/marquee";
import { cn } from "@/lib/utils";
export const reviews = [
  {
    name: "Jack",
    username: "@jack",
    body: "I've never seen anything like this before. It's amazing. I love it.",
  },
  {
    name: "Jill",
    username: "@jill",
    body: "I don't know what to say. I'm speechless. This is amazing.",
  },
  {
    name: "John",
    username: "@john",
    body: "I'm at a loss for words. This is amazing. I love it.",
  },
  {
    name: "Jane",
    username: "@jane",
    body: "I'm at a loss for words. This is amazing. I love it.",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "I'm at a loss for words. This is amazing. I love it.",
  },
  {
    name: "James",
    username: "@james",
    body: "I'm at a loss for words. This is amazing. I love it.",
  },
];
export default function Hero2() {
  const firstRow = reviews.slice(0, reviews.length / 2);
  const secondRow = reviews.slice(reviews.length / 2);
  return (
    <Wrapper className="flex flex-col items-center justify-center py-16 md:py-24 relative">
      <Container>
        <div className="max-w-2xl mx-auto text-start md:text-center">
          <div className="relative inline-flex h-9 overflow-hidden rounded-full p-[1.5px] focus:outline-none select-none hover:scale-105 transition-transform">
            <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#3b82f6_0%,#93c5fd_50%,#3b82f6_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-background px-6 py-1 text-sm font-medium text-foreground backdrop-blur-3xl">
              The Process
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-bold mt-8 text-foreground">
            Three steps to build your dream website
          </h2>
          <p className="text-muted-foreground mt-6 text-lg">
            Turn your vision into reality in just 3 simple steps
          </p>
        </div>
      </Container>

      <Container>
        <div className="flex flex-col items-center justify-center py-16 md:py-24 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-8 md:gap-12">
            <div className="flex flex-col items-start p-8 rounded-2xl border border-border hover:border-blue-500/20 transition-all bg-card hover:shadow-lg hover:shadow-blue-500/5">
              <div className="flex items-center justify-center p-3 rounded-xl bg-blue-500/10 dark:bg-blue-500/5">
                <ScanFaceIcon className="w-8 h-8 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold mt-4 text-foreground">
                Sign Up
              </h3>
              <p className="text-muted-foreground mt-2">
                Create your free account to get started with Astra.
              </p>
            </div>

            <div className="flex flex-col items-start p-8 rounded-2xl border border-border hover:border-purple-500/20 transition-all bg-card hover:shadow-lg hover:shadow-purple-500/5">
              <div className="flex items-center justify-center p-3 rounded-xl bg-purple-500/10 dark:bg-purple-500/5">
                <WandSparkles className="w-8 h-8 text-purple-500" />
              </div>
              <h3 className="text-xl font-semibold mt-4 text-foreground">
                Customize
              </h3>
              <p className="text-muted-foreground mt-2">
                Choose a template and customize it to fit your needs.
              </p>
            </div>

            <div className="flex flex-col items-start p-8 rounded-2xl border border-border hover:border-green-500/20 transition-all bg-card hover:shadow-lg hover:shadow-green-500/5">
              <div className="flex items-center justify-center p-3 rounded-xl bg-green-500/10 dark:bg-green-500/5">
                <Rocket className="w-8 h-8 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold mt-4 text-foreground">
                Launch
              </h3>
              <p className="text-muted-foreground mt-2">
                Publish your website and share it with the world.
              </p>
            </div>
          </div>
        </div>
      </Container>

      {/* <div className="hidden md:block absolute -top-1/4 -left-1/3 w-72 h-72 bg-indigo-500 rounded-full blur-[10rem] -z-10"></div> */}
      <Container>
        <div className="max-w-md mx-auto text-start md:text-center">
          <div className="relative inline-flex h-8 overflow-hidden rounded-full p-[1.5px] focus:outline-none select-none">
            <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#1d4ed8_0%,#a5b4fc_50%,#1d4ed8_100%)]" />
            <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-4 py-1 text-sm font-medium text-white backdrop-blur-3xl">
              Our Customers
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-semibold mt-6">
            What people are saying
          </h2>
          <p className="text-muted-foreground mt-6">
            See how Astra empowers businesses of all sizes. Here&apos;s what
            real people are saying on Twitter
          </p>
        </div>
      </Container>

      <Container>
        <div className="py-16 md:py-24 w-full">
          <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden py-10">
            <Marquee pauseOnHover className="[--duration:30s] select-none">
              {firstRow.map((review) => (
                <figure
                  key={review.name}
                  className={cn(
                    "relative w-80 cursor-pointer overflow-hidden rounded-xl border p-6 mx-4 transition-all",
                    "border-border bg-card hover:shadow-lg hover:shadow-blue-500/5 hover:border-blue-500/20"
                  )}
                >
                  <div className="flex flex-row items-center gap-2">
                    <div className="p-2 rounded-full bg-blue-500/10 dark:bg-blue-500/5">
                      <UserIcon className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="flex flex-col">
                      <figcaption className="text-sm font-medium text-foreground">
                        {review.name}
                      </figcaption>
                      <p className="text-xs font-medium text-muted-foreground">
                        {review.username}
                      </p>
                    </div>
                  </div>
                  <blockquote className="mt-3 text-sm text-muted-foreground">
                    {review.body}
                  </blockquote>
                </figure>
              ))}
            </Marquee>
            <Marquee
              reverse
              pauseOnHover
              className="[--duration:20s] select-none"
            >
              {secondRow.map((review) => (
                <figure
                  key={review.name}
                  className={cn(
                    "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
                    "border-zinc-50/[.1] bg-background over:bg-zinc-50/[.15]"
                  )}
                >
                  <div className="flex flex-row items-center gap-2">
                    <UserIcon className="w-6 h-6" />
                    <div className="flex flex-col">
                      <figcaption className="text-sm font-medium">
                        {review.name}
                      </figcaption>
                      <p className="text-xs font-medium text-muted-foreground">
                        {review.username}
                      </p>
                    </div>
                  </div>
                  <blockquote className="mt-2 text-sm">
                    {review.body}
                  </blockquote>
                </figure>
              ))}
            </Marquee>
            <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-background"></div>
            <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-background"></div>
          </div>
        </div>
      </Container>
      <footer className="border-t border-border bg-background">
        <Container>
          <div className="py-12 md:py-16">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Brand Column */}
              <div className="space-y-4">
                <h3 className="font-semibold text-xl text-foreground">Astra</h3>
                <p className="text-sm text-muted-foreground">
                  Building the future of web development, one site at a time.
                </p>
                <div className="flex space-x-4">
                  <Link
                    href="https://twitter.com"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Twitter className="h-5 w-5" />
                  </Link>
                  <Link
                    href="https://github.com"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Github className="h-5 w-5" />
                  </Link>
                </div>
              </div>

              {/* Product Column */}
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Product</h4>
                <ul className="space-y-3 text-sm">
                  <li>
                    <Link
                      href="/features"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Features
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/pricing"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Pricing
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/templates"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Templates
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Company Column */}
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Company</h4>
                <ul className="space-y-3 text-sm">
                  <li>
                    <Link
                      href="/about"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      About
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/blog"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Blog
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/careers"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Careers
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Legal Column */}
              <div className="space-y-4">
                <h4 className="font-medium text-foreground">Legal</h4>
                <ul className="space-y-3 text-sm">
                  <li>
                    <Link
                      href="/privacy"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Privacy
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/terms"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Terms
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t border-border mt-12 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} Astra. All rights reserved.
                </p>
                <div className="flex space-x-6">
                  <Link
                    href="/privacy"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Privacy Policy
                  </Link>
                  <Link
                    href="/terms"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Terms of Service
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </footer>
    </Wrapper>
  );
}

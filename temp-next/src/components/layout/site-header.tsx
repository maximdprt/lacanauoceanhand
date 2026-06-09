"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import { navItems, beachXperienceUrl } from "@/data/site";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-line bg-white/85 backdrop-blur-md"
          : "border-b border-transparent bg-white/0",
      )}
    >
      <div className="container-x flex h-[68px] items-center justify-between gap-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5" aria-label="Accueil Lacanau Océhand">
          <Image
            src="/brand/logo-color.png"
            alt="Logo Lacanau Océhand"
            width={40}
            height={40}
            className="h-10 w-10 object-contain"
          />
          <span className="font-display text-xl uppercase tracking-tight text-ink">
            Lacanau<span className="text-ocean"> Océhand</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          {navItems.slice(0, -1).map((item) => (
            <Link
              key={item.href}
              href={item.href}
              data-active={isActive(item.href)}
              className={cn(
                "nav-link text-sm font-semibold text-ink/80 transition hover:text-ink",
                isActive(item.href) && "text-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/rejoindre"
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-ocean"
          >
            Rejoindre
          </Link>
          <a href={beachXperienceUrl} target="_blank" rel="noopener noreferrer">
            <Button
              variant="ocean"
              className="rounded-full px-5 py-2.5 text-sm"
            >
              Beach Xperience
            </Button>
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink lg:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-[68px] z-40 bg-white lg:hidden"
          >
            <nav className="container-x flex flex-col gap-1 py-6">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i }}
                >
                  <Link
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between border-b border-line py-4 text-2xl font-semibold text-ink",
                      isActive(item.href) && "text-ocean",
                    )}
                  >
                    <span className="font-display uppercase">{item.label}</span>
                    <span className="section-index text-sm text-line-strong">
                      0{i + 1}
                    </span>
                  </Link>
                </motion.div>
              ))}
              <a
                href={beachXperienceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex items-center justify-between rounded-2xl border border-ocean/25 bg-ocean-tint px-4 py-4 text-ocean transition hover:border-ocean"
              >
                <span className="font-display text-lg uppercase">Beach Xperience</span>
                <span className="text-xs font-medium">site-lbhx.vercel.app →</span>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

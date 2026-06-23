"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Committees", href: "/committees" },
  { label: "Secretariat", href: "/secretariat" },
  { label: "Collaborators", href: "/collaborators" },
  { label: "Resources", href: "/resources" },
  { label: "Contact", href: "/contact" }
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on path changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Floating Navbar Wrapper */}
      <div
        className={`fixed left-0 right-0 z-50 transition-all duration-500 flex justify-center px-4 md:px-8 ${
          isScrolled ? "top-3" : "top-6"
        }`}
      >
        <header
          className={`w-full max-w-6xl transition-all duration-500 rounded-full border border-foreground/[0.08] backdrop-blur-xl flex items-center justify-between px-6 md:px-8 relative ${
            isScrolled
              ? "bg-background/85 py-2.5 shadow-[0_12px_40px_-10px_rgba(0,0,0,0.1)] dark:shadow-[0_12px_40px_-10px_rgba(0,0,0,0.8)]"
              : "bg-background/60 py-3.5 shadow-none"
          }`}
        >
          {/* Subtle top edge glass sheen glow */}
          <div className="absolute inset-x-8 top-0 h-[1px] bg-gradient-to-r from-transparent via-foreground/15 to-transparent pointer-events-none" />

          {/* Left: Logo with iemmun-logo.png */}
          <div className="flex-1 flex items-center justify-start">
            <Link href="/" className="group flex items-center gap-2.5 select-none">
              <div className="relative w-8 h-8 flex-shrink-0">
                <Image
                  src="/iemmun-logo.png"
                  alt="IEMMUN Logo"
                  fill
                  sizes="32px"
                  className="object-contain"
                  priority
                />
              </div>
              <div className="flex flex-col">
                <span className="text-[13px] font-bold tracking-[0.2em] text-foreground leading-none">
                  IEM<span className="text-accent transition-colors">MUN</span>
                </span>
                <span className="text-[9px] font-semibold tracking-[0.25em] text-foreground/60 mt-1 leading-none">
                  2026
                </span>
              </div>
            </Link>
          </div>

          {/* Center: Desktop Nav (Perfect horizontal alignment) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 justify-center">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname?.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative text-[10px] uppercase tracking-[0.16em] font-semibold transition-all py-2 px-3.5 rounded-full ${
                    isActive ? "text-foreground" : "text-foreground/60 hover:text-foreground hover:bg-foreground/[0.03]"
                  }`}
                >
                  <span className="relative z-10">{item.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="activeNavLine"
                      className="absolute bottom-1 left-3.5 right-3.5 h-[2px] bg-accent rounded-full shadow-[0_0_8px_#C30D0F,0_0_15px_#C30D0F]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right: CTA & Mobile Menu Toggle (takes flex-1 to push nav to center) */}
          <div className="flex-1 flex items-center justify-end gap-3 md:gap-4">
            {/* Action CTA Button */}
            <div className="hidden lg:block">
              <Link
                href="/committees"
                className="text-[10px] font-semibold tracking-wider uppercase bg-accent text-white border border-transparent px-5 py-2.5 rounded-full hover:bg-accent-hover transition-all duration-300 shadow-[0_4px_12px_rgba(195,13,15,0.2)] hover:shadow-none"
              >
                Explore Committees
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-1.5 text-foreground/60 hover:text-foreground focus:outline-none cursor-pointer rounded-full hover:bg-foreground/5 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </header>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="fixed top-[76px] left-4 right-4 z-40 lg:hidden flex flex-col p-6 rounded-3xl bg-neutral-950/95 backdrop-blur-2xl border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.9)] max-h-[calc(100vh-100px)] overflow-y-auto"
          >
            {/* Subtle sheen highlight inside mobile menu */}
            <div className="absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />

            <nav className="flex flex-col gap-1.5 font-sans">
              {navItems.map((item, idx) => {
                const isActive =
                  item.href === "/"
                    ? pathname === "/"
                    : pathname?.startsWith(item.href);

                return (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.04 }}
                    key={item.href}
                  >
                    <Link
                      href={item.href}
                      className={`text-xs uppercase tracking-[0.2em] font-semibold flex items-center justify-between py-3 px-4 rounded-xl transition-all duration-200 ${
                        isActive
                          ? "text-white bg-white/[0.04] border-l-2 border-accent"
                          : "text-neutral-400 hover:text-white hover:bg-white/[0.02]"
                      }`}
                    >
                      {item.label}
                      {isActive && <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_8px_#C30D0F]" />}
                    </Link>
                  </motion.div>
                );
              })}
            </nav>

            <div className="mt-6 pt-6 border-t border-white/[0.06] flex flex-col gap-4 font-sans">
              <Link
                href="/committees"
                className="w-full text-center text-xs font-semibold tracking-widest uppercase bg-white text-black py-3 rounded-full hover:bg-neutral-200 transition-colors shadow-lg shadow-white/5"
              >
                Explore Committees
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

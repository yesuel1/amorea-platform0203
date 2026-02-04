"use client";

import Link from "next/link";
import { useState } from "react";

interface NavLink {
  href: string;
  label: string;
}

export default function Navbar({
  links,
  backLink,
}: {
  links?: NavLink[];
  backLink?: { href: string; label: string };
}) {
  const [open, setOpen] = useState(false);

  const defaultLinks: NavLink[] = [
    { href: "#about", label: "역노화란" },
    { href: "#counselors", label: "카운셀러" },
    { href: "#reviews", label: "후기" },
    { href: "#recruit", label: "함께하기" },
  ];

  const navLinks = links ?? defaultLinks;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* 로고 */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-[#7B1FA2] to-[#E91E63]">
            <span className="text-sm font-bold text-white">A</span>
          </div>
          <span className="text-lg font-bold tracking-tight">
            <span className="gradient-text">AMOREA</span>{" "}
            <span className="text-gray-400 text-xs font-normal">분당점</span>
          </span>
        </Link>

        {/* 데스크탑 메뉴 */}
        <div className="hidden items-center gap-6 sm:flex">
          {backLink ? (
            <Link
              href={backLink.href}
              className="text-sm font-medium text-gray-500 transition-colors hover:text-[#7B1FA2]"
            >
              {backLink.label}
            </Link>
          ) : (
            <>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-gray-600 transition-colors hover:text-[#7B1FA2]"
                >
                  {link.label}
                </a>
              ))}
              <Link
                href="/apply"
                className="rounded-full bg-gradient-to-r from-[#7B1FA2] to-[#E91E63] px-5 py-2 text-xs font-semibold text-white transition-transform hover:scale-105"
              >
                카운셀러 지원
              </Link>
            </>
          )}
        </div>

        {/* 모바일 햄버거 버튼 */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex h-10 w-10 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100 sm:hidden"
          aria-label="메뉴 열기"
        >
          {open ? (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      <div
        className={`overflow-hidden border-t border-gray-100 bg-white transition-all duration-300 sm:hidden ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-1 px-4 py-3">
          {backLink ? (
            <Link
              href={backLink.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-4 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-[#7B1FA2]"
            >
              {backLink.label}
            </Link>
          ) : (
            <>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-4 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50 hover:text-[#7B1FA2]"
                >
                  {link.label}
                </a>
              ))}
              <div className="border-t border-gray-100 pt-2 mt-2">
                <Link
                  href="/apply"
                  onClick={() => setOpen(false)}
                  className="block rounded-xl bg-gradient-to-r from-[#7B1FA2] to-[#E91E63] px-4 py-3 text-center text-sm font-bold text-white"
                >
                  카운셀러 지원하기
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

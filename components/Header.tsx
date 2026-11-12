"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/site";

export function Header() {
  const pathname = usePathname();

  if (pathname.startsWith("/preview")) {
    return null;
  }

  const isAdmin = pathname.startsWith("/admin");
  const title = isAdmin ? "SafeWheels • Admin" : siteConfig.galleryTitle;

  return (
    <header className="bg-maroon" style={{ color: "#ffffff" }}>
      <div className="mx-auto max-w-5xl px-4 py-5 text-center sm:px-6 sm:py-6">
        <Link
          href="/"
          className="mx-auto inline-flex rounded-xl bg-white px-3 py-2 shadow-[0_6px_20px_rgba(0,0,0,0.22)] transition hover:opacity-95"
        >
          <Image
            src={siteConfig.logoSrc}
            alt="SafeWheels"
            width={200}
            height={120}
            className="h-12 w-auto object-contain sm:h-14"
            priority
          />
        </Link>

        <p
          className="mt-3 text-[10px] font-medium uppercase tracking-[0.28em] sm:text-[11px]"
          style={{ color: "rgba(255,255,255,0.9)" }}
        >
          {siteConfig.organizationName}
        </p>

        <div className="mx-auto mt-2.5 flex max-w-md items-center gap-3">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent to-white/70" />
          <span className="h-1.5 w-1.5 rotate-45 bg-white" aria-hidden />
          <span className="h-px flex-1 bg-gradient-to-l from-transparent to-white/70" />
        </div>

        <h1
          className="mt-2.5 font-display text-2xl leading-none tracking-tight sm:text-3xl lg:text-[2.25rem]"
          style={{ color: "#ffffff" }}
        >
          {title}
        </h1>
      </div>
    </header>
  );
}

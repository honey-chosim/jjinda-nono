"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { mockRequests } from "@/data/mock-requests";

const pendingCount = mockRequests.filter((r) => r.status === "pending").length;

function IconSearch({ active }: { active: boolean }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={active ? "2.2" : "1.8"} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m21 21-5-5" />
    </svg>
  );
}

function IconHeart({ active }: { active: boolean }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? "0" : "1.8"} strokeLinecap="round" strokeLinejoin="round">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function IconPerson({ active }: { active: boolean }) {
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth={active ? "0" : "1.8"} strokeLinecap="round" strokeLinejoin="round">
      {active ? (
        <>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </>
      ) : (
        <>
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </>
      )}
    </svg>
  );
}

const navItems = [
  { href: "/profiles", label: "탐색", Icon: IconSearch },
  { href: "/requests", label: "요청", Icon: IconHeart, badge: pendingCount },
  { href: "/my", label: "MY", Icon: IconPerson },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 pb-safe"
      style={{
        background: "rgba(255,255,255,0.88)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderTop: "0.5px solid rgba(0,0,0,0.1)",
      }}
    >
      <div className="max-w-lg mx-auto flex items-stretch">
        {navItems.map(({ href, label, Icon, badge }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex-1 flex flex-col items-center justify-center gap-[3px] py-2.5 min-h-[52px] relative transition-opacity active:opacity-60",
                active ? "text-[#3B82F6]" : "text-[#9CA3AF]"
              )}
            >
              <span className="relative">
                <Icon active={active} />
                {badge && badge > 0 && (
                  <span className="absolute -top-1 -right-1.5 min-w-[16px] h-4 bg-[#DC2626] text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                    {badge}
                  </span>
                )}
              </span>
              <span className={cn("text-[10px] font-medium tracking-tight", active && "font-semibold text-[#3B82F6]")}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

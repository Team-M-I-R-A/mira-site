"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";

type Platform = "android" | "ios";

const tabs: { id: Platform; label: string }[] = [
  { id: "android", label: "Android (Chrome)" },
  { id: "ios", label: "iPhone (Safari)" },
];

type InstallTabsProps = {
  defaultPlatform: Platform;
  androidPanel: ReactNode;
  iosPanel: ReactNode;
};

const tabClass =
  "press flex-1 touch-manipulation rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00798f] focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950";

const panelClass =
  "rounded-3xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00798f]/60 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950";

export default function InstallTabs({
  defaultPlatform,
  androidPanel,
  iosPanel,
}: InstallTabsProps) {
  const [active, setActive] = useState<Platform>(defaultPlatform);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = tabs.findIndex((tab) => tab.id === active);
    let nextIndex: number | null = null;

    if (event.key === "ArrowRight") {
      nextIndex = (currentIndex + 1) % tabs.length;
    } else if (event.key === "ArrowLeft") {
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = tabs.length - 1;
    }

    if (nextIndex === null) return;

    event.preventDefault();
    setActive(tabs[nextIndex].id);
    tabRefs.current[nextIndex]?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Choisissez votre téléphone"
        onKeyDown={handleKeyDown}
        className="mx-auto mb-12 flex w-full max-w-xs gap-1 rounded-full border border-white/10 bg-white/3 p-1"
      >
        {tabs.map((tab, index) => {
          const selected = tab.id === active;

          return (
            <button
              key={tab.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              type="button"
              role="tab"
              id={`installer-tab-${tab.id}`}
              aria-selected={selected}
              aria-controls={`installer-panel-${tab.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(tab.id)}
              className={[
                tabClass,
                selected
                  ? "bg-gradient-to-r from-[#2233DD] to-[#1A6BFF] text-white"
                  : "text-dark-300 hover:text-[#2233DD]",
              ].join(" ")}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id="installer-panel-android"
        aria-labelledby="installer-tab-android"
        tabIndex={0}
        hidden={active !== "android"}
        className={panelClass}
      >
        {androidPanel}
      </div>

      <div
        role="tabpanel"
        id="installer-panel-ios"
        aria-labelledby="installer-tab-ios"
        tabIndex={0}
        hidden={active !== "ios"}
        className={panelClass}
      >
        {iosPanel}
      </div>
    </div>
  );
}

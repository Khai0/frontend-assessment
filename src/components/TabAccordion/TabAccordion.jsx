import { useState } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Tabs } from "./Tabs.jsx";
import { Accordion } from "./Accordion.jsx";

export default function TabAccordion({ items }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  return isDesktop ? (
    <DesktopTabs key="desktop" items={items} />
  ) : (
    <MobileTabs key="mobile" items={items} />
  );
}

function DesktopTabs({ items }) {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 py-12">
      <Tabs
        items={items}
        activeIndex={activeIndex}
        onTabClick={setActiveIndex}
      />
    </section>
  );
}

function MobileTabs({ items }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const handleToggle = (index) =>
    setActiveIndex((prev) => (prev === index ? -1 : index));
  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 py-12">
      <Accordion
        items={items}
        activeIndex={activeIndex}
        onToggle={handleToggle}
      />
    </section>
  );
}

import { useState, useEffect } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { Tabs } from "./Tabs.jsx";
import { Accordion } from "./Accordion.jsx";

export default function TabAccordion({ items }) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (isDesktop && activeIndex < 0) {
      setActiveIndex(0);
    }
  }, [isDesktop, activeIndex]);

  const handleToggle = (index) =>
    setActiveIndex((prev) => (prev === index ? -1 : index));

  return isDesktop ? (
    <section className="w-full max-w-[1200px] mx-auto px-6 py-12">
      <Tabs
        items={items}
        activeIndex={activeIndex}
        onTabClick={setActiveIndex}
      />
    </section>
  ) : (
    <section className="w-full max-w-[1200px] mx-auto px-6 py-12">
      <Accordion
        items={items}
        activeIndex={activeIndex}
        onToggle={handleToggle}
      />
    </section>
  );
}

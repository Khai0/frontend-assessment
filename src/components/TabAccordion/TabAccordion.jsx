import { useState, useEffect } from "react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { Tabs } from "./Tabs.jsx";
import { Accordion } from "./Accordion.jsx";

export default function TabAccordion({ items }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    if (isDesktop && activeIndex === -1) {
      setActiveIndex(0);
    }
  }, [isDesktop]);

  const handleTabClick = (index) => setActiveIndex(index);
  const handleAccordionToggle = (index) =>
    setActiveIndex((prev) => (prev === index ? -1 : index));

  if (isDesktop) {
    return (
      <section className="w-full max-w-[1200px] mx-auto px-6 py-12">
        <Tabs
          items={items}
          activeIndex={activeIndex}
          onTabClick={handleTabClick}
        />
      </section>
    );
  }

  return (
    <section className="w-full max-w-[1200px] mx-auto px-6 py-12">
      <Accordion
        items={items}
        activeIndex={activeIndex}
        onToggle={handleAccordionToggle}
      />
    </section>
  );
}

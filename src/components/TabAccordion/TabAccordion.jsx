// TabAccordion.jsx
import { useState } from "react";
import styles from "./TabAccordion.module.scss";

function AccordionItem({ item, index, isOpen, onToggle }) {
  return (
    <div
      className={`${styles.accordionItem} ${isOpen ? styles.accordionItemOpen : ""}`}
    >
      <button
        className={styles.accordionBtn}
        aria-expanded={isOpen}
        aria-controls={`accordion-panel-${index}`}
        onClick={() => onToggle(index)}
      >
        <span>{item.title}</span>
        <span className={styles.accordionIcon} aria-hidden="true">
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3 6L8 11L13 6"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </button>

      <div
        id={`accordion-panel-${index}`}
        className={styles.accordionPanel}
        aria-hidden={!isOpen}
      >
        <div className={styles.accordionInner}>
          <div
            className={styles.accordionContent}
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        </div>
      </div>
    </div>
  );
}

export default function TabAccordion({ items }) {
  const [activeTab, setActiveTab] = useState(0);
  const [activeAccordion, setActiveAccordion] = useState(0);

  const handleAccordion = (index) => {
    setActiveAccordion((prev) => (prev === index ? -1 : index));
  };

  return (
    <section className={styles.wrapper}>
      <div className={styles.tabs}>
        <div className={styles.tabList} role="tablist">
          {items.map((item, i) => (
            <button
              key={item.title}
              role="tab"
              aria-selected={activeTab === i}
              aria-controls={`panel-${i}`}
              id={`tab-${i}`}
              className={`${styles.tabBtn} ${activeTab === i ? styles.tabBtnActive : ""}`}
              onClick={() => setActiveTab(i)}
            >
              {item.title}
              <span className={styles.tabIndicator} />
            </button>
          ))}
        </div>

        <div className={styles.tabPanels}>
          {items.map((item, i) => (
            <div
              key={item.title}
              id={`panel-${i}`}
              role="tabpanel"
              aria-labelledby={`tab-${i}`}
              className={`${styles.tabPanel} ${activeTab === i ? styles.tabPanelActive : ""}`}
              dangerouslySetInnerHTML={{ __html: item.content }}
            />
          ))}
        </div>
      </div>

      <div className={styles.accordion}>
        {items.map((item, i) => (
          <AccordionItem
            key={item.title}
            item={item}
            index={i}
            isOpen={activeAccordion === i}
            onToggle={handleAccordion}
          />
        ))}
      </div>
    </section>
  );
}

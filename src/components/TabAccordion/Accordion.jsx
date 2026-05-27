import clsx from "clsx";
import { sanitizeHtml } from "../../utils/sanitize";

function AccordionItem({ item, index, isOpen, onToggle }) {
  return (
    <div className="accordion__item border-b border-border-light last:border-b-0">
      <button
        className={clsx(
          "accordion__trigger flex items-center justify-between w-full",
          "px-5 py-4 border-none text-left",
          "font-pp font-semibold text-[15px] cursor-pointer",
          "transition-[background,color] duration-200 motion-reduce:transition-none",
          isOpen ? "bg-heading-bg text-white" : "bg-white text-text-primary",
        )}
        aria-expanded={isOpen}
        aria-controls={`accordion-panel-${index}`}
        onClick={() => onToggle(index)}
      >
        <span className="accordion__title">{item.title}</span>
        <span
          className={clsx(
            "accordion__icon flex items-center flex-shrink-0",
            "transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
            "motion-reduce:transition-none",
            isOpen && "rotate-180",
          )}
          aria-hidden="true"
        >
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
        className={clsx(
          "accordion__panel grid bg-accordion-bg",
          "transition-[grid-template-rows] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)]",
          "motion-reduce:transition-none",
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
        aria-hidden={!isOpen}
      >
        <div className="accordion__overflow overflow-hidden min-h-0">
          <div
            className={clsx(
              "accordion__content p-5",
              "[&_p]:font-rb [&_p]:text-[14px] [&_p]:leading-[1.75] [&_p]:text-content-muted [&_p]:mb-[10px]",
              "[&_ul]:pl-[18px] [&_ul]:mt-[6px]",
              "[&_li]:font-rb [&_li]:text-[14px] [&_li]:leading-[1.75] [&_li]:text-content-muted [&_li]:list-disc [&_li]:mb-1",
            )}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.content) }}
          />
        </div>
      </div>
    </div>
  );
}

export function Accordion({ items, activeIndex, onToggle }) {
  return (
    <div className="accordion flex flex-col overflow-hidden rounded-lg border border-border-light md:hidden">
      {items.map((item, i) => (
        <AccordionItem
          key={item.id}
          item={item}
          index={i}
          isOpen={activeIndex === i}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
}

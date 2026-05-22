import clsx from "clsx";

function AccordionItem({ item, index, isOpen, onToggle }) {
  return (
    <div
      className={clsx(
        "border-b border-border-light last:border-b-0",
        isOpen &&
          "is-open [&_.accordion-icon]:rotate-180 [&_.accordion-btn]:bg-heading-bg [&_.accordion-btn]:text-white [&_.accordion-panel]:grid-rows-[1fr]",
      )}
    >
      <button
        className="accordion-btn w-full flex items-center justify-between px-5 py-4 border-none bg-white text-left font-pp text-[15px] font-semibold text-text-primary cursor-pointer transition-[background,color] duration-200 motion-reduce:transition-none"
        aria-expanded={isOpen}
        aria-controls={`accordion-panel-${index}`}
        onClick={() => onToggle(index)}
      >
        <span>{item.title}</span>
        <span
          className="accordion-icon flex items-center flex-shrink-0 transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
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
        className="accordion-panel grid grid-rows-[0fr] bg-accordion-bg transition-[grid-template-rows] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
        aria-hidden={!isOpen}
      >
        <div className="overflow-hidden">
          <div
            className="p-5 [&_p]:font-rb [&_p]:text-[14px] [&_p]:leading-[1.75] [&_p]:text-content-muted [&_p]:mb-[10px] [&_ul]:pl-[18px] [&_ul]:mt-[6px] [&_li]:font-rb [&_li]:text-[14px] [&_li]:leading-[1.75] [&_li]:text-content-muted [&_li]:list-disc [&_li]:mb-1"
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        </div>
      </div>
    </div>
  );
}

export function Accordion({ items, activeIndex, onToggle }) {
  return (
    <div className="flex flex-col border border-border-light rounded-lg overflow-hidden md:hidden">
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

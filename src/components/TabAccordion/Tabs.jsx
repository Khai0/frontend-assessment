import clsx from "clsx";
import { sanitizeHtml } from "../../utils/sanitize";

export function Tabs({
  items,
  activeIndex,
  onTabClick,
  label = "Content tabs",
}) {
  function handleKeyDown(e, currentIndex) {
    const total = items.length;
    const map = {
      ArrowRight: (currentIndex + 1) % total,
      ArrowLeft: (currentIndex - 1 + total) % total,
      Home: 0,
      End: total - 1,
    };
    const next = map[e.key];
    if (next === undefined) return;
    e.preventDefault();
    onTabClick(next);
    document.getElementById(`tab-${next}`)?.focus();
  }

  return (
    <div className="tabs hidden overflow-hidden rounded-lg border border-border-light md:block">
      <div
        className="tabs__header flex justify-center border-b border-border-light"
        role="tablist"
        aria-label={label}
      >
        {items.map((item, i) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={activeIndex === i}
            aria-controls={`panel-${i}`}
            id={`tab-${i}`}
            tabIndex={activeIndex === i ? 0 : -1}
            data-active={activeIndex === i}
            className="
              tabs__tab group relative overflow-hidden
              px-7 py-[14px] border-none bg-transparent
              type-tab-label
              text-text-muted
              cursor-pointer transition-[color,transform] duration-200
              hover:text-text-primary hover:-translate-y-[1px]
              motion-reduce:transition-none
              data-[active=true]:font-bold data-[active=true]:text-heading-bg
            "
            onClick={() => onTabClick(i)}
            onKeyDown={(e) => handleKeyDown(e, i)}
          >
            <span
              className="invisible block h-0 overflow-hidden font-bold"
              aria-hidden="true"
            >
              {item.title}
            </span>
            <span className="tabs__tab-label">{item.title}</span>
            <span
              className={clsx(
                "tabs__indicator absolute bottom-[-2px] left-0 w-full h-[2px]",
                "bg-heading-bg origin-left",
                "transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                activeIndex === i ? "scale-x-100" : "scale-x-0",
              )}
            />
          </button>
        ))}
      </div>

      <div className="tabs__body relative">
        {items.map((item, i) => (
          <div
            key={item.id}
            id={`panel-${i}`}
            role="tabpanel"
            aria-labelledby={`tab-${i}`}
            aria-hidden={activeIndex !== i}
            tabIndex={activeIndex === i ? 0 : -1}
            className={clsx(
              "tabs__panel p-6",
              "transition-[opacity,transform] duration-200 ease-in motion-reduce:transition-none",
              "type-rich-text-md",
              "[&_p]:text-content-body [&_p]:mb-3",
              "[&_ul]:pl-5 [&_ul]:mt-2",
              "[&_li]:text-content-body [&_li]:list-disc [&_li]:mb-1",
              activeIndex === i
                ? "relative opacity-100 translate-y-0 pointer-events-auto"
                : "absolute inset-x-0 top-0 opacity-0 translate-y-2 pointer-events-none",
            )}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.content) }}
          />
        ))}
      </div>
    </div>
  );
}

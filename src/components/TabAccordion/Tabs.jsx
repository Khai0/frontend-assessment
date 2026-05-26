import clsx from "clsx";

export function Tabs({ items, activeIndex, onTabClick }) {
  return (
    <div className="hidden md:block border border-border-light rounded-lg overflow-hidden">
      <div
        className="flex justify-center border-b border-border-light"
        role="tablist"
      >
        {items.map((item, i) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={activeIndex === i}
            aria-controls={`panel-${i}`}
            id={`tab-${i}`}
            data-active={activeIndex === i}
            className="group relative overflow-hidden px-7 py-[14px] border-none bg-transparent font-pp text-[15px] font-medium text-text-muted cursor-pointer hover:text-text-primary hover:-translate-y-[1px] transition-[color,transform] duration-200 motion-reduce:transition-none data-[active=true]:font-bold data-[active=true]:text-heading-bg"
            onClick={() => onTabClick(i)}
          >

            <span
              className="invisible font-bold block h-0 overflow-hidden"
              aria-hidden="true"
            >
              {item.title}
            </span>
            <span>{item.title}</span>

            <span
              className={clsx(
                "absolute bottom-[-2px] left-0 w-full h-[2px] bg-heading-bg origin-left transition-transform duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                activeIndex === i ? "scale-x-100" : "scale-x-0",
              )}
            />
          </button>
        ))}
      </div>

      <div className="relative pt-0">
        {items.map((item, i) => (
          <div
            key={item.id}
            id={`panel-${i}`}
            role="tabpanel"
            aria-labelledby={`tab-${i}`}
            className={clsx(
              "p-6 transition-[opacity,transform] duration-200 ease-in motion-reduce:transition-none [&_p]:font-rb [&_p]:text-[15px] [&_p]:leading-[1.75] [&_p]:text-content-body [&_p]:mb-3 [&_ul]:pl-5 [&_ul]:mt-2 [&_li]:font-rb [&_li]:text-[15px] [&_li]:leading-[1.75] [&_li]:text-content-body [&_li]:list-disc [&_li]:mb-1",
              activeIndex === i
                ? "relative opacity-100 translate-y-0 pointer-events-auto"
                : "absolute inset-x-0 top-0 opacity-0 translate-y-2 pointer-events-none",
            )}
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        ))}
      </div>
    </div>
  );
}

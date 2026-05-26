export default function HeadingBlock({ content }) {
  const { eyebrow, heading, blurb, buttons } = content;

  return (
    <div className="relative w-full h-full text-white bg-black/50 flex flex-col px-3 pt-6 pb-10 md:grid md:p-0 md:grid-cols-[theme(spacing.hero-text-col)_1fr_1fr] md:grid-rows-[auto_auto] md:items-stretch">
      <div className="flex flex-col items-start gap-4 p-0 sm:w-full sm:min-h-[theme(spacing.heading-block-h)] sm:py-10 sm:pr-2.5 sm:pl-6">
        <div className="flex flex-col">
          <span className="block mb-2 tracking-[0] text-white font-pp font-semibold text-[10px] leading-[15px] md:font-sans md:font-bold md:text-[12px] md:leading-[14px]">
            {eyebrow}
          </span>
          <h1 className="text-white font-rb font-normal text-[36px] leading-[42px] md:font-sans md:text-[56px] md:leading-[64px]">
            {heading}
          </h1>
        </div>
        <p className="text-white font-pp font-normal text-[10px] leading-[15px] md:font-sans md:text-[12px] md:leading-[14px]">
          {blurb}
        </p>

        <div className="inline-flex gap-2">
          {buttons.map((btn) => (
            <a
              key={btn.id}
              href={btn.url}
              className="px-6 py-3 font-pp font-semibold text-[12px] leading-[1.5] md:font-sans md:font-bold md:leading-[14px] transition-colors duration-200 bg-transparent text-white ring-1 ring-inset ring-white hover:bg-white hover:text-text-primary"
            >
              {btn.label}
            </a>
          ))}
        </div>
      </div>

      <div
        className="hidden md:block md:w-full md:col-start-2 md:row-start-1"
        aria-hidden="true"
      />
      <div
        className="hidden md:block md:w-full md:col-start-3 md:row-start-1"
        aria-hidden="true"
      />
    </div>
  );
}

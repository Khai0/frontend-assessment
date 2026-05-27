export default function HeadingBlock({
  content,
  headingAs: HeadingTag = "h2",
}) {
  const { eyebrow, heading, blurb, buttons } = content;

  return (
    <div
      className="
        heading-block relative flex flex-col w-full h-full
        px-3 pt-6 pb-10
        bg-black/50 text-white
        md:grid md:grid-cols-[theme(spacing.hero-text-col)_1fr_1fr] md:grid-rows-[auto_auto] md:items-stretch md:p-0"
    >
      <div
        className="
          heading-block__body flex flex-col items-start gap-4 p-0
          sm:w-full sm:min-h-[theme(spacing.heading-block-h)] sm:py-10 sm:pr-2.5 sm:pl-6"
      >
        <div className="heading-block__titles flex flex-col">
          <span
            className="
              heading-block__eyebrow block mb-2
              type-hero-eyebrow
              tracking-[0] text-white
            "
          >
            {eyebrow}
          </span>

          <HeadingTag
            className="
              heading-block__heading
              type-hero-heading
              text-white
            "
          >
            {heading}
          </HeadingTag>
        </div>

        <p
          className="
            heading-block__blurb
            type-hero-blurb
            text-white
          "
        >
          {blurb}
        </p>

        <div className="heading-block__actions inline-flex gap-2">
          {buttons.map((btn) => (
            <a
              key={btn.id}
              href={btn.url}
              className="
                heading-block__btn inline-block px-6 py-3
                type-button-label
                text-white
                bg-transparent ring-1 ring-inset ring-white
                transition-colors duration-200 hover:bg-white hover:text-text-primary
              "
            >
              {btn.label}
            </a>
          ))}
        </div>
      </div>

      <div
        className="heading-block__col-spacer heading-block__col-spacer--mid hidden w-full md:block md:col-start-2 md:row-start-1"
        aria-hidden="true"
      />
      <div
        className="heading-block__col-spacer heading-block__col-spacer--end hidden w-full md:block md:col-start-3 md:row-start-1"
        aria-hidden="true"
      />
    </div>
  );
}

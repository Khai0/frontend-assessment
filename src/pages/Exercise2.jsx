import TabAccordion from "../components/TabAccordion/TabAccordion";
import data from "../data/data.json";

export default function Exercise2() {
  return (
    <div className="exercise min-h-screen bg-gray-bg pb-16">
      <div className="exercise__header px-6 pt-12 pb-10 text-center bg-blue-bg">
        <h1 className="exercise__title type-route-title mb-2 font-pp font-bold text-white">
          Exercise 2
        </h1>

        <p className="exercise__label type-caption-sm font-rb uppercase tracking-[0.04em] text-white/65">
          Tabs on desktop · Accordion on mobile
        </p>
      </div>

      <div className="exercise__body">
        <TabAccordion items={data} />
      </div>
    </div>
  );
}

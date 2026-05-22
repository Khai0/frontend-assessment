import TabAccordion from "../components/TabAccordion/TabAccordion";
import data from "../data/data.json";

export default function Exercise2() {
  return (
    <div className="min-h-screen bg-gray-bg pb-16">
      <div className="bg-blue-bg px-6 pt-12 pb-10 text-center">
        <h1 className="font-pp text-[2rem] font-bold text-white mb-2 lg:text-[2.5rem]">
          Exercise 2
        </h1>
        <p className="font-rb text-[14px] text-white/65 tracking-[0.04em] uppercase">
          Tabs on desktop · Accordion on mobile
        </p>
      </div>
      <TabAccordion items={data} />
    </div>
  );
}

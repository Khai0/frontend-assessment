import TabAccordion from "../components/TabAccordion/TabAccordion";
import styles from "./Exercise2.module.scss";
import data from "../data/data.json";

export default function Exercise2() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.heading}>Exercise 2</h1>
        <p className={styles.subheading}>
          Tabs on desktop · Accordion on mobile
        </p>
      </div>
      <TabAccordion items={data} />
    </div>
  );
}

import styles from './MainLayout.module.scss'

export default function MainLayout({ children }) {
  return (
    <div className={styles.mainLayout}>
      <main className={styles.main}>{children}</main>
    </div>
  )
}

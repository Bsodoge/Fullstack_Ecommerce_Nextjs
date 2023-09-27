import styles from "./page.module.css"
import hero_image from "../public/hero_image.jpg"
import Card from "./components/Card"

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.hero}>
        <div className={styles.text}>
          <h1>Introducing- our most delicious dessert yet.</h1>
          <p>Meet Mega Choc, now available.</p>
          <button className={styles.button}>Shop Now</button>
        </div>
        <img src={hero_image.src} alt="A high quality photo of a piece of chocolate" />
      </div>
      <section className={styles.section}>
        <h1>One desert for every situation.</h1>
        <p>Take your taste buds through a sophisticated chocolate experience.</p>
        <button className={styles.button}>Find yours</button>
        <div className={styles.cards_container}>
          <Card heading="2 million cases sold" paragraph="Unlocking your iPad's full potential, since 2010."></Card>
        </div>
      </section>
    </main>
  )
}

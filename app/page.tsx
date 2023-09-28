import styles from "./page.module.css"
import hero_image from "../public/hero_image.jpg"
import cart from "../public/cart.svg"
import family from "../public/family.svg"
import star from "../public/star.svg"
import shipping from "../public/shipping.svg"
import desserts from "../public/desserts.jpg"
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
      <div className={styles.section_container}>
        <section className={styles.section}>
          <h1>One desert for every situation.</h1>
          <p>Take your taste buds through a sophisticated chocolate experience.</p>
          <button className={styles.button}>Find yours</button>
          <div className={styles.cards_container}>
            <Card heading="2 million desserts sold" paragraph="Unlocking the full power of desserts, since 2010." img={cart.src} alt="Shopping cart"></Card>
            <Card heading="100k 5-star reviews" paragraph="Quality speaks for itself, and our reviews do too." img={star.src} alt="Shopping cart"></Card>
            <Card heading="Family-owned & operated" paragraph="Great quality and insight comes from working with the people we know best." img={family.src} alt="Shopping cart"></Card>
          </div>
          <div className={styles.shipping}>
            <img src={shipping.src} alt="Shipping" />
            <div>
              <h2>Get fast, free delivery with Buy with Prime.</h2>
              <p>Use your Prime shopping benefits directly on our site.</p>
            </div>
          </div>
          <button className={styles.button}>Shop All</button>
        </section>
        <section className={`${styles.section} ${styles.grey}`}>
          <div className={styles.bg_image}></div>
          <div className={styles.text}>
            <h1>Our latest color drops.</h1>
            <p>Now available in our most popular models.</p>
            <button className={styles.button}>Shop Now</button>
          </div>
        </section>
      </div>
    </main>
  )
}

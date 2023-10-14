import styles from "./page.module.css"
import hero_image from "../public/hero_image.jpg"
import cart from "../public/cart.svg"
import family from "../public/family.svg"
import star from "../public/star.svg"
import shipping from "../public/shipping.svg"
import dessert1 from "../public/dessert1.jpg"
import dessert2 from "../public/dessert2.jpg"
import dessert3 from "../public/dessert3.jpg"
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
        <img loading="lazy" src={hero_image.src} alt="A high quality photo of a piece of chocolate" />
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
            <img loading="lazy" src={shipping.src} alt="Shipping" />
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
            <h1>Our latest sweet drops.</h1>
            <p>Now available in our most popular stores.</p>
            <button className={styles.button}>Shop Now</button>
          </div>
        </section>
        <section className={`${styles.section} ${styles.row}`}>
          <div className={styles.row_text}>
            <h1>Free Desserts (yes, really).</h1>
            <p>We offer free desserts all the time. Less stress, more eating.</p>
            <button className={styles.button}>Shop All</button>
          </div>
          <img loading="lazy" src={dessert1.src} alt="Pink dessert" />
        </section>
        <section className={`${styles.section} ${styles.row}`}>
          <img loading="lazy" src={dessert2.src} alt="Lots of dessert" />
          <div className={styles.row_text}>
            <h1>Strike a pose.</h1>
            <p>With nearly endless amount of desserts, you can always find one that looks right to you.</p>
            <button className={styles.button}>Shop All</button>
          </div>
        </section>
        <section className={`${styles.section} ${styles.row}`}>
          <div className={styles.row_text}>
            <h1>It's positively magnetic.</h1>
            <p>Thanks to its handmade qaulities, you're sure to be attracted to our wide range of delicacies.</p>
            <button className={styles.button}>Shop All</button>
          </div>
          <img loading="lazy" src={dessert3.src} alt="Chocolate dessert" />
        </section>
        <section className={`${styles.section} ${styles.charity_section}`}>
          <div className={styles.charity}>
            <div className={styles.charity_text}>
              <h1>We bake dessers for the greater good.</h1>
              <p>We share the belief that children everywhere are the future. That's why we use a portion of our profits to sponsor charities across the world through our partnership with The Super Cool Charity.</p>
              <button className={styles.button}>Learn More</button>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

import styles from "./Card.module.css"

interface props {
    img: string,
    alt: string,
    heading: string,
    paragraph: string
}

export default function Card({ img, alt, heading, paragraph }: props) {
    return (
        <div className={styles.card}>
            <img loading="lazy" src={img} alt={alt} />
            <h1>{heading}</h1>
            <p>{paragraph}</p>
        </div>
    )
}
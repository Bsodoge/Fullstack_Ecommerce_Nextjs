import styles from "./Card.module.css"

interface props {
    img: string,
    alt: string,
    heading: string,
    paragraph: string
}

export default function Card({ img, heading, paragraph }: props) {
    return (
        <div className={styles.card}>
            <img src="" alt="alt" />
            <h1>{heading}</h1>
            <p>{paragraph}</p>
        </div>
    )
}
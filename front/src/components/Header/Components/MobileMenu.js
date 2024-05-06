import styles from "./MobileMenu.module.scss";

export default function MobileMenu({ setPage }) {
    return (
        <ul className={`${styles.menuContainer} card p20`}>
            <li onClick={() => setPage("admin")}>Ajouter une série</li>
            <li>Favoris</li>
            <li>Connexion</li>
        </ul>
    );
}
import styles from "./Header.module.scss";
import logo from "../../assets/images/logo.webp";
import { useState } from "react";
import MobileMenu from "./Components/MobileMenu";
import { NavLink } from "react-router-dom";
export default function Header({ setPage }) {
    const [showMenu, setShowMenu] = useState(false);
    return (
        <header className={`d-flex align-items-center ${styles.header}`}>

            <div className="flex-fill">
                <NavLink to="/">
                    <img src={logo} alt="logo du blog" />
                </NavLink>
            </div>
            <ul>
                <NavLink
                    to="/admin"
                    className="mr10 btn btn-primary">Ajouter une série
                </NavLink>
                <NavLink to="/favoris" className={`mr10 btn btn-primary`}>
                    <i className="fas fa-star mr5"></i>
                    <span>Favoris</span>
                </NavLink>
                <button className={`mr10 btn btn-primary-reverse`}>
                    <i className="fas fa-right-to-bracket mr5"></i>
                    <span>Connexion</span>
                </button>
            </ul>
            <i
                onClick={() => setShowMenu(true)}
                className="fas fa-bars"></i>
            {showMenu && (
                <>
                    <div onClick={() => setShowMenu(false)}
                        className="calc"></div>
                    <MobileMenu setPage={setPage} />
                </>
            )}
        </header>
    );
}
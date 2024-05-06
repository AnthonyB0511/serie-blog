import styles from "./Serie.module.scss";
import { useState, useContext } from "react";
import { ApiContext } from "../../../context/ApiContext";
import { NavLink } from "react-router-dom";
export default function Serie({ serie, updateSeries, deleteSerieFront }) {
    const [liked, setLiked] = useState(serie.liked);
    const BASE_API_URL = useContext(ApiContext);
    const { id } = serie;


    const handleClick = async () => {
        console.log(serie);
        try {
            const response = await fetch(`${BASE_API_URL}/series/updateSerie`, {
                method: "PATCH",
                body: JSON.stringify({ ...serie, liked: !liked }),
                headers: { "Content-type": "application/json" }
            });
            if (response.ok) {
                // updateSeries();
                setLiked(!liked);
                // const backLike = await response.json();
                // updateSeries(backLike);
            }
        } catch (error) {
            console.error(error);
        }
    };

    const deleteSerie = async (e) => {
        // pour éviter le like && la suppression
        e.stopPropagation();
        try {
            const response = await fetch(`${BASE_API_URL}/series/deleteSerie/${id}`, {
                method: "DELETE",
            });
            if (response.ok) {
                deleteSerieFront(id);
            }

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={`${styles.serie}`} >
            <NavLink to={`details/${serie.id}`}>
                <div className={`${styles.imgContainer}`}>

                    <img src={serie.image} alt="" />
                </div>
            </NavLink>
            <div className={`${styles.title} d-flex justify-content-center align-items-center p30 flex-column`}>
                <h3 className="mb10">{serie.title}</h3>
                <i className={`fas fa-heart ${liked ? "text-error" : ""}`}
                    onClick={handleClick}
                ></i>
            </div>
            <i className={`fa-regular fa-circle-xmark ${styles.delete}`}
                onClick={deleteSerie}></i>
        </div >
    );
}
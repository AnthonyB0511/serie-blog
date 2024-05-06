import { useContext } from "react";
import { useFetchData } from "../../Hooks/useFetchData";
import { ApiContext } from "../../context/ApiContext";
import styles from "./Favoris.module.scss";
import Loading from "../../components/loading/Loading";


export default function Favoris() {
    const BASE_API_URL = useContext(ApiContext);
    // appel à la fonction qui récupère les series favorites
    const [[series, setSeries], isLoading] = useFetchData(BASE_API_URL, "series/getFavoris");
    // fonction qui filtre dans le front
    const deleteSerieFront = (index) => {
        console.log(index);
        setSeries(series.filter((serie) => serie.id !== index));
    };
    // méthode qui supprime le like de la base de données 
    const handleClick = async (serie, liked, id) => {
        try {
            const response = await fetch(`${BASE_API_URL}/series/updateSerie`, {
                method: "PATCH",
                body: JSON.stringify({ ...serie, liked: !liked }),
                headers: { "Content-type": "application/json" }
            });
            if (response.ok) {
                deleteSerieFront(id);
            }
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <div className={`${styles.favoris}`}>
            <h1>Mes favoris</h1>
            {isLoading ? (
                <Loading />
            ) : (
                <ul>

                    {series.map((serie, i) => (
                        <li key={i} className={`${styles.li} d-flex  align-items-center`}>

                            <p>{serie.title}  <span>{serie.year}</span> </p>
                            <button onClick={() => handleClick(serie, serie.liked, serie.id)} >Dislike</button>
                        </li>
                    ))}
                </ul>
            )}

        </div>
    );
}

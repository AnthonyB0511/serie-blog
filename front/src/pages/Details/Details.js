import styles from "./Details.module.scss";
import { useParams } from "react-router-dom";
import { ApiContext } from "../../context/ApiContext";
import { useContext, useEffect, useState } from "react";


export default function Details() {
    const BASE_API_URL = useContext(ApiContext);
    // useState pour stocker une série
    const [serie, setSerie] = useState(false);
    // je récupère les params passé par le link
    const params = useParams();
    const id = params.id;
    // fonctionnalité pour récupérer les données de toute une série
    useEffect(() => {
        const getOneSerie = async () => {
            try {
                const response = await fetch(`${BASE_API_URL}/series/getOneSerie?id=${id}`);
                if (response.ok) {
                    const datasBack = await response.json();

                    const newModifiedDatas = await Promise.all(
                        datasBack.map(async (s) => {
                            if (s.image == null) {
                                const response = await fetch(URL.createObjectURL(new Blob([new Uint8Array(s.imgBlob.data)])
                                ));
                                const text = await response.text();
                                s.image = text;
                            } else {
                                s.image = `../../${s.image}`;
                            }
                            return { ...s };
                        })
                    );
                    setSerie(newModifiedDatas[0]);
                }

            } catch (error) {
                console.error(error);
            }
        };
        getOneSerie(params);
    }, [id, BASE_API_URL]);

    return (
        <div className={`${styles.details}`}>
            <h1> {serie?.title} (<span>{serie?.year}</span>) </h1>
            <div className={`${styles.container}`}>
                <img src={serie?.image} alt="" />
                <div>
                    <h2>Résumé</h2>
                    <p>{serie?.content}</p>
                </div>
            </div>

        </div>
    );
}

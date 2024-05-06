import styles from "./Homepage.module.scss";
import Serie from "./components/Serie";
import Search from "../../components/Search/Search";
import { useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import Loading from "../../components/loading/Loading";
import { ApiContext } from "../../context/ApiContext";
import { useFetchData } from "../../Hooks/useFetchData";
export default function Homepage() {
  const [filter, setFilter] = useState("");


  const BASE_API_URL = useContext(ApiContext);
  const [[series, setSeries], isLoading] = useFetchData(BASE_API_URL, "series/getSeries");

  // useEffect(() => {
  //   async function getSeries() {
  //     try {
  //       const response = await fetch(`${BASE_API_URL}/series/getSeries`);
  //       if (response.ok) {
  //         const seriesBack = await response.json();
  //         const modifiedSeriesBack = seriesBack.map((s) =>
  //           s.liked === 1 ? { ...s, liked: true } : { ...s, liked: false });
  //         setSeries(modifiedSeriesBack);
  //         setIsLoading(false);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   getSeries();
  // }, [BASE_API_URL]);

  function updateSeries(updatedSerie) {
    setSeries(series.map(s => { s.id = updatedSerie.id ? updatedSerie : s; }));
  }
  const deleteSerieFront = (index) => {
    console.log(index);
    setSeries(series.filter((serie) => serie.id !== index));

  };

  return (
    <div className="flex-fill container p20 d-flex flex-column">
      <h1 className="my30">Découvrez nos dernières critiques !</h1>
      <div className={`card p20 ${styles.contentCards} card p2 d-flex flex-column mb20 flex-fill`}>
        <div className={`${styles.search} mb20 d-flex justify-content-center align-items-center`}>
          <i className="fas fa-magnifying-glass mr10"></i>
          <Search setFilter={setFilter} />
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Outlet />
            <div className={`${styles.grid}`}>
              {series
                //permet de filtrer  le titre sans espace 
                // on peut mettre include
                .filter((serie) => serie.title.toLowerCase().startsWith(filter))
                .map((serie) => (
                  <Serie key={serie.id} serie={serie} deleteSerieFront={deleteSerieFront} />
                ))}


            </div>
          </>)}
      </div>
    </div>

  );
}
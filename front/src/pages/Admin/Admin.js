import styles from "./Admin.module.scss";
import SerieForm from "./components/SerieForm";
export default function Admin() {
    return (
        <div className="d-flex flex-column flex-fill align-items-center my30">
            <h1>ADMIN</h1>
            <SerieForm />
        </div>
    );
}

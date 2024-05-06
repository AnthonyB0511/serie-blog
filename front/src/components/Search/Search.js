
export default function Search({ setFilter }) {
    const handleInput = (e) => {
        const search = e.target.value;
        setFilter(search.trim().toLowerCase());
    };

    return (
        <input
            className="flex-fill"
            type="text"
            placeholder="Rechercher"
            onInput={handleInput} />

    );
}

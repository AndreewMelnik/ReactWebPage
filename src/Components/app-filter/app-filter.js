import "./app-filter.css";

const AppFilter = ({onPromoted, onRichest}) => {
    return (
        <div className="btn-group">
            <button type="button"
                    className="btn btn-light">
                    Все сотрудники
            </button>
            <button type="button"
                    className="btn btn-outline-light"
                    onClick={onPromoted}>
                    На повышение
            </button>
            <button type="button"
                    className="btn btn-outline-light"
                    onClick={onRichest}>
                    З/П больше 1000$
            </button>
        </div>
    )
}

export default AppFilter;
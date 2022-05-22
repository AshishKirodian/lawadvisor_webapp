export function Search(props) {
    const { search } = props;
    var timer = null;
    function searchWithDebounce(searchTerm) {
        clearInterval(timer);
        timer = setTimeout(() => {
            search(searchTerm);
        }
            , 500);
    }
    return (
        <div>
            <input type="text" placeholder="Search" onChange={(e) => searchWithDebounce(e.currentTarget.value)} />
        </div>
    )
}
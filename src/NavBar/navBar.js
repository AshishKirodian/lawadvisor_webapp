import { Search } from "../Search/search";

export function NavBar(props) {
    const { search } = props;
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <span >TODO</span>
            <Search search={search}/>
        </nav>
    )
}
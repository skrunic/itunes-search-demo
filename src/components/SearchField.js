import { useState, useRef } from "react";

const SearchField = ({ fetchData }) => {
    const [searchValue, setSearchValue] = useState("");
    const delay = useRef(null);

    // Update value on change
    const onChange = (e) => {
        clearTimeout(delay.current);

        let value = e.currentTarget.value;
        setSearchValue(value);

        delay.current = setTimeout(() => {
            //console.log(`API search for: ${value}`);
            if (value.length >= 3) fetchData(value);
        }, 1000);
    }

    // List render
    return (
        <div className="search-element">
            <input type="text" placeholder="Search Band" onChange={onChange} value={searchValue}></input>
            <label>Enter at least 3 characters to initiate search.</label>
        </div>
    );
}

export default SearchField;
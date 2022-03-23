import { useState, useRef } from "react";

const SearchField = ({ fetchData }) => {
    const [searchValue, setSearchValue] = useState("");
    const [message, setMessage] = useState("");

    // Update value on change
    const onChange = (e) => {
        let value = e.currentTarget.value;
        setMessage("");
        setSearchValue(value);
    }

    const searchAction = () => {
        if (searchValue.length > 0) fetchData(searchValue);
        else setMessage("Please enter a band name.")
    }

    // List render
    return (
        <div className="search-element">
            <input type="text" placeholder="Search Band" onChange={onChange} value={searchValue}></input>
            {
                message?
                    <label>{message}</label>
                : null
            }
            <button onClick={searchAction}>Search</button>
        </div>
    );
}

export default SearchField;
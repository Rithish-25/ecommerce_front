import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
    const [keyword, setKeyword] = useState("");
    const navigate = useNavigate();

    const searchHandler = () => {
        navigate(keyword.trim() ? `/search?keyword=${keyword}` : "/search");
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            searchHandler();
        }
    };

    const handleBlur = () => {
        if (!keyword.trim()) {
            navigate("/search"); // Show all products if input is empty
        }
    };

    return (
        <div className="input-group">
            <input
                type="text"
                id="search_field"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                onKeyDown={handleKeyDown}  
                onBlur={handleBlur}  // Trigger search when input loses focus
                className="form-control"
                placeholder="Enter Product Name ..."
            />
            <div className="input-group-append">
                <button onClick={searchHandler} id="search_btn" className="btn">
                    <i className="fa fa-search" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    );
}

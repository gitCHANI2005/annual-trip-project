import { useState } from "react";

type StudentSearchProps = {
    onSearch: (query: string) => void;
};

function StudentSearch({ onSearch }: StudentSearchProps) {
    const [query, setQuery] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch(query);
    };

    return (
        <div className="student-search-box">
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="חפש תלמיד..."
                    value={query}
                    onChange={handleChange}
                />
            </form>
        </div>
    );
}

export default StudentSearch;
import { useNavigate } from "react-router-dom";

function BackButton(){
    const navigate = useNavigate();

    return (
        <button className="btn btn-outline-success mt-3 custom-outline-button dashboard-button"
                onClick={() => navigate(-1)}>
        חזרה
        </button>
    );
}

export default BackButton;
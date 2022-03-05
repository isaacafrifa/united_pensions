import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        
        <div className="app_text">
          <h1 className="app_text_title">Not Found</h1>
          <h2 className="app_text_body">
            The page you're looking for does not exists
          </h2>
          <Link to="/">Go to home</Link>
        </div>

    );
}

export default NotFound;
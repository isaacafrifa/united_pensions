import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container">
      <section className="app-header">
        <h1>Not Found</h1>
        <p>
          The page you're looking for does not exists
        </p>
        <Link to="/">Go to home</Link>
      </section>
    </div>
  );
}

export default NotFound;
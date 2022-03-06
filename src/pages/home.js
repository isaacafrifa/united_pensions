import '../assets/css/home.css';
import ParticlesComponent from "../components/particlesComponent"
import { Link } from "react-router-dom";

const Home = () => {

    return (
        <div>
            <ParticlesComponent />

            <div className='container'>
                <section className='app-header'>
                    <h1 className='app-title'>ail</h1>
                    <p className='app-subtitle'>agyenkwa investment limited</p>
                    <p>more than just an investment</p>
                    <div class="button-container">
                        <Link to="dashboard" className="custom-btn custom-btn-primary">dashboard</Link>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Home;
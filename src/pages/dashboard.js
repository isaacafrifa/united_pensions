import Navigation from "../components/navigation";
import { VictoryPie } from "victory";


const Dashboard = () => {
    return (
        <div>
            <Navigation />
            {/* <h1>Dashboard</h1> */}
            <div className='container'>
                <section className='app-header'>

                    <h1 className='app-subtitle'>dashboard</h1>
                    <p>Total Number of Clients</p>
                    <p>Total Number of Investments</p>
                    <VictoryPie
                        data={[
                            { x: "Cats", y: 35 },
                            { x: "Dogs", y: 40 },
                            { x: "Birds", y: 55 }
                        ]}
                    />

                  
                </section>
            </div>
        </div>
    );
}

export default Dashboard;
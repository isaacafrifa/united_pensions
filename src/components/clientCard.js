import '../assets/css/clientcard.css'

const ClientCard = ({clientName, salary, rate}) => {

    return (
        <>
            <div className="card">
                <div className="card__cover">
                    <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Avatar" style={{ width: "100%" }} />
                </div>

                <div className="card__content">
                    <h1><b>{clientName}</b></h1>
                    <p>salary: <b>{salary}</b><br/> percentage: <b>{rate}%</b></p>
                </div>
            </div>
        </>
    );
}


export default ClientCard;
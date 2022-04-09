import ClientForm from "../components/clientForm";
import Navigation from "../components/navigation";

const AddClient = () => {
    return (
        <div>   
           <Navigation />   
           <section className='container' style={{ marginTop: "-5rem" }}>   
           <ClientForm/>
           </section>
        </div>
    );
}

export default AddClient;
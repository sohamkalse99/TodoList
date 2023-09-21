import Navbar from './Navbar.js';

function Home(){

    return(
        <div className="Home">
            <Navbar/>
            <div className="container">
                <div className="row">
                    <br />
                </div>
                <div className="row">
                    <div className="col md">
                        <h1 className="text-center">Todo List app</h1>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Home;
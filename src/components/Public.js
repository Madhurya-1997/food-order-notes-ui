import React from 'react'
import { Link } from 'react-router-dom';

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">The Indian Food Corner !</span></h1>
            </header>
            <main className="public__main">
                <p>Located in the Capital, Delhi, TIFC provides a royal Indian cuisine to meet your taste buds.</p>
                <address className="public__addr">
                    TIFC restaurant<br />
                    Saket<br />
                    Delhi, India<br />
                    <a href="tel:+15555555555">(+91) 7575900310</a>
                </address>
                <br />
                <p>Owner: Madhurya Bharadwaaz</p>

                <p className='dashboard'><Link to="/dash">Go to Dashboard</Link></p>

            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>
    )
    return content;
}

export default Public
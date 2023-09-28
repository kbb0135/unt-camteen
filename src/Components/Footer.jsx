import React from 'react';
import Eagle from '../Assets/eagle.png';
import Email from '../Assets/email.png';
import Phone from '../Assets/phone.png';
import Location from '../Assets/location-pin.png';
import "../style/style.css"; // Import CSS file for Navbar component

const Footer = () => {
    return (
        



        <footer className="footerDiv">
            <div className="footerUNTCol">
                <img src={Eagle} alt="UNTBird" className="EagleImg"></img>
            </div>





            <div className="footerUNTCol">
                <div className="footerUNTColSection">
                    <h4 className="footerTitle">University Of North Texas</h4>
                    <p className="footerPara">UNT Dining Services | Univserity Of North Texas</p>
                </div>
                <div className="footerUNTColSection">
                    <h4 className="footerTitle">Contact</h4>
                <p className="footerPara"><img src={Email} alt="Email"/>email@email.com | <img src={Phone} alt="Phone"/>555-555-555</p>
                </div>
                
            </div>





            <div className="footerUNTCol">
                <div className="footerUNTColSection footerUNTColEnd">
                    <h4 className="footerUNTColTitle">Discovery Park Cafeteria</h4>
                    <h5 className="footerUNTColLocation"><img src={Location} alt="Location"/>Discovery Park</h5>
                    <p className="footerUNTColAddress">3940 N Elm St, Denton, Tx 76207</p>
                </div>
            </div>
        </footer>
    )
}
export default Footer;
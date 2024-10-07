import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faGoogle, faInstagram, faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';


const Footer = () => {
    return (
        <div >
            <footer className="text-center text-white" style={{ backgroundColor: 'rgb(40, 118, 154)' }}>
                <div className="container">
                    <section  >
                        <div className="row text-center d-flex justify-content-center pt-4">
                            <div className="col-md-2">
                                <h6 className="text-uppercase font-weight-bold">
                                    <a href="https://reinforcewebsol.com/about-us" className="text-white">About us</a>
                                </h6>
                            </div>
                            <div className="col-md-2">
                                <h6 className="text-uppercase font-weight-bold">
                                    <a href="https://www.reinforcewebsol.com/services" className="text-white">Services</a>
                                </h6>
                            </div>
                            <div className="col-md-2">
                                <h6 className="text-uppercase font-weight-bold">
                                    <a href="https://www.reinforcewebsol.com/blog/" className="text-white">Blog</a>
                                </h6>
                            </div>
                            <div className="col-md-2">
                                <h6 className="text-uppercase font-weight-bold">
                                    <a href="https://www.reinforcewebsol.com/hire-us" className="text-white">HIRE</a>
                                </h6>
                            </div>
                            <div className="col-md-2">
                                <h6 className="text-uppercase font-weight-bold">
                                    <a href="https://reinforcewebsol.com/contact-Us" className="text-white">Contact</a>
                                </h6>
                            </div>
                        </div>
                    </section>
                    <hr className="my-2" />
                    <section >
                        <div className="row d-flex justify-content-center">
                            <div className="col-lg-8">
                                <div style={{ fontSize: '20px' }}>Reinforce Software  Solutions Pvt. Ltd.</div>
                                <span><a href="http://reinforcewebsol.in/" className="text-white me-4">
                                    http://reinforcewebsol.in/
                                </a></span>
                                <p>313, Sai Ram Plaza, Near Rajiv Gandhi Circle, Indore-452001, India</p>

                            </div>
                        </div>
                    </section>
                    <section className="my-3">
                        <a href="https://www.facebook.com/" className="text-white me-4">
                            <FontAwesomeIcon icon={faFacebookF} />
                        </a>
                        <a href="https://twitter.com" className="text-white me-4">
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                        <a href="https://google.com" className="text-white me-4">
                            <FontAwesomeIcon icon={faGoogle} />
                        </a>
                        <a href="https://instagram.com" className="text-white me-4">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                        <a href="https://linkedin.com" className="text-white me-4">
                            <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                        <a href="https://github.com" className="text-white me-4">
                            <FontAwesomeIcon icon={faGithub} />
                        </a>
                    </section>

                </div>
                <div className="text-center p-3 " style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                    © 2020 Copyright:
                    <a className="text-white" href="https://mdbootstrap.com/">MDBootstrap.com</a>
                </div>
               
            </footer>
        </div>
    );
}

export default Footer;

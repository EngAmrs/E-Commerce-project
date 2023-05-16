import './Footer.css'
const Footer = () => {
    return ( 
        <>
		<footer id="footer">
			<div className="container">
				<div className="row">
					<div className="col-md-3">
						<a href="index.html"><h1><span>A</span>ROA</h1></a>
                      <div className="footer-about">
                          <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,  </p>
                      </div>

					</div>
					<div className="col-md-3">
						<div className="useful-link">
							<h2>Useful Links</h2>
							<img src="./assets/images/about/home_line.png" alt="" className="img-fluid"></img>
							<div className="use-links">
								<li><a href="index.html"><i className="fa-solid fa-angles-right"></i> Home</a></li>
								<li><a href="about.html"><i className="fa-solid fa-angles-right"></i> Shop</a></li>
								<li><a href="gallery.html"><i className="fa-solid fa-angles-right"></i> About</a></li>
								<li><a href="contact.html"><i className="fa-solid fa-angles-right"></i> Contact</a></li>
							</div>
						</div>

					</div>
                    <div className="col-md-3">
                        <div className="social-links">
							<h2>Follow Us</h2>
							<img src="./assets/images/about/home_line.png" alt=""></img>
							<div className="social-icons">
								<li>Facebook</li>
								<li>Instagram</li>
								<li>Linkedin</li>
							</div>
						</div>
                    

                    </div>
					<div className="col-md-3">
						<div className="address">
							<h2>Address</h2>
							<img src="./assets/images/about/home_line.png" alt="" className="img-fluid"></img>
							<div className="address-links">
								<li className="address1"><i className="fa-solid fa-location-dot"></i> Kolathur ramankulam-
									Malappuram Dt 
								   Kerala 679338</li>
								   <li>+91 90904500112</li>
								   <li>mail@1234567.com</li>
							</div>
						</div>
					</div>
                  
				</div>
			</div>

		</footer>
		<section id="copy-right">
			<div className="copy-right-sec"><i className="fa-solid fa-copyright"></i>  
				lorem ispum lorem ispum 2022 Powerd By lorem ispum
			</div>

		</section>
        </>
     );
}
 
export default Footer;
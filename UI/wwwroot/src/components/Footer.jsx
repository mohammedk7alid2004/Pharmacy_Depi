import FooterCard from "./FooterCard";
import cash from '../assets/cash-icon.png';
import freeShipping from '../assets/free-shipping.png';
import headSet from '../assets/head-set.png';
import Tail from "./Tail";

function Footer() {
    return (
        <>
                <footer
            className="bg-blue-700 text-white px-[4%] pb-[5%] pt-[2%] bg-[url('./assets/footerBg.png')]"
            style={{ filter: "grayscale(80%)" }}
        >
            <div className="flex items-center justify-center pb-10">
                <FooterCard
                    title="FAST & FREE SHIPPING"
                    description="Get your order delivered same day or next day according to your location in Cairo & Giza. We also offer Bloom super saver delivery within 2-3 business days in Cairo & Giza. In other locations you will receive your order within 2-7 business days."
                    icon={freeShipping}
                />
                <FooterCard
                    title="DISCOUNTS & OFFERS"
                    description="Bloom keeps running different promotions on its website and stores where you can benefit from discounts being offered on a wide variety of items. On the basis of the relevant promotion, the discount may be applied automatically or a coupon code may have to be used to avail of the discount."
                    icon={cash}
                />
                <FooterCard
                    title="SECURE SHOPPING"
                    description="We use industry-standard encryption systems for potentially sensitive information, such as your name, address and other critically sensitive information like your credit / debit card details. Information passed between your computer and our website cannot be read in the event of someone else intercepting it."
                    icon={headSet}
                />
                <FooterCard
                    title="CUSTOMER SUPPORT"
                    description="We're here to help, so please find the most relevant way to get in touch, please contact our Customer Service by email at customersupport@bloompharmacy.com or call us on 01026562982 (from 10am to 6pm)."
                />
            </div>
            <hr className="border-white w-full pb-10" />
            <div className="flex flex-col items-center justify-center">
                <h3 className="text-xl mb-5 text-center uppercase">Quick Links</h3>
                <ul className="flex gap-4 items-center justify-center">
                    <li>
                        <a href="#" className="underline">
                            Terms & Conditions
                        </a>
                    </li>
                    <li>
                        <a href="#" className="underline">
                            Privacy Policy
                        </a>
                    </li>
                    <li>
                        <a href="#" className="underline">
                            Delivery & Return Policy
                        </a>
                    </li>
                    <li>
                        <a href="#" className="underline">
                            Contact Us
                        </a>
                    </li>
                </ul>
                <div className="flex flex-col gap-4 items-center justify-center  mt-10">
                    <p className="text-xl mb-5 text-center uppercase">About Bloom</p>
                    <p className="text-sm text-center max-w-[70%]">
                        Your go-to online pharmacy in Egypt! Explore a large selection of
                        skincare, makeup, hair, perfumes & more from top beauty brands.
                    </p>
                </div>
                <div className="socials mt-10 ">
                    <p className="text-xl mb-5 text-center uppercase">
                        Socialize with bloom
                    </p>
                    <div className="flex gap-4 items-center justify-center">
                        <a href="#">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-facebook"
                            >
                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                            </svg>
                        </a>
                        <a href="#">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-instagram"
                            >
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                            </svg>
                        </a>
                        <a href="#">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="lucide lucide-youtube"
                            >
                                <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
                                <path d="m10 15 5-3-5-3z" />
                            </svg>
                        </a>
                    </div>
                    <div className="flex flex-col items-center justify-center mt-10">
                        <p className="text-xl mb-5 text-center uppercase">Order by phone</p>
                        <p className="text-sm text-center max-w-[70%]">
                            If you are having problems placing an order online our Customer
                            Support team will be able to help you. Please contact us on
                            01026562982 from 10am to 6pm.
                        </p>
                    </div>
                </div>
            </div>
        </footer>
        <Tail/>
        </>
    );
}

export default Footer;

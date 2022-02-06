import location from "../../../../assets/raster/_img1.png";

import photo1 from "../../../../assets/raster/_img2.png";
import photo2 from "../../../../assets/raster/_img3.png";
import photo3 from "../../../../assets/raster/_img4.png";

import instagramm from "../../../../assets/vector/instagram.svg"
import vk from "../../../../assets/vector/vk.svg"
import telegramm from "../../../../assets/vector/telegram.svg"
import whatsapp from "../../../../assets/vector/whatsapp.svg"
import youtube from "../../../../assets/vector/youtube.svg"

import "../../../../assets/about.css";

import { Link } from "react-router-dom";

export default function AboutPage() {
    return <div className="about_root">
        <h1> How to find us </h1>

        <div className="about_sides">
            <div className="about_side">
                <div className="about_live_info">
                    <div className="about_side_header">
                        Togliatti: VANILO
                    </div>

                    <p>Address: Revolutionary, 64</p>
                    <p>Phone: <a href="phone:+7 (8482) 11-22-33">+7 (8482) 11-22-33</a></p>
                    <p>Mon-Fri: from 9:00 to 21:00</p>
                    <p>Sat-Sun: from 11:00 to 21:00</p>
                </div>
            </div>

            <div className="about_side">
                <img
                    src={location}
                    alt=""
                />
            </div>
        </div>

        <hr/>

        <div className="about_pictures_flow">
            <img
                src={photo1}
                alt="pict-1"
                style={
                    {
                        flex: 1.25
                    }
                }
            />

            <img
                src={photo2}
                alt="pict-2"
                style={
                    {
                        flex: 1
                    }
                }
            />

            <img
                src={photo3}
                alt="pict-3"
                style={
                    {
                        flex: 1
                    }
                }
            />
        </div>

        <hr/>

        <h3> Social links </h3>

        <div className="social_root">
            <div className="social_flow">
                <Link to="/#">
                    <img
                        src={instagramm}
                        alt="instagramm"
                    />
                </Link>

                <Link to="/#">
                    <img
                        src={vk}
                        alt="vk"
                    />
                </Link>

                <Link to="/#">
                    <img
                        src={telegramm}
                        alt="telegramm"
                    />
                </Link>

                <Link to="/#">
                    <img
                        src={whatsapp}
                        alt="whats-app"
                    />
                </Link>

                <Link to="/#">
                    <img
                        src={youtube}
                        alt="youtube"
                    />
                </Link>
            </div>
        </div>
    </div>
}
import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const EventHeading = ({ text }) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const style = document.createElement("style");
        style.innerHTML = `
            @keyframes strokeanim {
                0% {
                    fill: #101820;
                    stroke: #f2aa4c;
                    stroke-dashoffset: 25%;
                    stroke-dasharray: 0 50%;
                    stroke-width: 7;
                }
                70% {
                    fill: #101820;
                    stroke: #f2aa4c;
                }
                80% {
                    fill: #101820;
                    stroke: #f2aa4c;
                    stroke-width: 3;
                }
                100% {
                    fill: #f2aa4c;
                    stroke: #101820;
                    stroke-dashoffset: -25%;
                    stroke-dasharray: 50% 0;
                    stroke-width: 0;
                }
            }

            .bigh {
                font-size: 8rem;
                font-family: 'Gruppo', sans-serif, 'cursive';
                text-transform: uppercase;
            }

            svg text {
                stroke: #f2aa4c;
                animation: strokeanim 5s infinite alternate;
                font-weight: 700;
            }

            @media (max-width: 900px) {
                .bigh {
                    font-size: 6rem !important; 
                }
            }

            @media (max-width: 600px) {
                .bigh {
                    font-size: 4rem !important; 
                }
            }
        `;
        document.head.appendChild(style);

        return () => {
            document.head.removeChild(style);
        };
    }, []);

    if (windowWidth <= 500) {
        return (
            <h1 style={{ 
                fontSize: "2.5rem", 
                color: "#f2aa4c", 
                textAlign: "center", 
                fontFamily: "'Gruppo', sans-serif",
                textTransform: "uppercase"
            }}>
                {text}
            </h1>
        );
    }

    return (
        <div 
            className="event-heading-container rounded-3"
            style={{ 
                height: "20vh", 
                width: "100%", 
                margin: "0 auto",
                overflow: "hidden", 
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#101820",
            }}
        >
            <svg 
                width="90%" 
                height="100%" 
                viewBox="0 0 1200 400" 
                preserveAspectRatio="xMidYMid meet"
            >
                <defs>
                    <filter id="double-line" x="0" y="0">
                        <feOffset in="SourceAlpha" dx="3" dy="3" result="offset1"/>
                        <feOffset in="SourceAlpha" dx="-3" dy="-3" result="offset2"/>
                        <feMerge>
                            <feMergeNode in="offset1"/>
                            <feMergeNode in="offset2"/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                </defs>

                <text 
                    x="50%" 
                    y="50%" 
                    textAnchor="middle" 
                    dominantBaseline="middle"
                    className="bigh"
                    filter="url(#double-line)"
                >
                    {text}
                </text>
            </svg>
        </div>
    );
};

EventHeading.propTypes = {
    text: PropTypes.string.isRequired,
};

export default EventHeading;

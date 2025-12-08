import React, { useEffect, useState } from "react";

export default function FooterTicker() {
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");
    const [location, setLocation] = useState("Detecting location...");

    // Time
    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(now.toLocaleTimeString());
            setDate(now.toLocaleDateString());
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    // Location
    useEffect(() => {
        if (!navigator.geolocation) {
            setLocation("Location not supported");
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (pos) => {
                const { latitude, longitude } = pos.coords;

                try {
                    const res = await fetch(
                        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
                    );
                    const data = await res.json();

                    setLocation(
                        data.address.city ||
                        data.address.town ||
                        data.address.village ||
                        data.address.state ||
                        "Unknown"
                    );
                } catch {
                    setLocation("Unable to fetch location");
                }
            },
            () => setLocation("Permission denied")
        );
    }, []);

    const text = `📅 ${date}   |   ⏱ ${time}   |   📍 ${location}`;

    return (
        <div className="ticker-container">
            <div className="ticker-track">
                <span>{text}</span>
                <span>{text}</span>
                <span>{text}</span>
                <span>{text}</span>
                <span>{text}</span>
                <span>{text}</span>
            </div>
        </div>
    );
}

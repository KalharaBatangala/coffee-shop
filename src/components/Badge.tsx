"use client"; // important for Next.js 13+ with app directory

import { useEffect } from "react";

const Badge = () => {
  useEffect(() => {
    // Load LinkedIn script dynamically on the client side
    const script = document.createElement("script");
    script.src = "https://platform.linkedin.com/badges/js/profile.js";
    script.async = true;
    script.defer = true;
    script.type = "text/javascript";
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); // cleanup
    };
  }, []);

  return (
    <div className="linkedin-badge" style={{ marginLeft: "60px" }}>
      <div
        className="badge-base LI-profile-badge"
        data-locale="en_US"
        data-size="medium"
        data-theme="dark"
        data-type="VERTICAL"
        data-vanity="kalhara-batangala-2bb635213"
        data-version="v1"
      >
        <a
          className="badge-base__link LI-simple-link"
          href="https://lk.linkedin.com/in/kalhara-batangala-2bb635213?trk=profile-badge"
        >
          Kalhara Batangala
        </a>
      </div>
    </div>
  );
};

export default Badge;

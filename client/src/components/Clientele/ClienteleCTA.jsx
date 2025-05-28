
import React from "react";
import { Link } from "react-router-dom";
import "./ClienteleCTA.css";

const ClienteleCTA = () => (
  <section className="clientele-cta">
    <div className="clientele-cta__content">
      <h2 className="clientele-cta__heading">
        Ready to power your hiring with AI?
      </h2>
      <p className="clientele-cta__text">Join dozens of market leaders who trust EarlyJobs with their talent needs.</p>
      <Link
        to="/contact"
        className="clientele-cta__button"
      >
        Work With Us
      </Link>
    </div>
    <svg className="clientele-cta__dots" fill="none" viewBox="0 0 110 32">
      <g fill="#E46E4A">
        {Array.from({ length: 9 }).map((_, i) =>
          Array.from({ length: 3 }).map((_, j) => (
            <circle key={i + "-" + j} cx={10 + i * 12} cy={10 + j * 10} r={2} />
          ))
        )}
      </g>
    </svg>
  </section>
);

export default ClienteleCTA;


/**
 * A reusable CTA button component.
 * When clicked, it scrolls smoothly to the section with ID "counter",
 * with a small offset from the top for better visual placement.
 * If href is provided, it will navigate to that external link instead.
 */

const Button = ({ text, className, id, href }) => {
    const handleClick = (e) => {
        e.preventDefault();

        // If href is provided, navigate to external link
        if (href) {
            window.open(href, '_blank', 'noopener,noreferrer');
            return;
        }

        // Otherwise, use the existing scroll functionality
        const target = document.getElementById("counter");

        if (target && id) {
            const offset = window.innerHeight * 0.15;

            const top =
                target.getBoundingClientRect().top + window.scrollY - offset;

            window.scrollTo({ top, behavior: "smooth" });
        }
    };

    return (
        <a
            onClick={handleClick}
            className={`${className ?? ""} cta-wrapper`}
        >
            <div className="cta-button group">
                <div className="bg-circle" />
                <p className="text">{text}</p>
                <div className="arrow-wrapper">
                    <img src="/images/arrow-down.svg" alt="arrow" />
                </div>
            </div>
        </a>
    );
};

export default Button;
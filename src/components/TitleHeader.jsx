import BlurText from "./BlurText";

const TitleHeader = ({ title, sub }) => {
    return (
        <div className="flex flex-col items-center gap-5">
            <div className="hero-badge">
                <p>{sub}</p>
            </div>
            <div>
                <BlurText
                    as="h1"
                    text={title}
                    className="font-semibold md:text-5xl text-3xl text-center"
                />
            </div>
        </div>
    );
};

export default TitleHeader;

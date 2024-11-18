import AboutBanner from "../AboutBanner/AboutBanner";
import FAQ from "../FAQ/FAQ";
import Mission from "../Mission/Mission";
import ReadytoExperiance from "../ReadytoExperiance/ReadytoExperiance";
import TeamMembers from "../TeamMembers/TeamMembers";
import TimeLine from "../TimeLine/TimeLine";
import UserFeedBack from "../UserFeedBack/UserFeedBack";

const About = () => {
    return (
        <div>
            <AboutBanner heading="About ServiceAid" text="Connecting people with trusted service providers since 2024"></AboutBanner>
            <Mission></Mission>
            <TimeLine></TimeLine>
            <TeamMembers></TeamMembers>
            <UserFeedBack></UserFeedBack>
            <FAQ></FAQ>
            <ReadytoExperiance></ReadytoExperiance>
        </div>
    );
};

export default About;
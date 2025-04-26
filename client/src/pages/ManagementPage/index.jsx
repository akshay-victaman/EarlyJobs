import React, { useEffect } from "react";
import { metaConstants } from "../../utils/metaConstants";
import "./style.css";

const ManagementPage = () => {
  const managementList = [
    {
      name: "Ravi Prakash Kumar",
      designation: "Founder & Director",
      desc: "Ravi Prakash Kumar originating from Gaya in Bihar, the Founder & Director of <strong>Earlyjobs</strong> has been a stalwart in the recruitment industry running his agency with dedication and precision. He as an overall experience of 10+ years of experience in various domains. With over a decade of experience across various domains, he has been instrumental in overseeing all operational aspects of <strong>Victaman</strong>, ensuring efficiency, growth, and strategic alignment. Ravi Prakash Kumar's leadership has been pivotal in driving the success and growth of both <strong>Earlyjobs</strong> and <strong>Victaman Services Pvt. Ltd.</strong>, contributing significantly to the recruitment industry.",
      img: "/about_us_imgs/RAVI.png",
    },
    {
      name: "Asish Chakraborty",
      designation: "Co-Founder & CEO",
      desc: "Asish Chakraborty is the Co-Founder & CEO of <strong>Earlyjobs</strong>, a company dedicated to transforming the recruitment process by fostering meaningful connections that fuel growth for both employers and jobseekers. He holds an MBA from the <strong>Sikkim Manipal Institute of Technology</strong> and brings with him 20 years of extensive experience in the pharmaceutical industry. Asish is passionate about introducing changes to the employment sector by promoting freelancers and empowering women to work from home. His expertise and leadership skills serve as a guiding force in propelling <strong>Earlyjobs</strong> to greater heights.",
      img: "/about_us_imgs/ASHISH.png",
    },
    {
      name: "Surbhi Rani",
      designation: "Co-Founder & Director",
      desc: "Surbhi Rani, a graduate of Magadh University, is a dynamic leader specializing in marketing and business development. As the Director of <strong>Earlyjobs</strong>, she plays a pivotal role in developing and executing marketing strategies, enhancing brand visibility, and driving business growth. With her expertise in digital marketing and market analysis, Surbhi is instrumental in expanding <strong>Earlyjobs</strong>' market presence and building strong client relationships. Her innovative approach to marketing and deep understanding of industry trends has been crucial in positioning <strong>Earlyjobs</strong> as a leading player in the recruitment sector.",
      img: "/about_us_imgs/SURBHI_1.png",
    },
    {
      name: "Akanksha Bharati",
      designation: "Co-Founder & Associate Vice President",
      desc: "Akanksha Bharati is a Senior Hiring Manager at <strong>Earlyjobs</strong>, bringing over a year of experience in recruitment and leadership. A graduate of the <strong>University of Calcutta</strong>, she is passionate about hiring new talent for organizations. In her role, Akansha is responsible for developing and implementing effective recruitment strategies, sourcing and attracting qualified candidates, and collaborating with hiring managers to understand their staffing needs. Her dedication to talent acquisition and her leadership skills contribute significantly to the growth and success of <strong>Earlyjobs</strong>.",
      img: "/about_us_imgs/AKANKSHA_1.png",
    },
    {
      name: "Dipanjana Basu",
      designation: "VP Corparate Affairs",
      desc: "Dipanjana is an astute professional with an impressive business entrepreneurship acumen. She has over two decades of global experience in leading successful businesses and delivering several corporate responsibilities during which she has consistently demonstrated her leadership. She has notable successes in building high performance teams.She believes in Social Responsibility and inline to this belief, she has been performing the role of Treasurer at <strong>Medico Pastoral Association</strong>, a Non-Government Organization in Bangalore.",
      img: "/about_us_imgs/DIPANJANA.png",
    },
    {
      name: "Ratan Saha",
      designation: "Growth Advisor",
      desc: "Ratan Saha is an Associate Director at <strong>Gupshup Technologies</strong> with over 15 years+ of experience in core sales. He has a proven track record of driving business growth and managing high-performing teams. With his expertise in sales strategy and execution, Ratan plays a pivotal role in identifying new opportunities and implementing innovative solutions to achieve organizational goals. His strategic insights and leadership skills have been instrumental in fostering growth and success. Ratan is deeply committed to helping organizations thrive by providing valuable advice and guidance to the team, ensuring sustainable growth and long-term success.",
      img: "/about_us_imgs/RATAN.png",
    },
    {
      name: "Prashob P",
      designation: "Chief Technology Advisor",
      desc: "Prashob P is the Chief Technology Officer at <strong>MeetXO.AI</strong> and serves as the Chief Technology Advisor at <strong>Earlyjobs</strong>. With a strong background in IT, innovation, and technology leadership, Prashob specializes in web and mobile app development. He has been instrumental in driving <strong>Earlyjobs</strong>' technological advancements, ensuring seamless integration of cutting-edge solutions to enhance user experience. Prashob's expertise in technology strategy, coupled with his passion for innovation, plays a pivotal role in shaping <strong>Earlyjobs</strong>' digital platforms, enabling scalable and impactful solutions for job seekers and employers alike.",
      img: "/about_us_imgs/PRASHOB.png",
    },
    {
      name: "Saurav Kumar",
      designation: "Co-Founder & Strategic Advisor",
      desc: "Saurav Kumar is a dynamic business strategist and entrepreneur with over 10 years+ of experience in driving business growth, innovation, and operational excellence. He holds a Master's degree from <strong>SRM University</strong>, Chennai, and has founded multiple successful ventures, including <strong>Victaman Services Pvt Ltd</strong>, <strong>Goformeet</strong>, <strong>English Wizard</strong>, and <strong>Meet XO</strong>. He also serves as the CEO of <strong>MeetXO</strong>, where he leads the company with a vision to revolutionize communication and collaboration through innovative solutions. Currently, Saurav plays a key role in planning and providing strategic advice at <strong>Earlyjobs</strong>, leveraging his expertise in IT solutions, business development, and strategic leadership. He envisions transforming the job market in the country by providing employment opportunities to the masses, reflecting his commitment to impactful and scalable solutions.",
      img: "/about_us_imgs/SAURAV.png",
    },
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = metaConstants.management.title;

    const metaDescription = document.querySelector('meta[name="description"]');
    const metaKeywords = document.querySelector('meta[name="keywords"]');
    const metaSubject = document.querySelector('meta[name="subject"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", metaConstants.about.description);
    }
    if (metaKeywords) {
      metaKeywords.setAttribute("content", metaConstants.about.keywords);
    }
    if (metaSubject) {
      metaSubject.setAttribute("content", metaConstants.about.description);
    }

    return () => {
      document.title = metaConstants.title;
      if (metaDescription) {
        metaDescription.setAttribute("content", metaConstants.description); // Replace with the original content if needed
      }
      if (metaKeywords) {
        metaKeywords.setAttribute("content", metaConstants.keywords);
      }
      if (metaSubject) {
        metaSubject.setAttribute("content", metaConstants.description);
      }
    };
  }, []);

  return (
    <div className="privacy-policy-page">
      <div className="privacy-policy-page__background">
        <h1 className="privacy-policy-heading">Management Team</h1>
      </div>

      <div className="management-page__content">
        <div className="management-page__content__team">
          {/* <h2 className="management-page__content__team__heading">
            Management Team
          </h2> */}
          {/* <p className="management-page__content__team__para">
            Our management team is responsible for the day-to-day operations of
            our company. They are committed to providing the highest level of
            service to our customers and ensuring that our business operates
            efficiently and effectively.
          </p> */}
        </div>
      </div>

      {managementList.map((item, index) => (
        <div className="management-team-con">
          {index % 2 === 0 && (
            <img
              src={item.img}
              alt="management team"
              className="management-team-img"
            />
          )}
          <div className="management-team-detail">
            <h1 className="management-team-name">{item.name}</h1>
            <p className="management-team-designation">{item.designation}</p>
            <p
              className="management-team-desc"
              dangerouslySetInnerHTML={{ __html: item.desc }}
            ></p>
          </div>
          {index % 2 !== 0 && (
            <img
              src={item.img}
              alt="management team"
              className="management-team-img"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ManagementPage;

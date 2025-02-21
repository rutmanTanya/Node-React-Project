import React from "react";
import { Link } from "react-router-dom";
import "../assets/styles/MainPage.css";
import prototype from "../assets/img/prototype.jpg";
import choosing from "../assets/img/choosing.png";
import wecan from "../assets/img/wecan.png";
import accessibility from "../assets/img/accessibility.png";

function MainPage() {
  const articles = [
    {
      id: 1,
      title: "Why Choose Us?",
      image: choosing,
      content:
        "We bring the latest in facial recognition technology to secure your spaces. Our systems deliver unparalleled accuracy, eliminating the risks of lost keys or stolen access credentials. With us, you can count on reliable, hassle-free protection.\n" +
        "Our solutions integrate seamlessly with your existing security infrastructure, ensuring smooth operation without disruption. Designed for scalability, they adapt to spaces of all sizes, from small offices to large enterprises. Plus, our user-friendly setup makes advanced security accessible to everyone.\n" +
        "We prioritize your privacy and comply with strict data protection standards, keeping your information safe at all times. Backed by 24/7 expert support, we’re here to ensure your security runs flawlessly when you need it most. Choose confidence—choose us",
    },
    {
      id: 2,
      title: "What Is Our Goal?",
      image: wecan,
      content:
        "Our goal is to redefine security with innovative facial recognition solutions that prioritize safety, privacy, and ease of use. We aim to deliver systems that seamlessly integrate into your life or business, offering reliable protection and peace of mind. By combining cutting-edge technology with user-focused design, we strive to set new standards in secure and accessible solutions for all.",
    },
    {
      id: 3,
      title: "Accessibility",
      image: accessibility,
      content:
        "we are committed to ensuring our website is accessible to everyone, regardless of ability or technology. We strive to provide an inclusive online experience by adhering to recognized accessibility standards and continuously improving our platform.\n" +
        "Our website is designed to meet the Web Content Accessibility Guidelines (WCAG) 2.1, aiming for Level AA compliance. This includes features such as keyboard navigation, screen reader compatibility, and text alternatives for visual content. We also regularly test and update our site to address accessibility concerns and enhance usability.\n" +
        "If you encounter any barriers or have suggestions for improving your experience, please contact us. Your feedback is invaluable in helping us create a more inclusive digital environment for all.",
    },
  ];

  return (
    <div className="main">
      <section className="articles">
        <div className="container">
          <h1 className="main-page-title">Facial Recognition Based Security System</h1>
          <div className="mainPageContainer">
            <div className="imgContainer">
              <img src={prototype} alt="Prototype" />
            </div>
            <div className="articles-container">
              {articles &&
                articles.map((article) => (
                  <div key={article.id} className="article-card">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="article-image"
                    />
                    <h2 className="article-title">{article.title}</h2>
                    <Link
                      to={`/post/${article.id}`}
                      state={{ post: article }}
                      className="view-button"
                    >
                      View
                    </Link>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MainPage;

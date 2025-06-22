import React, { useEffect, useState } from "react";
import LinksSection from "./LinksSection";
import "../App.css";
import { sort } from "color-sorter";

// Icons
import {
  FaTwitch,
  FaYoutube,
  FaLinkedin,
  FaGithub,
  FaFacebook,
  FaInstagram,
  FaAmazon,
  FaStackOverflow,
  FaStripe,
  FaCreditCard,
  FaEnvelope,
  FaUserShield,
  FaStore,
  FaQuestionCircle,
} from "react-icons/fa";

import { RiNetflixFill } from "react-icons/ri";
import { CiTwitter } from "react-icons/ci";
import {
  SiVercel,
  SiNamecheap,
  SiPrimevideo,
  SiFlutter,
  SiZoho,
} from "react-icons/si";
import { TbBrandDisney } from "react-icons/tb";
import { MdOutlineSubtitles, MdLogin, MdDashboard } from "react-icons/md";

import viaplayIcon from "../assets/images/viaplay.svg";
import svtPlayIcon from "../assets/images/svt_play.svg";
import homeAssistantIcon from "../assets/images/home_assistant.svg";
import chatGPTIcon from "../assets/images/ChatGPT.svg";
import hotmailIcon from "../assets/images/Outlook.svg";
import hnIcon from "../assets/images/HN.png";
import aftonbladetIcon from "../assets/images/Aftonbladet.png";
import f1Icon from "../assets/images/F1.svg";
import fplIcon from "../assets/images/FPL.svg";
import flashScoreIcon from "../assets/images/Flashscore.png";
import HampusAnderssonIcon from "../assets/images/HampusAndersson.png";
import prisjaktIcon from "../assets/images/Prisjakt.png";

const Links: React.FC = () => {
  // Get showTitles from localStorage if it exists, otherwise set it to true
  const [showTitles, setShowTitles] = useState<boolean>(
    JSON.parse(localStorage.getItem("showTitles")!) ?? true
  );

  const toggleShowTitles = () => {
    setShowTitles((prev) => !prev);
  };

  useEffect(() => {
    localStorage.setItem("showTitles", JSON.stringify(showTitles));
  }, [showTitles]);

  const socialMediaLinks = [
    {
      url: "https://www.linkedin.com/in/hampus-a-0957b9140",
      title: "LinkedIn",
      icon: <FaLinkedin />,
      color: "#0077b5",
    },
    {
      url: "https://twitter.com/",
      title: "Twitter",
      icon: <CiTwitter />,
      color: "#1da1f2",
    },
    {
      url: "https://www.instagram.com/",
      title: "Instagram",
      icon: <FaInstagram />,
      color: "#bc2a8d",
    },
    {
      url: "https://www.facebook.com/",
      title: "Facebook",
      icon: <FaFacebook />,
      color: "#1877f2",
    },
    {
      url: "https://hotmail.com/",
      title: "Outlook",
      icon: <img src={hotmailIcon} alt="Outlook" />,
      color: "#0072c6",
    },
  ];

  const newsLinks = [
    {
      url: "https://www.hn.se/",
      title: "Hallands Nyheter",
      icon: <img src={hnIcon} alt="hn" />,
      color: "#0a324b",
    },
    {
      url: "https://www.aftonbladet.se/",
      title: "Aftonbladet",
      icon: <img src={aftonbladetIcon} alt="Aftonbladet" />,
      color: "#ffec03",
    },
  ];

  const entertainmentLinks = [
    {
      url: "https://www.twitch.tv/",
      title: "Twitch",
      icon: <FaTwitch />,
      color: "#6441a5",
    },
    {
      url: "https://www.youtube.com/",
      title: "YouTube",
      icon: <FaYoutube />,
      color: "#cc181e	",
    },
    {
      url: "https://viaplay.com/",
      title: "Viaplay",
      icon: <img src={viaplayIcon} alt="Viaplay" />,
      color: "#fff",
    },
    {
      url: "https://www.svtplay.se/",
      title: "SVT Play",
      icon: <img src={svtPlayIcon} alt="SVT Play" />,
      color: "#404040",
    },
    {
      url: "https://www.netflix.com/",
      title: "Netflix",
      icon: <RiNetflixFill />,
      color: "#e50914",
    },
    {
      url: "https://www.disneyplus.com/sv-se/",
      title: "Disney+",
      icon: <TbBrandDisney />,
      color: "#01147c",
    },
    {
      url: "https://www.primevideo.com/",
      title: "Prime Video",
      icon: <SiPrimevideo />,
      color: "#00A8E1",
    },
  ];

  const homeLinks = [
    {
      url: "http://homeassistant.local:8123/",
      title: "Home Assistant",
      icon: <img src={homeAssistantIcon} alt="Home Assistant" />,
      color: "#41bdf5",
    },
    {
      url: "https://www.amazon.se/",
      title: "Amazon",
      icon: <FaAmazon />,
      color: "#ff9900",
    },
    {
      url: "https://hampusandersson.dev/",
      title: "Portfolio",
      icon: <img src={HampusAnderssonIcon} alt="Hampus Andersson" />,
      color: "#f0f0f0",
    },
    {
      url: "https://www.prisjakt.nu/",
      title: "Prisjakt",
      icon: <img src={prisjaktIcon} alt="Prisjakt" />,
      color: "#00addb",
    },
  ];
  const sportsLinks = [
    {
      url: "https://www.formula1.com/",
      title: "F1",
      icon: <img src={f1Icon} alt="F1" />,
      color: "#fff",
    },
    {
      url: "https://fantasy.premierleague.com/",
      title: "FPL",
      icon: <img src={fplIcon} alt="FPL" />,
      color: "#37003c",
    },
    {
      url: "https://www.flashscore.com/favorites/",
      title: "FlashScore",
      icon: <img src={flashScoreIcon} alt="FlashScore" />,
      color: "#001e28",
    },
  ];

  const developerLinks = [
    {
      url: "https://ap.www.namecheap.com/dashboard",
      title: "Namecheap",
      icon: <SiNamecheap />,
      color: "#ea6122",
    },
    {
      url: "https://vercel.com/",
      title: "Vercel",
      icon: <SiVercel />,
      color: "#fff",
    },
    {
      url: "https://github.com/HampusAndersson01",
      title: "GitHub",
      icon: <FaGithub />,
      color: "#24292e",
    },
    {
      url: "https://stackoverflow.com/",
      title: "Stack Overflow",
      icon: <FaStackOverflow />,
      color: "#f48024",
    },
    {
      url: "https://chat.openai.com/",
      title: "OpenAI Chat",
      icon: <img src={chatGPTIcon} alt="ChatGPT" />,
      color: "#74aa9c",
    },
    // flutterzone
    {
      url: "https://app.flutterflow.io/dashboard",
      title: "FlutterFlow",
      icon: <SiFlutter />,
      color: "#4b3aef",
    },
  ];

  const haWebbyraLinks = [
    {
      url: "https://secure.zervant.com/reactDashboard",
      title: "Zervant",
      icon: <FaCreditCard />,
      color: "#004080",
    },
    {
      url: "https://dashboard.stripe.com/dashboard",
      title: "Stripe",
      icon: <FaStripe />,
      color: "#6772e5",
    },
    {
      url: "https://login.inleed.net/",
      title: "Inleed Login",
      icon: <MdLogin />,
      color: "#006699",
    },
    {
      url: "https://ns15.inleed.net:2222/evo/",
      title: "Inleed Panel",
      icon: <MdDashboard />,
      color: "#336666",
    },
    {
      url: "https://apps.kapitas.se/dashboard.php",
      title: "Kapitas",
      icon: <FaQuestionCircle />,
      color: "#5a5a5a",
    },
    {
      url: "https://store.zoho.eu/html/store/index.html#subscription?serviceId=1501&customId=f2257a1d8a9e2caee54575edb51feced",
      title: "Zoho Store",
      icon: <FaStore />,
      color: "#da3c3c",
    },
    {
      url: "https://mail.zoho.eu/zm/#",
      title: "Zoho Mail",
      icon: <FaEnvelope />,
      color: "#ff5722",
    },
    {
      url: "https://mailadmin.zoho.eu/cpanel/home.do",
      title: "Zoho Admin",
      icon: <FaUserShield />,
      color: "#9c27b0",
    },
  ];

  const sections = [
    {
      title: "Social Media",
      links: socialMediaLinks,
      color: "#7a3333", // Dark Red for Social Media
    },

    {
      title: "Entertainment",
      links: entertainmentLinks,
      color: "#3d573d", // Dark Green for Entertainment
    },
    {
      title: "Home",
      links: homeLinks,
      color: "#725272", // Dark Purple for Home
    },
    {
      title: "News",
      links: newsLinks,
      color: "#465363", // Dark Slate Gray for News
    },
    {
      title: "Sports",
      links: sportsLinks,
      color: "#2a4d2a", // Dark Green for Sports
    },
    {
      title: "Developer",
      links: developerLinks,
      color: "#4d2b4d", // Dark Purple for Developer
    },
    {
      title: "HA Webbyrå",
      links: haWebbyraLinks,
      color: "#7c3aed", // Violet for HA Webbyrå
    },
  ];

  // Sort the sections by background color using import { sort } from "color-sorter";
  const sortedSections = sort(sections.map((section) => section.color)).map(
    (sortedColor) => {
      // Find the section object based on the sorted color
      return sections.find((section) => section.color === sortedColor) as {
        title: string;
        links: {
          url: string;
          title: string;
          icon: React.ReactElement;
          color: string;
        }[];
        color: string;
      };
    }
  );

  return (
    <div className="container">
      {sortedSections.map((section, index) => (
        <LinksSection
          key={index}
          title={section.title}
          links={section.links}
          color={section.color}
          showTitles={showTitles}
        />
      ))}
      <div className="toggle-container">
        <MdOutlineSubtitles
          className={`toggle-icon ${showTitles ? "checked" : ""}`}
          onClick={toggleShowTitles}
        />
        <input
          type="checkbox"
          id="toggle"
          className="toggle"
          checked={showTitles}
          onChange={toggleShowTitles}
        />
      </div>
    </div>
  );
};

export default Links;

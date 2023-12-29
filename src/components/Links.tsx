import React from "react";
import LinksSection from "./LinksSection";
import "../App.css";

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
} from "react-icons/fa";

import { RiNetflixFill } from "react-icons/ri";
import { CiTwitter } from "react-icons/ci";
import { SiVercel, SiNamecheap } from "react-icons/si";

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

  const chatAndEmailLinks = [
    {
      url: "https://chat.openai.com/",
      title: "OpenAI Chat",
      icon: <img src={chatGPTIcon} alt="ChatGPT" />,
      color: "#74aa9c",
    },
    {
      url: "https://hotmail.com/",
      title: "Outlook",
      icon: <img src={hotmailIcon} alt="Outlook" />,
      color: "#0072c6",
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
      color: "#c4302b",
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
  ];

  const sections = [
    {
      title: "Social Media",
      links: socialMediaLinks,
      color: "#444",
    },
    {
      title: "Chat and Email",
      links: chatAndEmailLinks,
      color: "#5a3a3a",
    },
    {
      title: "Entertainment",
      links: entertainmentLinks,
      color: "#3a4a3a",
    },
    {
      title: "Home",
      links: homeLinks,
      color: "#4a3a4a",
    },
    {
      title: "News",
      links: newsLinks,
      color: "#2c3e50",
    },
    {
      title: "Sports",
      links: sportsLinks,
      color: "#2e4932",
    },
    {
      title: "Developer",
      links: developerLinks,
      color: "#4b2e52",
    },
  ];

  return (
    <div className="container">
      {sections.map((section, index) => (
        <LinksSection
          key={index}
          title={section.title}
          links={section.links}
          color={section.color}
        />
      ))}
    </div>
  );
};

export default Links;

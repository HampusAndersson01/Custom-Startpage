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
} from "react-icons/fa";

import { RiNetflixFill } from "react-icons/ri";
import { CiTwitter } from "react-icons/ci";

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

const Links: React.FC = () => {
  const socialMediaLinks = [
    {
      url: "https://www.linkedin.com/in/hampus-a-0957b9140",
      title: "LinkedIn",
      icon: <FaLinkedin />,
      color: "#0077b5",
    },
    {
      url: "https://github.com/HampusAndersson01",
      title: "GitHub",
      icon: <FaGithub />,
      color: "#24292e",
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

  return (
    <div className="container">
      <LinksSection title="Social Media" links={socialMediaLinks} />
      <LinksSection title="Chat and Email" links={chatAndEmailLinks} />
      <LinksSection title="Entertainment" links={entertainmentLinks} />
      <LinksSection title="Home" links={homeLinks} />
      <LinksSection title="News" links={newsLinks} />
      <LinksSection title="Sports" links={sportsLinks} />
    </div>
  );
};

export default Links;

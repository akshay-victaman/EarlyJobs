import React, { useEffect, useState } from "react";
import CompanyFilterBar from "../../components/Clientele/CompanyFilterBar";
import CompanyCard from "../../components/Clientele/CompanyCard";
import ClienteleCTA from "../../components/Clientele/ClienteleCTA";
import emailjs from "@emailjs/browser";
import "./style.css";

// Expanded mock data: 30 companies, more categories
const filters = [
  "All",
  "FinTech",
  "EdTech",
  "HealthTech",
  "SaaS",
  "E-commerce",
  "Logistics",
  "Agritech",
  "AI/ML",
  "HRTech",
  "Gaming",
  "Cybersecurity",
  "InsurTech",
  "Cleantech",
  "Retail",
  "Real Estate",
  "IT/SaaS",
  "Services",
  "Automotive",
];
const companies = [
  {
    id: "7ff5ea9a-a1cc-4574-9c47-144ff4608967",
    name: "iSON Xperiences",
    registered_address:
      "iSON Xperiences #208, Second floor , Hustlehub Tech Park, Somasundarapalya Main Rd, Sector 2, HSR Layout, Bangalore - 560102",
    address:
      "iSON Xperiences #208, Second floor , Hustlehub Tech Park, Somasundarapalya Main Rd, Sector 2, HSR Layout, Bangalore - 560102",
    email: "nitya.mehta@isonxperiences.com",
    phone: "7022566535",
    gst_no: "29AADCI1246E1ZT",
    spoc_name: "Nitya Mehta",
    spoc_email: "nitya.mehta@isonxperiences.com",
    spoc_phone: "7022566535",
    created_at: "2024-06-21T23:22:58.000Z",
    updated_at: "2024-11-16T02:30:38.000Z",
    logo_url:
      "https://earlyjobs-company-logo.s3.ap-south-1.amazonaws.com/ison.jpg-1731744037757",
    sector: "Services", // Customer experience management and BPO services
  },
  {
    id: "b7d1065c-2698-4a1c-ba04-9973973e8aa4",
    name: "Alliance Telecom Solutions",
    registered_address:
      "no-9, 2nd floor,BA-Hub commercial complex, Baif Road , Wagholi, Pune, Maharashtra-412207",
    address:
      "no-9, 2nd floor,BA-Hub commercial complex, Baif Road , Wagholi, Pune, Maharashtra-412207",
    email: "anirudh@alliancetelecoms.com",
    phone: "7558355519",
    gst_no: "hjhgyugyugyugyu",
    spoc_name: "Anirudh",
    spoc_email: "anirudh@alliancetelecoms.com",
    spoc_phone: "7558355519",
    created_at: "2024-09-25T00:30:24.000Z",
    updated_at: "2024-09-25T00:30:24.000Z",
    logo_url:
      "https://earlyjobs-company-logo.s3.ap-south-1.amazonaws.com/Untitled.png-1727244023991",
    sector: "Services", // Telecom and customer service solutions
  },
  {
    id: "e90f92b0-2186-43a3-996b-c7f7cdd0fe3c",
    name: "Allsec Technologies Limited",
    registered_address:
      "45/7, 1st & 3rd Floor, Vinayaka Complex, Residency Cross Road, Bengaluru, Karnataka - 560025",
    address:
      "45/7, 1st & 3rd Floor, Vinayaka Complex, Residency Cross Road, Bengaluru, Karnataka - 560025",
    email: "Pruthvi.S@allsectech.com",
    phone: "9620664492",
    gst_no: "29AACCA5106G2ZY",
    spoc_name: "Pruthvi S",
    spoc_email: "Pruthvi.S@allsectech.com",
    spoc_phone: "9620664492",
    created_at: "2024-06-21T23:10:38.000Z",
    updated_at: "2024-07-12T00:30:28.000Z",
    logo_url:
      "https://earlyjobs-company-logo.s3.ap-south-1.amazonaws.com/allsec.png-1720764027960",
    sector: "Services", // BPO and customer service solutions
  },
  {
    id: "13060ffa-25f3-44f1-87fd-afa49cde8f91",
    name: "Altruist Technologies Private Limited",
    registered_address:
      "4TH FLOOR 'ALTRUIST MOUNT' BEHIND HOTEL FIRHILL, NEAR TUNNEL NO.103 SHIMLA, Himachal Pradesh IN 171004",
    address:
      "4TH FLOOR 'ALTRUIST MOUNT' BEHIND HOTEL FIRHILL, NEAR TUNNEL NO.103 SHIMLA, Himachal Pradesh IN 171004",
    email: "jyoti.ranjan@altruistindia.com",
    phone: "8908494848",
    gst_no: "02AAFCA3725N1ZS",
    spoc_name: "Jyoti Ranjan",
    spoc_email: "jyoti.ranjan@altruistindia.com",
    spoc_phone: "8908494848",
    created_at: "2024-06-21T23:21:10.000Z",
    updated_at: "2024-08-17T02:16:09.000Z",
    logo_url:
      "https://earlyjobs-company-logo.s3.ap-south-1.amazonaws.com/altrust.png-1720758664875",
    sector: "Services", // Telecom and customer service solutions
  },
  {
    id: "825043ab-9e62-4c19-b4c7-0976207e0ca8",
    name: "Arasu Enterprises",
    registered_address: "6th main, Peenya Industrial Estate, Bangalore, 560058",
    address: "6th main, Peenya Industrial Estate, Bangalore, 560058",
    email: "shoaib.arasu@gmail.com",
    phone: "9845175091",
    gst_no: "jihhufghvuwuvbwhvbub",
    spoc_name: "Mohammed Shoaib Taha",
    spoc_email: "shoaib.arasu@gmail.com",
    spoc_phone: "9845175091",
    created_at: "2024-06-28T07:13:02.000Z",
    updated_at: "2024-06-28T07:13:02.000Z",
    logo_url: null,
    sector: "Services", // General enterprise services
  },
  {
    id: "d7d21af7-eaaf-42f9-8877-3972d4f4876d",
    name: "ATHENA BPO PRIVATE LIMITED",
    registered_address:
      "#7,17th cross, K R Road BSK,  2nd Stage, Near Smart Point  Bangalore-560070",
    address:
      "#7,17th cross, K R Road BSK,  2nd Stage, Near Smart Point  Bangalore-560070",
    email: "hr_blr@athenabpo.in",
    phone: "7892010344",
    gst_no: "29AABCA6983E1ZH",
    spoc_name: "R Sunil",
    spoc_email: "hr_blr@athenabpo.in",
    spoc_phone: "7892010345",
    created_at: "2024-11-16T02:29:54.000Z",
    updated_at: "2024-11-16T02:29:54.000Z",
    logo_url:
      "https://earlyjobs-company-logo.s3.ap-south-1.amazonaws.com/athena-logo.jpg-1731743993928",
    sector: "Services", // BPO services
  },
  {
    id: "e8d3c05d-6325-465a-b7d2-5ed13f6aa245",
    name: "Bigbasket",
    registered_address:
      "Bigbasket Survey no 34/1, 34/3, 34/4, Chokkanahalli village, Bhartiya city main road, Jakkur Post, Yelahanka Ho Bangalore -560001",
    address:
      "Bigbasket Survey no 34/1, 34/3, 34/4, Chokkanahalli village, Bhartiya city main road, Jakkur Post, Yelahanka Ho Bangalore -560001",
    email: "gopalakrishna.m@bigbasket.com",
    phone: "7676082719",
    gst_no: "jbvjkbvjkfdbvjkfdbvjfb",
    spoc_name: "Gopalakrishna M",
    spoc_email: "gopalakrishna.m@bigbasket.com",
    spoc_phone: "7676082719",
    created_at: "2024-07-04T09:39:39.000Z",
    updated_at: "2024-07-11T22:56:05.000Z",
    logo_url:
      "https://earlyjobs-company-logo.s3.ap-south-1.amazonaws.com/bb.png-1720758364908",
    sector: "E-commerce", // Online grocery delivery
  },
  {
    id: "da9ef92c-9e7c-4646-b16f-2c68cd7c81ae",
    name: "Cogent E Services Ltd",
    registered_address:
      "Ground Floor and 1st Floor, Gopalan Millennium Tower, IPTL Main Road, Kundalahalli Colony, Brookefield, Bangalore, Bengaluru (Bangalore) Urban, Karnataka, 560037",
    address:
      "Ground Floor and 1st Floor, Gopalan Millennium Tower, IPTL Main Road, Kundalahalli Colony, Brookefield, Bangalore, Bengaluru (Bangalore) Urban, Karnataka, 560037",
    email: "Riyaz.ahamad@cogenteservices.com",
    phone: "9599322486",
    gst_no: "29AACCC3883C1ZP",
    spoc_name: "Riyaz Ahamad",
    spoc_email: "Riyaz.ahamad@cogenteservices.com",
    spoc_phone: "9599322486",
    created_at: "2024-06-21T23:12:33.000Z",
    updated_at: "2024-07-12T00:34:37.000Z",
    logo_url:
      "https://earlyjobs-company-logo.s3.ap-south-1.amazonaws.com/cogent.png-1720764277261",
    sector: "Services", // Customer support and BPO services
  },
  {
    id: "2590e4c8-e551-4dda-b770-3db74bebddab",
    name: "DBS Mintek Pvt Ltd.",
    registered_address:
      "4th floor Anjani Palladium,Next to prabhavee Teck Park,Baner,Pune. 411045",
    address:
      "4th floor Anjani Palladium,Next to prabhavee Teck Park,Baner,Pune. 411045",
    email: "hr@dbsmintek.com",
    phone: "9011083303",
    gst_no: "27AACCD9920D3ZQ",
    spoc_name: "Nilima",
    spoc_email: "hr@dbsmintek.com",
    spoc_phone: "9011083303",
    created_at: "2024-06-21T23:14:18.000Z",
    updated_at: "2024-07-12T06:28:43.000Z",
    logo_url:
      "https://earlyjobs-company-logo.s3.ap-south-1.amazonaws.com/dbs.png-1720785522807",
    sector: "Services", // BPO and IT services
  },
  {
    id: "5a0c682d-0fa5-4ec6-8305-53ac167c1bf6",
    name: "Earlyjobs",
    registered_address:
      "53, HustleHub, 5th Cross Rd, near Sony World Signal, 4th Block, Koramangala, Bengaluru, Karnataka 560034",
    address:
      "53, HustleHub, 5th Cross Rd, near Sony World Signal, 4th Block, Koramangala, Bengaluru, Karnataka 560034",
    email: "info@earlyjobs.in",
    phone: "8217527926",
    gst_no: "29AAhjbhbhjbhhbh",
    spoc_name: "Saurav",
    spoc_email: "info@earlyjobs.in",
    spoc_phone: "8217527926",
    created_at: "2024-09-18T01:06:29.000Z",
    updated_at: "2024-09-18T01:06:29.000Z",
    logo_url:
      "https://earlyjobs-company-logo.s3.ap-south-1.amazonaws.com/earlyjobs.png-1726641389273",
    sector: "HRTech", // AI-powered hiring platform
  },
  {
    id: "f908da17-13d2-49fd-9888-b73750c6ee1d",
    name: "EbixCash Global Services Private Limited",
    registered_address:
      "NPR Complex, No 614, Vajpayee nagar, Hongasandra, Near IBIS hotel Hosur Main Road, Bangalore- 560068",
    address:
      "NPR Complex, No 614, Vajpayee nagar, Hongasandra, Near IBIS hotel Hosur Main Road, Bangalore- 560068",
    email: "calson.cj@ebixcash.com",
    phone: "9611375402",
    gst_no: "29AABCM3799C1Z9",
    spoc_name: "Calson",
    spoc_email: "calson.cj@ebixcash.com",
    spoc_phone: "9611375402",
    created_at: "2024-06-21T23:33:42.000Z",
    updated_at: "2024-07-12T02:05:11.000Z",
    logo_url:
      "https://earlyjobs-company-logo.s3.ap-south-1.amazonaws.com/ebixcash.png-1720769711211",
    sector: "FinTech", // Financial services and payments
  },
  {
    id: "27476957-02b8-4804-bcba-ca18902b4ee4",
    name: "ECPL- ExpertCallers Solutions Private Limited",
    registered_address:
      "1877/4 HBR Layout 2nd Block, 1st Stage,80ft Main Road, Bangalore 560043",
    address:
      "1877/4 HBR Layout 2nd Block, 1st Stage,80ft Main Road, Bangalore 560043",
    email: "princy.k@expertcallers.com",
    phone: "7019743990",
    gst_no: "29AAECE0810D1Z6",
    spoc_name: "Princy",
    spoc_email: "princy.k@expertcallers.com",
    spoc_phone: "7019743990",
    created_at: "2024-06-21T23:29:59.000Z",
    updated_at: "2024-07-12T02:08:21.000Z",
    logo_url:
      "https://earlyjobs-company-logo.s3.ap-south-1.amazonaws.com/ecpl.png-1720769900509",
    sector: "Services", // Customer support and BPO
  },
  {
    id: "4620835c-c957-4ede-bea7-2bb655dddbeb",
    name: "Englishwizard",
    registered_address:
      "3, HustleHub, 5th Cross Rd, near Sony World Signal, 4th Block, Koramangala, Bengaluru, Karnataka 560034",
    address:
      "3, HustleHub, 5th Cross Rd, near Sony World Signal, 4th Block, Koramangala, Bengaluru, Karnataka 560034",
    email: "info@englishwizard.in",
    phone: "9740534268",
    gst_no: "jbhjgvuhygyuguy",
    spoc_name: "Saurav",
    spoc_email: "info@englishwizard.in",
    spoc_phone: "9740534268",
    created_at: "2024-07-04T01:16:34.000Z",
    updated_at: "2024-07-04T01:16:34.000Z",
    logo_url: null,
    sector: "EdTech", // English learning platform
  },
  {
    id: "32041a25-1c77-4a13-8c51-e202845c2405",
    name: "Flipkart",
    registered_address:
      "WMGR+QR4, Embassy Tech Village Rd, Devarabisanahalli, Bellandur, Bengaluru, Karnataka 560103",
    address:
      "WMGR+QR4, Embassy Tech Village Rd, Devarabisanahalli, Bellandur, Bengaluru, Karnataka 560103",
    email: "krati.sharma@flipkart.com",
    phone: "9742802227",
    gst_no: "jbhjefbvhefbvhjefbvjh",
    spoc_name: "Krati Sharma",
    spoc_email: "krati.sharma@flipkart.com",
    spoc_phone: "9742802227",
    created_at: "2024-06-29T23:31:03.000Z",
    updated_at: "2024-07-11T22:53:27.000Z",
    logo_url:
      "https://earlyjobs-company-logo.s3.ap-south-1.amazonaws.com/earlyjobs.png-1720758206499",
    sector: "E-commerce", // Online marketplace
  },
  {
    id: "3b1c6c1b-bff1-4d08-8d9e-55e2c799763f",
    name: "Frankfinn Aviation Service Pvt Ltd.",
    registered_address:
      "Plot -21A,  Udyog Vihar phase 4, Sector 18, Gurgaon. Near Genpact building.",
    address:
      "Plot -21A,  Udyog Vihar phase 4, Sector 18, Gurgaon. Near Genpact building.",
    email: "gundala.rajasekhar@frankfinn.com",
    phone: "7022562253",
    gst_no: "djkhviuehviuehvuiethviu",
    spoc_name: "Gundala Rajasekhar",
    spoc_email: "gundala.rajasekhar@frankfinn.com",
    spoc_phone: "7022562253",
    created_at: "2024-07-31T06:36:01.000Z",
    updated_at: "2024-07-31T06:36:01.000Z",
    logo_url:
      "https://earlyjobs-company-logo.s3.ap-south-1.amazonaws.com/images.png-1722427577848",
    sector: "EdTech", // Aviation training and education
  },
  {
    id: "4d9f1633-246a-4fc8-9cd5-eedad040f792",
    name: "Genius Labs",
    registered_address:
      "6th floor, flat no 606,duo harmony apartments,suranjan das road Bengaluru Karnataka India 560076",
    address:
      "6th floor, flat no 606,duo harmony apartments,suranjan das road Bengaluru Karnataka India 560076",
    email: "support@geniuslabs.in",
    phone: "8957922812",
    gst_no: "29AAKCG5282B1ZI",
    spoc_name: "Anuj Mishra",
    spoc_email: "mishraanuj08@gmail.com",
    spoc_phone: "8957922812",
    created_at: "2024-06-21T23:27:37.000Z",
    updated_at: "2024-07-12T02:02:38.000Z",
    logo_url:
      "https://earlyjobs-company-logo.s3.ap-south-1.amazonaws.com/genius.png-1720769558193",
    sector: "EdTech", // Likely education or tech-related services
  },
  {
    id: "48a53c7b-f545-491d-93d9-b4e96fdee409",
    name: "Globiva",
    registered_address:
      " 2th Floor, IndiQube Alpha B3 , Plot No 19/4, 27 Marathahalli, Junction, Outer Ring Rd, Kadubeesanahalli, Panathur, Bengaluru, Karnataka 560103",
    address:
      " 2th Floor, IndiQube Alpha B3 , Plot No 19/4, 27 Marathahalli, Junction, Outer Ring Rd, Kadubeesanahalli, Panathur, Bengaluru, Karnataka 560103",
    email: "jeevitha.n@globiva.com",
    phone: "9600366624",
    gst_no: "jifvbfeijbvhj",
    spoc_name: "Hemanth",
    spoc_email: "jeevitha.n@globiva.com",
    spoc_phone: "9600366624",
    created_at: "2024-07-31T06:54:23.000Z",
    updated_at: "2024-07-31T06:54:23.000Z",
    logo_url:
      "https://earlyjobs-company-logo.s3.ap-south-1.amazonaws.com/globiva_services_logo.jpg-1722428679809",
    sector: "Services", // Customer service and BPO
  },
  {
    id: "020f467a-f0fc-4b3c-a8bf-822218496858",
    name: "Goformeet",
    registered_address:
      "3, HustleHub, 5th Cross Rd, near Sony World Signal, 4th Block, Koramangala, Bengaluru, Karnataka 560034",
    address:
      "3, HustleHub, 5th Cross Rd, near Sony World Signal, 4th Block, Koramangala, Bengaluru, Karnataka 560034",
    email: "info@goformeet.co",
    phone: "8217527926",
    gst_no: "hjbhjvhjhvhubhuf",
    spoc_name: "Prashob",
    spoc_email: "info@goformeet.co",
    spoc_phone: "8217427926",
    created_at: "2024-07-04T01:15:35.000Z",
    updated_at: "2024-07-11T22:57:35.000Z",
    logo_url:
      "https://earlyjobs-company-logo.s3.ap-south-1.amazonaws.com/gfm.png-1720758454906",
    sector: "Services", // Likely a meeting or collaboration service
  },
  {
    id: "590c518d-4a09-44d0-adc7-0069daba9269",
    name: "HDFC",
    registered_address:
      "Wing A/4th floor, HDFC House, H T Parekh Marg, 165, 166, Backbay Reclamation, Churchgate, Mumbai - 400020",
    address:
      "Wing A/4th floor, HDFC House, H T Parekh Marg, 165, 166, Backbay Reclamation, Churchgate, Mumbai - 400020",
    email: "nsivagami@hdfcsales.com",
    phone: "9952073141",
    gst_no: "hbvhvhvhvhvhv",
    spoc_name: "N Sivagami",
    spoc_email: "nsivagami@hdfcsales.com",
    spoc_phone: "9952073141",
    created_at: "2024-07-03T07:55:27.000Z",
    updated_at: "2024-07-11T23:02:56.000Z",
    logo_url:
      "https://earlyjobs-company-logo.s3.ap-south-1.amazonaws.com/hdfc.png-1720758775727",
    sector: "FinTech", // Financial services
  },
  {
    id: "cccc93f1-46e7-4a50-b0ce-c4ae1a3615c7",
    name: "Hinduja Global Solutions Limited- HGS",
    registered_address: "7A, Summerville, Bandra (West), Mumbai 400 050, India",
    address: "7A, Summerville, Bandra (West), Mumbai 400 050, India",
    email: "preeti.singh@hgsbs.com",
    phone: "9869139059",
    gst_no: "hbhbuuuihiuh",
    spoc_name: "Preeti Singh",
    spoc_email: "preeti.singh@hgsbs.com",
    spoc_phone: "9869139059",
    created_at: "2024-07-05T04:58:47.000Z",
    updated_at: "2024-07-12T06:22:19.000Z",
    logo_url:
      "https://earlyjobs-company-logo.s3.ap-south-1.amazonaws.com/hgs.png-1720785139021",
    sector: "Services", // Customer experience and BPO
  },
  {
    id: "75c9db4e-cf26-467a-a7bc-8c76ff5b418b",
    name: "iEnergizer",
    registered_address:
      "Golden Group, Krishna Reddy Industrial Area Internal Rd, Kudlu Gate, Krishna Reddy Industrial Area, Hosapalaya, Muneshwara Nagar, Bengaluru, Karnataka 560068",
    address:
      "Golden Group, Krishna Reddy Industrial Area Internal Rd, Kudlu Gate, Krishna Reddy Industrial Area, Hosapalaya, Muneshwara Nagar, Bengaluru, Karnataka 560068",
    email: "amandeep.verma@ienergizer.com",
    phone: "9587509019",
    gst_no: "hjbuguguguyg",
    spoc_name: "Amandeep Verma",
    spoc_email: "amandeep.verma@ienergizer.com",
    spoc_phone: "9587509019",
    created_at: "2024-07-08T07:39:21.000Z",
    updated_at: "2024-07-08T07:39:21.000Z",
    logo_url: null,
    sector: "Services", // BPO and customer service
  },
  {
    id: "92118f27-33d9-4975-b177-9bdb89b60d0c",
    name: "Insight Customer Call Solutions LTD- ICCS",
    registered_address:
      "2nd Floor, Building 1, 17/4c, NH 44, KAS Officers Colony, Roopena Agrahara, Bommanahalli, Bengaluru, Karnataka 560068",
    address:
      "2nd Floor, Building 1, 17/4c, NH 44, KAS Officers Colony, Roopena Agrahara, Bommanahalli, Bengaluru, Karnataka 560068",
    email: "niranjan.mk@iccs.in",
    phone: "9597146562",
    gst_no: "ihuyguygyug",
    spoc_name: "Niranjan M K",
    spoc_email: "niranjan.mk@iccs.in",
    spoc_phone: "9597146562",
    created_at: "2024-07-08T01:03:36.000Z",
    updated_at: "2024-07-08T01:03:36.000Z",
    logo_url: null,
    sector: "Services", // Customer call solutions
  },
  {
    id: "ec8b6847-5e36-48a2-8c5d-fa80890375be",
    name: "Insuremile- MONEYMILE MARKETING SERVICE PRIVATE LIMITED",
    registered_address: "19, 4th C Cross, 5th Block, Bengaluru - 560095",
    address: "19, 4th C Cross, 5th Block, Bengaluru - 560095",
    email: "mallesh.reddy@insuremile.in",
    phone: "8971389714",
    gst_no: "29AAPCM2771A1ZD",
    spoc_name: "Mallesh Reddy",
    spoc_email: "mallesh.reddy@insuremile.in",
    spoc_phone: "8971389714",
    created_at: "2024-06-25T02:14:40.000Z",
    updated_at: "2024-06-25T02:14:40.000Z",
    logo_url: null,
    sector: "InsurTech", // Insurance marketing services
  },
  {
    id: "285038a0-eafa-4943-9657-92f584ffc89f",
    name: "Jindalx",
    registered_address:
      "JindalX, 28 , Shivaji Marg , Najafgarh Road,  Nearest metro station - Moti Nagar and Inderlok  Opp DLF Green Lands or near CTC mall  Moti Nagar, New Delhi- 110015",
    address:
      "JindalX, 28 , Shivaji Marg , Najafgarh Road,  Nearest metro station - Moti Nagar and Inderlok  Opp DLF Green Lands or near CTC mall  Moti Nagar, New Delhi- 110015",
    email: "karan.lamba@jindalx.com",
    phone: "9953065353",
    gst_no: "dvreververvreverve",
    spoc_name: "Karan Lamba",
    spoc_email: "karan.lamba@jindalx.com",
    spoc_phone: "9953065353",
    created_at: "2024-06-24T07:27:08.000Z",
    updated_at: "2024-07-12T01:59:24.000Z",
    logo_url:
      "https://earlyjobs-company-logo.s3.ap-south-1.amazonaws.com/jindl.png-1720769363876",
    sector: "Services", // Customer experience and outsourcing
  },
  {
    id: "786e184d-130a-4cc5-99d1-9f38cc97111b",
    name: "Justdial",
    registered_address:
      "29, Cunningham Rd, Vasanth Nagar, Bengaluru, Karnataka 560052",
    address: "29, Cunningham Rd, Vasanth Nagar, Bengaluru, Karnataka 560052",
    email: "kavita.sharma3@justdial.com",
    phone: "8826918197",
    gst_no: "ghfvghhgfghf",
    spoc_name: "Kavita Sharma",
    spoc_email: "kavita.sharma3@justdial.com",
    spoc_phone: "8826918197",
    created_at: "2024-07-03T08:24:23.000Z",
    updated_at: "2024-07-03T08:24:23.000Z",
    logo_url: null,
    sector: "Services", // Local search and business listing services
  },
  {
    id: "881f480c-85fb-4e11-a8b9-055fe544ae15",
    name: "Kanan International",
    registered_address:
      "2nd floor, No.580, Aswan Plaza, 20th Main Rd, Koramangala 8th Block, Koramangala, Bengaluru, Karnataka 560095",
    address:
      "2nd floor, No.580, Aswan Plaza, 20th Main Rd, Koramangala 8th Block, Koramangala, Bengaluru, Karnataka 560095",
    email: "saurrabh.g@kanan.co",
    phone: "9789644634",
    gst_no: "jihuihuihiuhiuh",
    spoc_name: "Saurabh Gandhi",
    spoc_email: "saurrabh.g@kanan.co",
    spoc_phone: "9789644634",
    created_at: "2024-06-29T08:17:24.000Z",
    updated_at: "2024-09-03T05:41:46.000Z",
    logo_url:
      "https://earlyjobs-company-logo.s3.ap-south-1.amazonaws.com/Untitled.jpg-1725361839246",
    sector: "EdTech", // International education and study abroad services
  },
  {
    id: "11dabbef-9586-4a8c-9e43-d2690fc847c9",
    name: "Microport Infotech Pvt Ltd",
    registered_address:
      "H V Cy Press, 96, Opposite Jain College,next to Polar bear, Diagonal Rd, Vishweshwarapura, Basavanagudi, Bengaluru, Karnataka 560004",
    address:
      "H V Cy Press, 96, Opposite Jain College,next to Polar bear, Diagonal Rd, Vishweshwarapura, Basavanagudi, Bengaluru, Karnataka 560004",
    email: "microportbangalore@gmail.com",
    phone: "9901422978",
    gst_no: "29AABCM8923C1ZH",
    spoc_name: "Ramkamal Ganguli",
    spoc_email: "microportbangalore@gmail.com",
    spoc_phone: "9901422978",
    created_at: "2025-02-07T01:14:29.000Z",
    updated_at: "2025-02-07T01:14:29.000Z",
    logo_url:
      "https://earlyjobs-company-logo.s3.ap-south-1.amazonaws.com/microport.png-1738910668964",
    sector: "IT/SaaS", // IT services and solutions
  },
  {
    id: "b9013daf-efb5-4d9e-b850-b579981706c7",
    name: "One Point One Solutions Limited- 1Point1",
    registered_address:
      "AKR Infinity, 3rd Floor, Sy No. 113, Hosur Rd, Krishna Reddy Industrial Area, 7th Mile, Muneshwara Nagar, Bengaluru, Karnataka 560068",
    address:
      "AKR Infinity, 3rd Floor, Sy No. 113, Hosur Rd, Krishna Reddy Industrial Area, 7th Mile, Muneshwara Nagar, Bengaluru, Karnataka 560068",
    email: "unmesha.pradhan@1point1.com",
    phone: "6366269294",
    gst_no: "jknjkkjn",
    spoc_name: "Unmesha Pradhan",
    spoc_email: "unmesha.pradhan@1point1.com",
    spoc_phone: "6366269294",
    created_at: "2024-07-08T07:41:54.000Z",
    updated_at: "2024-07-12T00:38:57.000Z",
    logo_url:
      "https://earlyjobs-company-logo.s3.ap-south-1.amazonaws.com/qpoint1.png-1720764537297",
    sector: "Services", // Customer experience and BPO
  },
  {
    id: "b93db4c5-a6ba-44dd-8bf7-cc95c095d9f0",
    name: "Picxele ( Floatex Marketing Solutions Pvt Ltd )",
    registered_address: "F-171, Ground Floor, Vikash Puri",
    address: "New Delhi 110018",
    email: "rishav@picxele.com",
    phone: "8759456371",
    gst_no: "07AADCF4532A1Z7",
    spoc_name: "Rishav Agarwal",
    spoc_email: "rishav@picxele.com",
    spoc_phone: "8759456371",
    created_at: "2025-04-06T12:07:06.000Z",
    updated_at: "2025-04-06T12:07:06.000Z",
    logo_url:
      "https://earlyjobs-company-logo.s3.ap-south-1.amazonaws.com/Picxele logo.png-1743961026586",
    sector: "Services", // Marketing solutions
  },
  {
    id: "6e0c2d60-7e82-40d5-a2e3-18d8cd3c1fdb",
    name: "Regency Creations Limited",
    registered_address:
      "C 69, Regency creation, Sector 58, Noida, 201307, Sector 58, noida, 201307",
    address:
      "C 69, Regency creation, Sector 58, Noida, 201307, Sector 58, noida, 201307",
    email: "recruit@earlyjobs.in",
    phone: "9999999997",
    gst_no: "hbuyyuuybyubuyb",
    spoc_name: "jnjn",
    spoc_email: "recruit@earlyjobs.in",
    spoc_phone: "9999999997",
    created_at: "2024-06-28T12:25:58.000Z",
    updated_at: "2024-06-28T12:25:58.000Z",
    logo_url: null,
    sector: "Services", // General services (not specified)
  },
  {
    id: "77b2089a-57e1-4933-a089-0ac096ffb2ff",
    name: "Shaadi.com",
    registered_address:
      "GROUND FLOOR, 2B II, FILM CENTRE BUILDING, 68,TARDEO ROAD, MUMBAI, Mumbai City, Maharashtra, 400034",
    address:
      "GROUND FLOOR, 2B II, FILM CENTRE BUILDING, 68,TARDEO ROAD, MUMBAI, Mumbai City, Maharashtra, 400034",
    email: "suresh.kumars@peopleinteractive.in",
    phone: "8248696389",
    gst_no: "27AAECS7931B1ZG",
    spoc_name: "Suresh",
    spoc_email: "suresh.kumars@peopleinteractive.in",
    spoc_phone: "8248696389",
    created_at: "2024-06-21T23:06:23.000Z",
    updated_at: "2024-07-12T00:26:33.000Z",
    logo_url:
      "https://earlyjobs-company-logo.s3.ap-south-1.amazonaws.com/shaadi.png-1720763792790",
    sector: "Services", // Matrimonial services
  },
  {
    id: "f2db4fb0-715b-45fc-a121-3febea76a059",
    name: "Squadstack",
    registered_address: "D-18 First & 2nd Floor, Sector -3 Noida UP 201301",
    address: "D-18 First & 2nd Floor, Sector -3 Noida UP 201301",
    email: "ajay.sam@squadstack.com",
    phone: "9899061119",
    gst_no: "09AAUCS6457N1Z6",
    spoc_name: "Ajay Sam",
    spoc_email: "ajay.sam@squadstack.com",
    spoc_phone: "9899061119",
    created_at: "2024-08-23T07:31:47.000Z",
    updated_at: "2024-08-23T07:43:24.000Z",
    logo_url:
      "https://earlyjobs-company-logo.s3.ap-south-1.amazonaws.com/squadstack logo.jpg-1724418810006",
    sector: "Services", // Telecalling and sales solutions
  },
  {
    id: "5f3cfee6-3722-4962-a5f2-964cc03cefdb",
    name: "Star Health and Allied Insurance Co. Ltd,",
    registered_address:
      "1, Valluvar Kottam High Road, Tirumurthy Nagar, Nungambakkam, Chennai - 600034",
    address:
      "1, Valluvar Kottam High Road, Tirumurthy Nagar, Nungambakkam, Chennai - 600034",
    email: "raghunandana.as@starhealth.in",
    phone: "9986341636",
    gst_no: "3673t6t76tt7et7t7t7",
    spoc_name: "Raghunandana A S",
    spoc_email: "raghunandana.as@starhealth.in",
    spoc_phone: "9986341636",
    created_at: "2024-06-22T04:13:53.000Z",
    updated_at: "2024-07-12T06:26:44.000Z",
    logo_url:
      "https://earlyjobs-company-logo.s3.ap-south-1.amazonaws.com/starhealth.png-1720785403552",
    sector: "InsurTech", // Health insurance
  },
  {
    id: "3274cd98-aed7-4f97-9493-a9a98c6788d8",
    name: "Surana & Associates, Jayanagar",
    registered_address:
      "#41, 3rd Floor, 6th C Main Road, 4th Block Jayanagar, Bengalurur, Karnataka - 560041",
    address:
      "#41, 3rd Floor, 6th C Main Road, 4th Block Jayanagar, Bengalurur, Karnataka - 560041",
    email: "lanley@suranaassociates.in",
    phone: "9972314306",
    gst_no: "hjbhuhugugyug",
    spoc_name: "Lanley",
    spoc_email: "lanley@suranaassociates.in",
    spoc_phone: "9972314306",
    created_at: "2024-06-29T08:26:08.000Z",
    updated_at: "2024-06-29T08:26:08.000Z",
    logo_url: null,
    sector: "Services", // Professional services (legal/finance)
  },
  {
    id: "af975624-f0cd-44ce-8241-c2f8a4103f31",
    name: "Taurus BPO Services India LLP",
    registered_address:
      "4TH AND 5TH FLOOR, TOWER A, Golden Enclave, HAL AIRPORT ROAD,  Bengaluru Urban, Karnataka, 560008",
    address:
      "4TH AND 5TH FLOOR, TOWER A, Golden Enclave, HAL AIRPORT ROAD,  Bengaluru Urban, Karnataka, 560008",
    email: "gangadharmadhavan@taurusbpo.com",
    phone: "8722443400",
    gst_no: "29AAKFT0416B1ZH",
    spoc_name: "Gangadhar Madhavan",
    spoc_email: "gangadharmadhavan@taurusbpo.com",
    spoc_phone: "8722443400",
    created_at: "2024-06-21T23:31:51.000Z",
    updated_at: "2024-07-12T02:12:07.000Z",
    logo_url:
      "https://earlyjobs-company-logo.s3.ap-south-1.amazonaws.com/taurus.png-1720770126957",
    sector: "Services", // BPO services
  },
  {
    id: "98eccd49-794e-4b22-8c93-67ff39ad5790",
    name: "Teleperformance Global Services Private Limited",
    registered_address:
      "No 31, Next to Vidyaniketan School, Kempapura Hebbal, Bangalore - 560024 ,Karnataka, India",
    address:
      "No 31, Next to Vidyaniketan School, Kempapura Hebbal, Bangalore - 560024 ,Karnataka, India",
    email: "OCCBangalore.Hiring@axisbank.com",
    phone: "7559042358",
    gst_no: "29AABCV2572L1ZW",
    spoc_name: "Pavan Kumar",
    spoc_email: "OCCBangalore.Hiring@axisbank.com",
    spoc_phone: "7559042358",
    created_at: "2024-06-22T00:04:19.000Z",
    updated_at: "2024-07-12T01:54:49.000Z",
    logo_url:
      "https://earlyjobs-company-logo.s3.ap-south-1.amazonaws.com/tp.png-1720769088752",
    sector: "Services", // Customer experience and BPO
  },
  {
    id: "67244d72-568d-4045-96d6-e8d6452f0be7",
    name: "test company",
    registered_address: "test address",
    address: "test address",
    email: "test@mail.com",
    phone: "7744110022",
    gst_no: "test ",
    spoc_name: "test",
    spoc_email: "test@mail.com",
    spoc_phone: "7744110022",
    created_at: "2024-11-17T06:46:30.000Z",
    updated_at: "2024-11-17T06:46:30.000Z",
    logo_url:
      "https://earlyjobs-company-logo.s3.ap-south-1.amazonaws.com/default-avatar-photo-placeholder-profile-icon-vector.jpg-1731845793661",
    sector: "Services", // Generic test company (default to Services)
  },
  {
    id: "92ee5a91-d11d-4dc6-8fac-d95cf8d6a6a3",
    name: "TopGrep Tech Pvt Ltd",
    registered_address:
      "ground floor, 5th Block, 99D, 2nd A Cross Rd, KHB Colony, 5th Block, Koramangala, Bengaluru, Karnataka 560095",
    address:
      "ground floor, 5th Block, 99D, 2nd A Cross Rd, KHB Colony, 5th Block, Koramangala, Bengaluru, Karnataka 560095",
    email: "business@topgrep.com",
    phone: "9449031578",
    gst_no: "29AAJCT6596L1ZA",
    spoc_name: "Dr. Reine De Reanzi",
    spoc_email: "support@topgrep.com",
    spoc_phone: "9449031578",
    created_at: "2024-06-22T01:50:54.000Z",
    updated_at: "2024-06-22T01:50:54.000Z",
    logo_url: null,
    sector: "IT/SaaS", // Tech solutions
  },
  {
    id: "af7063a1-2317-42c3-bcc2-2831a473b222",
    name: "Victa Earlyajobs Technologies Pvt. Ltd.",
    registered_address:
      "HustleHub 53, 5th Cross Rd, near Sony World Signal, 4th Block, Koramangala, Bengaluru, Karnataka 560034",
    address:
      "HustleHub 53, 5th Cross Rd, near Sony World Signal, 4th Block, Koramangala, Bengaluru, Karnataka 560034",
    email: "info@earlyjobs.in",
    phone: "8217527926",
    gst_no: "NA",
    spoc_name: "Asish Chakraborty",
    spoc_email: "asish@earlyjobs.in",
    spoc_phone: "9900606764",
    created_at: "2025-03-06T02:24:22.000Z",
    updated_at: "2025-03-06T02:24:22.000Z",
    logo_url:
      "https://earlyjobs-company-logo.s3.ap-south-1.amazonaws.com/Earlyjobs Logo.png-1741247662565",
    sector: "HRTech", // AI-powered hiring platform
  },
];

const Clientele = () => {
  const [active, setActive] = useState("All");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    spocname: "",
    mobile: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmissionStatus(null);

    // Basic validation
    if (!formData.name || !formData.email || !formData.message) {
      setSubmissionStatus("error");
      setIsSubmitting(false);
      return;
    }

    emailjs
      .send(
        "service_ktesz0d",
        "template_8rhggt6",
        {
          from_name: formData.name,
          spoc: formData.spocname,
          email: formData.email,
          company: formData.company,
          message: formData.message || "No message provided",
          mobile: formData.mobile,
        },
        "kQToKIaSy6vQPRti5"
      )
      .then(
        () => {
          setSubmissionStatus("success");
          setIsSubmitting(false);
          setFormData({
            name: "",
            email: "",
            company: "",
            message: "",
            spocname: "",
            mobile: "",
          });
          setTimeout(() => {
            setIsPopupOpen(false);
            setSubmissionStatus(null);
          }, 2000);
        },
        () => {
          setSubmissionStatus("error");
          setIsSubmitting(false);
        }
      );
  };

  const filteredCompanies =
    active === "All" ? companies : companies.filter((c) => c.sector === active);
  useEffect(() => {
    // Scroll to top when the component mounts
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="clientele-page">
      {/* Section Title */}
      <section className="clientele-section-title">
        <h1 className="clientele-title">Our Clientele</h1>
        <div className="clientele-title-bar" />
        <p className="clientele-desc">
          EarlyJobs AI powers hiring for India's best brands.
        </p>
      </section>

      {/* Sticky Filter Bar */}
      <div className="clientele-filterbar">
        <CompanyFilterBar
          filters={filters}
          active={active}
          onChange={setActive}
        />
      </div>

      {/* Company Grid */}
      <main className="clientele-main">
        <div className="clientele-grid">
          {filteredCompanies.map((company) => (
            <CompanyCard
              company={company}
              key={company.id}
              location={company.address}
            />
          ))}
        </div>
        {filteredCompanies.length === 0 && (
          <div className="clientele-empty">
            No companies found for selected sector.
          </div>
        )}
      </main>

      {/* CTA Banner */}
      <ClienteleCTA setIsPopupOpen={setIsPopupOpen} />
      {isPopupOpen && (
        <div className="clientele-cta__popup-overlay">
          <div className="clientele-cta__popup">
            <button
              className="clientele-cta__popup-close"
              onClick={() => setIsPopupOpen(false)}
            >
              &times;
            </button>
            <h3 className="clientele-cta__popup-heading">Work With Us</h3>
            <form onSubmit={handleSubmit} className="clientele-cta__form">
              <div className="clientele-cta__form-group">
                <label htmlFor="name">Name *</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="clientele-cta__form-group">
                <label htmlFor="email">Email *</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div className="clientele-cta__form-group">
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                />
              </div>

              <div className="clientele-cta__form-group">
                <label htmlFor="spocname">SPOC (Contact Person)</label>
                <input
                  type="text"
                  id="spocname"
                  name="spocname"
                  value={formData.spocname}
                  onChange={handleInputChange}
                />
              </div>

              <div className="clientele-cta__form-group">
                <label htmlFor="mobile">Mobile</label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleInputChange}
                />
              </div>

              <div className="clientele-cta__form-group">
                <label htmlFor="message">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button
                type="submit"
                className="clientele-cta__form-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>

              {submissionStatus === "success" && (
                <p className="clientele-cta__form-success">
                  Thank you! We'll get back to you soon.
                </p>
              )}
              {submissionStatus === "error" && (
                <p className="clientele-cta__form-error">
                  Error submitting the form. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Clientele;

const { v4: uuidv4 } = require("uuid");
const newsData = [
  {
    id: uuidv4(),
    title: "Ease of doing business via tax reforms to continue: Arun Jaitley",
    source: "The Economic Times",
    date: "6 March 2019",
    description:
      "The finance minister asked Indian industry to comply with recent GST Council recommendations, emphasizing continued tax reforms.",
    url: "https://economictimes.indiatimes.com/news/economy/policy/ease-of-doing-business-via-tax-reforms-to-continue-arun-jaitley/articleshow/68278996.cms",
  },
  {
    id: uuidv4(),
    title: "MSME reforms to boost small businesses",
    source: "Business Standard",
    date: "10 July 2020",
    description:
      "The government announced a new MSME policy to simplify registrations and reduce compliance burden.",
    url: "https://www.business-standard.com/article/economy-policy/msme-reforms-boost-120071000123_1.html",
  },
  {
    id: uuidv4(),
    title: "Ease of doing business via tax reforms to continue: Arun Jaitley",
    source: "The Economic Times",
    date: "6 March 2019",
    description:
      "The finance minister asked Indian industry to comply with recent GST Council recommendations, emphasizing continued tax reforms.",
    url: "https://economictimes.indiatimes.com/news/economy/policy/ease-of-doing-business-via-tax-reforms-to-continue-arun-jaitley/articleshow/68278996.cms",
  },
  {
    id: uuidv4(),
    title: "Cross-border insolvency law changes to boost ease of doing business in India",
    source: "International Business Times",
    date: "5 March 2019",
    description:
      "IBC reforms modeled on international best practices are expected to help foreign partnerships and investments.",
    url: " https://www.ibtimes.co.in/cross-border-insolvency-law-changes-boost-ease-doing-business-india-793219",
  },
  {
    id: uuidv4(),
    title: "Ease of Doing Business: State keen on retaining top slot",
    source: "The Hindu",
    date: "21 February 2019",
    description:
      "Over 340 procedures were simplified to improve business conditions across departments, says the Industries Commissioner.",
    url: " https://www.thehindu.com/news/cities/Vijayawada/ease-of-doing-business-state-keen-on-retaining-top-slot/article26327667.ece",
  },
  {
    id: uuidv4(),
    title: "Kerala launches IBPMS for Ease of Doing Business",
    source: "Business Today",
    date: "12 February 2019",
    description:
      "The new system aims to provide faster clearances and permits within 30 days of application.",
    url: "https://www.businesstoday.in/top-story/kerala-launches-ibpms-for-ease-of-doing-business/story/318493.html",
  },
  {
    id: uuidv4(),
      title: "New Ease of Doing Business ranking coming: Govt begins this year's ranking process for states",
      source: "Financial Express",
      date: "6 February 2019",
      description:
        "The Department of Industrial Policy and Promotion (DIPP) has initiated the process for ranking states on ease of doing business.",
      url: "https://www.financialexpress.com/india-news/new-ease-of-doing-business-ranking-coming-govt-begins-this-years-ranking-process-for-states/1478879/",
  }
];

module.exports = newsData;

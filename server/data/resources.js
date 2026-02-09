// import { v4 as uuidv4 } from "uuid";
const { v4: uuidv4 } = require("uuid");



const resources = [
 
  {
    id: uuidv4(),
    category: "research",
    title: "Ease Of Doing Business in India: The User’s Perspective",
    excerpt:
      "This Paper aims to find out the actual state of the ease of doing business in the country from the stakeholder’s point of view.",
    content: `
    This Paper aims to find out the actual state of the ease of doing business in the country from the stakeholder’s point of view. It tries to find out has the life of a businessman in regard of doing business become easy?. So the paper discusses the actual performance of the state machine in correspondence to processes that determine the state of ease in doing business in the country Also it tries to find out the efficacy of the government in the current state with regard of EODB in India. Following are the Objectives: 

    Cross verifying the change in business environment.
    Finding out if the current state has actually become easy for business.
    Documenting Experiences of entrepreneurs with regard to easiness or difficulty in running a business.
    Finding specific areas of difficulty with regard to ‘Setting up and running a business based on Entrepreneur’s insight and coming up with recommendations accordingly.
    `,
    pdf: "/downloads/eodb-user-perspective.pdf",
    date: "2017",
    source: "Centre for Civil Society",
  },
  {
    id: uuidv4(),
    category: "research",
    title: "Improving Contract Enforcement Rank for India",
    excerpt:
      `By Prashant Narang, Manager, iJustice and Priyaveer Singh, Student, RGNUL Patiala:

    The World Bank’s Doing Business project ranks business regulatory frameworks across 189 economies.  The project objectively measures the regulations applying to the domestic small and medium-size companies at entry, operational and exit stages.`,
    content: `
      By Prashant Narang, Manager, iJustice and Priyaveer Singh, Student, RGNUL Patiala 

    The World Bank’s Doing Business project ranks business regulatory frameworks across 189 economies.  The project objectively measures the regulations applying to the domestic small and medium-size companies at entry, operational and exit stages.

    The latest report on Ease of Doing Business 2015 ranked India for doing business as 142 out of 189 countries, which is a two-step drop from the last year’s footing. Furthermore, being stagnant at its last year ranking, enforcing contracts in India is ranked as low as 186 out of 189 countries. There is an urgency to focus on improving the business environment and arrest the decline in relative performance against various determinants of investment attractiveness. Having such lower figures pose great challenge for India to show its credibility and suitability as a host country for the foreign investors and is detrimental to the interests of an economy growing so rapidly as India.
    `,
    pdf: "/downloads/improving-contract-enforcement.pdf",
    date: "2015",
    source: "Centre for Civil Society",
  },
  {
    id: uuidv4(),
    category: "research",
    title: "Study of Micro, Small and Medium Enterprises",
    excerpt: `Princy Saini, CCS working paper no 319`,
    content: `Princy Saini, CCS working paper no 319

    Finance and government regulations are a major obstacle in the growth of micro, small and medium enterprises. Not only do they discourage aspiring entrepreneurs but also  substantially hold back the growth of existing firms. Other factors slowing down growth arise largely due to lack of finance. Lack of infrastructure and competition are the next big problems followed by macroeconomic Instability, managerial incompetence, lack of research and development, corruption and lack of information.`,
    pdf: "/downloads/study-of-msme.pdf",
    date: "2008",
    source: "Centre for Civil Society",
  },
  {
    id: uuidv4(),
    category: "research",
    title: "Documenting state level restrictions in top 10 bamboo growing states in India",
    excerpt: `Vrinda Aggarwal, CCS working paper no 329.`,
    content: `Vrinda Aggarwal, CCS working paper no 329.
    A law defining bamboo as a tree and not as grass has stunted the growth of bamboo industry in the country. Further, the industry is stunted by different and contradictory regulations across major states. The near zero growth of the industry is causing heaving losses to the exchequer in revenue collection.`,
    pdf: "/downloads/documenting-state-level-restrictions-bamboo.pdf",
    date: "2010",
    source: "Centre for Civil Society",
  },
  {
    id: uuidv4(),
    category: "research",
    title: "Regulatory Barriers for Micro Enterprises",
    excerpt: `Priyanshi Gupta, CCS working paper no 320`,
    content:`Priyanshi Gupta, CCS working paper no 320

    The contribution of the Micro, Small and Medium Enterprises (MSMEs) to the India's growth has been declining. This is because the registration and licensing process are greatly hampered by the inefficient channels. Multiple departments have multiple requirements and there is a lack of a streamlined process. Wide information gaps exist with entrepreneurs unaware of the procedures for registration or licensing, the requirement of various licenses, applicability of different laws, or the benefits associated with MSME registration. Outdated legislation with respect to the insolvency laws and corruption at every stage of entry and operation are also major barriers.`,
    pdf: "/downloads/regulatory-barriers-micro-enterprises.pdf",
    date: "2008",
    source: "Centre for Civil Society",
  },
  {
    id: uuidv4(),
    category: "research",
    title: "The Goan Feni Industry: Challenges",
    excerpt: `Raunaq Sahu, CCS Working Paper No. 261.`,
    content: `Raunaq Sahu, CCS Working Paper No. 261

    Obtaining a license for manufacturing cashew feni is a long-winded and complicated process. At different stages, manufacturers must meet different sets of arduous licensing procedures. The Goan feni-making industry is illustrative of how measures introduced by the government to improve the state of affairs in a particular sector result in damage to the sector with smaller manufacturers being forced to exit the sector.`,
    pdf: "/downloads/goan-feni-industry-challenges.pdf",
    date: "2005",
    source: "Centre for Civil Society",
  },
  {
    id: uuidv4(),
    category: "research",
    title: "Interplay Between Corruption and Economic Freedom",
    excerpt: `Aditi Kumar, CCS Working Paper No. 254`,
    content: `Aditi Kumar, CCS Working Paper No. 254

    The relation between corruption and economic freedom may intuitively appear negative. But empirical research has shown that the relation is non-linear. This is because economics per se can never create opportunities for corruption. It is the process of bringing about economic freedom that may create opportunities for corruption which is the result of violation of regulations. The main flaw is lies in the discretionary powers granted to the politicians and bureaucrats at the time of the process of economic freedom i.e. at the time of formulating regulations for business.`,
    pdf: "/downloads/interplay-between-corruption-economic-freedom.pdf",
    date: "2004",
    source: "Centre for Civil Society",
  },
  {
    id: uuidv4(),
    category: "research",
    title: "Different Ideas for Licensing Street Vendors Especially in Indian Old Cities",
    excerpt: `Abhigna AS, CCS Working Paper No. 308`,
    content: `Abhigna AS, CCS Working Paper No. 235

    Street vendors are not a part of the formal economy because of a biased attitude of the State and its functionaries. Street vendors offer valuable services and generate great revenue that can be taxable. A practical model of licensing is necessary. Though this is the pattern across South Asia, there are a few examples of initiatives both by the State and street vendors, that India can positively borrow from.`,
    pdf: "/downloads/different-ideas-licensing-street-vendors.pdf",
    date: "2007",
    source: "Centre for Civil Society",
  },
  {
    id: uuidv4(),
    category: "research",
    title: "Agricultural Produce Marketing",
    excerpt: "By Ragupathy Venkatachalam",
    content: `By Ragupathy Venkatachalam

    Agriculture Produce Marketing Committees (APMCs) in Tamil Nadu intervene in the day to day functioning of the market activities and are counter productive to the intended goals. They create informal markets and it is important to check redundant policies that control the flow of goods and foster the practice of bribery at check-posts`,
    pdf: "/downloads/agricultural-produce-marketing.pdf",
    date: "2004",
    source: "Centre for Civil Society",
  },
  {
    id: uuidv4(),
    category: "research",
    title: "Talking Shop: A Study of Shop Licensing Procedures In Mumbai",
    excerpt: `By Viren Falcao`,
    content: `By Viren Falcao

    Frivolous regulations co-existing in multiplicity result in the need for entrepreneurs to cut through several layers of red tape and fulfil stringent requirements to obtain a license. The exact purpose of these frivolous regulations is unknown and cause a result in business efficiency and corruption.  Short term solutions include computerisation of procedures and establishing a One Window scheme.`,
    pdf: "/downloads/talking-shop-study-shop-licensing-mumbai.pdf",
    date: "2004",
    source: "Centre for Civil Society",
  },
  {
    id: uuidv4(),
    category: "research",
    title:"Shop Licensing In Bangalore: The Licence Raj!",
    excerpt: `By Nandini Hampole And Naveen K`,
    content: `By Nandini Hampole And Naveen K

    Till 2003, opening a shop in Bangalore was controlled by a centralised, unending process. However, after 2003, the Simplified Trade Licence Procedure was introduced to liberalise the trade licence procedure and one of the aims in liberalising was to avoid middlemen and curtail the wrath of licensing inspectors. While the simplified trade licence procedure has reduced the hassle for a trader, the key to easing the process of starting a shop lies in clamping down on the number of inspectors from various departments`,
    pdf: "/downloads/shop-licensing-bangalore-licence-raj.pdf",
    date: "2004",
    source: "Centre for Civil Society",
  },
  {
    id: uuidv4(),
    category: "research",
    title: "Setting Up Shop In Noida",
    excerpt: `By Purnima Gandhi And Pravesh Saha`,
    content: `By Purnima Gandhi And Pravesh Saha

    The various procedures and licenses needed to set up a shop in Noida is costly and time consuming. Various government departments such as labour, health, sales tax, electricity, water and weights and measures must be dealt with. However, awareness regarding these rules and regulations is very low as there is no access to documents and orders.  The umpteen licenses and registrations provide scope for unaccountable illegalities and the purpose behind them is incomprehensible.`,
    pdf: "/downloads/setting-up-shop-noida.pdf",
    date: "2004",
    source: "Centre for Civil Society",
  },
  {
    id: uuidv4(),
    category: "research",
    title: "Railway coolies in Delhi",
    excerpt:`Kumar Gaurav & Mayank Singhal, CCS Working Paper No. 63 (Licenses & Livelihood)`,
    content: `Kumar Gaurav & Mayank Singhal, CCS Working Paper No. 63 (Licenses & Livelihood)

    The government controls everything from the issuing of new licenses to the selection procedure of coolies. The process, instead of being simple is marked by the perpetuity characteristic of a porter’s license, huge premium needed for a porter’s license, arbitrary rules regarding transfer of licenses and illegal practices. Political connections and bribery are needed for even for entry into the profession of railway coolies.`,
    pdf: "/downloads/setting-up-shop-noida.pdf",

  },
  {
    id: uuidv4(),
    category: "research",
    title: "Directorate of Weights & Measures: Certifies or Crucifies?",
    excerpt: `Neha Swetambari, CCS Working Paper No.21 (Governance)`,
    content: `Neha Swetambari, CCS Working Paper No.21 (Governance)

    The Directorate of Weights and Measures has failed to achieve its main purpose of protecting the consumers rights to accurate weights and measures because of its procedures of licensing, certification and inspection. Applicants are harassed through these legal procedures and thus prefer to be dishonest and produce fake bills. The certification of weights and measures by private bodies would do a better job of protecting consumer's rights.`,

  },
  {
    id: uuidv4(),
    category: "policy-briefs",
    title: "Offer of Judgement Rule",
    excerpt: `“Offer of Judgment” rule is a demand-side solution that has long term scope for tackling the problem.`,
    content: `"Offer of Judgment” rule is a demand-side solution that has long term scope for tackling the problem. Coupled with an incentive-based approach, the idea is to create incentives for parties to settle the dispute. The rule is intended to provide an incentive for parties to settle and expedite the litigation process by taxing a plaintiff with the defendant's post-offer costs if the plaintiff refuses an offer and does not improve on it at trial.`,
    pdf: "/downloads/offer-of-judgment-brief.pdf",
    date: "2020",
    source: "Centre for Civil Society",
  },
  {
    id: uuidv4(),
    category: "policy-briefs",
    title: "Improving Contract Enforceability in India 2.0",
    excerpt: `This brief has recommendations and comments on the Contract Enforcement components of Business Reform Action Plan 2015 and 2016.`,
    content: `This brief has recommendations and comments on the Contract Enforcement components of Business Reform Action Plan 2015 and 2016.`,
    pdf: "/downloads/improving-contract-enforceability-brief.pdf",
    date: "2016",
    source: "Centre for Civil Society",
  },
  {
    id: uuidv4(),
    category: "policy-briefs",
    title: "What should Maharashtra do to be #1 on Ease of Doing Business in India?",
    excerpt: `The Assessment of State Implementation of Business Reforms, conducted by the World Bank in September 2015 ranked Maharashtra at rank 8 with an overall implementation score of 49.43%.`,
    content: `The Assessment of State Implementation of Business Reforms, conducted by the World Bank in September 2015 ranked Maharashtra at rank 8 with an overall implementation score of 49.43%. This report acknowledged several good practices being implemented in Maharashtra to facilitate ease of doing business. This Report analyses the reform measures taken and best practices implemented by the states during the period between January 2015 and July 2015.`,
    pdf: "/downloads/reforming-msme-definition-brief.pdf",
    date: "2021",
    source: "Centre for Civil Society",
  },
  {
    id: uuidv4(),
    category: "policy-briefs",
    title: "What can Punjab do to be #1 on Ease of Doing Business in India?",
    excerpt: `The Assessment of State Implementation of Business Reforms, conducted by the World Bank in September 2015 (“State Assessment Report”)1 ranked Punjab as the best performing state on the parameter of setting up a business with a score of 81.48% against national average of 31.91%.`,
    content: `The Assessment of State Implementation of Business Reforms, conducted by the World Bank in September 2015 (“State Assessment Report”)1 ranked Punjab as the best performing state on the parameter of setting up a business with a score of 81.48% against national average of 31.91%.`,
    pdf: "/downloads/what-should-maharashtra-do-brief.pdf",
    date: "2021",
    source: "Centre for Civil Society",
  },
  {
    id: uuidv4(),
    category: "policy-briefs",
    title: "Recommendations to ease the regulatory environment for Micro, Small and Medium size enterprises and to expand their role in creating productive employment and grassroot economic growth",
    excerpt: `In this brief note, we list the 12 main policy reforms that need to be implemented in order to allow ease of doing business for MSMEs.`,
    content: `In this brief note, we list the 12 main policy reforms that need to be implemented in order to allow ease of doing business for MSMEs. These suggestions include changing the definition of the various enterprises on the basis of revenue,  setting up grievance redressal cells and entrepreneur call centres, consolidating the multitude of taxes and setting up commercial courts.`,
    pdf: "/downloads/reforming-msme-definition-brief.pdf",
    date: "2020",
    source: "Centre for Civil Society",
  },
  {
    id: uuidv4(),
    category: "policy-briefs",
    title: "Incentivising Registration of MSMEs",
    excerpt: `This policy brief proposes a reform toincentivise the registration of MSMEs without facilitating further red tapism and in order to prevent the running of a parallel black market economy.`,
    content: `This policy brief proposes a reform toincentivise the registration of MSMEs without facilitating further red tapism and in order to prevent the running of a parallel black market economy.`,
    pdf: "/downloads/what-should-andhra-pradesh-do-brief.pdf",
    date: "2021",
    source: "Centre for Civil Society",
  },
  {
    id: uuidv4(),
    category: "policy-briefs",
    title: "Initiatives of Rajasthan Government for Ease of Doing Business",
    excerpt: `Rajasthan has implemented a single window system, allows for online submission and clearances to the Pollution Control Board, operates an e-government initiative and has single ID for all state commercial taxes.`,
    content: `Rajasthan has implemented a single window system, allows for online submission and clearances to the Pollution Control Board, operates an e-government initiative and has single ID for all state commercial taxes.`,
    pdf: "/downloads/incentivising-registration-msmes-brief.pdf",
    date: "2021",
    source: "Centre for Civil Society",
  },
  {
    id: uuidv4(),
    category: "policy-briefs",
    title: "Decongesting Cheque Bounce Cases",
    excerpt: `Section 138 of the Negotiable Instruments Act has been identified as one of the biggest bottlenecks clogging the disposal of cases in India. It has failed to deter cases of dishonour of cheques due to the sheer size of litigation faced by the courts. We recommend radical reforms to deal with the huge arrears of cheque bounce cases.`,
    content: `Section 138 of the Negotiable Instruments Act has been identified as one of the biggest bottlenecks clogging the disposal of cases in India. It has failed to deter cases of dishonour of cheques due to the sheer size of litigation faced by the courts. We recommend radical reforms to deal with the huge arrears of cheque bounce cases.`,
    pdf: "/downloads/initiatives-rajasthan-government-brief.pdf",
    date: "2021",
    source: "Centre for Civil Society",
  },
  {
    id: uuidv4(),
    category: "policy-briefs",
    title: "Pecuniary Jurisdiction : The Delhi High Court (Amendment) Bill, 2014",
    excerpt: `The Delhi High Court (Amendment) Bill, 2014 seeks to reduce the workload of the Delhi High Court by increasing the pecuniary jurisdiction of the district courts from INR 20 lakh to INR 2 crore.`,
    content: `The Delhi High Court (Amendment) Bill, 2014 seeks to reduce the workload of the Delhi High Court by increasing the pecuniary jurisdiction of the district courts from INR 20 lakh to INR 2 crore. An increase in pecuniary jurisdiction offers litigants greater access to courts with a speedy and less costly disposal of cases.  We recommend uniformity in the pecuniary jurisdiction of all high courts in the country.`,
    pdf: "/downloads/decongesting-cheque-bounce-cases-brief.pdf",
    date: "2021",
    source: "Centre for Civil Society",
  },
  {
    id: uuidv4(),
    category: "policy-briefs",
    title: "Amending the Definition of Micro, Small and Medium Enterprises",
    excerpt: `The current definition of MSMEs is based on the size of investment in plant, machinery and equipment, allowing leeway for manipulation and different interpretations.  Thus there is a need for basing the definition on annual turnover to bring more uniformity and transparency.`,
    content: `The current definition of MSMEs is based on the size of investment in plant, machinery and equipment, allowing leeway for manipulation and different interpretations.  Thus there is a need for basing the definition on annual turnover to bring more uniformity and transparency.`,
    pdf: "/downloads/pecuniary-jurisdiction-delhi-high-court-brief.pdf",
    date: "2021",
    source: "Centre for Civil Society",
  },
  {
    id: uuidv4(),
    category: "policy-briefs",
    title: "Entrepreneur Resource Centre",
    excerpt: `Lack of is a major barrier for  potential entrepreneurs, especially those from  disadvantaged socioeconomic groups or minorities. This brief argues for an Entrepreneur Resource Centre and outlines the functions it must fulfil in order to meet its objective.`,
    content: `Lack of is a major barrier for  potential entrepreneurs, especially those from  disadvantaged socioeconomic groups or minorities. This brief argues for an Entrepreneur Resource Centre and outlines the functions it must fulfil in order to meet its objective.`,
    pdf: "/downloads/what-should-andhra-pradesh-do-brief.pdf",
    date: "2021",
    source: "Centre for Civil Society",
  },
  {
    id: uuidv4(),
    category: "policy-briefs",
    title: "Key Recommendations for Promotion and Facilitation of MSMEs",
    excerpt: `A roundtable was organised at CCS in order to gather solutions to the problem of compliance with regulatory norms that govern starting, operating and exiting a business. The objective of the roundtable was to envision a framework that allows for increased registration of enterprises with Ministry of Micro, Small and Medium Enterprises.`,
    content: `A roundtable was organised at CCS in order to gather solutions to the problem of compliance with regulatory norms that govern starting, operating and exiting a business. The objective of the roundtable was to envision a framework that allows for increased registration of enterprises with Ministry of Micro, Small and Medium Enterprises.`,
    pdf: "/downloads/what-should-andhra-pradesh-do-brief.pdf",
    date: "2021",
    source: "Centre for Civil Society",
  },
  {
    id: uuidv4(),
    category: "policy-briefs",
    title: "What should Andhra Pradesh do to be #1 on Ease of Doing Business in India?",
    excerpt: `The Assessment of State Implementation of Business Reforms, conducted by the World Bank in September 2015 (“State Assessment Report”) ranked Andhra Pradesh at rank 2 with an overall implementation score of 66.07%.`,
    content: `The Assessment of State Implementation of Business Reforms, conducted by the World Bank in September 2015 (“State Assessment Report”) ranked Andhra Pradesh at rank 2 with an overall implementation score of 66.07%. This report acknowledged several good practices being implemented in Andhra Pradesh to facilitate ease of doing business. This Report analyses the reform measures taken and best practices implemented by the states during the period between January 2015 and July 2015.`,
    pdf: "/downloads/what-should-andhra-pradesh-do-brief.pdf",
    date: "2021",
    source: "Centre for Civil Society",
  },
  {
    id: uuidv4(),
    category: "policy-briefs",
    title: "Rajasthan Labour Law Reforms",
    excerpt: `This policy brief outlines possible State amendments to the Industrial Disputes Act, 1947; Factory Act, 1948; Contract labour Act, 1970 and Apprenticeship Act 1961.`,
    content: `This policy brief outlines possible State amendments to the Industrial Disputes Act, 1947; Factory Act, 1948; Contract labour Act, 1970 and Apprenticeship Act 1961.`,
    pdf: "/downloads/single-window-system-brief.pdf",
    date: "2021",
    source: "Centre for Civil Society",
  },
  {
    id: uuidv4(),
    category: "policy-briefs",
    title: "Single Window Clearance for Operating a Business",
    excerpt: `Policy reforms are proposed for the implementation of a single window clearance system in the three matters of starting a business, compliance with taxation regulations and consolidating labour related requirements.`,
    content: `Policy reforms are proposed for the implementation of a single window clearance system in the three matters of starting a business, compliance with taxation regulations and consolidating labour related requirements.`,
    pdf: "/downloads/rajasthan-labour-law-reforms-brief.pdf",
    date: "2021",
    source: "Centre for Civil Society",
  },
  {
    id: uuidv4(),
    category: "policy-briefs",
    title: "Contract enforcement in India",
    excerpt: `This 8 point action plan seeks to create a framework for time and cost effective contract enforcement. India can cut down the number of procedures by 10 digits by implementing simple technological changes such as online service of notice and pro-actively supplying a copy of the judgment online.`,
    content: `This 8 point action plan seeks to create a framework for time and cost effective contract enforcement. India can cut down the number of procedures by 10 digits by implementing simple technological changes such as online service of notice and pro-actively supplying a copy of the judgment online.`,
    pdf: "/downloads/reforming-msme-definition-brief.pdf",
    date: "2020",
    source: "Centre for Civil Society",
  },
  {
    id: uuidv4(),
    category: "policy-briefs",
    title: "Key Findings about MSME Sector",
    excerpt: `Against the post-New Industrial Policy (1991) growth witnessed in large-scale industries, a corresponding boom in the small and mid-sized domestic industry has been conspicuously absent. CCS has conducted research to understand the the causes for the same.`,
    content: `Against the post-New Industrial Policy (1991) growth witnessed in large-scale industries, a corresponding boom in the small and mid-sized domestic industry has been conspicuously absent. CCS has conducted research to understand the the causes for the same. The study hypotheses—and seeks to verify whether and the extent to which—this handicap of MSMEs is attributable to the regulatory norms applicable to them.`,
    pdf: "/downloads/best-practices-eodb-indian-states-brief.pdf",
    date: "2021",
    source: "Centre for Civil Society",
  },
  {
    id: uuidv4(),
    category: "policy-briefs",
    title: "Model Rules under the Street Vendors (Protection of Livelihood and Regulation of Street Vending) Act 2014",
    excerpt: `These rules have been drafted with the aim to ensure effective implementation of the Street Vendors Act 2014, keeping in mind the goal of ensuring livelihood freedom to vendors and hawkers and adherence to the rule of law and the principles of natural justice.`,
    content: `These rules have been drafted with the aim to ensure effective implementation of the Street Vendors Act 2014, keeping in mind the goal of ensuring livelihood freedom to vendors and hawkers and adherence to the rule of law and the principles of natural justice. These rules have been drafted after deliberation with various stakeholders, including public interest lawyers, street vendor organisations, students and other public spirited persons.`,
    pdf: "/downloads/best-practices-eodb-indian-states-brief.pdf",
    date: "2021",
    source: "Centre for Civil Society",
  },
  {
    id: uuidv4(),
    category: "policy-briefs",
    title: "Proposed amendment in Delhi Street Vendors Rules, 2014",
    excerpt: `The Government of the National Capital Territory of Delhi published the Delhi Street Vendors (Protection of Livelihood and Regulation of Street Vending) Rules, 2014 in the Delhi Gazette on 26th of November, 2014 under the provisions of the Street Vendors (Protection of Livelihood and Regulation of Street Vending) Act, 2014.`,
    content: `The Government of the National Capital Territory of Delhi published the Delhi Street Vendors (Protection of Livelihood and Regulation of Street Vending) Rules, 2014 in the Delhi Gazette on 26th of November, 2014 under the provisions of the Street Vendors (Protection of Livelihood and Regulation of Street Vending) Act, 2014. This brief identifies the six major flaws in the Act and proposes 7 amendments to the Rules.`,
    pdf: "/downloads/best-practices-eodb-indian-states-brief.pdf",
    date: "2021",
    source: "Centre for Civil Society",
  },
  {
    id: uuidv4(),
    category: "publications",
    title: "Researching Reality 2025 – Policy Research Residency Program by Centre for Civil Society",
    excerpt: `The compendium Trust-Based Governance: Decriminalisation for Development" emerges as a crucial response to India's pressing need for legal reform amidst its evolving governance landscape, particularly following the Jan Vishwas Bill, 2023. This initiative signals a transformative shift towards a framework that prioritizes proportionality, predictability, and trust, moving away from punitive measures and decriminalising various minor economic offences.`,
    content: `The compendium "Trust-Based Governance: Decriminalisation for Development" emerges as a crucial response to India's pressing need for legal reform amidst its evolving governance landscape, particularly following the Jan Vishwas Bill, 2023. This initiative signals a transformative shift towards a framework that prioritizes proportionality, predictability, and trust, moving away from punitive measures and decriminalising various minor economic offences. The urgency of the compendium is underscored by India’s strong economic growth and the necessity of making these gains inclusive and sustainable. With insights drawn from various policy research institutions, the document highlights that laws should not merely be tools for punishment but should foster an environment conducive to entrepreneurship and innovation. By analyzing international best practices and addressing the burdens imposed by excessive penalties, the compendium advocates for a legal ecosystem that supports small businesses and promotes economic efficiency. Ultimately, it calls for a reimagined legal architecture that enhances dignity and well-being, reflecting a concerted effort to build a trusting relationship between the state and its citizens, thus laying the groundwork for a more responsive, citizen-centric governance model.

      Central to the compendium’s recommendations is a coherent normative framework: the 10 Principles of Trust-Based Governance, which collectively orient the project toward a jurisprudence of trust. These principles-ranging from a presumption of liberty and constitutional restraint to subsidiarity and transparency-serve as functional decision rules rather than mere rhetorical adornments. They guide trade-offs, shape drafting choices, and clarify the policy logic behind decriminalisation. Through this lens, criminal sanctions are viewed as an exceptional measure, applicable only to conduct that is malicious, fraudulent, or seriously harmful to individuals or property. In cases where harms are primarily economic and remedial, civil liability and graduated monetary sanctions are deemed more fitting accountability instruments.
      
      With insights drawn from various policy research institutions, the document highlights that laws should not merely be tools for punishment but should foster an environment conducive to entrepreneurship and innovation. The aspiration here is not only to facilitate business activities but also to craft regulations that enable individuals to live, work, and innovate freely, all within a framework grounded in trust and predictability.
      
      Ultimately, the compendium advocates for a reimagined legal architecture that enhances dignity and well-being, reflecting a concerted effort to build a trusting relationship between the state and its citizens. It lays the groundwork for a more responsive, citizen-centric governance model, calibrated to improve ease of living, support micro and small enterprises, and limit disproportionate state intrusion in low-risk activities. These reforms extend the Jan Vishwas agenda and anchor legal change firmly within the aspirations of Viksit Bharat 2047.`,
    image: "/images/Trust_base_governance.png ",
    date: "30 Sep 2025",
    readTime: "2 min read",
    source: "Centre for Civil Society",
    pdf: "/downloads/trust-based-governance.pdf"
  },
  
];

module.exports = resources;

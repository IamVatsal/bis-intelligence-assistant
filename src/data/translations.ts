import { AppLanguage } from '../types/bis.js';

export interface TranslationDictionary {
  appName: string;
  tagline: string;
  navHome: string;
  navChat: string;
  navFindStandards: string;
  navCertification: string;
  navLabs: string;
  navHallmarking: string;
  navConsumer: string;
  navStandards: string;
  navSaved: string;
  navAdmin: string;
  heroTitle: string;
  heroSubtitle: string;
  askAssistantBtn: string;
  findStandardBtn: string;
  evidenceHigh: string;
  evidenceModerate: string;
  evidenceLimited: string;
  viewClause: string;
  mandatoryQcoBadge: string;
  voluntaryBadge: string;
  disclaimer: string;
  sendPlaceholder: string;
  personaLabel: string;
}

export const TRANSLATIONS: Record<AppLanguage, TranslationDictionary> = {
  en: {
    appName: 'BIS Intelligence Assistant',
    tagline: 'AI-powered intelligent assistant for Indian Standards and BIS services for industries and consumers.',
    navHome: 'Home',
    navChat: 'AI Assistant',
    navFindStandards: 'Find Standards',
    navCertification: 'Certification Guide',
    navLabs: 'Testing & Labs',
    navHallmarking: 'Hallmarking',
    navConsumer: 'Consumer Help',
    navStandards: 'Standards Explorer',
    navSaved: 'Saved Sources',
    navAdmin: 'Admin Suite',
    heroTitle: 'Understand Indian Standards. Navigate BIS Services. Faster.',
    heroSubtitle: 'Ask questions about Indian Standards, certification, testing, hallmarking, laboratories, and BIS services using natural language with source-backed precision.',
    askAssistantBtn: 'Ask the BIS Assistant',
    findStandardBtn: 'Find Applicable Standards',
    evidenceHigh: 'Evidence: High (Authoritative IS Match)',
    evidenceModerate: 'Evidence: Moderate (Inferred from Scope)',
    evidenceLimited: 'Evidence: Limited (Requires Verification)',
    viewClause: 'View Clause & Source',
    mandatoryQcoBadge: 'Mandatory QCO in Force',
    voluntaryBadge: 'Voluntary Scheme',
    disclaimer: 'Information provided by BIS Intelligence Assistant is intended to help users discover and understand BIS information. It does not replace official BIS notifications, standards, regulations, certification decisions, or professional/legal advice. Users should verify requirements against the latest applicable official BIS sources.',
    sendPlaceholder: 'Ask about Indian Standards, certification, testing, hallmarking, or laboratories...',
    personaLabel: 'Persona'
  },
  hi: {
    appName: 'बीआईएस इंटेलिजेंस असिस्टेंट',
    tagline: 'उद्योगों और उपभोक्ताओं के लिए भारतीय मानकों और बीआईएस सेवाओं हेतु एआई-संचालित सहायक।',
    navHome: 'होम',
    navChat: 'एआई सहायक',
    navFindStandards: 'मानक खोजें',
    navCertification: 'प्रमाणन मार्गदर्शिका',
    navLabs: 'परीक्षण एवं प्रयोगशालाएं',
    navHallmarking: 'हॉलमार्किंग',
    navConsumer: 'उपभोक्ता सहायता',
    navStandards: 'मानक अन्वेषक',
    navSaved: 'सहेजे गए स्रोत',
    navAdmin: 'व्यवस्थापक सुइट',
    heroTitle: 'भारतीय मानकों को समझें। बीआईएस सेवाओं का उपयोग करें। तीव्र गति से।',
    heroSubtitle: 'स्रोत-समर्थित सटीकता के साथ प्राकृतिक भाषा में भारतीय मानकों, प्रमाणन, परीक्षण, हॉलमार्किंग और प्रयोगशालाओं के बारे में प्रश्न पूछें।',
    askAssistantBtn: 'बीआईएस सहायक से पूछें',
    findStandardBtn: 'लागू मानक खोजें',
    evidenceHigh: 'साक्ष्य: उच्च (प्रामाणिक मानक मिलान)',
    evidenceModerate: 'साक्ष्य: मध्यम (दायरे से अनुमानित)',
    evidenceLimited: 'साक्ष्य: सीमित (सत्यापन आवश्यक)',
    viewClause: 'खंड एवं स्रोत देखें',
    mandatoryQcoBadge: 'अनिवार्य QCO प्रभावी',
    voluntaryBadge: 'स्वैच्छिक योजना',
    disclaimer: 'बीआईएस इंटेलिजेंस असिस्टेंट द्वारा प्रदान की गई जानकारी उपयोगकर्ताओं को बीआईएस जानकारी खोजने और समझने में मदद करने के लिए है। यह आधिकारिक बीआईएस अधिसूचनाओं, मानकों या कानूनी सलाह का स्थान नहीं लेती है।',
    sendPlaceholder: 'भारतीय मानकों, प्रमाणन, परीक्षण, हॉलमार्किंग या प्रयोगशालाओं के बारे में पूछें...',
    personaLabel: 'उपयोगकर्ता प्रोफ़ाइल'
  },
  gu: {
    appName: 'બીઆઈએસ ઇન્ટેલિજન્સ આસિસ્ટન્ટ',
    tagline: 'ઉદ્યોગો અને ગ્રાહકો માટે ભારતીય માનકો અને BIS સેવાઓ માટે AI-સંચાલિત બુદ્ધિશાળી સહાયક.',
    navHome: 'મુખ્ય પૃષ્ઠ',
    navChat: 'AI સહાયક',
    navFindStandards: 'માનક શોધો',
    navCertification: 'પ્રમાણીકરણ માર્ગદર્શિકા',
    navLabs: 'પરીક્ષણ અને પ્રયોગશાળાઓ',
    navHallmarking: 'હોલમાર્કિંગ',
    navConsumer: 'ગ્રાહક સહાય',
    navStandards: 'માનક એક્સપ્લોરર',
    navSaved: 'સાચવેલા સ્ત્રોતો',
    navAdmin: 'એડમિન સ્યુટ',
    heroTitle: 'ભારતીય માનકો સમજો. BIS સેવાઓ સરળતાથી મેળવો.',
    heroSubtitle: 'સત્તાવાર સ્ત્રોતો સાથે કુદરતી ભાષામાં ભારતીય માનકો, પ્રમાણીકરણ, પરીક્ષણ, હોલમાર્કિંગ અને લેબ્સ વિશે પ્રશ્નો પૂછો.',
    askAssistantBtn: 'BIS સહાયકને પૂછો',
    findStandardBtn: 'લાગુ માનકો શોધો',
    evidenceHigh: 'પુરાવા: ઉચ્ચ (સત્તાવાર IS મેચ)',
    evidenceModerate: 'પુરાવા: મધ્યમ (અનુમાનિત)',
    evidenceLimited: 'પુરાવા: મર્યાદિત (ચકાસણી જરૂરી)',
    viewClause: 'કલમ અને સ્ત્રોત જુઓ',
    mandatoryQcoBadge: 'ફરજિયાત QCO અમલમાં',
    voluntaryBadge: 'સ્વૈચ્છિક યોજના',
    disclaimer: 'BIS ઇન્ટેલિજન્સ આસિસ્ટન્ટ દ્વારા પૂરી પાડવામાં આવેલી માહિતી માત્ર જાણકારી માટે છે. સત્તાવાર BIS સૂચનાઓ અથવા કાનૂની સલાહ બદલ વાસ્તવિક ચકાસણી કરવી.',
    sendPlaceholder: 'ભારતીય માનકો, પ્રમાણીકરણ, પરીક્ષણ કે લેબ્સ વિશે પૂછો...',
    personaLabel: 'પ્રોફાઇલ'
  }
};

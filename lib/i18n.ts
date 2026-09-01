export type LanguageCode = 'en' | 'hi' | 'mr'

export const languageOptions = [
  { code: 'en', label: 'English' },
  { code: 'hi', label: 'हिन्दी' },
  { code: 'mr', label: 'मराठी' },
] as const

export type TranslationDictionary = {
  nav: {
    localChai: string
    howItWorks: string
    chaiTapri: string
    authorityLogin: string
    startCharcha: string
  }
  hero: {
    badge: string
    title: string
    description: string
    ctaPrimary: string
    ctaSecondary: string
    cities: string
    issuesResolved: string
    languages: string
  }
  sections: {
    whatIsEyebrow: string
    whatIsTitle: string
    whatIsSubtitle: string
    howEyebrow: string
    howTitle: string
    howSubtitle: string
    finalEyebrow: string
    finalTitle: string
    finalSubtitle: string
    finalCta: string
  }
  footer: {
    product: string
    authorities: string
    about: string
    tag: string
  }
}

export const translations: Record<LanguageCode, TranslationDictionary> = {
  en: {
    nav: {
      localChai: 'Local Chai',
      howItWorks: 'How it Works',
      chaiTapri: 'Chai Tapri',
      authorityLogin: 'Authority Login',
      startCharcha: 'Start a Charcha',
    },
    hero: {
      badge: 'India\'s civic social network',
      title: 'India mein har ek Charcha Chai Pe hoti hai.',
      description:
        'Ab mohalla ki baat sirf tapri tak nahi. Report karo. Charcha karo. Vote karo. Aur dekho tumhari awaaz kahan tak pahunchti hai.',
      ctaPrimary: 'Start a Charcha',
      ctaSecondary: 'Explore Chai Tapri',
      cities: 'Cities ki charcha',
      issuesResolved: 'Issues resolved',
      languages: 'Languages',
    },
    sections: {
      whatIsEyebrow: 'What is CivicChai?',
      whatIsTitle: 'CivicChai turns everyday civic problems into community discussions.',
      whatIsSubtitle:
        'It is not just a complaint portal. It is the tapri where your mohalla gathers — report an issue, discuss it, support it, and follow it all the way to government action.',
      howEyebrow: 'How CivicChai works',
      howTitle: 'Se ek cup chai se civic action tak.',
      howSubtitle:
        'From a social post to an official civic case file — here is the journey every Charcha takes.',
      finalEyebrow: 'From Charcha to Action',
      finalTitle: 'The CivicChai Control Room.',
      finalSubtitle:
        'Authorities get a clean, dense operations dashboard — priority that combines severity, persistence, evidence and community support, not just raw votes. Every sensitive action is auditable.',
      finalCta: 'Open the Control Room',
    },
    footer: {
      product: 'Product',
      authorities: 'Authorities',
      about: 'About',
      tag: 'चाय · चर्चा · बदलाव',
    },
  },
  hi: {
    nav: {
      localChai: 'लोकल चाय',
      howItWorks: 'यह कैसे काम करता है',
      chaiTapri: 'चाय Tapri',
      authorityLogin: 'अधिकारी लॉगिन',
      startCharcha: 'चर्चा शुरू करें',
    },
    hero: {
      badge: 'भारत की नागरिक सोशल नेटवर्क',
      title: 'भारत में हर एक चर्चा चाय पे होती है।',
      description:
        'अब मोहल्ले की बात सिर्फ Tapri तक नहीं. रिपोर्ट करो. चर्चा करो. वोट करो. और देखो तुम्हारी आवाज़ कहाँ तक पहुँचती है.',
      ctaPrimary: 'चर्चा शुरू करें',
      ctaSecondary: 'चाय Tapri देखें',
      cities: 'शहरों की चर्चा',
      issuesResolved: 'सुलझे मुद्दे',
      languages: 'भाषाएँ',
    },
    sections: {
      whatIsEyebrow: 'CivicChai क्या है?',
      whatIsTitle: 'CivicChai रोज़मर्रा के नागरिक मुद्दों को समुदाय चर्चा में बदलता है।',
      whatIsSubtitle:
        'यह सिर्फ एक शिकायत पोर्टल नहीं है. यह वह tapri है जहाँ आपका मोहल्ला इकट्ठा होता है — किसी समस्या की रिपोर्ट करो, चर्चा करो, सपोर्ट करो और इसे सरकार की कार्रवाई तक ले जाओ.',
      howEyebrow: 'CivicChai कैसे काम करता है',
      howTitle: 'एक कप चाय से नागरिक कार्रवाई तक।',
      howSubtitle:
        'एक सोशल पोस्ट से लेकर आधिकारिक नागरिक केस फाइल तक — यही है हर चर्चा की यात्रा।',
      finalEyebrow: 'चर्चा से कार्रवाई तक',
      finalTitle: 'CivicChai कंट्रोल रूम।',
      finalSubtitle:
        'अधिकारी एक साफ़, गहन ऑपरेशन डैशबोर्ड देखते हैं — तीव्रता, स्थिरता, सबूत और समुदाय का समर्थन मिलकर प्राथमिकता तय करता है। हर संवेदनशील कार्य ऑडिटेबल होता है।',
      finalCta: 'कंट्रोल रूम खोलें',
    },
    footer: {
      product: 'प्रोडक्ट',
      authorities: 'अधिकारियाँ',
      about: 'हमारे बारे में',
      tag: 'चाय · चर्चा · बदलाव',
    },
  },
  mr: {
    nav: {
      localChai: 'लोकल चहा',
      howItWorks: 'हे कसे काम करते?',
      chaiTapri: 'चहा Tapri',
      authorityLogin: 'अधिकारी लॉगिन',
      startCharcha: 'चर्चा सुरू करा',
    },
    hero: {
      badge: 'भारताची नागरी सोशल नेटवर्क',
      title: 'भारतामध्ये प्रत्येक चर्चा चहावर होते.',
      description:
        'आता मॉलचा आवाजा फक्त tapri पर्यंत मर्यादित नाही. तक्रार करा. चर्चा करा. मत द्या. आणि पाहा तुमचा आवाज कोठेपर्यंत पोहोचतो.',
      ctaPrimary: 'चर्चा सुरू करा',
      ctaSecondary: 'चहा Tapri पहा',
      cities: 'शहरांची चर्चा',
      issuesResolved: 'निराकरण झालेले विषय',
      languages: 'भाषा',
    },
    sections: {
      whatIsEyebrow: 'CivicChai म्हणजे काय?',
      whatIsTitle: 'CivicChai रोजच्या नागरी समस्यांना समुदाय चर्चेमध्ये बदलतो.',
      whatIsSubtitle:
        'हे फक्त तक्रार पोर्टल नाही. हे ते tapri आहे जिथे तुमचा मोहल्ला एकत्र येतो — समस्या नोंदवा, चर्चा करा, पाठिंबा द्या आणि ती सरकारच्या कारवाईपर्यंत नेवा.',
      howEyebrow: 'CivicChai कसे काम करते',
      howTitle: 'एका कप चहापासून नागरी कारवाईपर्यंत.',
      howSubtitle:
        'सोशल पोस्टपासून अधिकृत नागरी प्रकरणापर्यंत — प्रत्येक चर्चेची ही यात्रा आहे.',
      finalEyebrow: 'चर्चेपासून कारवाईपर्यंत',
      finalTitle: 'CivicChai कंट्रोल रूम.',
      finalSubtitle:
        'अधिकारी स्वच्छ, सघन ऑपरेशन ডॅशबोर्ड पाहतात — ताण, टिकाऊपणा, पुरावे आणि समुदायाचा पाठिंबा यांचा समावेश असलेली प्राथमिकता. प्रत्येक संवेदनशील कृती ऑडिटेबल असते.',
      finalCta: 'कंट्रोल रूम उघडा',
    },
    footer: {
      product: 'प्रोडक्ट',
      authorities: 'अधिकारी',
      about: 'आमच्याबद्दल',
      tag: 'चहा · चर्चा · बदल',
    },
  },
}

(() => {
  'use strict';

  // ========================================
  // State
  // ========================================
  let currentLang = 'ms';
  let currentStep = 'welcome';
  let userGender = null;
  let theirGender = null;
  let lastResult = null;
  const stepHistory = [];

  // Step progress mapping
  const stepProgress = {
    welcome: 0,
    gender: 33,
    'their-gender': 66,
    relationship: 90,
    result: 100,
  };

  // ========================================
  // Translations
  // ========================================
  const translations = {
    ms: {
      subtitle: 'Semak sama ada anda boleh bersalam dengan mudah dan pantas',
      start: 'Mula Semak',
      stepLabel1: 'Langkah 1',
      stepLabel2: 'Langkah 2',
      stepLabel3: 'Langkah 3',
      yourGender: 'Saya adalah...',
      male: 'Lelaki',
      female: 'Perempuan',
      maleDesc: 'Akhwan',
      femaleDesc: 'Akhwat',
      theirGender: 'Saya ingin bersalam dengan...',
      relationship: 'Orang tersebut adalah...',
      searchPlaceholder: 'Cari hubungan...',
      canSalam: 'Boleh Salam',
      cannotSalam: 'Tidak Boleh Salam',
      sameGenderReason: 'Bersalam antara sesama jantina adalah dibenarkan.',
      mahramReason: '{rel} adalah mahram anda. Bersalam adalah dibenarkan.',
      spouseReason: '{rel} adalah pasangan anda. Bersalam sudah tentunya dibenarkan.',
      nonMahramReason: '{rel} bukan mahram anda. Bersalam antara lelaki dan perempuan yang bukan mahram tidak dibenarkan.',
      reference: 'Rujukan: Surah An-Nisa (4:23)',
      disclaimer: 'Untuk keputusan yang lebih tepat, sila rujuk ulama.',
      footerNote: 'Untuk keputusan yang lebih tepat, sila rujuk ulama.',
      reset: 'Semak Semula',
      share: 'Kongsi',
      shareText: 'Saya baru semak di Boleh Salam? — Semak hubungan mahram dengan mudah!',
      copied: 'Pautan disalin!',
      langToggle: 'EN',
      didYouKnow: 'Tahukah Anda?',
      noResults: 'Tiada hasil carian',
      rayaGreeting: 'Selamat Hari Raya Aidilfitri',
      quickTitle: 'Soalan Popular',
      quickNote: '* Antara berlainan jantina',
      qCousin: 'Sepupu',
      qCousinA: 'Bukan mahram',
      qInlaw: 'Ipar',
      qInlawA: 'Bukan mahram',
      qMil: 'Mertua',
      qMilA: 'Mahram',
      cat_family: 'Keluarga Terdekat',
      cat_grandparent: 'Datuk/Nenek & Cucu',
      cat_extended: 'Pak Cik/Mak Cik & Anak Saudara',
      cat_inlaw: 'Mertua & Ipar',
      cat_step: 'Keluarga Tiri',
      cat_milk: 'Saudara Susuan',
      cat_others: 'Lain-lain',
    },
    en: {
      subtitle: 'Quickly check if you can shake hands with someone',
      start: 'Start Checking',
      stepLabel1: 'Step 1',
      stepLabel2: 'Step 2',
      stepLabel3: 'Step 3',
      yourGender: 'I am a...',
      male: 'Male',
      female: 'Female',
      maleDesc: 'Brother',
      femaleDesc: 'Sister',
      theirGender: 'I want to greet a...',
      relationship: 'This person is my...',
      searchPlaceholder: 'Search relationship...',
      canSalam: 'Can Salam',
      cannotSalam: 'Cannot Salam',
      sameGenderReason: 'Shaking hands between the same gender is permissible.',
      mahramReason: '{rel} is your mahram. Shaking hands is permissible.',
      spouseReason: '{rel} is your spouse. Shaking hands is of course permissible.',
      nonMahramReason: '{rel} is not your mahram. Shaking hands between non-mahram men and women is not permissible.',
      reference: 'Reference: Surah An-Nisa (4:23)',
      disclaimer: 'For more accurate rulings, please consult a scholar.',
      footerNote: 'For more accurate rulings, please consult a scholar.',
      reset: 'Check Again',
      share: 'Share',
      shareText: "I just checked Boleh Salam? — A quick mahram relationship checker!",
      copied: 'Link copied!',
      langToggle: 'BM',
      didYouKnow: 'Did You Know?',
      noResults: 'No results found',
      rayaGreeting: 'Selamat Hari Raya Aidilfitri',
      quickTitle: 'Popular Questions',
      quickNote: '* Between opposite genders',
      qCousin: 'Cousin',
      qCousinA: 'Non-mahram',
      qInlaw: 'In-law sibling',
      qInlawA: 'Non-mahram',
      qMil: 'In-law parent',
      qMilA: 'Mahram',
      cat_family: 'Immediate Family',
      cat_grandparent: 'Grandparents & Grandchildren',
      cat_extended: 'Uncles/Aunts & Nieces/Nephews',
      cat_inlaw: 'In-Laws',
      cat_step: 'Step Family',
      cat_milk: 'Milk Relations',
      cat_others: 'Others',
    },
  };

  // ========================================
  // Educational Notes
  // ========================================
  const eduNotes = {
    ms: {
      'same-gender': 'Bersalam sesama jantina tidak mempunyai sebarang larangan dalam Islam dan merupakan amalan sunnah yang digalakkan.',
      wife: 'Isteri adalah pasangan hidup anda. Bersalam, berpelukan dan bersentuhan adalah hak suami isteri.',
      husband: 'Suami adalah pasangan hidup anda. Bersalam, berpelukan dan bersentuhan adalah hak suami isteri.',
      mother: 'Ibu adalah wanita yang paling mulia dalam Islam. Bersalam dan mencium tangan ibu sangat digalakkan.',
      father: 'Menghormati bapa dengan bersalam dan mencium tangan adalah amalan mulia yang digalakkan.',
      female_cousin: 'Ramai yang keliru — sepupu BUKAN mahram kerana Islam membenarkan perkahwinan antara sepupu.',
      male_cousin: 'Ramai yang keliru — sepupu BUKAN mahram kerana Islam membenarkan perkahwinan antara sepupu.',
      sister_in_law: 'Nabi SAW bersabda: "Al-Hamu al-maut" (Ipar itu adalah maut) — bermaksud bahaya bergaul bebas dengan ipar. (HR Bukhari & Muslim)',
      brother_in_law: 'Nabi SAW bersabda: "Al-Hamu al-maut" (Ipar itu adalah maut) — bermaksud bahaya bergaul bebas dengan ipar. (HR Bukhari & Muslim)',
      mother_in_law: 'Ibu mertua menjadi mahram anda sebaik sahaja akad nikah berlangsung, walaupun belum bermalam bersama.',
      father_in_law: 'Bapa mertua menjadi mahram anda sebaik sahaja akad nikah berlangsung, walaupun belum bermalam bersama.',
      daughter_in_law: 'Menantu perempuan adalah mahram kepada bapa mertua kerana hubungan perkahwinan (musaharah).',
      son_in_law: 'Menantu lelaki adalah mahram kepada ibu mertua kerana hubungan perkahwinan (musaharah).',
      stepmother: 'Ibu tiri adalah mahram kerana bapa anda telah berkahwin dengannya. Ini disebut dalam Surah An-Nisa ayat 22.',
      stepfather: 'Bapa tiri adalah mahram jika telah berlaku hubungan suami isteri dengan ibu anda.',
      stepdaughter: 'Anak tiri perempuan menjadi mahram jika perkahwinan dengan ibunya telah disempurnakan.',
      stepson: 'Anak tiri lelaki menjadi mahram jika perkahwinan dengan bapanya telah disempurnakan.',
      cousins_wife: 'Isteri sepupu bukan mahram kerana tiada hubungan nasab (keturunan) atau musaharah (perkahwinan) dengan anda.',
      cousins_husband: 'Suami sepupu bukan mahram kerana tiada hubungan nasab (keturunan) atau musaharah (perkahwinan) dengan anda.',
      milk_mother: 'Ibu susuan mempunyai hukum yang sama seperti ibu kandung dari segi mahram. Syaratnya: penyusuan berlaku sebelum umur 2 tahun.',
      milk_brother: 'Saudara susuan mempunyai hukum seperti saudara kandung dari segi mahram.',
      milk_sister: 'Saudara susuan mempunyai hukum seperti saudara kandung dari segi mahram.',
      sister: 'Kakak dan adik perempuan adalah mahram yang kekal (mahram nasab) kerana hubungan darah.',
      brother: 'Abang dan adik lelaki adalah mahram yang kekal (mahram nasab) kerana hubungan darah.',
      daughter: 'Anak perempuan adalah mahram yang kekal kerana hubungan keturunan langsung.',
      son: 'Anak lelaki adalah mahram yang kekal kerana hubungan keturunan langsung.',
      grandmother: 'Nenek (sama ada sebelah ibu atau bapa) adalah mahram kerana hubungan keturunan.',
      grandfather: 'Datuk (sama ada sebelah ibu atau bapa) adalah mahram kerana hubungan keturunan.',
      granddaughter: 'Cucu perempuan adalah mahram kerana hubungan keturunan langsung.',
      grandson: 'Cucu lelaki adalah mahram kerana hubungan keturunan langsung.',
      paternal_uncle: 'Bapa saudara (adik-beradik bapa) adalah mahram nasab — hubungan darah yang kekal.',
      maternal_uncle: 'Pak cik sebelah ibu (adik-beradik ibu) adalah mahram nasab — hubungan darah yang kekal.',
      paternal_aunt: 'Ibu saudara (adik-beradik bapa) adalah mahram nasab — hubungan darah yang kekal.',
      maternal_aunt: 'Mak cik sebelah ibu (adik-beradik ibu) adalah mahram nasab — hubungan darah yang kekal.',
      niece_bro: 'Anak saudara perempuan dari abang/adik adalah mahram kerana hubungan darah.',
      niece_sis: 'Anak saudara perempuan dari kakak/adik adalah mahram kerana hubungan darah.',
      nephew_bro: 'Anak saudara lelaki dari abang/adik adalah mahram kerana hubungan darah.',
      nephew_sis: 'Anak saudara lelaki dari kakak/adik adalah mahram kerana hubungan darah.',
      female_friend: 'Kawan berlainan jantina bukan mahram. Bersalam tidak dibenarkan walaupun sudah lama berkawan.',
      male_friend: 'Kawan berlainan jantina bukan mahram. Bersalam tidak dibenarkan walaupun sudah lama berkawan.',
      female_neighbour: 'Jiran berlainan jantina bukan mahram. Islam menggalakkan menjaga adab dengan jiran.',
      male_neighbour: 'Jiran berlainan jantina bukan mahram. Islam menggalakkan menjaga adab dengan jiran.',
      female_colleague: 'Rakan sekerja berlainan jantina bukan mahram. Interaksi profesional digalakkan dijaga batasannya.',
      male_colleague: 'Rakan sekerja berlainan jantina bukan mahram. Interaksi profesional digalakkan dijaga batasannya.',
      milk_father: 'Bapa susuan (suami kepada ibu susuan) mempunyai hukum yang sama seperti bapa kandung dari segi mahram.',
    },
    en: {
      'same-gender': 'Shaking hands between the same gender has no prohibition in Islam and is an encouraged Sunnah practice.',
      wife: 'Your wife is your life partner. Physical contact including shaking hands is a right between husband and wife.',
      husband: 'Your husband is your life partner. Physical contact including shaking hands is a right between husband and wife.',
      mother: 'The mother holds the highest status in Islam. Shaking hands and kissing her hand is highly encouraged.',
      father: 'Honoring your father by shaking hands and kissing his hand is a noble practice.',
      female_cousin: 'Many are confused — cousins are NOT mahram because Islam permits marriage between cousins.',
      male_cousin: 'Many are confused — cousins are NOT mahram because Islam permits marriage between cousins.',
      sister_in_law: 'The Prophet (PBUH) said: "Al-Hamu al-maut" (The in-law is death) — meaning the danger of free interaction with in-laws. (Bukhari & Muslim)',
      brother_in_law: 'The Prophet (PBUH) said: "Al-Hamu al-maut" (The in-law is death) — meaning the danger of free interaction with in-laws. (Bukhari & Muslim)',
      mother_in_law: 'Your mother-in-law becomes your mahram as soon as the marriage contract is completed, even before consummation.',
      father_in_law: 'Your father-in-law becomes your mahram as soon as the marriage contract is completed, even before consummation.',
      daughter_in_law: "A daughter-in-law is mahram to the father-in-law through the marriage bond (musaharah).",
      son_in_law: "A son-in-law is mahram to the mother-in-law through the marriage bond (musaharah).",
      stepmother: 'A stepmother is mahram because your father married her. This is mentioned in Surah An-Nisa verse 22.',
      stepfather: 'A stepfather is mahram if the marriage with your mother has been consummated.',
      stepdaughter: 'A stepdaughter becomes mahram if the marriage with her mother has been consummated.',
      stepson: 'A stepson becomes mahram if the marriage with his father has been consummated.',
      cousins_wife: "A cousin's wife is not mahram as there is no blood relation (nasab) or marriage bond (musaharah) with you.",
      cousins_husband: "A cousin's husband is not mahram as there is no blood relation (nasab) or marriage bond (musaharah) with you.",
      milk_mother: 'A milk mother has the same mahram status as a biological mother. Condition: breastfeeding occurred before age 2.',
      milk_brother: 'A milk sibling has the same mahram status as a biological sibling.',
      milk_sister: 'A milk sibling has the same mahram status as a biological sibling.',
      sister: 'Sisters are permanent mahram (mahram nasab) due to blood relation.',
      brother: 'Brothers are permanent mahram (mahram nasab) due to blood relation.',
      daughter: 'Daughters are permanent mahram due to direct lineage.',
      son: 'Sons are permanent mahram due to direct lineage.',
      grandmother: 'Grandmothers (both maternal and paternal) are mahram due to lineage.',
      grandfather: 'Grandfathers (both maternal and paternal) are mahram due to lineage.',
      granddaughter: 'Granddaughters are permanent mahram due to direct lineage.',
      grandson: 'Grandsons are permanent mahram due to direct lineage.',
      paternal_uncle: "Paternal uncles (father's siblings) are permanent mahram through blood relation.",
      maternal_uncle: "Maternal uncles (mother's siblings) are permanent mahram through blood relation.",
      paternal_aunt: "Paternal aunts (father's siblings) are permanent mahram through blood relation.",
      maternal_aunt: "Maternal aunts (mother's siblings) are permanent mahram through blood relation.",
      niece_bro: "A brother's daughter is mahram due to blood relation.",
      niece_sis: "A sister's daughter is mahram due to blood relation.",
      nephew_bro: "A brother's son is mahram due to blood relation.",
      nephew_sis: "A sister's son is mahram due to blood relation.",
      female_friend: 'Friends of the opposite gender are not mahram. Handshaking is not permissible regardless of closeness.',
      male_friend: 'Friends of the opposite gender are not mahram. Handshaking is not permissible regardless of closeness.',
      female_neighbour: 'Neighbours of the opposite gender are not mahram. Islam encourages maintaining proper etiquette with neighbours.',
      male_neighbour: 'Neighbours of the opposite gender are not mahram. Islam encourages maintaining proper etiquette with neighbours.',
      female_colleague: 'Colleagues of the opposite gender are not mahram. Professional interactions should maintain boundaries.',
      male_colleague: 'Colleagues of the opposite gender are not mahram. Professional interactions should maintain boundaries.',
      milk_father: 'A milk father (husband of the milk mother) has the same mahram status as a biological father.',
    },
  };

  // ========================================
  // Relationship Data — Surah An-Nisa (4:23)
  // ========================================
  const relationships = [
    // Immediate Family
    { id: 'wife', ms: 'Isteri', en: 'Wife', gender: 'f', type: 'spouse', category: 'family', forUser: 'm' },
    { id: 'husband', ms: 'Suami', en: 'Husband', gender: 'm', type: 'spouse', category: 'family', forUser: 'f' },
    { id: 'mother', ms: 'Ibu', en: 'Mother', gender: 'f', type: 'mahram', category: 'family' },
    { id: 'father', ms: 'Bapa / Ayah', en: 'Father', gender: 'm', type: 'mahram', category: 'family' },
    { id: 'daughter', ms: 'Anak Perempuan', en: 'Daughter', gender: 'f', type: 'mahram', category: 'family' },
    { id: 'son', ms: 'Anak Lelaki', en: 'Son', gender: 'm', type: 'mahram', category: 'family' },
    { id: 'sister', ms: 'Kakak / Adik Perempuan', en: 'Sister', gender: 'f', type: 'mahram', category: 'family' },
    { id: 'brother', ms: 'Abang / Adik Lelaki', en: 'Brother', gender: 'm', type: 'mahram', category: 'family' },

    // Grandparents & Grandchildren
    { id: 'grandmother', ms: 'Nenek', en: 'Grandmother', gender: 'f', type: 'mahram', category: 'grandparent' },
    { id: 'grandfather', ms: 'Datuk / Atuk', en: 'Grandfather', gender: 'm', type: 'mahram', category: 'grandparent' },
    { id: 'granddaughter', ms: 'Cucu Perempuan', en: 'Granddaughter', gender: 'f', type: 'mahram', category: 'grandparent' },
    { id: 'grandson', ms: 'Cucu Lelaki', en: 'Grandson', gender: 'm', type: 'mahram', category: 'grandparent' },

    // Uncles/Aunts & Nieces/Nephews
    { id: 'paternal_uncle', ms: 'Bapa Saudara', en: 'Paternal Uncle', gender: 'm', type: 'mahram', category: 'extended' },
    { id: 'maternal_uncle', ms: 'Pak Cik (Sebelah Ibu)', en: 'Maternal Uncle', gender: 'm', type: 'mahram', category: 'extended' },
    { id: 'paternal_aunt', ms: 'Ibu Saudara', en: 'Paternal Aunt', gender: 'f', type: 'mahram', category: 'extended' },
    { id: 'maternal_aunt', ms: 'Mak Cik (Sebelah Ibu)', en: 'Maternal Aunt', gender: 'f', type: 'mahram', category: 'extended' },
    { id: 'nephew_bro', ms: 'Anak Saudara Lelaki (dari Abang/Adik)', en: "Brother's Son (Nephew)", gender: 'm', type: 'mahram', category: 'extended' },
    { id: 'nephew_sis', ms: 'Anak Saudara Lelaki (dari Kakak/Adik)', en: "Sister's Son (Nephew)", gender: 'm', type: 'mahram', category: 'extended' },
    { id: 'niece_bro', ms: 'Anak Saudara Perempuan (dari Abang/Adik)', en: "Brother's Daughter (Niece)", gender: 'f', type: 'mahram', category: 'extended' },
    { id: 'niece_sis', ms: 'Anak Saudara Perempuan (dari Kakak/Adik)', en: "Sister's Daughter (Niece)", gender: 'f', type: 'mahram', category: 'extended' },

    // In-Laws
    { id: 'mother_in_law', ms: 'Ibu Mertua', en: 'Mother-in-Law', gender: 'f', type: 'mahram', category: 'inlaw' },
    { id: 'father_in_law', ms: 'Bapa Mertua', en: 'Father-in-Law', gender: 'm', type: 'mahram', category: 'inlaw' },
    { id: 'daughter_in_law', ms: 'Menantu Perempuan', en: 'Daughter-in-Law', gender: 'f', type: 'mahram', category: 'inlaw' },
    { id: 'son_in_law', ms: 'Menantu Lelaki', en: 'Son-in-Law', gender: 'm', type: 'mahram', category: 'inlaw' },
    { id: 'sister_in_law', ms: 'Kakak / Adik Ipar', en: 'Sister-in-Law', gender: 'f', type: 'non-mahram', category: 'inlaw' },
    { id: 'brother_in_law', ms: 'Abang / Adik Ipar', en: 'Brother-in-Law', gender: 'm', type: 'non-mahram', category: 'inlaw' },

    // Step Family
    { id: 'stepmother', ms: 'Ibu Tiri', en: 'Stepmother', gender: 'f', type: 'mahram', category: 'step' },
    { id: 'stepfather', ms: 'Bapa Tiri', en: 'Stepfather', gender: 'm', type: 'mahram', category: 'step' },
    { id: 'stepdaughter', ms: 'Anak Tiri Perempuan', en: 'Stepdaughter', gender: 'f', type: 'mahram', category: 'step' },
    { id: 'stepson', ms: 'Anak Tiri Lelaki', en: 'Stepson', gender: 'm', type: 'mahram', category: 'step' },

    // Milk Relations
    { id: 'milk_mother', ms: 'Ibu Susuan', en: 'Milk Mother', gender: 'f', type: 'mahram', category: 'milk' },
    { id: 'milk_father', ms: 'Bapa Susuan', en: 'Milk Father', gender: 'm', type: 'mahram', category: 'milk' },
    { id: 'milk_sister', ms: 'Adik-beradik Susuan (P)', en: 'Milk Sister', gender: 'f', type: 'mahram', category: 'milk' },
    { id: 'milk_brother', ms: 'Adik-beradik Susuan (L)', en: 'Milk Brother', gender: 'm', type: 'mahram', category: 'milk' },

    // Others (Non-Mahram)
    { id: 'female_cousin', ms: 'Sepupu Perempuan', en: 'Female Cousin', gender: 'f', type: 'non-mahram', category: 'others' },
    { id: 'male_cousin', ms: 'Sepupu Lelaki', en: 'Male Cousin', gender: 'm', type: 'non-mahram', category: 'others' },
    { id: 'cousins_wife', ms: 'Isteri Sepupu', en: "Cousin's Wife", gender: 'f', type: 'non-mahram', category: 'others' },
    { id: 'cousins_husband', ms: 'Suami Sepupu', en: "Cousin's Husband", gender: 'm', type: 'non-mahram', category: 'others' },
    { id: 'female_friend', ms: 'Kawan Perempuan', en: 'Female Friend', gender: 'f', type: 'non-mahram', category: 'others' },
    { id: 'male_friend', ms: 'Kawan Lelaki', en: 'Male Friend', gender: 'm', type: 'non-mahram', category: 'others' },
    { id: 'female_neighbour', ms: 'Jiran Perempuan', en: 'Female Neighbour', gender: 'f', type: 'non-mahram', category: 'others' },
    { id: 'male_neighbour', ms: 'Jiran Lelaki', en: 'Male Neighbour', gender: 'm', type: 'non-mahram', category: 'others' },
    { id: 'female_colleague', ms: 'Rakan Sekerja Perempuan', en: 'Female Colleague', gender: 'f', type: 'non-mahram', category: 'others' },
    { id: 'male_colleague', ms: 'Rakan Sekerja Lelaki', en: 'Male Colleague', gender: 'm', type: 'non-mahram', category: 'others' },
  ];

  const categoryOrder = ['family', 'grandparent', 'extended', 'inlaw', 'step', 'milk', 'others'];

  // ========================================
  // SVG Templates
  // ========================================
  const checkmarkSVG = `
    <svg viewBox="0 0 52 52" fill="none">
      <circle class="checkmark-circle" cx="26" cy="26" r="25" stroke-width="2"/>
      <path class="checkmark-check" d="M14.1 27.2l7.1 7.2 16.7-16.8" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

  const crossSVG = `
    <svg viewBox="0 0 52 52" fill="none">
      <circle class="x-circle" cx="26" cy="26" r="25" stroke-width="2"/>
      <path class="x-line" d="M16 16 36 36" stroke-width="3" stroke-linecap="round"/>
      <path class="x-line" d="M36 16 16 36" stroke-width="3" stroke-linecap="round"/>
    </svg>`;

  // ========================================
  // Helpers
  // ========================================
  function t(key) {
    return translations[currentLang][key] || key;
  }

  function updateAllTexts() {
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.dataset.i18n;
      if (translations[currentLang][key]) {
        el.textContent = translations[currentLang][key];
      }
    });

    // Placeholder attributes
    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const key = el.dataset.i18nPlaceholder;
      if (translations[currentLang][key]) {
        el.placeholder = translations[currentLang][key];
      }
    });

    document.getElementById('langToggle').textContent = t('langToggle');

    if (currentStep === 'relationship') populateRelationships();
    if (currentStep === 'result' && lastResult) displayResult(lastResult.rel, lastResult.type);
  }

  function updateProgress(stepName) {
    const bar = document.getElementById('progressBar');
    const fill = document.getElementById('progressFill');
    const pct = stepProgress[stepName] || 0;

    if (stepName === 'welcome') {
      bar.classList.remove('visible');
    } else {
      bar.classList.add('visible');
    }

    fill.style.width = pct + '%';
  }

  // ========================================
  // Navigation with slide transitions
  // ========================================
  let isTransitioning = false;

  function showStep(stepName, direction = 'forward') {
    if (isTransitioning) return;

    const currentEl = document.getElementById(`step-${currentStep}`);
    const nextEl = document.getElementById(`step-${stepName}`);
    if (!currentEl || !nextEl || currentEl === nextEl) return;

    isTransitioning = true;

    // Animate out
    const outClass = direction === 'forward' ? 'slide-out-left' : 'slide-out-right';
    currentEl.classList.add(outClass);

    setTimeout(() => {
      currentEl.classList.remove('active', outClass, 'slide-in-right', 'slide-in-left');

      // Animate in
      const inClass = direction === 'forward' ? 'slide-in-right' : 'slide-in-left';
      nextEl.classList.add('active', inClass);

      currentStep = stepName;
      updateProgress(stepName);

      // Back button visibility
      const backBtn = document.getElementById('backBtn');
      if (stepName === 'welcome') {
        backBtn.classList.remove('visible');
      } else {
        backBtn.classList.add('visible');
      }

      // Clear search when navigating away from relationship
      if (stepName !== 'relationship') {
        const search = document.getElementById('searchInput');
        if (search) search.value = '';
      }

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });

      isTransitioning = false;
    }, 250);
  }

  function goToStep(stepName) {
    stepHistory.push(currentStep);
    showStep(stepName, 'forward');
  }

  function goBack() {
    if (stepHistory.length === 0 || isTransitioning) return;
    const prevStep = stepHistory.pop();
    showStep(prevStep, 'back');
  }

  // ========================================
  // Swipe Gesture Support
  // ========================================
  let touchStartX = 0;
  let touchStartY = 0;

  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, { passive: true });

  document.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].screenX - touchStartX;
    const dy = e.changedTouches[0].screenY - touchStartY;

    // Swipe right to go back (must be mostly horizontal, >80px)
    if (dx > 80 && Math.abs(dy) < 60 && currentStep !== 'welcome') {
      goBack();
    }
  }, { passive: true });

  // ========================================
  // Language Toggle
  // ========================================
  function toggleLanguage() {
    currentLang = currentLang === 'ms' ? 'en' : 'ms';
    document.documentElement.lang = currentLang;
    updateAllTexts();
  }

  // ========================================
  // Quick Check (Welcome page)
  // ========================================
  function quickCheck(btn) {
    const answer = btn.querySelector('.quick-a');
    btn.classList.add('revealed');
    answer.classList.remove('hidden');
    answer.classList.add('visible');
  }

  // ========================================
  // Gender Selection
  // ========================================
  function selectGender(gender) {
    userGender = gender;
    goToStep('their-gender');
  }

  function selectTheirGender(gender) {
    theirGender = gender;

    if (userGender === theirGender) {
      lastResult = { rel: null, type: 'same-gender' };
      displayResult(null, 'same-gender');
      goToStep('result');
    } else {
      populateRelationships();
      goToStep('relationship');
    }
  }

  // ========================================
  // Relationship Grid
  // ========================================
  function populateRelationships() {
    const grid = document.getElementById('relationshipGrid');
    grid.innerHTML = '';

    const filtered = relationships.filter((r) => {
      if (r.gender !== theirGender) return false;
      if (r.forUser && r.forUser !== userGender) return false;
      return true;
    });

    const grouped = {};
    for (const r of filtered) {
      if (!grouped[r.category]) grouped[r.category] = [];
      grouped[r.category].push(r);
    }

    for (const cat of categoryOrder) {
      if (!grouped[cat]) continue;

      const section = document.createElement('div');
      section.className = 'category-section';
      section.dataset.category = cat;

      const header = document.createElement('h3');
      header.className = 'category-header';
      header.textContent = t(`cat_${cat}`);
      section.appendChild(header);

      const catGrid = document.createElement('div');
      catGrid.className = 'category-grid';

      for (const r of grouped[cat]) {
        const btn = document.createElement('button');
        btn.className = `relationship-btn ${r.type}`;
        btn.dataset.searchMs = r.ms.toLowerCase();
        btn.dataset.searchEn = r.en.toLowerCase();
        btn.dataset.relId = r.id;
        btn.onclick = () => selectRelationship(r);

        const name = document.createElement('span');
        name.className = 'rel-name';
        name.textContent = r[currentLang];
        btn.appendChild(name);

        const secLang = currentLang === 'ms' ? 'en' : 'ms';
        const secondary = document.createElement('span');
        secondary.className = 'rel-name-en';
        secondary.textContent = r[secLang];
        btn.appendChild(secondary);

        catGrid.appendChild(btn);
      }

      section.appendChild(catGrid);
      grid.appendChild(section);
    }
  }

  // ========================================
  // Search / Filter
  // ========================================
  function filterRelationships() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    const grid = document.getElementById('relationshipGrid');
    const buttons = grid.querySelectorAll('.relationship-btn');
    const sections = grid.querySelectorAll('.category-section');

    if (!query) {
      buttons.forEach((b) => b.classList.remove('hidden'));
      sections.forEach((s) => s.classList.remove('hidden'));
      // Remove no-results message
      const noRes = grid.querySelector('.no-results');
      if (noRes) noRes.remove();
      return;
    }

    let hasAnyResult = false;

    sections.forEach((section) => {
      let sectionHasResult = false;
      const sectionBtns = section.querySelectorAll('.relationship-btn');

      sectionBtns.forEach((btn) => {
        const matchMs = btn.dataset.searchMs.includes(query);
        const matchEn = btn.dataset.searchEn.includes(query);
        if (matchMs || matchEn) {
          btn.classList.remove('hidden');
          sectionHasResult = true;
          hasAnyResult = true;
        } else {
          btn.classList.add('hidden');
        }
      });

      section.classList.toggle('hidden', !sectionHasResult);
    });

    // No results message
    let noRes = grid.querySelector('.no-results');
    if (!hasAnyResult) {
      if (!noRes) {
        noRes = document.createElement('div');
        noRes.className = 'no-results';
        noRes.innerHTML = `<div class="no-results-icon">?</div><p class="no-results-text">${t('noResults')}</p>`;
        grid.appendChild(noRes);
      }
    } else if (noRes) {
      noRes.remove();
    }
  }

  // ========================================
  // Select Relationship & Show Result
  // ========================================
  function selectRelationship(rel) {
    lastResult = { rel, type: rel.type };
    displayResult(rel, rel.type);
    goToStep('result');
  }

  function displayResult(rel, type) {
    const card = document.getElementById('resultCard');
    const icon = document.getElementById('resultIcon');
    const title = document.getElementById('resultTitle');
    const reason = document.getElementById('resultReason');
    const ref = document.getElementById('resultReference');
    const disc = document.getElementById('resultDisclaimer');
    const eduNote = document.getElementById('eduNote');
    const eduText = document.getElementById('eduText');

    const isBoleh = type === 'same-gender' || type === 'mahram' || type === 'spouse';

    card.className = 'result-card ' + (isBoleh ? 'boleh' : 'tak-boleh');
    icon.innerHTML = isBoleh ? checkmarkSVG : crossSVG;
    title.textContent = isBoleh ? t('canSalam') : t('cannotSalam');

    // Reason
    const relName = rel ? rel[currentLang] : '';
    if (type === 'same-gender') {
      reason.textContent = t('sameGenderReason');
    } else if (type === 'spouse') {
      reason.textContent = t('spouseReason').replace('{rel}', relName);
    } else if (type === 'mahram') {
      reason.textContent = t('mahramReason').replace('{rel}', relName);
    } else {
      reason.textContent = t('nonMahramReason').replace('{rel}', relName);
    }

    // Educational note
    const noteKey = rel ? rel.id : type;
    const note = eduNotes[currentLang][noteKey];
    if (note) {
      eduNote.classList.remove('hidden');
      eduText.textContent = note;
    } else {
      eduNote.classList.add('hidden');
    }

    ref.textContent = t('reference');
    disc.textContent = t('disclaimer');

    // Confetti for boleh
    if (isBoleh) {
      setTimeout(() => showConfetti(), 500);
    }
  }

  // ========================================
  // Confetti
  // ========================================
  function showConfetti() {
    const container = document.getElementById('confettiContainer');
    const colors = ['#22c55e', '#c8a45c', '#16a34a', '#d4b876', '#15803d', '#e0cc90'];

    for (let i = 0; i < 40; i++) {
      const piece = document.createElement('div');
      piece.className = 'confetti-piece';

      const angle = (Math.random() * 360) * (Math.PI / 180);
      const distance = 80 + Math.random() * 200;
      const x = Math.cos(angle) * distance;
      const y = Math.sin(angle) * distance - 100;

      piece.style.setProperty('--x', `${x}px`);
      piece.style.setProperty('--y', `${y}px`);
      piece.style.setProperty('--r', `${Math.random() * 720 - 360}deg`);
      piece.style.setProperty('--duration', `${0.8 + Math.random() * 0.6}s`);
      piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      piece.style.width = `${6 + Math.random() * 6}px`;
      piece.style.height = `${6 + Math.random() * 6}px`;
      piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
      piece.style.animationDelay = `${Math.random() * 0.2}s`;

      container.appendChild(piece);
      setTimeout(() => piece.remove(), 1800);
    }
  }

  // ========================================
  // Share
  // ========================================
  async function shareResult() {
    const text = t('shareText');
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title: 'Boleh Salam?', text, url });
      } catch { /* cancelled */ }
    } else {
      try {
        await navigator.clipboard.writeText(`${text}\n${url}`);
        showToast(t('copied'));
      } catch {
        const ta = document.createElement('textarea');
        ta.value = `${text}\n${url}`;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast(t('copied'));
      }
    }
  }

  function showToast(message) {
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    toast.textContent = message;
    toast.classList.remove('show');
    void toast.offsetWidth;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
  }

  // ========================================
  // Reset
  // ========================================
  function resetApp() {
    userGender = null;
    theirGender = null;
    lastResult = null;
    stepHistory.length = 0;

    // Reset quick check cards
    document.querySelectorAll('.quick-card').forEach((card) => {
      card.classList.remove('revealed');
      const answer = card.querySelector('.quick-a');
      answer.classList.add('hidden');
      answer.classList.remove('visible');
    });

    showStep('welcome', 'back');
  }

  // ========================================
  // Init
  // ========================================
  function init() {
    updateAllTexts();
    updateProgress('welcome');
  }

  // ========================================
  // Keyboard Navigation
  // ========================================
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && currentStep !== 'welcome') {
      goBack();
    }
  });

  document.addEventListener('DOMContentLoaded', init);

  // Expose to global scope
  window.toggleLanguage = toggleLanguage;
  window.selectGender = selectGender;
  window.selectTheirGender = selectTheirGender;
  window.goToStep = goToStep;
  window.goBack = goBack;
  window.resetApp = resetApp;
  window.shareResult = shareResult;
  window.filterRelationships = filterRelationships;
  window.quickCheck = quickCheck;
})();

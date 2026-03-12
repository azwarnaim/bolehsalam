(() => {
  'use strict';

  // ========================================
  // State
  // ========================================
  let currentLang = 'ms';
  let currentStep = 'welcome';
  let treeGender = 'm';
  let showSameGender = false;
  const stepHistory = [];

  // ========================================
  // Translations
  // ========================================
  const translations = {
    ms: {
      subtitle: 'Semak sama ada anda boleh bersalam dengan mudah dan pantas',
      pickGender: 'Saya adalah...',
      male: 'Lelaki',
      female: 'Perempuan',
      maleDesc: 'Akhwan',
      femaleDesc: 'Akhwat',
      footerNote: 'Untuk keputusan yang lebih tepat, sila rujuk ulama.',
      share: 'Kongsi',
      shareText: 'Saya baru semak di Boleh Salam? — Semak hubungan mahram dengan mudah!',
      copied: 'Pautan disalin!',
      langToggle: 'EN',
      rayaGreeting: 'Selamat Hari Raya Aidilfitri',
      quickTitle: 'Soalan Popular',
      quickNote: '* Antara berlainan jantina',
      qCousin: 'Sepupu',
      qCousinA: 'Bukan mahram',
      qInlaw: 'Ipar',
      qInlawA: 'Bukan mahram',
      qMil: 'Mertua',
      qMilA: 'Mahram',
      treeTitle: 'Pokok Keluarga Mahram',
      treeSubtitle: 'Ketuk pada nama untuk maklumat lanjut',
      treeYou: 'ANDA',
      treeBoleh: 'Boleh Salam',
      treeTakBoleh: 'Tak Boleh Salam',
      treeSameGender: 'Sama jantina — sentiasa boleh salam',
      treeMahramNote: 'Mahram — boleh salam',
      treeSpouseNote: 'Pasangan — boleh salam',
      treeNonMahramNote: 'Bukan mahram — tidak boleh salam',
      treeNasab: 'Hubungan Darah (Nasab)',
      treeMusaharah: 'Hubungan Perkahwinan',
      treeRadhaah: 'Hubungan Susuan',
      treeClose: 'Tutup',
      treeShowSame: 'Tunjuk sama jantina',
      treeHideSame: 'Sembunyi sama jantina',
      treeReference: 'Rujukan: Surah An-Nisa (4:23)',
      tree_grandparents: 'Datuk & Nenek',
      tree_parents: 'Ibu Bapa',
      tree_parents_siblings: 'Saudara Ibu Bapa',
      tree_siblings: 'Adik-beradik',
      tree_spouse: 'Pasangan',
      tree_cousins: 'Sepupu',
      tree_children: 'Anak',
      tree_niblings: 'Anak Saudara',
      tree_grandchildren: 'Cucu',
      tree_inlaws_parent: 'Mertua',
      tree_inlaws_sibling: 'Ipar',
      tree_inlaws_child: 'Menantu',
      tree_step: 'Keluarga Tiri',
      tree_milk: 'Saudara Susuan',
      kadBtn: 'Buat Kad Raya Digital',
      kadTitle: 'Buat Kad Raya',
      kadSubtitle: 'Cipta kad digital unik untuk orang tersayang',
      kadFrom: 'Nama anda',
      kadTo: 'Nama penerima',
      kadMsg: 'Mesej',
      kadTheme: 'Tema warna',
      kadPreview: 'Lihat Preview',
      kadShare: 'Kongsi Kad',
      kadForYou: 'Ada kad Raya untuk',
      kadTap: 'Ketuk untuk buka',
      kadMakeYours: 'Buat Kad Anda',
      kadClose: 'Tutup',
      kadFillName: 'Sila isi nama anda dan penerima',
      kadTpl1: 'Selamat Hari Raya Aidilfitri, maaf zahir & batin. Semoga Syawal ini penuh keberkatan.',
      kadTpl2: 'Salam Aidilfitri! Maaf kalau ada salah silap ye. Jemput datang beraya!',
      kadTpl3: 'Selamat Hari Raya! Ampun maaf segala salah silap. Jangan lupa jemput makan!',
      kadSaveImg: 'Simpan Gambar',
      kadShareThis: 'Kongsi Kad',
      kadSaved: 'Gambar disimpan!',
      or: 'atau',
    },
    en: {
      subtitle: 'Quickly check if you can shake hands with someone',
      pickGender: 'I am a...',
      male: 'Male',
      female: 'Female',
      maleDesc: 'Brother',
      femaleDesc: 'Sister',
      footerNote: 'For more accurate rulings, please consult a scholar.',
      share: 'Share',
      shareText: "I just checked Boleh Salam? — A quick mahram relationship checker!",
      copied: 'Link copied!',
      langToggle: 'BM',
      rayaGreeting: 'Selamat Hari Raya Aidilfitri',
      quickTitle: 'Popular Questions',
      quickNote: '* Between opposite genders',
      qCousin: 'Cousin',
      qCousinA: 'Non-mahram',
      qInlaw: 'In-law sibling',
      qInlawA: 'Non-mahram',
      qMil: 'In-law parent',
      qMilA: 'Mahram',
      treeTitle: 'Mahram Family Tree',
      treeSubtitle: 'Tap a name for more info',
      treeYou: 'YOU',
      treeBoleh: 'Can Salam',
      treeTakBoleh: 'Cannot Salam',
      treeSameGender: 'Same gender — always permissible',
      treeMahramNote: 'Mahram — can salam',
      treeSpouseNote: 'Spouse — can salam',
      treeNonMahramNote: 'Non-mahram — cannot salam',
      treeNasab: 'Blood Relations (Nasab)',
      treeMusaharah: 'Marriage Relations',
      treeRadhaah: 'Milk Relations',
      treeClose: 'Close',
      treeShowSame: 'Show same gender',
      treeHideSame: 'Hide same gender',
      treeReference: 'Reference: Surah An-Nisa (4:23)',
      tree_grandparents: 'Grandparents',
      tree_parents: 'Parents',
      tree_parents_siblings: "Parents' Siblings",
      tree_siblings: 'Siblings',
      tree_spouse: 'Spouse',
      tree_cousins: 'Cousins',
      tree_children: 'Children',
      tree_niblings: 'Nieces & Nephews',
      tree_grandchildren: 'Grandchildren',
      tree_inlaws_parent: 'Parents-in-Law',
      tree_inlaws_sibling: 'Siblings-in-Law',
      tree_inlaws_child: 'Children-in-Law',
      tree_step: 'Step Family',
      tree_milk: 'Milk Relations',
      kadBtn: 'Create Digital Raya Card',
      kadTitle: 'Create Raya Card',
      kadSubtitle: 'Create a unique digital card for your loved ones',
      kadFrom: 'Your name',
      kadTo: 'Recipient name',
      kadMsg: 'Message',
      kadTheme: 'Color theme',
      kadPreview: 'Preview',
      kadShare: 'Share Card',
      kadForYou: 'There is a Raya card for',
      kadTap: 'Tap to open',
      kadMakeYours: 'Make Your Own Card',
      kadClose: 'Close',
      kadFillName: 'Please fill in your name and the recipient',
      kadTpl1: 'Wishing you a blessed Eid al-Fitr. May this Syawal bring happiness and blessings.',
      kadTpl2: 'Happy Hari Raya! Sorry for any wrongdoings. Come visit us!',
      kadTpl3: 'Happy Raya! Forgive me for everything. Come over for a meal!',
      kadSaveImg: 'Save Image',
      kadShareThis: 'Share Card',
      kadSaved: 'Image saved!',
      or: 'or',
    },
  };

  // ========================================
  // Educational Notes
  // ========================================
  const eduNotes = {
    ms: {
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
      milk_mother: 'Ibu susuan mempunyai hukum yang sama seperti ibu kandung dari segi mahram. Syaratnya: penyusuan berlaku sebelum umur 2 tahun.',
      milk_brother: 'Saudara susuan mempunyai hukum seperti saudara kandung dari segi mahram.',
      milk_sister: 'Saudara susuan mempunyai hukum seperti saudara kandung dari segi mahram.',
      milk_father: 'Bapa susuan (suami kepada ibu susuan) mempunyai hukum yang sama seperti bapa kandung dari segi mahram.',
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
      nephew_bro: 'Anak saudara lelaki dari abang/adik adalah mahram kerana hubungan darah.',
    },
    en: {
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
      milk_mother: 'A milk mother has the same mahram status as a biological mother. Condition: breastfeeding occurred before age 2.',
      milk_brother: 'A milk sibling has the same mahram status as a biological sibling.',
      milk_sister: 'A milk sibling has the same mahram status as a biological sibling.',
      milk_father: 'A milk father (husband of the milk mother) has the same mahram status as a biological father.',
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
      nephew_bro: "A brother's son is mahram due to blood relation.",
    },
  };

  // ========================================
  // Family Tree Data — Surah An-Nisa (4:23)
  // ========================================
  const treeData = [
    { id: 'grandparents', members: [
      { ms: 'Datuk', en: 'Grandfather', g: 'm', type: 'mahram', noteId: 'grandfather' },
      { ms: 'Nenek', en: 'Grandmother', g: 'f', type: 'mahram', noteId: 'grandmother' },
    ]},
    { id: 'parents', members: [
      { ms: 'Bapa', en: 'Father', g: 'm', type: 'mahram', noteId: 'father' },
      { ms: 'Ibu', en: 'Mother', g: 'f', type: 'mahram', noteId: 'mother' },
    ]},
    { id: 'parents_siblings', members: [
      { ms: 'Bapa Saudara', en: 'Paternal Uncle', g: 'm', type: 'mahram', noteId: 'paternal_uncle' },
      { ms: 'Ibu Saudara', en: 'Paternal Aunt', g: 'f', type: 'mahram', noteId: 'paternal_aunt' },
      { ms: 'Pak Cik (Ibu)', en: 'Maternal Uncle', g: 'm', type: 'mahram', noteId: 'maternal_uncle' },
      { ms: 'Mak Cik (Ibu)', en: 'Maternal Aunt', g: 'f', type: 'mahram', noteId: 'maternal_aunt' },
    ]},
    { id: 'you', isYou: true },
    { id: 'spouse', members: [
      { ms: 'Isteri', en: 'Wife', g: 'f', type: 'spouse', forUser: 'm', noteId: 'wife' },
      { ms: 'Suami', en: 'Husband', g: 'm', type: 'spouse', forUser: 'f', noteId: 'husband' },
    ]},
    { id: 'siblings', members: [
      { ms: 'Abang / Adik Lelaki', en: 'Brother', g: 'm', type: 'mahram', noteId: 'brother' },
      { ms: 'Kakak / Adik Perempuan', en: 'Sister', g: 'f', type: 'mahram', noteId: 'sister' },
    ]},
    { id: 'cousins', members: [
      { ms: 'Sepupu Lelaki', en: 'Male Cousin', g: 'm', type: 'non-mahram', noteId: 'male_cousin' },
      { ms: 'Sepupu Perempuan', en: 'Female Cousin', g: 'f', type: 'non-mahram', noteId: 'female_cousin' },
    ]},
    { id: 'children', members: [
      { ms: 'Anak Lelaki', en: 'Son', g: 'm', type: 'mahram', noteId: 'son' },
      { ms: 'Anak Perempuan', en: 'Daughter', g: 'f', type: 'mahram', noteId: 'daughter' },
    ]},
    { id: 'niblings', members: [
      { ms: 'Anak Saudara (L)', en: 'Nephew', g: 'm', type: 'mahram', noteId: 'nephew_bro' },
      { ms: 'Anak Saudara (P)', en: 'Niece', g: 'f', type: 'mahram', noteId: 'niece_bro' },
    ]},
    { id: 'grandchildren', members: [
      { ms: 'Cucu Lelaki', en: 'Grandson', g: 'm', type: 'mahram', noteId: 'grandson' },
      { ms: 'Cucu Perempuan', en: 'Granddaughter', g: 'f', type: 'mahram', noteId: 'granddaughter' },
    ]},
    { id: 'divider_musaharah', isDivider: true, label: 'treeMusaharah' },
    { id: 'inlaws_parent', members: [
      { ms: 'Bapa Mertua', en: 'Father-in-Law', g: 'm', type: 'mahram', noteId: 'father_in_law' },
      { ms: 'Ibu Mertua', en: 'Mother-in-Law', g: 'f', type: 'mahram', noteId: 'mother_in_law' },
    ]},
    { id: 'inlaws_sibling', members: [
      { ms: 'Abang / Adik Ipar', en: 'Brother-in-Law', g: 'm', type: 'non-mahram', noteId: 'brother_in_law' },
      { ms: 'Kakak / Adik Ipar', en: 'Sister-in-Law', g: 'f', type: 'non-mahram', noteId: 'sister_in_law' },
    ]},
    { id: 'inlaws_child', members: [
      { ms: 'Menantu Lelaki', en: 'Son-in-Law', g: 'm', type: 'mahram', noteId: 'son_in_law' },
      { ms: 'Menantu Perempuan', en: 'Daughter-in-Law', g: 'f', type: 'mahram', noteId: 'daughter_in_law' },
    ]},
    { id: 'step', members: [
      { ms: 'Bapa Tiri', en: 'Stepfather', g: 'm', type: 'mahram', noteId: 'stepfather' },
      { ms: 'Ibu Tiri', en: 'Stepmother', g: 'f', type: 'mahram', noteId: 'stepmother' },
      { ms: 'Anak Tiri (L)', en: 'Stepson', g: 'm', type: 'mahram', noteId: 'stepson' },
      { ms: 'Anak Tiri (P)', en: 'Stepdaughter', g: 'f', type: 'mahram', noteId: 'stepdaughter' },
    ]},
    { id: 'divider_radhaah', isDivider: true, label: 'treeRadhaah' },
    { id: 'milk', members: [
      { ms: 'Bapa Susuan', en: 'Milk Father', g: 'm', type: 'mahram', noteId: 'milk_father' },
      { ms: 'Ibu Susuan', en: 'Milk Mother', g: 'f', type: 'mahram', noteId: 'milk_mother' },
      { ms: 'Saudara Susuan (L)', en: 'Milk Brother', g: 'm', type: 'mahram', noteId: 'milk_brother' },
      { ms: 'Saudara Susuan (P)', en: 'Milk Sister', g: 'f', type: 'mahram', noteId: 'milk_sister' },
    ]},
  ];

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

    document.getElementById('langToggle').textContent = t('langToggle');

    if (currentStep === 'tree') renderTree();
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

    const outClass = direction === 'forward' ? 'slide-out-left' : 'slide-out-right';
    currentEl.classList.add(outClass);

    setTimeout(() => {
      currentEl.classList.remove('active', outClass, 'slide-in-right', 'slide-in-left');

      const inClass = direction === 'forward' ? 'slide-in-right' : 'slide-in-left';
      nextEl.classList.add('active', inClass);

      currentStep = stepName;

      const backBtn = document.getElementById('backBtn');
      if (stepName === 'welcome') {
        backBtn.classList.remove('visible');
      } else {
        backBtn.classList.add('visible');
      }

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
  // Gender Selection → Tree
  // ========================================
  function selectGender(gender) {
    treeGender = gender;
    renderTree();
    goToStep('tree');
  }

  // ========================================
  // Family Tree
  // ========================================
  function getNodeStatus(nodeGender, nodeType, viewerGender) {
    if (nodeGender === viewerGender) return 'same-gender';
    if (nodeType === 'spouse') return 'spouse';
    if (nodeType === 'mahram') return 'mahram';
    return 'non-mahram';
  }

  function getStatusLabel(status) {
    if (status === 'same-gender') return t('treeSameGender');
    if (status === 'mahram') return t('treeMahramNote');
    if (status === 'spouse') return t('treeSpouseNote');
    return t('treeNonMahramNote');
  }

  function buildNodeEl(member) {
    const status = getNodeStatus(member.g, member.type, treeGender);
    const node = document.createElement('button');
    node.className = `tree-node ${status}`;
    const secLang = currentLang === 'ms' ? 'en' : 'ms';
    node.innerHTML = `
      <span class="tree-node-dot ${status}"></span>
      <div class="tree-node-text">
        <span class="tree-node-name">${member[currentLang]}</span>
        <span class="tree-node-sub">${member[secLang]}</span>
      </div>
      <svg class="tree-node-arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6"/></svg>
    `;
    node.onclick = () => showTreeDetail(member, status);
    return node;
  }

  function buildCard(titleKey, members) {
    const card = document.createElement('div');
    card.className = 'tree-card';
    const header = document.createElement('div');
    header.className = 'tree-card-header';
    header.innerHTML = `<h3 class="tree-card-title">${t(titleKey)}</h3>`;
    card.appendChild(header);
    const body = document.createElement('div');
    body.className = 'tree-card-body';
    for (const m of members) body.appendChild(buildNodeEl(m));
    card.appendChild(body);
    return card;
  }

  function renderTree() {
    const container = document.getElementById('treeContainer');
    container.innerHTML = '';

    // Update gender toggle
    document.querySelectorAll('.tree-gender-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.gender === treeGender);
    });

    // Update same-gender toggle
    const sgToggle = document.getElementById('sameGenderToggle');
    if (sgToggle) {
      sgToggle.querySelector('span').textContent =
        showSameGender ? t('treeHideSame') : t('treeShowSame');
      sgToggle.classList.toggle('active', showSameGender);
    }

    // Collect non-mahram and mahram members across all groups
    const nonMahramGroups = []; // { titleKey, members[] }
    const mahramGroups = [];    // { titleKey, members[], zoneLabel? }

    let currentZoneLabel = null;

    for (const group of treeData) {
      if (group.isYou || group.isDivider) {
        if (group.isDivider) currentZoneLabel = group.label;
        continue;
      }

      const allMembers = group.members.filter(m => !m.forUser || m.forUser === treeGender);
      if (allMembers.length === 0) continue;

      const opposite = allMembers.filter(m => m.g !== treeGender);
      const same = allMembers.filter(m => m.g === treeGender);
      const visible = showSameGender ? allMembers : opposite;
      if (visible.length === 0) continue;

      // Split: non-mahram opposite-gender vs the rest
      const nonMahram = visible.filter(m => {
        const s = getNodeStatus(m.g, m.type, treeGender);
        return s === 'non-mahram';
      });
      const mahram = visible.filter(m => {
        const s = getNodeStatus(m.g, m.type, treeGender);
        return s !== 'non-mahram';
      });

      if (nonMahram.length > 0) {
        nonMahramGroups.push({ titleKey: 'tree_' + group.id, members: nonMahram });
      }
      if (mahram.length > 0) {
        mahramGroups.push({
          titleKey: 'tree_' + group.id,
          members: mahram,
          zoneLabel: currentZoneLabel,
        });
        // Only show zone label once
        currentZoneLabel = null;
      }
    }

    // === RENDER: Tak Boleh Salam zone (top) ===
    if (nonMahramGroups.length > 0) {
      const zone = document.createElement('div');
      zone.className = 'tree-zone tree-zone--danger';

      const header = document.createElement('div');
      header.className = 'tree-zone-header tree-zone-header--danger';
      header.innerHTML = `<span>${t('treeTakBoleh')}</span>`;
      zone.appendChild(header);

      for (const g of nonMahramGroups) {
        zone.appendChild(buildCard(g.titleKey, g.members));
      }
      container.appendChild(zone);
    }

    // === RENDER: Boleh Salam zone (below) ===
    if (mahramGroups.length > 0) {
      const zone = document.createElement('div');
      zone.className = 'tree-zone tree-zone--safe';

      const header = document.createElement('div');
      header.className = 'tree-zone-header tree-zone-header--safe';
      header.innerHTML = `<span>${t('treeBoleh')}</span>`;
      zone.appendChild(header);

      let lastZoneLabel = null;
      for (const g of mahramGroups) {
        // Insert sub-zone divider (Musaharah / Radhaah)
        if (g.zoneLabel && g.zoneLabel !== lastZoneLabel) {
          const divider = document.createElement('div');
          divider.className = 'tree-zone-divider';
          divider.innerHTML = `<span>${t(g.zoneLabel)}</span>`;
          zone.appendChild(divider);
          lastZoneLabel = g.zoneLabel;
        }
        zone.appendChild(buildCard(g.titleKey, g.members));
      }
      container.appendChild(zone);
    }
  }

  function setTreeGender(gender) {
    treeGender = gender;
    renderTree();
  }

  function toggleSameGender() {
    showSameGender = !showSameGender;
    renderTree();
  }

  function showTreeDetail(member, status) {
    const overlay = document.getElementById('treeDetailOverlay');
    const isBoleh = status !== 'non-mahram';
    const note = eduNotes[currentLang][member.noteId] || '';

    document.getElementById('treeDetailName').textContent = member[currentLang];
    document.getElementById('treeDetailNameSec').textContent = member[currentLang === 'ms' ? 'en' : 'ms'];

    const badge = document.getElementById('treeDetailBadge');
    badge.textContent = isBoleh ? t('treeBoleh') : t('treeTakBoleh');
    badge.className = 'tree-detail-badge ' + (isBoleh ? 'boleh' : 'tak-boleh');

    document.getElementById('treeDetailStatus').textContent = getStatusLabel(status);

    const noteEl = document.getElementById('treeDetailNote');
    if (note) {
      noteEl.textContent = note;
      noteEl.classList.remove('hidden');
    } else {
      noteEl.classList.add('hidden');
    }

    overlay.classList.add('visible');
  }

  function hideTreeDetail() {
    document.getElementById('treeDetailOverlay').classList.remove('visible');
  }

  // ========================================
  // Kad Raya Digital
  // ========================================
  const kadThemes = [
    { bg: '#166534', accent: '#c8a45c' },
    { bg: '#7c2d12', accent: '#f59e0b' },
    { bg: '#1e3a5f', accent: '#93c5fd' },
    { bg: '#581c87', accent: '#d8b4fe' },
  ];

  function encodeKad(data) {
    try {
      const b64 = btoa(unescape(encodeURIComponent(JSON.stringify(data))));
      return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    } catch { return ''; }
  }

  function decodeKad(str) {
    try {
      str = str.replace(/-/g, '+').replace(/_/g, '/');
      while (str.length % 4) str += '=';
      return JSON.parse(decodeURIComponent(escape(atob(str))));
    } catch { return null; }
  }

  function checkKadUrl() {
    const params = new URLSearchParams(window.location.search);
    const k = params.get('kad');
    if (k) {
      const data = decodeKad(k);
      if (data && data.f && data.t) {
        // Update OG meta tags for link previews
        const title = `${data.t}, ada Kad Raya untuk anda!`;
        const desc = `${data.f} menghantar kad Raya digital khas untuk ${data.t}. Ketuk untuk buka!`;
        const url = window.location.href;
        const setMeta = (id, val, attr) => { const el = document.getElementById(id); if (el) el.setAttribute(attr || 'content', val); };
        setMeta('ogTitle', title);
        setMeta('ogDesc', desc);
        setMeta('ogUrl', url);
        setMeta('twTitle', title);
        setMeta('twDesc', desc);
        document.title = title;

        showKadView(data);
        return true;
      }
    }
    return false;
  }

  // Card style management
  let kadStyle = 'classic'; // 'classic' or 'code'
  let kadLang = 'js';

  function setKadStyle(style) {
    kadStyle = style;
    document.querySelectorAll('.kad-style-btn').forEach(b => b.classList.toggle('active', b.dataset.style === style));
    document.getElementById('kadClassicOptions').style.display = style === 'classic' ? '' : 'none';
    document.getElementById('kadCodeOptions').style.display = style === 'code' ? '' : 'none';
  }

  function setKadLang(btn) {
    kadLang = btn.dataset.lang;
    document.querySelectorAll('.kad-lang-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  function pickKadTheme(btn) {
    document.querySelectorAll('.kad-theme-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  function useKadTemplate(idx) {
    const key = 'kadTpl' + (idx + 1);
    document.getElementById('kadMsg').value = t(key);
  }

  function getKadData() {
    const from = document.getElementById('kadFrom').value.trim();
    const to = document.getElementById('kadTo').value.trim();
    if (!from || !to) { showToast(t('kadFillName')); return null; }
    const msg = document.getElementById('kadMsg').value.trim() || t('kadTpl1');
    if (kadStyle === 'code') {
      return { f: from, t: to, m: msg, s: 'code', l: kadLang };
    }
    const theme = parseInt(document.querySelector('.kad-theme-btn.active')?.dataset.theme || '0');
    return { f: from, t: to, m: msg, c: theme };
  }

  function previewKad() {
    const data = getKadData();
    if (!data) return;
    showKadView(data, true);
  }

  async function shareKad() {
    const data = getKadData();
    if (!data) return;

    const encoded = encodeKad(data);
    const url = `${window.location.origin}${window.location.pathname}?kad=${encoded}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: 'Kad Raya', text: `${data.t}, ada Kad Raya untuk anda!`, url });
      } catch { /* cancelled */ }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        showToast(t('copied'));
      } catch {
        const ta = document.createElement('textarea');
        ta.value = url;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand('copy');
        document.body.removeChild(ta);
        showToast(t('copied'));
      }
    }
  }

  // ========================================
  // Save Card as Image
  // ========================================
  function saveKadImage() {
    const view = document.getElementById('kadView');
    const isCode = view.classList.contains('code-mode');

    // Create a separate canvas for the screenshot (not the particle canvas)
    const W = 1080, H = 1920; // Instagram Story size
    const c = document.createElement('canvas');
    c.width = W; c.height = H;
    const ctx = c.getContext('2d');

    // Background
    if (isCode) {
      ctx.fillStyle = '#1e1e2e';
      ctx.fillRect(0, 0, W, H);
      // Scanlines
      ctx.strokeStyle = 'rgba(255,255,255,0.03)';
      for (let y = 0; y < H; y += 24) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
    } else {
      ctx.fillStyle = '#fefdf8';
      ctx.fillRect(0, 0, W, H);
      // Diamond pattern
      ctx.strokeStyle = 'rgba(200,164,92,0.06)';
      ctx.lineWidth = 1;
      for (let i = -H; i < W + H; i += 60) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + H, H); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(i + H, 0); ctx.lineTo(i, H); ctx.stroke();
      }
    }

    // Get card data from DOM
    const toName = document.getElementById('kadViewTo').textContent;
    const msg = document.getElementById('kadViewMsg')?.textContent || '';
    const fromName = document.getElementById('kadViewFrom')?.textContent || '';

    if (isCode) {
      // Draw code editor
      const edX = 60, edY = 500, edW = W - 120, edR = 24;

      // Editor bg
      ctx.fillStyle = '#181825';
      ctx.beginPath();
      ctx.roundRect(edX, edY, edW, H - edY - 400, edR);
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Tab bar
      ctx.fillStyle = '#11111b';
      ctx.beginPath();
      ctx.roundRect(edX, edY, edW, 48, [edR, edR, 0, 0]);
      ctx.fill();

      // Dots
      const dotColors = ['#f38ba8','#f9e2af','#a6e3a1'];
      dotColors.forEach((clr, i) => {
        ctx.fillStyle = clr;
        ctx.beginPath();
        ctx.arc(edX + 28 + i * 24, edY + 24, 7, 0, Math.PI * 2);
        ctx.fill();
      });

      // Tab label
      const codeEl = document.getElementById('kadCodeEditor');
      const tabName = codeEl?.querySelector('.code-tab-name')?.textContent || 'JavaScript';
      ctx.fillStyle = 'rgba(205,214,244,0.5)';
      ctx.font = '500 24px "SF Mono", "Courier New", monospace';
      ctx.fillText(tabName, edX + 108, edY + 32);

      // Code lines
      const codeLines = codeEl?.querySelectorAll('.code-line') || [];
      const lineH = 48;
      let cy = edY + 80;
      const colorMap = { ck: '#cba6f7', cs: '#a6e3a1', cc: '#6c7086', cf: '#89b4fa', cv: '#f9e2af', cn: '#fab387', ct: '#f38ba8' };

      codeLines.forEach((line, i) => {
        // Line number
        ctx.fillStyle = 'rgba(205,214,244,0.2)';
        ctx.font = '400 22px "SF Mono", "Courier New", monospace';
        ctx.textAlign = 'right';
        ctx.fillText(String(i + 1), edX + 44, cy + 6);
        ctx.textAlign = 'left';

        // Code text — parse spans for colors
        const textEl = line.querySelector('.code-text');
        if (textEl) {
          let tx = edX + 64;
          textEl.childNodes.forEach(node => {
            if (node.nodeType === 3) {
              ctx.fillStyle = '#cdd6f4';
              ctx.font = '400 24px "SF Mono", "Courier New", monospace';
              ctx.fillText(node.textContent, tx, cy + 6);
              tx += ctx.measureText(node.textContent).width;
            } else if (node.tagName === 'SPAN') {
              const cls = node.className;
              ctx.fillStyle = colorMap[cls] || '#cdd6f4';
              ctx.font = '400 24px "SF Mono", "Courier New", monospace';
              ctx.fillText(node.textContent, tx, cy + 6);
              tx += ctx.measureText(node.textContent).width;
            }
          });
        }
        cy += lineH;
      });

      // Success line
      ctx.fillStyle = '#a6e3a1';
      ctx.font = '600 24px "SF Mono", "Courier New", monospace';
      ctx.fillText('✓ Build successful — Selamat Hari Raya!', edX + 28, cy + 30);

      // Branding
      ctx.fillStyle = 'rgba(205,214,244,0.25)';
      ctx.font = '500 22px "SF Mono", "Courier New", monospace';
      ctx.textAlign = 'center';
      ctx.fillText('bolehsalam.com', W / 2, H - 80);
      ctx.textAlign = 'left';

    } else {
      // Classic card
      const kadBg = getComputedStyle(view).getPropertyValue('--kad-bg').trim() || '#166534';
      const kadAccent = getComputedStyle(view).getPropertyValue('--kad-accent').trim() || '#c8a45c';

      // Greeting
      ctx.fillStyle = kadBg;
      ctx.font = '800 72px "Plus Jakarta Sans", sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('Selamat Hari Raya', W / 2, 620);
      ctx.fillText('Aidilfitri', W / 2, 700);

      // Divider
      ctx.fillStyle = kadAccent;
      ctx.fillRect(W / 2 - 50, 740, 100, 4);

      // Message — word wrap
      ctx.fillStyle = '#374151';
      ctx.font = '500 36px "Plus Jakarta Sans", sans-serif';
      const words = msg.split(' ');
      let line = '', lineY = 810;
      words.forEach(word => {
        const test = line + word + ' ';
        if (ctx.measureText(test).width > W - 160) {
          ctx.fillText(line.trim(), W / 2, lineY);
          line = word + ' ';
          lineY += 52;
        } else {
          line = test;
        }
      });
      if (line.trim()) ctx.fillText(line.trim(), W / 2, lineY);

      // From
      ctx.fillStyle = kadBg;
      ctx.font = '700 40px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('— ' + fromName, W / 2, lineY + 90);

      // Branding
      ctx.fillStyle = 'rgba(0,0,0,0.15)';
      ctx.font = '500 24px "Plus Jakarta Sans", sans-serif';
      ctx.fillText('bolehsalam.com', W / 2, H - 80);
      ctx.textAlign = 'left';
    }

    // Decorative particles on the image
    const sparkColors = isCode
      ? ['#89b4fa','#a6e3a1','#cba6f7','#f9e2af']
      : ['#c8a45c','#d4b876','#22c55e','#f0e4bc'];
    for (let i = 0; i < 40; i++) {
      const sx = Math.random() * W, sy = Math.random() * H;
      const ss = 2 + Math.random() * 5;
      const sc = sparkColors[Math.floor(Math.random() * sparkColors.length)];
      ctx.beginPath();
      ctx.arc(sx, sy, ss, 0, Math.PI * 2);
      ctx.fillStyle = sc;
      ctx.globalAlpha = 0.3 + Math.random() * 0.4;
      ctx.shadowBlur = isCode ? 12 : 4;
      ctx.shadowColor = sc;
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    ctx.shadowBlur = 0;

    // Download
    c.toBlob(blob => {
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'kad-raya-' + toName.replace(/\s+/g, '-').toLowerCase() + '.png';
      a.click();
      URL.revokeObjectURL(url);
      showToast(t('kadSaved'));
    }, 'image/png');
  }

  // ========================================
  // Share Card View (for recipients)
  // ========================================
  async function shareKadView() {
    const view = document.getElementById('kadView');
    const toName = document.getElementById('kadViewTo').textContent;
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Kad Raya dari ' + toName,
          text: 'Saya terima Kad Raya digital! Buat satu untuk orang tersayang anda.',
          url: url.includes('kad=') ? url : window.location.origin + window.location.pathname,
        });
      } catch { /* cancelled */ }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        showToast(t('copied'));
      } catch {
        showToast(t('copied'));
      }
    }
  }

  // HTML escaping for code templates
  function esc(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function getCodeLines(lang, from, to, msg) {
    const f = esc(from), t2 = esc(to), m = esc(msg);
    const templates = {
      js: [
        `<span class="ck">const</span> <span class="cv">rayaGreeting</span> = {`,
        `  <span class="cv">to</span>: <span class="cs">"${t2}"</span>,`,
        `  <span class="cv">from</span>: <span class="cs">"${f}"</span>,`,
        `  <span class="cv">message</span>: <span class="cs">"${m}"</span>,`,
        `};`,
        ``,
        `<span class="cf">console</span>.<span class="cf">log</span>(<span class="cs">"Selamat Hari Raya, "</span> + rayaGreeting.<span class="cv">to</span>);`,
        `<span class="cf">console</span>.<span class="cf">log</span>(rayaGreeting.<span class="cv">message</span>);`,
        `<span class="cc">// — ${f}</span>`,
      ],
      py: [
        `<span class="ck">def</span> <span class="cf">selamat_raya</span>(nama, mesej):`,
        `    <span class="cf">print</span>(<span class="cs">f"Selamat Hari Raya, </span><span class="cv">{nama}</span><span class="cs">!"</span>)`,
        `    <span class="cf">print</span>(mesej)`,
        ``,
        `<span class="cf">selamat_raya</span>(<span class="cs">"${t2}"</span>, <span class="cs">"${m}"</span>)`,
        `<span class="cc"># — ${f}</span>`,
      ],
      git: [
        `<span class="cf">$</span> <span class="ck">cd</span> ~/raya-2026`,
        `<span class="cf">$</span> <span class="ck">git add</span> maaf-zahir-batin`,
        `<span class="cf">$</span> <span class="ck">git commit</span> <span class="cv">-m</span> <span class="cs">"Selamat Hari Raya, ${t2}!"</span>`,
        `<span class="cf">$</span> <span class="ck">git push</span> origin maaf <span class="cv">--force-with-love</span>`,
        ``,
        `<span class="cv">remote:</span> <span class="cs">${m}</span>`,
        `<span class="cv">remote:</span> Delivered successfully!`,
        `<span class="cc"># — ${f}</span>`,
      ],
      sql: [
        `<span class="ck">SELECT</span> <span class="cs">'Selamat Hari Raya'</span> <span class="ck">AS</span> <span class="cv">greeting</span>,`,
        `       <span class="cs">'${t2}'</span> <span class="ck">AS</span> <span class="cv">penerima</span>,`,
        `       <span class="cs">'${m}'</span>`,
        `       <span class="ck">AS</span> <span class="cv">mesej</span>`,
        `<span class="ck">FROM</span>   <span class="cv">hati</span>`,
        `<span class="ck">WHERE</span>  <span class="cv">ikhlas</span> = <span class="cn">TRUE</span>`,
        `<span class="ck">AND</span>    <span class="cv">tahun</span> = <span class="cn">2026</span>;`,
        `<span class="cc">-- — ${f}</span>`,
      ],
      html: [
        `<span class="ct">&lt;html&gt;</span>`,
        `  <span class="ct">&lt;head&gt;</span>`,
        `    <span class="ct">&lt;title&gt;</span><span class="cs">Selamat Hari Raya</span><span class="ct">&lt;/title&gt;</span>`,
        `  <span class="ct">&lt;/head&gt;</span>`,
        `  <span class="ct">&lt;body&gt;</span>`,
        `    <span class="ct">&lt;h1&gt;</span>Selamat Hari Raya, <span class="cv">${t2}</span>!<span class="ct">&lt;/h1&gt;</span>`,
        `    <span class="ct">&lt;p&gt;</span><span class="cs">${m}</span><span class="ct">&lt;/p&gt;</span>`,
        `    <span class="ct">&lt;footer&gt;</span><span class="cc">&mdash; ${f}</span><span class="ct">&lt;/footer&gt;</span>`,
        `  <span class="ct">&lt;/body&gt;</span>`,
        `<span class="ct">&lt;/html&gt;</span>`,
      ],
    };
    return templates[lang] || templates.js;
  }

  function showKadView(data, isPreview = false) {
    const view = document.getElementById('kadView');
    const isCode = data.s === 'code';

    view.classList.toggle('code-mode', isCode);

    if (isCode) {
      view.style.setProperty('--kad-bg', '#1e1e2e');
      view.style.setProperty('--kad-accent', '#89b4fa');

      document.getElementById('kadViewTo').textContent = data.t;

      // Build code editor content
      const lines = getCodeLines(data.l || 'js', data.f, data.t, data.m);
      const langLabel = { js: 'JavaScript', py: 'Python', git: 'Git', sql: 'SQL', html: 'HTML' }[data.l || 'js'];
      const codeEl = document.getElementById('kadCodeEditor');
      codeEl.innerHTML = `<div class="code-tab"><span class="code-tab-dots"><span class="code-tab-dot"></span><span class="code-tab-dot"></span><span class="code-tab-dot"></span></span><span class="code-tab-name">${langLabel}</span></div><div class="code-body">` +
        lines.map((line, i) =>
          `<div class="code-line" style="--line-delay:${0.5 + i * 0.12}s"><span class="code-num">${i + 1}</span><span class="code-text">${line || '&nbsp;'}</span></div>`
        ).join('') + `</div>`;
    } else {
      const theme = kadThemes[data.c] || kadThemes[0];
      view.style.setProperty('--kad-bg', theme.bg);
      view.style.setProperty('--kad-accent', theme.accent);

      document.getElementById('kadViewTo').textContent = data.t;
      document.getElementById('kadViewMsg').textContent = data.m;
      document.getElementById('kadViewFrom').textContent = data.f;
    }

    const ctaBtn = document.getElementById('kadCtaBtn');
    if (ctaBtn) ctaBtn.style.display = isPreview ? 'none' : '';

    // CTA text
    const ctaText = document.getElementById('kadCtaText');
    if (ctaText) ctaText.textContent = isCode ? (currentLang === 'ms' ? 'Fork Kad Ini' : 'Fork This Card') : t('kadMakeYours');

    view.classList.add('active');
    view.classList.remove('opened');
    document.body.style.overflow = 'hidden';
    createAmbientParticles();
  }

  function openKadAnimation() {
    const view = document.getElementById('kadView');
    if (view.classList.contains('opened')) return;

    // Haptic feedback
    if (navigator.vibrate) navigator.vibrate(50);

    view.classList.add('opened');

    // Start infinite canvas particle system
    startKadCanvas(view.classList.contains('code-mode'));

    if (view.classList.contains('code-mode')) {
      typedRevealCode();
    } else {
      createKadSparkles();
      typedRevealClassic();
    }
  }

  function closeKadView() {
    const view = document.getElementById('kadView');
    view.classList.remove('active', 'opened', 'code-mode');
    document.body.style.overflow = '';
    document.getElementById('kadSparkles').innerHTML = '';

    // Clean up typed reveal classes
    const msgEl = document.getElementById('kadViewMsg');
    if (msgEl) msgEl.classList.remove('typed');
    const fromEl = document.querySelector('.kad-opened-from');
    if (fromEl) fromEl.classList.remove('typed-pending', 'typed-show');
    const actionsEl = document.querySelector('.kad-opened-actions');
    if (actionsEl) actionsEl.classList.remove('typed-pending', 'typed-show');

    // Clean up canvas, ambient particles, celebration, code success
    if (kadCanvasCleanup) kadCanvasCleanup();
    const amb = document.getElementById('kadAmbient');
    if (amb) amb.remove();
    const cel = document.querySelector('.celebration');
    if (cel) cel.remove();
    const suc = document.querySelector('.code-success');
    if (suc) suc.remove();

    if (window.location.search.includes('kad=')) {
      window.history.replaceState({}, '', window.location.pathname);
    }
  }

  function kadGoToCreate() {
    closeKadView();
    goToStep('kad-create');
  }

  function createKadSparkles() {
    const container = document.getElementById('kadSparkles');
    container.innerHTML = '';
    const colors = ['var(--kad-accent)', '#fff', '#fff8e1'];
    for (let i = 0; i < 40; i++) {
      const s = document.createElement('div');
      s.className = 'kad-sparkle';
      const angle = (Math.PI * 2 * i) / 40;
      const dist = 80 + Math.random() * 180;
      s.style.setProperty('--x', `${Math.cos(angle) * dist}px`);
      s.style.setProperty('--y', `${Math.sin(angle) * dist}px`);
      s.style.setProperty('--r', `${Math.random() * 720}deg`);
      s.style.setProperty('--delay', `${Math.random() * 0.3}s`);
      s.style.setProperty('--size', `${4 + Math.random() * 8}px`);
      s.style.background = colors[Math.floor(Math.random() * colors.length)];
      container.appendChild(s);
    }
  }

  // ========================================
  // Canvas Particle System (infinite + interactive)
  // ========================================
  let kadCanvasCleanup = null;

  function startKadCanvas(isCode) {
    if (kadCanvasCleanup) kadCanvasCleanup();

    const canvas = document.createElement('canvas');
    canvas.id = 'kadCanvas';
    const view = document.getElementById('kadView');
    view.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let w, h;
    function resize() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    resize();

    const colors = isCode
      ? ['#89b4fa','#a6e3a1','#cba6f7','#f9e2af','#89dceb']
      : ['#c8a45c','#b8942c','#22c55e','#16a34a','#d4b876'];

    // Tuning: subtle on light bg, vivid on dark bg
    const cfg = isCode
      ? { count: 80, minSize: 1, maxSize: 3, blur: 8, minAlpha: 0.2, maxAlpha: 0.5, clear: 0.1, sparkBlur: 10 }
      : { count: 45, minSize: 0.8, maxSize: 1.8, blur: 3, minAlpha: 0.12, maxAlpha: 0.3, clear: 0.2, sparkBlur: 4 };

    // Particles
    const particles = [];
    for (let i = 0; i < cfg.count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        size: cfg.minSize + Math.random() * (cfg.maxSize - cfg.minSize),
        speed: 0.15 + Math.random() * 0.5,
        phase: Math.random() * Math.PI * 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        opacity: cfg.minAlpha + Math.random() * (cfg.maxAlpha - cfg.minAlpha),
        sway: 0.3 + Math.random() * 0.5,
      });
    }

    let sparks = [];
    let bursts = [];
    let animId;
    let running = true;

    function animate() {
      if (!running) return;
      animId = requestAnimationFrame(animate);

      // Semi-transparent clear → glow trails
      const bg = isCode ? '30,30,46' : '254,253,248';
      ctx.fillStyle = 'rgba(' + bg + ',' + cfg.clear + ')';
      ctx.fillRect(0, 0, w, h);

      const now = Date.now();

      // Floating particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.y -= p.speed;
        p.x += Math.sin(p.y * 0.007 + p.phase) * p.sway;

        // Burst pushback
        for (let j = 0; j < bursts.length; j++) {
          const b = bursts[j];
          const dx = p.x - b.x, dy = p.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const age = (now - b.t) / 1000;
          if (dist < 160 && age < 0.6) {
            const force = (1 - age / 0.6) * 5 / Math.max(dist, 8);
            p.x += dx * force;
            p.y += dy * force;
          }
        }

        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < -20) p.x = w + 10;
        if (p.x > w + 20) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.shadowBlur = cfg.blur;
        ctx.shadowColor = p.color;
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      // Sparkle trail particles
      let si = sparks.length;
      while (si--) {
        const s = sparks[si];
        s.life -= 0.018;
        if (s.life <= 0) { sparks.splice(si, 1); continue; }
        s.x += s.vx;
        s.y += s.vy;
        s.vy += 0.08;
        s.vx *= 0.97;
        const a = s.life / s.ml;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * a, 0, Math.PI * 2);
        ctx.shadowBlur = cfg.sparkBlur;
        ctx.shadowColor = s.color;
        ctx.fillStyle = s.color;
        ctx.globalAlpha = a * 0.9;
        ctx.fill();
      }

      ctx.globalAlpha = 1;
      ctx.shadowBlur = 0;

      // Clean old bursts
      bursts = bursts.filter(b => now - b.t < 700);
    }

    function onTap(x, y) {
      bursts.push({ x, y, t: Date.now() });
      const sparkCount = isCode ? 18 : 12;
      for (let i = 0; i < sparkCount; i++) {
        const angle = (Math.PI * 2 * i) / sparkCount + (Math.random() - 0.5) * 0.4;
        const speed = 2 + Math.random() * (isCode ? 5 : 3);
        const life = 0.5 + Math.random() * 0.5;
        sparks.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life, ml: life,
          size: isCode ? (2 + Math.random() * 3) : (1 + Math.random() * 1.5),
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
      if (navigator.vibrate) navigator.vibrate(12);
    }

    function onDrag(x, y) {
      const n = isCode ? 3 : 2;
      for (let i = 0; i < n; i++) {
        const life = 0.3 + Math.random() * 0.3;
        sparks.push({
          x: x + (Math.random() - 0.5) * 14,
          y: y + (Math.random() - 0.5) * 14,
          vx: (Math.random() - 0.5) * 2,
          vy: -1.5 - Math.random() * 2,
          life, ml: life,
          size: isCode ? (1.5 + Math.random() * 2.5) : (0.8 + Math.random() * 1.2),
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    }

    function hClick(e) { onTap(e.clientX, e.clientY); }
    function hTouchS(e) { const t = e.touches[0]; if (t) onTap(t.clientX, t.clientY); }
    function hTouchM(e) { const t = e.touches[0]; if (t) onDrag(t.clientX, t.clientY); }
    function hMouseM(e) { if (e.buttons > 0) onDrag(e.clientX, e.clientY); }

    view.addEventListener('click', hClick);
    view.addEventListener('touchstart', hTouchS, { passive: true });
    view.addEventListener('touchmove', hTouchM, { passive: true });
    view.addEventListener('mousemove', hMouseM);
    window.addEventListener('resize', resize);

    animate();

    kadCanvasCleanup = function() {
      running = false;
      cancelAnimationFrame(animId);
      view.removeEventListener('click', hClick);
      view.removeEventListener('touchstart', hTouchS);
      view.removeEventListener('touchmove', hTouchM);
      view.removeEventListener('mousemove', hMouseM);
      window.removeEventListener('resize', resize);
      canvas.remove();
      kadCanvasCleanup = null;
    };
  }

  // ========================================
  // Ambient Particles (sealed background)
  // ========================================
  function createAmbientParticles() {
    const old = document.getElementById('kadAmbient');
    if (old) old.remove();
    const c = document.createElement('div');
    c.className = 'kad-ambient';
    c.id = 'kadAmbient';
    for (let i = 0; i < 25; i++) {
      const p = document.createElement('div');
      p.className = 'kad-ambient-particle';
      p.style.setProperty('--x', Math.random() * 100 + '%');
      p.style.setProperty('--delay', Math.random() * 5 + 's');
      p.style.setProperty('--dur', 4 + Math.random() * 6 + 's');
      p.style.setProperty('--size', 2 + Math.random() * 4 + 'px');
      c.appendChild(p);
    }
    document.querySelector('.kad-sealed').appendChild(c);
  }

  // ========================================
  // Typed Message Reveal (classic mode)
  // ========================================
  function typedRevealClassic() {
    const msgEl = document.getElementById('kadViewMsg');
    const fromEl = document.querySelector('.kad-opened-from');
    const actionsEl = document.querySelector('.kad-opened-actions');
    const fullText = msgEl.textContent;

    msgEl.classList.add('typed');
    msgEl.textContent = '';
    fromEl.classList.add('typed-pending');
    actionsEl.classList.add('typed-pending');

    // Wait for greeting + divider CSS transitions (~1.2s)
    setTimeout(() => {
      let i = 0;
      const cursor = document.createElement('span');
      cursor.className = 'typing-cursor';
      msgEl.appendChild(cursor);

      function typeChar() {
        if (i < fullText.length) {
          cursor.before(document.createTextNode(fullText[i]));
          i++;
          const ch = fullText[i - 1];
          const delay = (ch === '.' || ch === '!' || ch === '?') ? 140
                      : (ch === ',') ? 90
                      : (ch === ' ') ? 50
                      : 30;
          setTimeout(typeChar, delay);
        } else {
          setTimeout(() => {
            cursor.remove();
            fromEl.classList.remove('typed-pending');
            fromEl.classList.add('typed-show');
            setTimeout(() => {
              actionsEl.classList.remove('typed-pending');
              actionsEl.classList.add('typed-show');
              createCelebration(false);
              if (navigator.vibrate) navigator.vibrate([80, 40, 80]);
            }, 700);
          }, 400);
        }
      }
      typeChar();
    }, 1200);
  }

  // ========================================
  // Code Reveal with Cursor (coder mode)
  // ========================================
  function typedRevealCode() {
    const codeBody = document.querySelector('.code-body');
    const lines = codeBody ? codeBody.querySelectorAll('.code-line') : [];
    const actionsEl = document.querySelector('.kad-opened-actions');
    actionsEl.classList.add('typed-pending');

    const totalDelay = lines.length > 0 ? (0.5 + lines.length * 0.12 + 0.4) : 1.5;

    setTimeout(() => {
      // Add blinking cursor on last line
      const lastLine = lines[lines.length - 1];
      const cursorEl = document.createElement('span');
      cursorEl.className = 'code-cursor';
      if (lastLine) lastLine.querySelector('.code-text').appendChild(cursorEl);

      // After cursor blinks, show success + celebrate
      setTimeout(() => {
        cursorEl.remove();
        const success = document.createElement('div');
        success.className = 'code-success';
        success.textContent = '✓ Build successful — Selamat Hari Raya!';
        const editor = document.getElementById('kadCodeEditor');
        if (editor) editor.appendChild(success);

        actionsEl.classList.remove('typed-pending');
        actionsEl.classList.add('typed-show');
        createCelebration(true);
        if (navigator.vibrate) navigator.vibrate([80, 40, 80]);
      }, 1200);
    }, totalDelay * 1000);
  }

  // ========================================
  // Firework Celebration
  // ========================================
  function createCelebration(isCode) {
    const old = document.querySelector('.celebration');
    if (old) old.remove();
    const container = document.createElement('div');
    container.className = 'celebration';
    document.getElementById('kadView').appendChild(container);

    const palettes = isCode
      ? [['#89b4fa','#89dceb','#b4befe'],['#a6e3a1','#94e2d5','#f9e2af'],['#cba6f7','#f38ba8','#fab387']]
      : [['#c8a45c','#d4b876','#f0e4bc'],['#22c55e','#16a34a','#dcfce7'],['#fff','#faf3e0','#e0cc90']];

    // 5 firework bursts at staggered positions
    const bursts = [
      { x: 25, y: 22, delay: 0 },
      { x: 72, y: 18, delay: 0.6 },
      { x: 50, y: 12, delay: 1.1 },
      { x: 18, y: 28, delay: 1.7 },
      { x: 78, y: 24, delay: 2.2 },
    ];

    bursts.forEach((b, idx) => {
      const palette = palettes[idx % palettes.length];

      // Rocket trail
      const rocket = document.createElement('div');
      rocket.className = 'fw-rocket';
      rocket.style.setProperty('--left', b.x + '%');
      rocket.style.setProperty('--delay', b.delay + 's');
      rocket.style.setProperty('--rise', (100 - b.y) + '%');
      rocket.style.setProperty('--color', palette[0]);
      container.appendChild(rocket);

      // Burst container
      const burst = document.createElement('div');
      burst.className = 'fw-burst';
      burst.style.setProperty('--left', b.x + '%');
      burst.style.setProperty('--top', b.y + '%');

      // Glow flash
      const flash = document.createElement('div');
      flash.className = 'fw-flash';
      flash.style.setProperty('--flash-delay', (b.delay + 0.45) + 's');
      flash.style.setProperty('--color', palette[0]);
      burst.appendChild(flash);

      // Explosion particles
      const particleCount = 30 + Math.floor(Math.random() * 10);
      for (let i = 0; i < particleCount; i++) {
        const p = document.createElement('div');
        p.className = 'fw-particle';
        const angle = (Math.PI * 2 * i) / particleCount + (Math.random() - 0.5) * 0.3;
        const dist = 40 + Math.random() * 90;
        p.style.setProperty('--x', (Math.cos(angle) * dist) + 'px');
        p.style.setProperty('--y', (Math.sin(angle) * dist) + 'px');
        p.style.setProperty('--gravity', (50 + Math.random() * 60) + 'px');
        p.style.setProperty('--color', palette[Math.floor(Math.random() * palette.length)]);
        p.style.setProperty('--size', (2 + Math.random() * 4) + 'px');
        p.style.setProperty('--dur', (0.7 + Math.random() * 0.5) + 's');
        p.style.setProperty('--p-delay', (b.delay + 0.45 + Math.random() * 0.08) + 's');
        burst.appendChild(p);
      }

      container.appendChild(burst);
    });

    // Sparkle rain after fireworks settle
    setTimeout(() => {
      const sparkleColors = isCode
        ? ['#89b4fa','#a6e3a1','#cba6f7','#f9e2af']
        : ['#c8a45c','#d4b876','#f0e4bc','#fff'];
      for (let i = 0; i < 50; i++) {
        const s = document.createElement('div');
        s.className = 'sparkle-rain';
        s.style.setProperty('--left', Math.random() * 100 + '%');
        s.style.setProperty('--color', sparkleColors[Math.floor(Math.random() * sparkleColors.length)]);
        s.style.setProperty('--s-delay', Math.random() * 2 + 's');
        s.style.setProperty('--size', (2 + Math.random() * 3) + 'px');
        s.style.setProperty('--fall-dur', (3 + Math.random() * 3) + 's');
        s.style.setProperty('--drift', (Math.random() * 40 - 20) + 'px');
        container.appendChild(s);
      }
    }, 2500);

    setTimeout(() => container.remove(), 9000);
  }

  // ========================================
  // Share
  // ========================================
  async function shareApp() {
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
    treeGender = 'm';
    showSameGender = false;
    stepHistory.length = 0;

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
    checkKadUrl();
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
  window.goToStep = goToStep;
  window.goBack = goBack;
  window.resetApp = resetApp;
  window.shareApp = shareApp;
  window.quickCheck = quickCheck;
  window.setTreeGender = setTreeGender;
  window.toggleSameGender = toggleSameGender;
  window.hideTreeDetail = hideTreeDetail;
  window.setKadStyle = setKadStyle;
  window.setKadLang = setKadLang;
  window.pickKadTheme = pickKadTheme;
  window.useKadTemplate = useKadTemplate;
  window.previewKad = previewKad;
  window.shareKad = shareKad;
  window.openKadAnimation = openKadAnimation;
  window.closeKadView = closeKadView;
  window.kadGoToCreate = kadGoToCreate;
  window.saveKadImage = saveKadImage;
  window.shareKadView = shareKadView;
})();

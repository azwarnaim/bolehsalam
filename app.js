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

    let zoneContainer = document.createElement('div');
    zoneContainer.className = 'tree-zone';
    container.appendChild(zoneContainer);

    for (const group of treeData) {
      // ANDA centerpiece
      if (group.isYou) {
        const youEl = document.createElement('div');
        youEl.className = 'tree-you';
        youEl.innerHTML = `
          <div class="tree-you-connector"></div>
          <span class="tree-you-label">${t('treeYou')}</span>
          <div class="tree-you-connector"></div>
        `;
        container.appendChild(youEl);

        // New zone for post-ANDA groups
        zoneContainer = document.createElement('div');
        zoneContainer.className = 'tree-zone';
        container.appendChild(zoneContainer);
        continue;
      }

      // Section dividers (Musaharah / Radhaah)
      if (group.isDivider) {
        zoneContainer = document.createElement('div');
        zoneContainer.className = 'tree-zone';
        const header = document.createElement('div');
        header.className = 'tree-zone-header';
        header.innerHTML = `<span>${t(group.label)}</span>`;
        zoneContainer.appendChild(header);
        container.appendChild(zoneContainer);
        continue;
      }

      // Filter members
      const allMembers = group.members.filter(m => !m.forUser || m.forUser === treeGender);
      if (allMembers.length === 0) continue;

      const opposite = allMembers.filter(m => m.g !== treeGender);
      const same = allMembers.filter(m => m.g === treeGender);
      const visible = showSameGender ? allMembers : opposite;

      // If all members are same-gender and hidden, show collapsed card
      if (visible.length === 0 && same.length > 0) {
        const card = document.createElement('div');
        card.className = 'tree-card tree-card--collapsed';
        card.innerHTML = `
          <div class="tree-card-header">
            <h3 class="tree-card-title">${t('tree_' + group.id)}</h3>
            <span class="tree-card-samegender-badge">${t('treeSameGender')}</span>
          </div>
        `;
        zoneContainer.appendChild(card);
        continue;
      }

      // Build card
      const card = document.createElement('div');
      card.className = 'tree-card';

      const header = document.createElement('div');
      header.className = 'tree-card-header';
      header.innerHTML = `<h3 class="tree-card-title">${t('tree_' + group.id)}</h3>`;
      card.appendChild(header);

      const body = document.createElement('div');
      body.className = 'tree-card-body';

      for (const member of visible) {
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
        body.appendChild(node);
      }

      card.appendChild(body);
      zoneContainer.appendChild(card);
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
})();

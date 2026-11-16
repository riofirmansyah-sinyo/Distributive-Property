import { Language } from '../types/worksheet';

export interface CopyDictionary {
  brand: string;
  navDashboard: string;
  navWorksheet: string;
  navSandbox: string;
  navPrint: string;
  navGuide: string;
  newRandomSet: string;
  heroTitle: string;
  heroSubtitle: string;
  studentLabel: string;
  classLabel: string;
  editProfileLink: string;
  levelLabel: string;
  levelAll: string;
  level1: string;
  level2: string;
  level3: string;
  typeLabel: string;
  typeAll: string;
  typeArray: string;
  typeArea: string;
  typeStep: string;
  typeMissing: string;
  countLabel: string;
  questionsUnit: string;
  checkAll: string;
  resetAnswers: string;
  progressLabel: string;
  scoreLabel: string;
  bestScoreLabel: string;
  questionWord: string;
  ofWord: string;
  levelShort: string;
  kindNames: {
    array_split: string;
    area_model: string;
    step_by_step: string;
    missing_factor: string;
  };
  prompts: {
    array_split: string;
    area_model: string;
    step_by_step: string;
    missing_factor: string;
  };
  clickGridHint: string;
  splitAtLabel: string;
  partLabel: string;
  totalAreaLabel: string;
  breakApartLabel: string;
  multiplyEachLabel: string;
  addProductsLabel: string;
  fillMissingLabel: string;
  checkBtn: string;
  hintBtn: string;
  hideHintBtn: string;
  statusCorrect: string;
  statusNeedsCheck: string;
  statusNotChecked: string;
  errorSplitSum: string;
  errorPartial: string;
  errorTotal: string;
  errorMissing: string;
  hintText: {
    array_split: string;
    area_model: string;
    step_by_step: string;
    missing_factor: string;
  };
  dashboard: {
    welcomeGuest: string;
    welcomeNamed: string;
    heroDesc: string;
    startPracticeBtn: string;
    openSandboxBtn: string;
    profileTitle: string;
    nameLabel: string;
    namePlaceholder: string;
    classInputLabel: string;
    classPlaceholder: string;
    avatarLabel: string;
    saveProfileBtn: string;
    savedFeedback: string;
    avatarNames: {
      owl: string;
      fox: string;
      bot: string;
    };
    kpiCompletedSets: string;
    kpiProblemsSolved: string;
    kpiBestAccuracy: string;
    kpiActiveStudent: string;
    guestValue: string;
    quickLaunchTitle: string;
    quickLaunchSubtitle: string;
    launchCards: Array<{
      level: 1 | 2 | 3 | 'mixed';
      title: string;
      desc: string;
      sample: string;
      cta: string;
    }>;
    spotlightTitle: string;
    spotlightDesc: string;
    spotlightBtn: string;
    historyTitle: string;
    historyEmpty: string;
    colDate: string;
    colStudent: string;
    colLevel: string;
    colScore: string;
    colAccuracy: string;
    clearHistoryBtn: string;
  };
  sandbox: {
    title: string;
    subtitle: string;
    rowsLabel: string;
    colsLabel: string;
    splitLabel: string;
    presetsLabel: string;
    presetTen: string;
    presetFive: string;
    presetHalf: string;
    equationTitle: string;
    step1: string;
    step2: string;
    step3: string;
    conceptNote: string;
  };
  printView: {
    title: string;
    subtitle: string;
    printNow: string;
    toggleAnswerKey: string;
    showKey: string;
    hideKey: string;
    studentName: string;
    studentClass: string;
    studentDate: string;
    studentScore: string;
    instructions: string;
    answerKeyTitle: string;
    workspacePrompt: string;
  };
  guide: {
    title: string;
    subtitle: string;
    ruleTitle: string;
    ruleFormula: string;
    ruleDesc: string;
    stepsTitle: string;
    stepItems: Array<{ title: string; detail: string; example: string }>;
    visualExampleTitle: string;
    visualExampleCaption: string;
    tipsTitle: string;
    tips: string[];
  };
}

export const COPY: Record<Language, CopyDictionary> = {
  en: {
    brand: 'DistriMath Grade 4',
    navDashboard: 'Dashboard',
    navWorksheet: 'Worksheet',
    navSandbox: 'Area Sandbox',
    navPrint: 'Print View',
    navGuide: 'Guide',
    newRandomSet: 'New Random Set',
    heroTitle: 'Interactive Distributive Property Worksheet',
    heroSubtitle: 'Break apart multi-digit multiplication into friendly parts with live area models and auto-generated problems.',
    studentLabel: 'Student',
    classLabel: 'Class',
    editProfileLink: 'Edit Profile',
    levelLabel: 'Level',
    levelAll: 'Mixed',
    level1: 'Level 1 · Basic (1-Digit)',
    level2: 'Level 2 · 2-Digit × 1-Digit',
    level3: 'Level 3 · 3-Digit × 1-Digit',
    typeLabel: 'Type',
    typeAll: 'All Types',
    typeArray: 'Tile Grid',
    typeArea: 'Area Model',
    typeStep: 'Break Apart',
    typeMissing: 'Missing Number',
    countLabel: 'Length',
    questionsUnit: 'Items',
    checkAll: 'Check All',
    resetAnswers: 'Reset Answers',
    progressLabel: 'Answered',
    scoreLabel: 'Score',
    bestScoreLabel: 'Best Accuracy',
    questionWord: 'Question',
    ofWord: 'of',
    levelShort: 'Level',
    kindNames: {
      array_split: 'Interactive Tile Grid',
      area_model: 'Area Model',
      step_by_step: 'Place Value Break-Apart',
      missing_factor: 'Missing Number Match',
    },
    prompts: {
      array_split: 'Move the split line on the tile grid, then find the area of each section and the total.',
      area_model: 'Use the Area Model to calculate each partial product, then add them together.',
      step_by_step: 'Break apart the factor into friendly parts (such as tens + ones), multiply each part, and add.',
      missing_factor: 'Find the missing number that makes both sides of the distributive equation equal.',
    },
    clickGridHint: 'Click a column divider above the grid or drag the slider to move the split.',
    splitAtLabel: 'Split Line',
    partLabel: 'Part',
    totalAreaLabel: 'Total Area',
    breakApartLabel: '1. Break Apart Factor',
    multiplyEachLabel: '2. Multiply Each Part',
    addProductsLabel: '3. Add Partial Products',
    fillMissingLabel: 'Fill the Missing Value',
    checkBtn: 'Check',
    hintBtn: 'Show Hint',
    hideHintBtn: 'Hide Hint',
    statusCorrect: 'Correct',
    statusNeedsCheck: 'Check Again',
    statusNotChecked: 'Not Checked',
    errorSplitSum: 'Your split parts must add up to the original number.',
    errorPartial: 'Check this partial product calculation.',
    errorTotal: 'Check the total sum of your partial products.',
    errorMissing: 'That value does not balance both sides of the equation.',
    hintText: {
      array_split: 'Multiply rows by columns for the blue section and orange section separately, then add both products.',
      area_model: 'Fill each box by multiplying the left side factor by the number above that box.',
      step_by_step: 'Split the number by place value (for example, 24 = 20 + 4), multiply each part, then add.',
      missing_factor: 'Remember a × (b + c) = (a × b) + (a × c). The outside factor distributes to every number inside.',
    },
    dashboard: {
      welcomeGuest: 'Welcome to Your Grade 4 Math Studio',
      welcomeNamed: 'Ready to practice, {name}?',
      heroDesc: 'Write your name below to personalize your worksheets, choose a companion mascot, and track your distributive property mastery.',
      startPracticeBtn: 'Start Worksheet',
      openSandboxBtn: 'Explore Area Sandbox',
      profileTitle: 'Student Check-In',
      nameLabel: 'Student Name',
      namePlaceholder: 'Enter your full name...',
      classInputLabel: 'Grade / Class',
      classPlaceholder: 'e.g. Grade 4A',
      avatarLabel: 'Choose Your Math Companion',
      saveProfileBtn: 'Save Profile',
      savedFeedback: 'Profile saved',
      avatarNames: {
        owl: 'Professor Owl',
        fox: 'Clever Fox',
        bot: 'Study Bot',
      },
      kpiCompletedSets: 'Worksheets Checked',
      kpiProblemsSolved: 'Problems Solved',
      kpiBestAccuracy: 'Best Accuracy',
      kpiActiveStudent: 'Active Student',
      guestValue: 'Guest Learner',
      quickLaunchTitle: 'Choose a Practice Level',
      quickLaunchSubtitle: 'Each button automatically generates a fresh random set of interactive Grade 4 problems.',
      launchCards: [
        {
          level: 1,
          title: 'Level 1 · Basic Facts',
          desc: 'Use interactive tile grids and friendly 5s or 10s splits to master core multiplication.',
          sample: '6 × 8 = 6 × (5 + 3)',
          cta: 'Practice Level 1',
        },
        {
          level: 2,
          title: 'Level 2 · 2-Digit × 1-Digit',
          desc: 'Break apart tens and ones with proportional area models for faster mental math.',
          sample: '7 × 24 = (7 × 20) + (7 × 4)',
          cta: 'Practice Level 2',
        },
        {
          level: 3,
          title: 'Level 3 · 3-Digit × 1-Digit',
          desc: 'Expand hundreds, tens, and ones across three colored area sections.',
          sample: '4 × 135 = 400 + 120 + 20',
          cta: 'Practice Level 3',
        },
        {
          level: 'mixed',
          title: 'Mixed Mastery Set',
          desc: 'Combine tile grids, area models, break-aparts, and missing-factor puzzles in one sheet.',
          sample: '8 × (30 + 6) = (8 × __) + (8 × 6)',
          cta: 'Start Mixed Set',
        },
      ],
      spotlightTitle: 'Why Splitting Rectangles Works',
      spotlightDesc: 'Big multiplication problems become easy when you split one wide rectangle into two friendly pieces. Try sliding the divider yourself in the Area Sandbox.',
      spotlightBtn: 'Try Area Sandbox',
      historyTitle: 'Recent Worksheet Results',
      historyEmpty: 'Complete and check a worksheet to see your scores recorded here.',
      colDate: 'Time',
      colStudent: 'Student',
      colLevel: 'Level',
      colScore: 'Score',
      colAccuracy: 'Accuracy',
      clearHistoryBtn: 'Clear History',
    },
    sandbox: {
      title: 'Interactive Area Model Sandbox',
      subtitle: 'Adjust the rectangle dimensions and slide the split bar to see the distributive property in real time.',
      rowsLabel: 'Rows (a)',
      colsLabel: 'Total Columns (b + c)',
      splitLabel: 'Split Position',
      presetsLabel: 'Friendly Splits',
      presetTen: 'Tens + Ones',
      presetFive: 'Friendly 5s',
      presetHalf: 'Split Half',
      equationTitle: 'Live Equation Breakdown',
      step1: 'Expanded Form',
      step2: 'Partial Products',
      step3: 'Total Area',
      conceptNote: 'Moving the split bar changes the size of each section, while the total number of tiles stays unchanged.',
    },
    printView: {
      title: 'Grade 4 Math Worksheet: Distributive Property',
      subtitle: 'Clean A4 print layout generated from your active random problem set.',
      printNow: 'Print / Save PDF',
      toggleAnswerKey: 'Answer Key',
      showKey: 'Include Answer Key',
      hideKey: 'Hide Answer Key',
      studentName: 'Name',
      studentClass: 'Class',
      studentDate: 'Date',
      studentScore: 'Score',
      instructions: 'Directions: Break apart each factor into friendly parts, find the partial products, and add to solve.',
      answerKeyTitle: 'Teacher Answer Key',
      workspacePrompt: 'Show your work:',
    },
    guide: {
      title: 'Understanding the Distributive Property',
      subtitle: 'A mental math strategy to break big multiplication problems into smaller, friendly pieces.',
      ruleTitle: 'Core Rule',
      ruleFormula: 'a × (b + c) = (a × b) + (a × c)',
      ruleDesc: 'Multiplying a number by a sum gives the exact same result as multiplying each addend separately and adding the products.',
      stepsTitle: 'Three Steps for Grade 4',
      stepItems: [
        {
          title: '1. Break Apart the Larger Factor',
          detail: 'Expand a 2-digit or 3-digit number into place value parts (tens and ones).',
          example: '24 becomes 20 + 4',
        },
        {
          title: '2. Multiply Each Part',
          detail: 'Distribute the outside factor to each piece using basic multiplication facts.',
          example: '6 × 20 = 120 and 6 × 4 = 24',
        },
        {
          title: '3. Add Partial Products',
          detail: 'Combine the partial products together to find the final answer.',
          example: '120 + 24 = 144',
        },
      ],
      visualExampleTitle: 'Visual Area Model Example: 6 × 24',
      visualExampleCaption: 'A 6 × 24 rectangle splits into a blue section (6 × 20 = 120) and an amber section (6 × 4 = 24).',
      tipsTitle: 'Practice Tips',
      tips: [
        'For 1-digit numbers like 7 or 8, split using friendly 5s (such as 7 = 5 + 2).',
        'For 2-digit numbers like 36, split by place value (30 + 6) so tens multiplication is instant.',
        'Estimate first to check whether your final sum makes sense.',
      ],
    },
  },
  id: {
    brand: 'DistriMath Kelas 4',
    navDashboard: 'Dasbor',
    navWorksheet: 'Lembar Kerja',
    navSandbox: 'Eksplorasi Area',
    navPrint: 'Cetak Soal',
    navGuide: 'Panduan',
    newRandomSet: 'Buat Soal Acak',
    heroTitle: 'Worksheet Interaktif Sifat Distributif',
    heroSubtitle: 'Pecah perkalian besar menjadi bagian yang mudah dihitung dengan model area visual dan soal acak otomatis.',
    studentLabel: 'Siswa',
    classLabel: 'Kelas',
    editProfileLink: 'Ubah Profil',
    levelLabel: 'Tingkat',
    levelAll: 'Campuran',
    level1: 'Level 1 · Dasar (1-Digit)',
    level2: 'Level 2 · 2-Digit × 1-Digit',
    level3: 'Level 3 · 3-Digit × 1-Digit',
    typeLabel: 'Tipe Soal',
    typeAll: 'Semua Tipe',
    typeArray: 'Grid Petak',
    typeArea: 'Model Area',
    typeStep: 'Urai & Hitung',
    typeMissing: 'Angka Hilang',
    countLabel: 'Jumlah',
    questionsUnit: 'Soal',
    checkAll: 'Periksa Semua',
    resetAnswers: 'Ulangi Jawaban',
    progressLabel: 'Terjawab',
    scoreLabel: 'Skor',
    bestScoreLabel: 'Akurasi Terbaik',
    questionWord: 'Soal',
    ofWord: 'dari',
    levelShort: 'Level',
    kindNames: {
      array_split: 'Grid Petak Visual',
      area_model: 'Model Area',
      step_by_step: 'Urai Nilai Tempat',
      missing_factor: 'Lengkapi Persamaan',
    },
    prompts: {
      array_split: 'Geser garis pemisah pada grid petak, lalu hitung luas masing-masing bagian dan totalnya.',
      area_model: 'Gunakan Model Area untuk mencari hasil perkalian parsial lalu jumlahkan keduanya.',
      step_by_step: 'Pecah bilangan menjadi bagian yang mudah (seperti puluhan + satuan), kalikan, lalu jumlahkan.',
      missing_factor: 'Temukan bilangan yang tepat untuk melengkapi persamaan sifat distributif berikut.',
    },
    clickGridHint: 'Klik angka kolom di atas grid atau geser slider untuk memindahkan garis pemisah.',
    splitAtLabel: 'Garis Pemisah',
    partLabel: 'Bagian',
    totalAreaLabel: 'Total Luas',
    breakApartLabel: '1. Pecah Bilangan',
    multiplyEachLabel: '2. Kalikan Tiap Bagian',
    addProductsLabel: '3. Jumlahkan Hasil',
    fillMissingLabel: 'Lengkapi Angka yang Hilang',
    checkBtn: 'Periksa',
    hintBtn: 'Lihat Petunjuk',
    hideHintBtn: 'Tutup Petunjuk',
    statusCorrect: 'Benar',
    statusNeedsCheck: 'Periksa Lagi',
    statusNotChecked: 'Belum Diperiksa',
    errorSplitSum: 'Jumlah pecahan harus sama dengan bilangan awal.',
    errorPartial: 'Hasil kali bagian ini belum tepat.',
    errorTotal: 'Jumlah total belum tepat.',
    errorMissing: 'Angka yang diisikan belum membuat kedua sisi sama besar.',
    hintText: {
      array_split: 'Hitung jumlah baris dikali jumlah kolom di sisi kiri (biru) dan sisi kanan (oranye), lalu jumlahkan keduanya.',
      area_model: 'Isi setiap kotak area dengan mengalikan faktor di sisi kiri dengan panjang bagian di atasnya.',
      step_by_step: 'Pecah bilangan sesuai nilai tempatnya (misalnya 24 = 20 + 4), kalikan masing-masing dengan faktor pengali, lalu jumlahkan.',
      missing_factor: 'Ingat pola a × (b + c) = (a × b) + (a × c). Faktor luar dikalikan ke setiap bilangan di dalam kurung.',
    },
    dashboard: {
      welcomeGuest: 'Selamat Datang di Studio Matematika Kelas 4',
      welcomeNamed: 'Siap berlatih, {name}?',
      heroDesc: 'Tulis namamu di bawah ini untuk mempersonalisasi lembar kerja, memilih teman belajar, dan memantau perkembanganmu.',
      startPracticeBtn: 'Mulai Latihan',
      openSandboxBtn: 'Buka Eksplorasi Area',
      profileTitle: 'Identitas Siswa',
      nameLabel: 'Nama Lengkap Siswa',
      namePlaceholder: 'Ketik namamu di sini...',
      classInputLabel: 'Kelas',
      classPlaceholder: 'contoh: Kelas 4A',
      avatarLabel: 'Pilih Teman Belajar',
      saveProfileBtn: 'Simpan Profil',
      savedFeedback: 'Profil tersimpan',
      avatarNames: {
        owl: 'Burung Hantu',
        fox: 'Rubah Cerdik',
        bot: 'Robot Belajar',
      },
      kpiCompletedSets: 'Set Selesai',
      kpiProblemsSolved: 'Soal Benar',
      kpiBestAccuracy: 'Akurasi Terbaik',
      kpiActiveStudent: 'Siswa Aktif',
      guestValue: 'Belum Diisi',
      quickLaunchTitle: 'Pilih Level Latihan',
      quickLaunchSubtitle: 'Setiap tombol otomatis membuat set soal acak baru yang berbeda.',
      launchCards: [
        {
          level: 1,
          title: 'Level 1 · Fakta Dasar',
          desc: 'Gunakan grid petak interaktif dan pecahan angka 5 atau 10.',
          sample: '6 × 8 = 6 × (5 + 3)',
          cta: 'Latih Level 1',
        },
        {
          level: 2,
          title: 'Level 2 · 2-Digit × 1-Digit',
          desc: 'Urai puluhan dan satuan menggunakan model area proporsional.',
          sample: '7 × 24 = (7 × 20) + (7 × 4)',
          cta: 'Latih Level 2',
        },
        {
          level: 3,
          title: 'Level 3 · 3-Digit × 1-Digit',
          desc: 'Pecah ratusan, puluhan, dan satuan ke dalam tiga bagian area.',
          sample: '4 × 135 = 400 + 120 + 20',
          cta: 'Latih Level 3',
        },
        {
          level: 'mixed',
          title: 'Latihan Campuran',
          desc: 'Gabungkan semua tipe soal dan tingkat kesulitan dalam satu lembar kerja.',
          sample: '8 × (30 + 6) = (8 × __) + (8 × 6)',
          cta: 'Mulai Campuran',
        },
      ],
      spotlightTitle: 'Mengapa Memecah Persegi Panjang Membantu?',
      spotlightDesc: 'Perkalian besar menjadi jauh lebih mudah ketika satu persegi panjang lebar dipecah menjadi dua bagian yang ramah. Coba geser pembaginya di Eksplorasi Area.',
      spotlightBtn: 'Coba Eksplorasi Area',
      historyTitle: 'Riwayat Nilai Terbaru',
      historyEmpty: 'Selesaikan dan periksa lembar kerja untuk melihat catatan skormu di sini.',
      colDate: 'Waktu',
      colStudent: 'Siswa',
      colLevel: 'Tingkat',
      colScore: 'Skor',
      colAccuracy: 'Akurasi',
      clearHistoryBtn: 'Hapus Riwayat',
    },
    sandbox: {
      title: 'Eksplorasi Model Area Interaktif',
      subtitle: 'Ubah ukuran persegi panjang dan geser garis pemisah untuk melihat cara kerja sifat distributif secara langsung.',
      rowsLabel: 'Jumlah Baris (a)',
      colsLabel: 'Total Kolom (b + c)',
      splitLabel: 'Posisi Pemisah',
      presetsLabel: 'Pecahan Cepat',
      presetTen: 'Puluhan + Satuan',
      presetFive: 'Kelipatan 5',
      presetHalf: 'Bagi Dua',
      equationTitle: 'Persamaan Langsung',
      step1: 'Bentuk Pecahan',
      step2: 'Perkalian Parsial',
      step3: 'Total Luas',
      conceptNote: 'Menggeser garis pemisah mengubah ukuran tiap bagian, tetapi total seluruh petak selalu tetap sama.',
    },
    printView: {
      title: 'Lembar Kerja Matematika Kelas 4: Sifat Distributif',
      subtitle: 'Tampilan siap cetak A4 menggunakan soal acak yang sedang aktif.',
      printNow: 'Cetak / Simpan PDF',
      toggleAnswerKey: 'Kunci Jawaban',
      showKey: 'Tampilkan Kunci Jawaban',
      hideKey: 'Sembunyikan Kunci Jawaban',
      studentName: 'Nama',
      studentClass: 'Kelas',
      studentDate: 'Tanggal',
      studentScore: 'Nilai',
      instructions: 'Petunjuk: Pecahlah bilangan menjadi bagian yang mudah dihitung, tuliskan hasil kali parsialnya, lalu tentukan hasil akhirnya.',
      answerKeyTitle: 'Kunci Jawaban Guru',
      workspacePrompt: 'Langkah pengerjaan:',
    },
    guide: {
      title: 'Memahami Sifat Distributif Perkalian',
      subtitle: 'Strategi memecah perkalian besar menjadi bagian kecil yang mudah dihitung di luar kepala.',
      ruleTitle: 'Aturan Utama',
      ruleFormula: 'a × (b + c) = (a × b) + (a × c)',
      ruleDesc: 'Mengalikan suatu bilangan dengan penjumlahan dua bilangan sama hasilnya dengan mengalikan bilangan tersebut ke tiap bagian secara terpisah, lalu menjumlahkannya.',
      stepsTitle: 'Tiga Langkah Cepat untuk Kelas 4',
      stepItems: [
        {
          title: '1. Pecah Bilangan Besar',
          detail: 'Pisahkan bilangan 2-digit atau 3-digit berdasarkan nilai tempatnya (puluhan dan satuan).',
          example: '24 menjadi 20 + 4',
        },
        {
          title: '2. Kalikan Secara Terpisah',
          detail: 'Kalikan faktor luar dengan masing-masing bagian pecahan menggunakan fakta perkalian dasar.',
          example: '6 × 20 = 120 dan 6 × 4 = 24',
        },
        {
          title: '3. Jumlahkan Hasilnya',
          detail: 'Tambahkan semua hasil kali parsial untuk memperoleh jawaban akhir.',
          example: '120 + 24 = 144',
        },
      ],
      visualExampleTitle: 'Contoh Visual Model Area: 6 × 24',
      visualExampleCaption: 'Persegi panjang 6 × 24 dipecah menjadi kotak biru (6 × 20 = 120) dan kotak kuning (6 × 4 = 24).',
      tipsTitle: 'Tips Latihan',
      tips: [
        'Untuk angka 1-digit seperti 7 atau 8, pecahlah menggunakan angka ramah seperti 5 (misalnya 7 = 5 + 2).',
        'Untuk angka 2-digit seperti 36, selalu pecah menjadi puluhan dan satuan (30 + 6) agar mudah dikalikan.',
        'Periksa hasil akhir dengan menaksir besarannya terlebih dahulu.',
      ],
    },
  },
};

// data/dialogue.js

// Catatan: import SetupForm dihapus karena tidak diperlukan di file data ini.

export const scenarios = [
  {
    id: 1,
    name: "Level 1: Marahan Ringan",
    profile: {
      name: "", 
      status: "online",
      avatar: "", 
    },
    messages: [
      {
        sender: "pacar",
        text: "Kamu kenapa gak bales chat aku semalam? (òó)",
        expected: "Maaf, aku ketiduran",
        timeLimit: 15,
      },
      {
        sender: "pacar",
        text: "Tapi aku liat kamu online! (*¬*)",
        expected: "Aku cuman gak tahu harus ngomong apa waktu itu",
        timeLimit: 25,
      },
      {
        sender: "pacar",
        text: "Jadi kamu udah bosen sama aku? T^T",
        expected: "Enggak, bukan begitu",
        timeLimit: 15,
      },
      {
        sender: "pacar",
        text: "Terus apa dong? (￢_￢)",
        expected: "Aku cuman pengen kamu tau...",
        timeLimit: 10,
      },
      {
        sender: "pacar",
        text: "Tau apa? (*o*)",
        expected: "Bahwa kalo kamu ga ada dihidup aku, ternyata sesepi ini yah",
        timeLimit: 15,
      },
      {
        sender: "pacar",
        text: "Aih malah gombal, humph Baka! >///<",
        expected: "Hehe I Love You {name}!", 
        timeLimit: 10,
      },
      {
        sender: "pacar",
        text: "EEEEE... I Love You Too... (´｡• ω •｡`)",
        expected: "Ga marah lagi kan? Maaf ya aku sibuk tadi",
        timeLimit: 25,
      },
      {
        sender: "pacar",
        text: "Baiklah... maaf aku juga egois ya... (´･ω･`)",
        expected: "Ga apa apa, aku tau kamu sayang aku",
        timeLimit: 25,
      },
    ],
  },
  {
    id: 2,
    name: "Level 2: Cemburu Buta",
    profile: {
      name: "", 
      status: "online",
      avatar: "", 
    },
    messages: [
      {
        sender: "pacar",
        text: "Kamu like foto mantan kamu ya? (ಠ益ಠ)",
        expected: "Enggak sengaja kepencet",
        timeLimit: 12,
      },
      {
        sender: "pacar",
        text: "Kebetulan banget sih kepencetnya! ಠ_ಠ",
        expected: "Aku cuman scroll doang kok",
        timeLimit: 10,
      },
      {
        sender: "pacar",
        text: "Jadi kamu masih stalk dia? (눈_눈)",
        expected: "Enggak, aku udah move on",
        timeLimit: 8,
      },
      {
        sender: "pacar",
        text: "Terus kenapa foto dia masih ada di gallery kamu? (・`ω´・)",
        expected: "Aku lupa hapus, maaf {name}",
        timeLimit: 15,
      },
      {
        sender: "pacar",
        text: "Kamu masih sayang sama dia ya? (ノ_<)",
        expected: "Enggak, aku cuman sayang sama kamu",
        timeLimit: 12,
      },
      {
        sender: "pacar",
        text:"Beneran? Kamu gak bohong? (¬_¬)",
        expected: "Beneran, kamu yang paling spesial",
        timeLimit: 10,
      },
      {
        sender: "pacar",
        text: "Hmph... janji ya... (っ´ω`c)",
        expected: "Janji, kamu satu satunya",
        timeLimit: 8,
      },
      {
        sender: "pacar",
        text: "Baiklah aku percaya... jangan sakiti aku ya... (｡•́︿•̀｡) ♡",
        expected: "Aku janji bakal jaga perasaan kamu {name}",
        timeLimit: 15,
      },
    ],
  },
  {
    id: 3,
    name: "Level 3: Anniversary Lupa",
    profile: {
      name: "", 
      status: "online",
      avatar: "", 
    },
    messages: [
      {
        sender: "pacar",
        text: "Hari ini tanggal berapa? (・・?)",
        expected: "Tanggal 14 kenapa?",
        timeLimit: 10,
      },
      {
        sender: "pacar",
        text: "Kamu gak ingat apa yang spesial hari ini? (ง •̀_•́)ง",
        expected: "Maaf aku lupa, anniversary kita ya?",
        timeLimit: 15,
      },
      {
        sender: "pacar",
        text: "IYA! KAMU LUPA ANNIVERSARY KITA! (╬ Ò ‸ Ó)",
        expected: "Aduh maaf banget, aku sibuk kerja",
        timeLimit: 12,
      },
      {
        sender: "pacar",
        text: "Sibuk terus! Aku gak penting ya? (╥_╥)",
        expected: "Penting banget, kamu yang paling berarti bagiku {name}",
        timeLimit: 10,
      },
      {
        sender: "pacar",
        text: "Terus kenapa bisa lupa? (╯︵╰,)",
        expected: "Aku salah, mau ku ganti besok",
        timeLimit: 8,
      },
      {
        sender: "pacar",
        text: "Gimana caranya mau ganti? (ಥ﹏ಥ)",
        expected: "Aku traktir makan di restoran favorit kamu",
        timeLimit: 12,
      },
      {
        sender: "pacar",
        text: "Beneran? Janji? ٩(๑❛ᴗ❛๑)۶",
        expected: "Janji, plus hadiah spesial",
        timeLimit: 10,
      },
      {
        sender: "pacar",
        text: "Hmph... baiklah... tapi jangan diulang lagi ya... ( •́ ^ •̀) ♡",
        expected: "Sumpah gak akan lupa lagi",
        timeLimit: 8,
      },
    ],
  },
  {
    id: 4,
    name: "Level 4: Ghosting Mode",
    profile: {
      name: "", 
      status: "online",
      avatar: "", 
    },
    messages: [
      {
        sender: "pacar",
        text: "AKHIRNYA NONGOL JUGA! 3 HARI HILANG! (ʘ言ʘ)",
        expected: "Maaf, aku ada urusan keluarga",
        timeLimit: 12,
      },
      {
        sender: "pacar",
        text: "URUSAN KELUARGA? GAK BISA KABAR? (ง'̀-'́)ง",
        expected:"Aku salah, harusnya aku kasih tau",
        timeLimit: 10,
      },
      {
        sender: "pacar",
        text: "AKU KIRA KAMU KECELAKAAN! ヽ( T-T)ノ",
        expected: "Maaf bikin kamu khawatir {name}",
        timeLimit: 8,
      },
      {
        sender: "pacar",
        text: "GIMANA KALAU BETULAN ADA APA APA? (T⌓T)",
        expected: "Aku janji bakal kasih kabar",
        timeLimit: 10,
      },
      {
        sender: "pacar",
        text: "KAMU TAU AKU SUSAH TIDUR 3 HARI INI? (⊃_⊂)",
        expected: "Aduh maaf, aku gak mau kamu susah",
        timeLimit: 12,
      },
      {
        sender: "pacar",
        text: "SERIUS KAMU MASIH PEDULI SAMA AKU? (⇀_⇀)",
        expected: "Serius, aku sayang banget sama kamu {name}",
        timeLimit: 8,
      },
      {
        sender: "pacar",
        text: "KALAU SAYANG HARUS BISA JAGA PERASAAN! (・｀ω´・)",
        expected: "Aku belajar buat lebih perhatian",
        timeLimit: 10,
      },
      {
        sender: "pacar",
        text: "Baiklah... tapi ini terakhir kali ya... (ó﹏ò) ♡",
        expected: "Sumpah gak akan ngilang lagi",
        timeLimit: 12,
      },
    ],
  },
  {
    id: 5,
    name: "Level 5: Ultimate Test",
    profile: {
      name: "", 
      status: "online",
      avatar: "", 
    },
    messages: [
      {
        sender: "pacar",
        text: "JADI... LUPA ANNIVERSARY, LIKE FOTO MANTAN, HILANG 3 HARI... APA LAGI? (ノಠ益ಠ)ノ",
        expected: "Aku tau aku banyak salah",
        timeLimit: 15,
      },
      {
        sender: "pacar",
        text: "KAMU PIKIR INI LAGI MAIN GAME? (╬^̃  ﹏ ^̃)",
        expected: "Bukan, ini hubungan serius",
        timeLimit: 12,
      },
      {
        sender: "pacar",
        text: "TERUS KENAPA SEMUA KESALAHAN INI TERJADI? (;´༎ຶД༎ຶ`)",
        expected: "Aku egois dan gak perhatian",
        timeLimit: 10,
      },
      {
        sender: "pacar",
        text: "APA KAMU MASIH CINTA SAMA AKU? (ಥ_ʖಥ)",
        expected: "Aku cinta banget sama kamu",
        timeLimit: 8,
      },
      {
        sender: "pacar",
        text: "BUKTINYA! KALAU CINTA HARUS BISA BERUBAH! (ง'̀ヮ'́)ง",
        expected: "Aku berubah buat kamu {name}",
        timeLimit: 12,
      },
      {
        sender: "pacar",
        text: "GIMANA CARANYA AKU PERCAYA LAGI? (._.)",
        expected: "Kasih aku kesempatan terakhir",
        timeLimit: 10,
      },
      {
        sender: "pacar",
        text: "KALAU AKU KASIH KESEMPATAN... JANJI GAK NGECEWAIN LAGI? ヽ(> <)ノ",
        expected: "Janji, aku bakal jadi lebih baik",
        timeLimit: 8,
      },
      {
        sender: "pacar",
        text: "OKAY... TAPI INI KESEMPATAN TERAKHIR YA... I LOVE YOU... (๑˃́v˂̀๑) ♡",
        expected: "I Love You too, makasih udah mau maafin {name}",
        timeLimit: 15,
      },
    ],
  },
  {
    id: 6,
    name: "Level 6: Proposal Surprise",
    profile: {
      name: "", 
      status: "online",
      avatar: "", 
    },
    messages: [
      {
        sender: "pacar",
        text: "BUB... ada yang mau aku bicarakan... (〃▽〃)",
        expected: "Apa sayang? Ada apa?",
        timeLimit: 12,
      },
      {
        sender: "pacar",
        text: "Setelah semua yang kita lalui... aku pengen sesuatu yang lebih... (づ｡◕‿‿◕｡)づ",
        expected: "Kamu mau nikah sama aku?",
        timeLimit: 15,
      },
      {
        sender: "pacar",
        text: "IYA! AKU MAU MENIKAH DENGANMU! (ﾉ◕ヮ◕)ﾉ*:･ﾟ✧",
        expected: "Aku juga mau menikah dengan kamu",
        timeLimit: 10,
      },
      {
        sender: "pacar",
        text: "BENERAN? KAMU SERIUS? ヾ(≧▽≦*)o",
        expected: "Serius, kamu calon istri terbaik {name}",
        timeLimit: 8,
      },
      {
        sender: "pacar",
        text: "KAPAN KITA NIKAHNYA? (o^▽^o)!",
        expected: "Bulan depan, aku udah siapin semuanya",
        timeLimit: 12,
      },
      {
        sender: "pacar",
        text: "WAHHH! AKU GAK SABAR! (≧◡≦) ♡",
        expected: "Aku juga gak sabar punya kamu selamanya {name}",
        timeLimit: 10,
      },
      {
        sender: "pacar",
        text: "I LOVE YOU SO MUCH! (*^‿^*)",
        expected: "I Love You More sayangku",
        timeLimit: 8,
      },
      {
        sender: "pacar",
        text: "AKHIRNYA IMPIAN KITA TERWUJUD! SELAMANYA BERSAMA! (•̀ᴗ•́)و",
        expected: "Selamanya bersama, sayangku",
        timeLimit: 15,
      },
    ],
  }
];
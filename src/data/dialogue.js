export const scenarios = [
  {
    id: 1,
    name: "Marahan WhatsApp",
    profile: {
      name: "Komi-san ",
      status: "online",
      avatar: "", // contoh avatar acak
    },
    messages: [
      {
        sender: "pacar",
        text: "Kamu kenapa gak bales chat aku semalam?",
        expected: "Maaf, aku ketiduran",
        timeLimit: 15,
      },
      {
        sender: "pacar",
        text: "Tapi aku liat kamu online!",
        expected: "Aku cuma gak tahu harus ngomong apa waktu itu",
        timeLimit: 25,
      },
      {
        sender: "pacar",
        text: "Jadi kamu udah bosen sama aku?",
        expected: "Enggak, aku cuma pengen sendiri dulu, maaf ya",
        timeLimit: 15,
      },
       {
        sender: "pacar",
        text: "Terus apa dong?",
        expected: "Aku cuman pengen kamu tau...",
        timeLimit: 10,
      },
       {
        sender: "pacar",
        text: "Tau apa?",
        expected: "Bahwa kalo kamu ga ada dihidup aku, ternyata sesepi ini yah",
        timeLimit: 15,
      },
       {
        sender: "pacar",
        text: "Aih malah gombal, humph Baka! >~<",
        expected: "I Love You Komi-San!",
        timeLimit: 10,
      },
       {
        sender: "pacar",
        text: "EEEEE... I Love You Too...",
        expected: "Ga marah lagi kan? Maaf ya aku sibuk tadi",
        timeLimit: 25,
      },
      {
        sender: "pacar",
        text: "Baiklah... maaf aku juga egois ya...",
        expected: "Ga apa apa, aku tau kamu sayang aku",
        timeLimit: 25,
      },
    ],
  },
];
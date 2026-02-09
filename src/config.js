// ============================================
//  PERSONALIZATION CONFIG
// ============================================
//  Edit this file to customize ALL the content!
//  Replace placeholder text with your real data.
//
//  📸  PHOTOS  — Drop images into /public/assets/
//       Reference them like: "/assets/photo1.jpg"
//       Vertical / portrait photos look best!
//
//  🎵  SONG    — Drop an mp3 into /public/assets/song.mp3
// ============================================


// ── GENERAL ─────────────────────────────────
const name       = "宝宝";
const nameEn     = "Babe";
const volume     = 0.5;       // master volume 0.0 (silent) → 1.0 (full)


// ── SLIDE 1 · INTRO ────────────────────────
const intro = {
  greeting:  "你好呀",
  subtitle:  "这一年过得真快。",
  cta:       "来看看我们的数据吧。",
  photo:     "/assets/us.jpg",
  song:      "/songs/our_song_14.mp3",
  duration:  14000,   // 14 seconds
  en: {
    greeting:  "Hey there",
    subtitle:  "What a year it's been.",
    cta:       "Let's look at our stats.",
  },
};


// ── SLIDE 2 · TIME SPENT ───────────────────
const timeSpent = {
  number:   "1,247,832",
  label:    "分钟在一起",
  subtext:  "（大概吧... 多几千也不一定）",
  photo:    "/assets/unicat.jpg",
  song:      "/songs/special_someone_27.mp3",
  duration:  27000,   // 27 seconds
  en: {
    label:    "minutes together",
    subtext:  "(give or take a few thousand)",
  },
};


// ── SLIDE 3 · TOP LOCATION ─────────────────
const topLocation = {
  location:  "学校... 写作业",
  subtitle:  "你待最久的地方：",
  footnote:  "毫无怨言。",
  photo:     "/assets/school.jpg",
  song:      "/songs/childhood_28.mp3",
  duration:  28000,   // 28 seconds
  en: {
    location:  "School... doing homework",
    subtitle:  "Your most-visited place:",
    footnote:  "No complaints.",
  },
};


// ── SLIDE 4 · TOP ARTIST ───────────────────
const topArtist = {
  title:     "你的 #1 歌手",
  artist:    "当然是我啦。",
  streams:   "全年无休循环播放",
  subtitle:  "有些人永远听不腻。",
  photo:     "/assets/me.jpg",
  song:      "/songs/thats_what_I_like_29.mp3",
  duration:  29000,   // 29 seconds
  en: {
    title:     "Your #1 Artist",
    artist:    "Me, obviously.",
    streams:   "On repeat all year long",
    subtitle:  "Some people you never get tired of.",
  },
};


// ── SLIDE 5 · AURA ─────────────────────────
const aura = {
  title:        "我们的恋爱光环",
  aura:         "掌心的温热",
  description:  "一种亲密而安心的爱，让你感到被珍惜、被守护。",
  colors:       ["#B11226", "#E8A0B8", "#8B1E3F", "#E6C46A"],
  photo:        "/assets/her.jpg",
  song:      "/songs/love_32.mp3",
  duration:  32000,   // 32 seconds
  en: {
    title:        "Our Love Aura",
    aura:         "Warmth in Your Palms",
    description:  "An intimate, reassuring love that makes you feel cherished and protected.",
  },
};


// ── SLIDE 6 · TOP 5 MOMENTS ────────────────
const topMoments = {
  title: "最难忘的五个瞬间",
  moments: [
    "一起去盖蒂博物馆的那天",
    "和大家一起去旧金山（虽然我们大吵了一架）",
    "每次去你家一起做饭的时光",
    "随便找餐厅吃饭的日子",
    "在我家\"学习\"",
  ],
  photo: "/assets/shadow.jpg",
  song:      "/songs/I_love_you_64.mp3",
  duration:  64000,   // 64 seconds
  en: {
    title: "Top 5 Unforgettable Moments",
    moments: [
      "That day at the Getty Museum",
      "The San Francisco trip (even though we had a huge fight)",
      "Every time we cooked together at your place",
      "Random restaurant dates",
      "\"Studying\" at my place",
    ],
  },
};


// ── PUZZLE ──────────────────────────────────
const puzzle = {
  title:      "拼好它",
  hint:       "拖动方块来交换位置",
  solvedText: "完美 💕",
  photo:      "/assets/StudioGhibili.jpg",
  song:      null,       // no song for puzzle
  duration:  0,          // no auto-advance
  en: {
    title:      "Put it together",
    hint:       "Drag tiles to swap",
    solvedText: "Perfect 💕",
  },
};


// ── SLIDE 7 · THE BIG QUESTION ─────────────
const finalAsk = {
  preQuestion:  "最后一个问题...",
  question:     "你愿意和我在一起吗？",
  buttonA:      "愿意",
  buttonB:      "当然愿意",
  photo:        "/assets/StudioGhibili.jpg",
  en: {
    preQuestion:  "One last question...",
    question:     "Will you be my Valentine?",
    buttonA:      "Yes",
    buttonB:      "Absolutely",
  },
};


// ── THANK YOU SCREEN ────────────────────────
const thankYou = {
  title:     "我就知道你会答应。",
  subtitle:  "好期待。",
  emoji:     "💖",
  photo:     "/assets/unidog.jpg",
  en: {
    title:     "I knew you'd say yes.",
    subtitle:  "Can't wait.",
  },
};


// ── UI STRINGS (hardcoded text in components) ──
const strings = {
  zh: {
    startTitle:      (n) => `${n}的`,
    startWrapped:    "年度回顾",
    startButton:     "点击开始",
    startFootnote:   "建议打开声音体验 🔊",
    timeSpentIntro:  "我们大约一起度过了",
    puzzleLastThing: "最后一件事...",
    answeredText:    "我就知道。",
    thankYouCredits: "用了太多心思做的",
    thankYouYear:    "年度回顾 2026",
  },
  en: {
    startTitle:      (n) => `${n}'s`,
    startWrapped:    "Year in Review",
    startButton:     "Tap to Start",
    startFootnote:   "Best with sound on 🔊",
    timeSpentIntro:  "We spent about",
    puzzleLastThing: "One last thing...",
    answeredText:    "I knew it.",
    thankYouCredits: "Made with way too much love",
    thankYouYear:    "Year in Review 2026",
  },
};


// ============================================
//  EXPORT  (don't edit below this line)
// ============================================
const CONFIG = {
  name,
  nameEn,
  volume,
  strings,
  slides: {
    intro,
    timeSpent,
    topLocation,
    topArtist,
    aura,
    topMoments,
    puzzle,
    finalAsk,
    thankYou,
  },
};

export default CONFIG;

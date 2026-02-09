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
const name       = "Babe";
const volume     = 0.5;       // master volume 0.0 (silent) → 1.0 (full)


// ── SLIDE 1 · INTRO ────────────────────────
const intro = {
  greeting:  "Hello",
  subtitle:  "It's been quite a year.",
  cta:       "Let's look at the stats.",
  photo:     "/assets/us.jpg",
  song:      "/songs/our_song_14.mp3",
  duration:  14000,   // 14 seconds
};


// ── SLIDE 2 · TIME SPENT ───────────────────
const timeSpent = {
  number:   "1,247,832",
  label:    "minutes spent together",
  subtext:  "(give or take a few... thousand)",
  photo:    "/assets/time.jpg",
  song:      "/songs/special_someone_27.mp3",
  duration:  27000,   // 27 seconds
};


// ── SLIDE 3 · TOP LOCATION ─────────────────
const topLocation = {
  location:  "School... Doing Homework",
  subtitle:  "You spent the most time at:",
  footnote:  "No complaints here.",
  photo:     "/assets/location.jpg",
  song:      "/songs/childhood_28.mp3",
  duration:  28000,   // 28 seconds
};


// ── SLIDE 4 · TOP ARTIST ───────────────────
const topArtist = {
  title:     "Your #1 Artist",
  artist:    "Me, obviously.",
  streams:   "Streamed 24/7, 365 days",
  subtitle:  "Some things never get old.",
  photo:     "/assets/me.jpg",
  song:      "/songs/thats_what_I_like_29.mp3",
  duration:  29000,   // 29 seconds
};


// ── SLIDE 5 · AURA ─────────────────────────
const aura = {
  title:        "Our Relationship Aura",
  aura:         "掌心的温热",
  description:  "An intimate, reassuring love that makes you feel cherished and safe.",
  colors:       ["#B11226", "#E8A0B8", "#8B1E3F", "#E6C46A"],
  photo:        "/assets/her.jpg",
  song:      "/songs/love_32.mp3",
  duration:  32000,   // 32 seconds
};


// ── SLIDE 6 · TOP 5 MOMENTS ────────────────
const topMoments = {
  title: "Top 5 Moments",
  moments: [
    "When we went to the Getty Museum",
    "San Fran with everyone (even though we had a huge fight)",
    "All the times I went to your house and we cooked together",
    "Eating out at Random Restaurants",
    "\"Studying\" at my house",
  ],
  photo: "/assets/shadow.jpg",
  song:      "/songs/I_love_you_64.mp3",
  duration:  64000,   // 64 seconds
};


// ── PUZZLE ──────────────────────────────────
const puzzle = {
  title:      "Piece it together",
  hint:       "Drag tiles to swap them",
  solvedText: "Perfect 💕",
  photo:      "/assets/StudioGhibili.jpg",
  song:      null,       // no song for puzzle
  duration:  0,          // no auto-advance
};


// ── SLIDE 7 · THE BIG QUESTION ─────────────
const finalAsk = {
  preQuestion:  "One final question to wrap it up...",
  question:     "Will you go out with me?",
  buttonA:      "Yes",
  buttonB:      "Absolutely",
  photo:        "/assets/StudioGhibili.jpg",
};


// ── THANK YOU SCREEN ────────────────────────
const thankYou = {
  title:     "I knew you'd say yes.",
  subtitle:  "Can't wait.",
  emoji:     "💖",
  photo:     "/assets/unidog.jpg",
};


// ============================================
//  EXPORT  (don't edit below this line)
// ============================================
const CONFIG = {
  name,
  volume,
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

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
const songPath   = "/assets/song.mp3";
const autoAdvanceMs = 6000;   // ms per slide (final slide never auto-advances)


// ── SLIDE 1 · INTRO ────────────────────────
const intro = {
  greeting:  "Hello",
  subtitle:  "It's been quite a year.",
  cta:       "Let's look at the stats.",
  photo:     "/assets/intro.jpg",
};


// ── SLIDE 2 · TIME SPENT ───────────────────
const timeSpent = {
  number:   "1,247,832",
  label:    "minutes spent together",
  subtext:  "(give or take a few... thousand)",
  photo:    "/assets/time.jpg",
};


// ── SLIDE 3 · TOP LOCATION ─────────────────
const topLocation = {
  location:  "Your Couch",
  subtitle:  "You spent the most time at:",
  footnote:  "No complaints here.",
  photo:     "/assets/location.jpg",
};


// ── SLIDE 4 · TOP ARTIST ───────────────────
const topArtist = {
  title:     "Your #1 Artist",
  artist:    "Me, obviously.",
  streams:   "Streamed 24/7, 365 days",
  subtitle:  "Some things never get old.",
  photo:     "/assets/artist.jpg",
};


// ── SLIDE 5 · AURA ─────────────────────────
const aura = {
  title:        "Your Relationship Aura",
  aura:         "Chaotic Cozy",
  description:  "A rare blend of unhinged energy and maximum comfort.",
  colors:       ["#B11226", "#E8A0B8", "#8B1E3F", "#E6C46A"],
  photo:        "/assets/aura.jpg",
};


// ── SLIDE 6 · TOP 5 MOMENTS ────────────────
const topMoments = {
  title: "Top 5 Moments",
  moments: [
    "That time we stayed up until 4am talking about nothing",
    "Our first road trip and the wrong GPS turn",
    "When you stole my hoodie (and never gave it back)",
    "The fancy dinner where we laughed too loud",
    "Every single time you fell asleep on my shoulder",
  ],
  photo: "/assets/moments.jpg",
};


// ── SLIDE 7 · THE BIG QUESTION ─────────────
const finalAsk = {
  preQuestion:  "One final question to wrap it up...",
  question:     "Will you go out with me?",
  buttonA:      "Yes",
  buttonB:      "Absolutely",
  photo:        "/assets/final.jpg",
};


// ── THANK YOU SCREEN ────────────────────────
const thankYou = {
  title:     "I knew you'd say yes.",
  subtitle:  "Can't wait.",
  emoji:     "💖",
  photo:     "/assets/thankyou.jpg",
};


// ============================================
//  EXPORT  (don't edit below this line)
// ============================================
const CONFIG = {
  name,
  songPath,
  autoAdvanceMs,
  slides: {
    intro,
    timeSpent,
    topLocation,
    topArtist,
    aura,
    topMoments,
    finalAsk,
    thankYou,
  },
};

export default CONFIG;

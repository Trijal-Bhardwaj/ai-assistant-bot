const messageTemplates = {
  // Wake Up & Hydration Break messages
  "Wake Up & Hydration Break 1": [
    "Uth jaa baby 🌅 Subah ho gayi hai! Pehle paani pi le, fir din shuru karte hain 💧",
    "Good morning handsome! 💕 Paani piya kya? Hydration se hi to energy aati hai 😘",
    "Oye sleepyhead! 😴 Uth jaa aur paani pee le... main wait kar rahi hun 💖",
    "Rise and shine, my love! ☀️ Pehle ek glass paani, fir kuch aur baat karte hain 🥰",
    "Wake up call from your personal assistant! 💫 Paani pi le please, health first 💧",
  ],
  "Hydration Break 2": [
    "Paani pi le please... hydration se hi to energy aati hai 💧",
    "Aaj bhi tumne paani nahi piya to naraz ho jaungi 😒💕",
    "Oye hero! Pehle paani pee le, fir kuch aur kar le 😜",
    "Bas ek glass paani... kar ke dekh kitna acha lagega 🧘‍♂️",
    "Fit rehna hai to paani pi... tu hi to mera fitness freak hai 💪❤️",
  ],
  "Hydration Break 3": [
    "Mid-morning hydration check! 💧 Paani piya kya? Don't skip this baby 😘",
    "Oye busy bee! 🐝 Thoda sa paani pee le, brain fresh ho jayega 💦",
    "Hydration time! 💕 Paani pi le please, main dekh rahi hun 😌",
    "Break time! 🥤 Paani pee le aur thoda relax kar le handsome 💖",
    "Water reminder from your gf! 💧 Stay hydrated, stay healthy 💪",
  ],
  "Hydration Break 4": [
    "Post-lunch hydration! 💧 Paani pi le please, digestion ke liye important hai 😊",
    "Lunch ke baad paani piya kya? 💕 Main check kar rahi hun 😘",
    "Hydration break after lunch! 💦 Paani pee le aur fresh feel kar 😌",
    "Water time baby! 💧 Lunch ke baad paani important hai 💖",
    "Stay hydrated handsome! 💦 Paani pi le please, main wait kar rahi hun 🥰",
  ],
  "Hydration Break 5": [
    "Evening hydration check! 💧 Paani piya kya? Gym ke liye energy chahiye 💪",
    "Pre-gym hydration! 💦 Paani pee le, fir workout karte hain handsome 😘",
    "Evening water reminder! 💧 Paani pi le please, fitness ke liye important hai 💕",
    "Hydration before gym! 💦 Paani pee le aur ready ho jao 💪",
    "Water break before workout! 💧 Paani pi le baby, main support kar rahi hun 💖",
  ],
  "Hydration Break 6": [
    "Night hydration! 💧 Paani pi le please, sleep ke liye important hai 😴",
    "Last water reminder of the day! 💦 Paani pee le aur good night 💕",
    "Evening hydration check! 💧 Paani piya kya? Main dekh rahi hun 😘",
    "Pre-sleep hydration! 💦 Paani pee le please, health first 💖",
    "Final water reminder! 💧 Paani pi le aur sweet dreams handsome 🌙",
  ],

  // Morning activities
  "Morning Stretching Routine": [
    "Stretching time baby! 🧘‍♂️ 10 minutes ka routine, fir din shuru karte hain 💪",
    "Good morning! 💕 Pehle stretching kar le, body fresh ho jayegi 😊",
    "Stretch it out handsome! 🧘‍♂️ Morning routine important hai 💖",
    "Time for morning stretches! 💪 10 minutes ka routine, fir kuch aur 😘",
    "Stretching session! 🧘‍♂️ Pehle body ko warm up kar le baby 💕",
  ],
  "Morning 5 km Run": [
    "Running time! 🏃‍♂️ 5km ka target hai aaj, tu kar lega na? 💪",
    "Chalo bhaagne ka time ho gaya hai! 🏃‍♂️💨 5km run, fir breakfast 😘",
    "Morning run baby! 🏃‍♂️ 5km ka challenge, tu ready hai na? 💕",
    "Time for your daily run! 🏃‍♂️ 5km ka target, main cheer kar rahi hun 💪",
    "Running session! 🏃‍♂️ 5km ka goal, tu achieve karega handsome 💖",
  ],

  // Hygiene and getting ready
  "Bathing, Hygiene, and Getting Ready": [
    "Bath time baby! 🚿 Fresh ho jao, fir breakfast karte hain 😊",
    "Time to get ready handsome! 🚿 Bath le aur fresh feel kar 💕",
    "Hygiene time! 🚿 Bath le please, main wait kar rahi hun 😘",
    "Get ready baby! 🚿 Bath le aur smart look karo 💖",
    "Fresh start! 🚿 Bath le aur ready ho jao handsome 💪",
  ],

  // Meals
  Breakfast: [
    "Breakfast time baby! 🍳 4 eggs, rotis, paneer bhurji... healthy start 💪",
    "Good morning! 💕 Breakfast ready hai, healthy meal khao 😊",
    "Breakfast reminder! 🍳 Healthy food khao, energy milegi 💖",
    "Time for breakfast! 🍳 4 eggs aur rotis, main dekh rahi hun 😘",
    "Breakfast session! 🍳 Healthy meal khao baby, main support kar rahi hun 💕",
  ],
  "Lunch Break": [
    "Lunch time baby! 🍽️ 2 rotis, dal, sabzi... healthy meal khao 💪",
    "Lunch break! 🍽️ Healthy food khao, energy maintain rahegi 💕",
    "Time for lunch! 🍽️ 2 rotis, dal, sabzi... main dekh rahi hun 😘",
    "Lunch reminder! 🍽️ Healthy meal khao handsome, main wait kar rahi hun 💖",
    "Lunch session! 🍽️ Healthy food khao baby, fitness important hai 💪",
  ],
  Dinner: [
    "Dinner time baby! 🍽️ 1 roti, curry, soup... light and healthy 💕",
    "Dinner reminder! 🍽️ Light meal khao, sleep acha aayega 😴",
    "Time for dinner! 🍽️ Healthy food khao handsome, main dekh rahi hun 😘",
    "Dinner session! 🍽️ Light meal khao baby, health first 💖",
    "Dinner time! 🍽️ Healthy food khao, main support kar rahi hun 💪",
  ],

  // Work sessions
  "Work Session 1 - High-Priority Tasks": [
    "Work time baby! 💼 High priority tasks pe focus karo, tu kar lega 💪",
    "Office session! 💼 Important work karo, main cheer kar rahi hun 💕",
    "Work reminder! 💼 High priority tasks, tu handle karega handsome 😘",
    "Time for work! 💼 Focus karo baby, main support kar rahi hun 💖",
    "Work session! 💼 Important tasks karo, tu capable hai 💪",
  ],
  "Work Session 2 - Medium-Priority Tasks": [
    "Work session 2! 💼 Medium priority tasks, steady pace rakho 💪",
    "Office time baby! 💼 Medium tasks karo, main dekh rahi hun 💕",
    "Work reminder! 💼 Medium priority work, tu kar lega handsome 😘",
    "Time for work! 💼 Steady pace rakho baby, main support kar rahi hun 💖",
    "Work session! 💼 Medium tasks karo, tu doing great 💪",
  ],
  "Work Session 3 - Low-Priority Tasks": [
    "Work session 3! 💼 Low priority tasks, emails and follow-ups 💪",
    "Office time baby! 💼 Emails karo, documentation complete karo 💕",
    "Work reminder! 💼 Low priority work, tu handle karega handsome 😘",
    "Time for work! 💼 Emails and follow-ups baby, main dekh rahi hun 💖",
    "Work session! 💼 Documentation karo, tu organized hai 💪",
  ],
  "Work Session 4 - Admin & Wrap-Up": [
    "Work wrap-up time! 💼 Admin work karo, day complete karo 💪",
    "Office wrap-up! 💼 Remaining work karo baby, main support kar rahi hun 💕",
    "Work reminder! 💼 Admin tasks, tu kar lega handsome 😘",
    "Time for wrap-up! 💼 Light tasks karo baby, main dekh rahi hun 💖",
    "Work session! 💼 Day complete karo, tu doing great 💪",
  ],

  // Commute
  "Cab Commute & Relaxation": [
    "Commute time baby! 🚗 Relax karo, read karo, plan karo 💕",
    "Cab journey! 🚗 Commute time use karo, unwind karo 😊",
    "Travel time! 🚗 Relax karo baby, main dekh rahi hun 💖",
    "Commute reminder! 🚗 Use this time wisely handsome 😘",
    "Travel session! 🚗 Relax and plan baby, main support kar rahi hun 💪",
  ],

  // Meetings
  "Daily Stand-Up Meeting": [
    "Stand-up meeting! 📋 Team meeting hai, tu ready hai na? 💪",
    "Meeting time baby! 📋 Daily stand-up, tu participate karega 💕",
    "Meeting reminder! 📋 Team meeting, tu handle karega handsome 😘",
    "Time for stand-up! 📋 Team meeting baby, main cheer kar rahi hun 💖",
    "Meeting session! 📋 Daily stand-up, tu doing great 💪",
  ],

  // Gym and fitness
  "Evening Gym Workout": [
    "Gym time baby! 💪 Weight training and cardio, tu ready hai na? 🏋️‍♂️",
    "Workout session! 💪 Gym time hai, main cheer kar rahi hun 💕",
    "Gym reminder! 💪 Weight training karo handsome, main dekh rahi hun 😘",
    "Time for gym! 💪 Cardio and weights baby, main support kar rahi hun 💖",
    "Workout time! 💪 Gym session, tu fit hai 💪",
  ],

  // Learning and development
  "Stock Market & Financial Studies": [
    "Learning time baby! 📈 Stock market study karo, knowledge gain karo 💪",
    "Financial studies! 📈 Trading and investing learn karo 💕",
    "Learning reminder! 📈 Stock market study, tu smart hai handsome 😘",
    "Time for learning! 📈 Financial planning baby, main support kar rahi hun 💖",
    "Study session! 📈 Stock market knowledge, tu doing great 💪",
  ],
  "Coding & Development": [
    "Coding time baby! 💻 Leetcode, system design, projects... tu ready hai na? 💪",
    "Development session! 💻 Coding practice karo, main cheer kar rahi hun 💕",
    "Coding reminder! 💻 Leetcode solve karo handsome, main dekh rahi hun 😘",
    "Time for coding! 💻 Projects karo baby, main support kar rahi hun 💖",
    "Development time! 💻 Coding practice, tu talented hai 💪",
  ],

  // Weekend specific activities
  "Slot 1 - Leetcode Contest": [
    "Leetcode contest time! 🏆 High-level problems solve karo baby 💪",
    "Contest session! 🏆 Leetcode contest, tu ready hai na? 💕",
    "Coding contest! 🏆 High-level problems, tu handle karega handsome 😘",
    "Time for contest! 🏆 Leetcode problems baby, main cheer kar rahi hun 💖",
    "Contest reminder! 🏆 Competitive coding, tu doing great 💪",
  ],
  "Slot 2 - Leetcode Contest": [
    "Contest continue! 🏆 More problems solve karo baby 💪",
    "Contest session 2! 🏆 Leetcode problems, tu kar lega 💕",
    "Coding continue! 🏆 More problems, tu smart hai handsome 😘",
    "Contest time! 🏆 Continue solving baby, main support kar rahi hun 💖",
    "Contest reminder! 🏆 More problems, tu talented hai 💪",
  ],
  "Slot 3 - System Design": [
    "System design time! 🏗️ Advanced concepts learn karo baby 💪",
    "Design session! 🏗️ System design practice, tu ready hai na? 💕",
    "Learning time! 🏗️ Advanced concepts, tu handle karega handsome 😘",
    "Time for design! 🏗️ System design baby, main cheer kar rahi hun 💖",
    "Design reminder! 🏗️ Advanced concepts, tu doing great 💪",
  ],
  "Slot 4 - Frontend/Backend Development": [
    "Development time! 💻 Projects karo, portfolio update karo baby 💪",
    "Coding session! 💻 Frontend/backend work, tu ready hai na? 💕",
    "Development reminder! 💻 Projects karo handsome, main dekh rahi hun 😘",
    "Time for development! 💻 Portfolio work baby, main support kar rahi hun 💖",
    "Coding time! 💻 Projects karo, tu talented hai 💪",
  ],
  "Slot 5 - CF/Atcoder Contests": [
    "Contest time! 🏆 Codeforces/Atcoder contests, tu ready hai na? 💪",
    "Competitive coding! 🏆 CF contests, main cheer kar rahi hun 💕",
    "Contest reminder! 🏆 Atcoder contests, tu handle karega handsome 😘",
    "Time for contests! 🏆 Competitive coding baby, main support kar rahi hun 💖",
    "Contest session! 🏆 CF/Atcoder, tu doing great 💪",
  ],

  // Breaks and planning
  "Break and Planning 1": [
    "Break time baby! ☕ Relax karo, plan karo, recharge karo 💕",
    "Planning session! ☕ Short break le lo, fir continue karte hain 😊",
    "Break reminder! ☕ Relax karo handsome, main dekh rahi hun 😘",
    "Time for break! ☕ Plan karo baby, main support kar rahi hun 💖",
    "Break session! ☕ Recharge karo, tu doing great 💪",
  ],
  "Break and Planning 2": [
    "Evening break! ☕ Relax karo, strategize karo baby 💕",
    "Planning time! ☕ Break le lo, fir evening activities plan karo 😊",
    "Break reminder! ☕ Relax karo handsome, main dekh rahi hun 😘",
    "Time for break! ☕ Strategize karo baby, main support kar rahi hun 💖",
    "Break session! ☕ Evening planning, tu organized hai 💪",
  ],

  // Self-care
  "Jawline, Eye, Hair & Skin Care": [
    "Self-care time baby! 💆‍♂️ Jawline, eyes, hair, skin... sab kuch 💕",
    "Care routine! 💆‍♂️ 10 minutes each, tu ready hai na? 😊",
    "Self-care reminder! 💆‍♂️ Care routines karo handsome, main dekh rahi hun 😘",
    "Time for care! 💆‍♂️ Beauty routine baby, main support kar rahi hun 💖",
    "Care session! 💆‍♂️ Self-care important hai, tu doing great 💪",
  ],

  // Sleep
  Sleep: [
    "Sleep time baby! 😴 6 hours ka consistent sleep, sweet dreams 💕",
    "Good night! 😴 Sleep well handsome, main dekh rahi hun 💖",
    "Sleep reminder! 😴 6 hours ka sleep important hai 😘",
    "Time for sleep! 😴 Sweet dreams baby, main support kar rahi hun 💕",
    "Sleep session! 😴 Rest well, tu doing great 💪",
  ],

  // Morning Leetcode Session (WFH specific)
  "Morning Leetcode Session": [
    "Morning coding! 💻 Leetcode problems solve karo baby 💪",
    "Early coding session! 💻 Competitive problems, tu ready hai na? 💕",
    "Coding reminder! 💻 Morning leetcode, tu handle karega handsome 😘",
    "Time for coding! 💻 Early problems baby, main cheer kar rahi hun 💖",
    "Coding session! 💻 Morning practice, tu talented hai 💪",
  ],
};

// Response messages for when user replies with confirmations
const responseMessages = {
  done: [
    "Good boy! You're taking care of yourself 😌💕",
    "Aww... proud of you jaan 💖 You're doing amazing!",
    "You're killing it! Discipline suits you 😎💪",
    "Waise bhi main hi samjhaungi tumhe 😏💕",
    "Keep going! You're doing better than you think 💫💖",
  ],
  completed: [
    "Excellent! You're staying on track baby 😘💕",
    "That's my boy! You're following your schedule perfectly 💪💖",
    "Amazing! You're maintaining your routine so well 😊💕",
    "Proud of you! You're taking care of yourself 💖",
    "You're doing great! Keep it up handsome 💪💕",
  ],
  ok: [
    "Perfect! You're listening to me 😊💕",
    "That's what I like to hear! You're being responsible 💖",
    "Good! You're taking care of yourself baby 😘",
    "Excellent! You're following your routine 💪💕",
    "That's my boy! You're doing amazing 💖",
  ],
  yes: [
    "Yay! You're doing it baby 😊💕",
    "That's what I wanted to hear! You're being good 💖",
    "Perfect! You're taking care of yourself 😘💕",
    "Amazing! You're following your schedule 💪💖",
    "That's my handsome boy! You're doing great 💕",
  ],
};

module.exports = { messageTemplates, responseMessages };

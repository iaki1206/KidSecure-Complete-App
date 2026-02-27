# KidSecure: Complete Video Demonstration Guide

**Duration:** 3-4 minutes  
**Purpose:** Academic coursework submission demonstrating the working graphical password authentication system

---

## Pre-Recording Checklist

- [ ] Open the KidSecure application in a clean browser window
- [ ] Prepare screen recording software (OBS Studio, QuickTime, or similar)
- [ ] Set recording resolution to 1920×1080 (Full HD)
- [ ] Enable microphone for narration
- [ ] Close unnecessary browser tabs and applications
- [ ] Test audio levels before recording

---

## Video Structure & Narration Script

### **INTRODUCTION (0:00 - 0:30)**

**Visual:** Homepage of KidSecure application

**Narration:**
"Hello, I'm [Your Name], and today I'm presenting KidSecure, a child-friendly graphical password authentication system developed for my coursework. This system addresses the challenge of creating secure yet memorable passwords for children aged 6 to 11 years old. Traditional text-based passwords are difficult for children to remember and type, so KidSecure uses colorful animal images instead."

**Key Points to Show:**
- Point to the colorful welcome screen
- Highlight the animal emojis (lion, elephant, dolphin, parrot)
- Show the "Easy & Fun" and "Super Secure" feature cards

---

### **SYSTEM OVERVIEW (0:30 - 1:00)**

**Visual:** Scroll down to "How It Works" section

**Narration:**
"The system works in four simple steps. First, children choose a username. Then, they select four favorite animals from randomized grids of 25 images. These four animals, remembered in sequence, become their graphical password. The system uses PBKDF2 cryptographic hashing with salt to securely store these passwords, providing over 390,000 possible combinations for strong security."

**Key Points to Show:**
- Point to each numbered step (1, 2, 3, 4)
- Emphasize the large, colorful buttons designed for children
- Mention the research-backed design based on academic literature

---

### **REGISTRATION DEMONSTRATION (1:00 - 2:00)**

**Visual:** Click "Create My Password" and go through registration

**Narration:**
"Let me demonstrate the registration process. I'll click 'Create My Password' to begin."

*[Enter username]*

"First, I choose a username. The system validates that it's unique and at least three characters long."

*[Click Next Step]*

"Now I'm presented with Round 1 of 4. Here's a 5-by-5 grid of 25 different animal images. Each animal is clearly labeled with its name below the image, making it easy for children to identify and remember."

*[Select an animal, e.g., Rabbit]*

"I'll select the Rabbit as my first animal. Notice how the system provides immediate visual feedback with a colored border around my selection."

*[System advances to Round 2]*

"The system automatically advances to Round 2. Importantly, the animals are now in completely different positions. This randomization is a key security feature that protects against shoulder-surfing attacks, where someone might watch over the child's shoulder to steal their password."

*[Quickly select animals for Rounds 2, 3, and 4]*

"I'll continue selecting my animals for the remaining rounds. The progress indicator at the top shows which round I'm on, with completed rounds marked in green."

*[Reach Review screen]*

"After selecting all four animals, I'm shown a review screen where I can see my password sequence: Rabbit, Penguin, Butterfly, and Lion. I can either start over if I want to change my selections, or confirm to create my account."

*[Click Create Password]*

"I'll confirm, and my account is successfully created. The system now stores my password securely using cryptographic hashing."

---

### **LOGIN DEMONSTRATION (2:00 - 2:45)**

**Visual:** Navigate to Login page

**Narration:**
"Now let me demonstrate the login process. I'll navigate to the login page."

*[Enter username]*

"I enter my username 'testchild' and click 'Start Login'."

*[Show Round 1 grid]*

"Again, I'm presented with a 5-by-5 grid, but notice the animals are in completely different positions from when I registered. This is the randomization feature working to enhance security."

*[Select the correct animals in sequence]*

"I need to remember my four animals in the correct order: Rabbit, Penguin, Butterfly, and Lion. I'll select each one across the four rounds."

*[Successful login]*

"After correctly selecting all four animals, I'm successfully authenticated and taken to my dashboard. The system displays a welcome message confirming my identity."

**Security Note to Mention:**
"It's important to note that the system includes a three-attempt limit. After three failed login attempts, the account is temporarily locked for security purposes, protecting against brute-force attacks."

---

### **PASSWORD RECOVERY (2:45 - 3:15)**

**Visual:** Go back to login page and click "Forgot Password"

**Narration:**
"One of the key features I implemented to address limitations in existing research is a password recovery mechanism. Let me demonstrate this."

*[Click "Forgot Password" link]*

"From the login page, I can click 'Forgot Password' if I've forgotten my animal sequence."

*[Show recovery page]*

"The recovery system uses child-friendly security questions. During registration, users can set up questions like 'What is your favorite color?' or 'What is your pet's name?' These questions use simple language appropriate for children."

*[Enter username and answer security questions]*

"I enter my username and answer my security questions. If the answers are correct, I'm allowed to create a new graphical password by selecting four new animals."

**Key Point:**
"This recovery mechanism ensures that children aren't permanently locked out of their accounts while maintaining security through verification questions."

---

### **TESTING DASHBOARD (3:15 - 3:45)**

**Visual:** Navigate to Testing Dashboard

**Narration:**
"For academic evaluation purposes, I've also implemented a testing dashboard that tracks usability metrics."

*[Show dashboard with statistics]*

"This dashboard displays key metrics including:
- Success rate: the percentage of successful login attempts
- Average completion time: how long it takes users to complete registration or login
- Failed attempt analysis: patterns in authentication failures
- User feedback: emoji-based ratings from children about their experience"

*[Point to different sections]*

"These metrics allow researchers and educators to evaluate the system's effectiveness and identify areas for improvement. The data supports the findings in my academic report regarding usability and security trade-offs."

---

### **CONCLUSION (3:45 - 4:00)**

**Visual:** Return to homepage

**Narration:**
"In conclusion, KidSecure demonstrates that it's possible to create authentication systems that are both secure and child-friendly. By using familiar animal images, clear visual feedback, and research-backed design principles, the system achieves a balance between usability and security. The implementation includes GDPR-compliant data handling, cryptographic password storage, and comprehensive testing capabilities."

**Final Statement:**
"This project contributes to the growing field of child-computer interaction and demonstrates practical applications of academic research in authentication systems. Thank you for watching."

---

## Post-Production Checklist

- [ ] Trim any unnecessary pauses or mistakes
- [ ] Add title slide at the beginning with your name and project title
- [ ] Add closing slide with "Thank You" and your student ID
- [ ] Check audio levels are consistent throughout
- [ ] Export in MP4 format (H.264 codec)
- [ ] Upload to YouTube (unlisted or private as required)
- [ ] Test the video plays correctly before submission

---

## Technical Details to Mention (Optional)

If you have extra time or want to provide more technical depth:

1. **Technology Stack:**
   - Frontend: React 19 with TypeScript
   - Backend: Node.js with Express and tRPC
   - Database: MySQL with Drizzle ORM
   - Security: PBKDF2 with 100,000 iterations

2. **Security Features:**
   - Cryptographic hashing with salt
   - Constant-time comparison to prevent timing attacks
   - Decoy rounds to confuse shoulder-surfing
   - Rate limiting on login attempts
   - Session management with secure cookies

3. **Usability Features:**
   - Large touch-friendly buttons (minimum 44×44 pixels)
   - High contrast colors for accessibility
   - Clear progress indicators
   - Immediate visual feedback
   - Emoji-based emotional responses

4. **Research Foundation:**
   - Based on Assal, Imran, and Chiasson (2018) study
   - Incorporates findings from multiple academic papers
   - Addresses COPPA and GDPR compliance requirements

---

## Alternative Presentation Formats

If a video is not required, you can also present this as:

1. **Live Demonstration:** Follow the same script during a live presentation
2. **Slide Deck with Screenshots:** Create PowerPoint slides with the screenshots captured
3. **Interactive Demo:** Allow evaluators to test the system themselves with guided instructions

---

## Screenshot Reference

The following screenshots have been captured and saved in `/documentation/demo-screenshots/`:

1. **Homepage** - Welcome screen with feature cards
2. **Registration - Username** - Username input screen
3. **Registration - Round 1** - First animal selection grid
4. **Registration - Round 2** - Second animal selection grid (showing randomization)
5. **Registration - Review** - Password review screen
6. **Login - Username** - Login username entry
7. **Login - Animal Selection** - Login authentication grids
8. **Dashboard** - Successful login welcome screen
9. **Password Recovery** - Recovery flow screens
10. **Testing Dashboard** - Analytics and metrics display

These screenshots can be used in your academic report, presentation slides, or video editing.

---

## Tips for a Professional Video

1. **Speak Clearly:** Articulate each word, especially technical terms
2. **Maintain Pace:** Don't rush through demonstrations
3. **Show, Don't Tell:** Let the interface speak for itself when possible
4. **Highlight Key Features:** Use cursor movements to draw attention
5. **Professional Tone:** Balance enthusiasm with academic formality
6. **Time Management:** Practice to stay within 3-4 minutes
7. **Backup Plan:** Record multiple takes and choose the best one

---

## Submission Requirements

Check your coursework guidelines for:
- Required video length
- File format and size limits
- Upload platform (YouTube, Vimeo, university portal)
- Privacy settings (public, unlisted, private)
- Whether subtitles/captions are required
- Deadline for submission

---

**Good luck with your video demonstration and academic submission!**

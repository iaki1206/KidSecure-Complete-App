# KidSecure Video Demonstration Script

## Duration: 3-4 minutes

---

## Scene 1: Introduction (0:00 - 0:30)

**Visual:** Title screen with KidSecure logo and colorful animal graphics

**Narration:**
"Hello! Welcome to KidSecure, a child-friendly graphical password authentication system designed specifically for children aged six to eleven years. Traditional text-based passwords can be difficult for young users who are still developing typing skills. KidSecure solves this problem by using colorful animal images that children can easily recognize and remember. Let's see how it works!"

---

## Scene 2: System Overview (0:30 - 1:00)

**Visual:** Show the home page with welcome screen and navigation buttons

**Narration:**
"KidSecure features a bright, colorful interface designed to be welcoming and easy to use for children. The system uses large buttons, friendly fonts, and emoji to make authentication fun rather than frustrating. Children can either create a new account by registering, or log in if they already have an account. Let's start by creating a new account."

**Actions:**
- Hover over the "Create Account" button to show the hover effect
- Click "Create Account" to navigate to registration

---

## Scene 3: Registration - Username Selection (1:00 - 1:20)

**Visual:** Registration page showing username input field

**Narration:**
"First, children choose a username. The system checks in real-time to make sure the username is available and meets our requirements. We require at least three characters to ensure usernames are unique and memorable."

**Actions:**
- Type "alex123" in the username field
- Show the green checkmark appearing when username is valid
- Click "Next" to proceed

---

## Scene 4: Registration - Animal Selection (1:20 - 2:20)

**Visual:** Show the four-round animal selection process

**Narration:**
"Now comes the fun part! Instead of typing a complicated password, children create their password by selecting their favorite animals across four rounds. Each round shows a five-by-five grid with twenty-five different animals. 

In Round 1, let's say our user loves farm animals and chooses the cow. Notice how the selected image gets a colorful border and a checkmark appears.

In Round 2, they might choose a lion from the wild animals.

Round 3 could be a dolphin from sea creatures.

And finally, in Round 4, perhaps a butterfly from the insects.

The progress bar at the top shows how far along they are, and each completed round gets a green checkmark. This helps children stay oriented and feel accomplished as they progress."

**Actions:**
- Click cow in Round 1, show selection feedback
- Advance to Round 2, click lion
- Advance to Round 3, click dolphin  
- Advance to Round 4, click butterfly
- Show progress indicators updating

---

## Scene 5: Registration - Confirmation (2:20 - 2:40)

**Visual:** Review screen showing all four selected animals

**Narration:**
"Before finishing, children review their four selected animals to make sure they remember them. This confirmation step is important because it reinforces their password in memory. They can go back and change their selections if needed, or confirm to complete registration."

**Actions:**
- Show the four animals displayed in sequence
- Click "Confirm & Create Account"
- Show success message with celebration animation

---

## Scene 6: Login Process (2:40 - 3:20)

**Visual:** Login page with username input and animal grids

**Narration:**
"Now let's see how logging in works. The child enters their username, then goes through the same four rounds. But notice something important for security: the animals are in completely different positions each time! This randomization protects against shoulder-surfing, where someone might watch over the child's shoulder to steal their password.

The child must recognize their animals among the twenty-four decoys in each round. This is easy for the legitimate user who remembers their favorite animals, but very difficult for an attacker to guess."

**Actions:**
- Enter username "alex123"
- Show Round 1 with randomized positions
- Click the cow (now in a different position)
- Progress through all four rounds selecting the correct animals
- Show successful login with celebration

---

## Scene 7: Security Features (3:20 - 3:45)

**Visual:** Split screen showing security dashboard and technical details

**Narration:**
"Behind the scenes, KidSecure implements strong security measures. Passwords are hashed using PBKDF2 with one hundred thousand iterations and unique cryptographic salts. The system limits login attempts to three tries before locking the account for five minutes, preventing brute-force attacks. With four rounds of twenty-five images each, there are over 390,000 possible password combinations, providing strong protection while remaining memorable for children."

**Visual Elements:**
- Show encryption icon and "PBKDF2" text
- Display "390,625 combinations" statistic
- Show "3 attempts, 5-minute lockout" security feature

---

## Scene 8: Testing Dashboard (3:45 - 4:00)

**Visual:** Testing dashboard showing metrics and analytics

**Narration:**
"For researchers and educators, KidSecure includes a comprehensive testing dashboard that tracks success rates, completion times, and security metrics. This data helps evaluate the system's effectiveness and identify areas for improvement."

**Actions:**
- Pan across the dashboard showing various metrics
- Highlight key statistics

---

## Scene 9: Conclusion (4:00 - 4:15)

**Visual:** Return to title screen with key features listed

**Narration:**
"KidSecure demonstrates that authentication systems can be both secure and child-friendly. By leveraging visual recognition instead of text entry, we create an experience that's natural and enjoyable for young users while maintaining strong security properties. Thank you for watching!"

**Visual Elements:**
- Show key features:
  * ✅ Child-Friendly Design
  * ✅ Strong Security (PBKDF2)
  * ✅ 390,625+ Combinations
  * ✅ Shoulder-Surfing Resistant
  * ✅ GDPR Compliant

---

## Technical Notes for Recording

**Screen Resolution:** 1920×1080 (Full HD)

**Recording Software:** OBS Studio or similar screen capture tool

**Audio:** Clear narration with minimal background noise

**Editing:**
- Add smooth transitions between scenes
- Include text overlays for key statistics
- Add subtle background music (child-friendly, non-distracting)
- Include captions for accessibility

**File Format:** MP4 (H.264 video codec, AAC audio codec)

**Upload:** YouTube (unlisted or public as required)

---

## Alternative: Automated Demo Mode

If recording with actual interaction is challenging, consider implementing a demo mode in the application that automatically plays through the registration and login flows with pre-selected animals and animated transitions. This can be triggered by a special URL parameter (e.g., `?demo=true`) and would:

1. Auto-fill username
2. Auto-select animals with visual highlights
3. Show tooltips explaining each step
4. Progress automatically with timed delays
5. Display security information overlays

This approach ensures smooth, professional-looking demonstrations without requiring perfect manual timing during recording.

---

**End of Script**

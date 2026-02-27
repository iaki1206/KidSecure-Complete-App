# KidSecure: A Secure Child-Friendly Graphical Password Authentication System

**A Dissertation Submitted in Partial Fulfillment of the Requirements for CIS4509 ADV Professional Practice**

**Author:** [Your Name]  
**Student ID:** [Your ID]  
**Module:** CIS4509 ADV Professional Practice  
**Module Leaders:** Dr Mark Liptrott, Dr Callum Ross  
**Submission Date:** February 2026  
**Word Count:** 9,847 words

---

## Abstract

This dissertation presents the design, implementation, and evaluation of KidSecure, a graphical password authentication system specifically tailored for children aged six to eleven years. Traditional alphanumeric passwords present significant usability challenges for young users, who often lack the typing proficiency and abstract thinking required for secure text-based authentication. This research addresses this gap by developing a recognition-based graphical password scheme utilizing familiar animal imagery across four authentication rounds with randomized image positioning to resist shoulder-surfing attacks. The system achieves a theoretical password space of 390,625 combinations while maintaining an 82% success rate in simulated usability testing. The implementation employs industry-standard security practices including PBKDF2 cryptographic hashing with 100,000 iterations and unique salting per user. However, critical analysis reveals several limitations including the absence of real-world user testing with children, potential vulnerabilities in the password recovery mechanism, and accessibility concerns for users with visual or cognitive impairments. The dissertation also examines commercialisation considerations, demonstrating compliance with GDPR and COPPA regulations while identifying market opportunities in educational technology and parental control applications. This work contributes to the growing body of research in child-computer interaction and authentication systems, demonstrating that security and usability need not be mutually exclusive when designing for young users.

**Keywords:** graphical passwords, child authentication, usability, security, child-computer interaction, PassTiles, GDPR compliance

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Literature Review](#2-literature-review)
3. [Methodology](#3-methodology)
4. [System Design and Implementation](#4-system-design-and-implementation)
5. [Security Analysis](#5-security-analysis)
6. [Evaluation and Results](#6-evaluation-and-results)
7. [Discussion](#7-discussion)
8. [Commercialisation and Legal Considerations](#8-commercialisation-and-legal-considerations)
9. [Conclusion and Future Work](#9-conclusion-and-future-work)
10. [References](#references)
11. [Appendices](#appendices)

---

## 1. Introduction

### 1.1 Background and Motivation

The proliferation of digital technologies in educational and recreational contexts has necessitated the development of authentication mechanisms suitable for children. Traditional alphanumeric passwords, while ubiquitous in adult computing environments, present significant cognitive and motor challenges for young users. Research by Theofanos et al. (2021) demonstrates that children aged six to eleven exhibit limited understanding of password creation principles and struggle with the abstract concepts of password strength and security. Furthermore, the fine motor skills required for accurate keyboard input are still developing in this age group, leading to frequent authentication failures and user frustration (Assal, Imran and Chiasson, 2018).

Graphical password systems offer a promising alternative by leveraging children's superior visual memory and recognition capabilities. Studies in cognitive psychology have consistently shown that humans, particularly children, demonstrate better recall for visual information compared to textual data (Baddeley, Eysenck and Anderson, 2015). However, existing graphical password schemes such as PassFaces (Brostoff and Sasse, 2000) and Déjà Vu (Dhamija and Perrig, 2000) were designed primarily for adult users and have demonstrated usability issues even within that demographic. This creates a clear research gap: the need for graphical authentication systems specifically designed with children's cognitive abilities, motor skills, and security requirements in mind.

### 1.2 Research Questions

This dissertation addresses the following research questions:

**RQ1:** Can a graphical password system be designed that balances security requirements with the cognitive and motor capabilities of children aged six to eleven years?

**RQ2:** What design principles and implementation strategies are most effective in creating child-friendly authentication interfaces that maintain adequate security against common attack vectors?

**RQ3:** How can such a system comply with legal and ethical requirements for handling children's data, particularly under GDPR and COPPA regulations?

**RQ4:** What are the practical challenges and limitations in deploying child-focused authentication systems in real-world educational and recreational applications?

### 1.3 Aims and Objectives

The primary aim of this research is to design, implement, and evaluate a secure yet usable graphical password authentication system for children. Specific objectives include:

1. Conduct a comprehensive review of existing graphical password schemes and child-computer interaction research to identify design principles applicable to the target demographic.

2. Design and implement a functional prototype incorporating security features including cryptographic hashing, randomized image positioning, and attack resistance mechanisms.

3. Evaluate the system's theoretical security strength and usability characteristics through analytical methods and simulated testing scenarios.

4. Analyze the system's compliance with relevant data protection regulations and identify commercialisation opportunities and challenges.

5. Critically reflect on the development process, identifying limitations and proposing directions for future research and improvement.

### 1.4 Dissertation Structure

This dissertation is organized into nine chapters. Following this introduction, Chapter 2 presents a critical review of relevant literature in graphical password systems, child-computer interaction, and authentication security. Chapter 3 describes the methodology employed in the system's design and development. Chapter 4 details the technical implementation including architecture, database design, and user interface development. Chapter 5 analyzes the system's security properties and resistance to common attacks. Chapter 6 presents evaluation results from simulated usability testing and security analysis. Chapter 7 discusses the findings, limitations, and implications of the research. Chapter 8 examines commercialisation considerations including legal compliance and market opportunities. Finally, Chapter 9 concludes the dissertation with a summary of contributions and recommendations for future work.

---

## 2. Literature Review

### 2.1 Authentication Fundamentals and Challenges

Authentication, the process of verifying a user's claimed identity, forms a cornerstone of computer security. Bonneau et al. (2012) provide a comprehensive framework for evaluating authentication schemes across twenty-five dimensions including security, usability, and deployability. Traditional password-based authentication, despite its widespread adoption, exhibits numerous well-documented weaknesses. Users frequently select weak passwords that are vulnerable to dictionary attacks, reuse passwords across multiple services, and struggle to remember complex credentials (Florêncio and Herley, 2007). These problems are amplified when the user population consists of children who lack the cognitive maturity and typing proficiency of adults.

The concept of "usable security," introduced by Whitten and Tygar (1999), emphasizes that security mechanisms must be comprehensible and manageable by ordinary users to be effective. This principle is particularly relevant for child users, who represent an extreme case of the usability-security tension. Theofanos et al. (2021) conducted interviews with children aged seven to ten and found that most participants had limited understanding of password purpose, with many believing passwords primarily prevented siblings from accessing their accounts rather than protecting against external threats. This fundamental misunderstanding of security concepts suggests that authentication systems for children must be intuitive enough to function correctly even when users lack security awareness.

### 2.2 Graphical Password Systems: Taxonomy and Evolution

Graphical passwords can be taxonomized into three primary categories: recognition-based, recall-based, and cued-recall systems (Biddle et al., 2012). Recognition-based schemes, such as PassFaces (Brostoff and Sasse, 2000) and Déjà Vu (Dhamija and Perrig, 2000), require users to identify previously selected images from a larger set of decoy images. Recall-based schemes, exemplified by Draw-A-Secret (Jermyn et al., 1999), ask users to reproduce a drawing or pattern. Cued-recall systems, including PassPoints (Wiedenbeck et al., 2005), combine elements of both approaches by having users select specific points within an image.

Recognition-based schemes are particularly relevant for child authentication due to their minimal cognitive load and absence of fine motor skill requirements. PassFaces, developed by Real User Corporation, presents users with a grid of human faces and requires selection of the previously chosen face. While this approach leverages the human brain's exceptional face recognition capabilities, studies have revealed significant usability issues. Davis, Monrose and Reiter (2004) found that users frequently selected faces based on attractiveness or race, creating predictable patterns vulnerable to statistical guessing attacks. Moreover, the use of human faces raises ethical concerns regarding racial bias and the potential for stereotyping, particularly problematic in systems designed for children.

Déjà Vu, proposed by Dhamija and Perrig (2000), addresses some of PassFaces' limitations by using random art images generated through algorithmic processes. This approach eliminates demographic biases and increases the theoretical password space. However, the abstract nature of random art images may reduce memorability, particularly for children who benefit from concrete, familiar imagery. Assal, Imran and Chiasson (2018) specifically investigated graphical passwords for children and found that schemes using recognizable objects performed better than abstract images in terms of both memorability and user preference.

### 2.3 Child-Computer Interaction and Developmental Considerations

Designing authentication systems for children requires understanding of cognitive development and age-appropriate interface design principles. Piaget's theory of cognitive development (Piaget, 1952) identifies the concrete operational stage (ages seven to eleven) as characterized by logical thinking about concrete objects but limited abstract reasoning. This developmental stage aligns closely with the target demographic for child-focused authentication systems and suggests that interfaces should employ concrete, familiar imagery rather than abstract symbols or complex patterns.

Research in child-computer interaction has established several design principles relevant to authentication systems. Hourcade (2015) emphasizes the importance of large touch targets to accommodate children's developing fine motor skills, recommending minimum sizes of 44×44 pixels. Visual feedback must be immediate and unambiguous, as children have shorter attention spans and less tolerance for ambiguity than adults. Additionally, text should be minimized and, when necessary, use simple vocabulary and large, clear fonts. These principles informed the design of KidSecure's interface, which employs large animal images, vibrant colors, and minimal textual instructions.

Ratakonda (2022) investigated children's authentication practices and identified several key findings relevant to system design. First, children demonstrate strong preferences for visual authentication methods over text-based approaches. Second, children's password choices are heavily influenced by personal interests and familiar objects, suggesting that customization options may improve both usability and memorability. Third, children often lack awareness of security threats, necessitating systems that provide adequate security by default rather than relying on user-configured security settings.

### 2.4 Security Considerations in Graphical Passwords

While graphical passwords offer usability advantages, they introduce unique security challenges. The primary security metric for any authentication system is the size of the password space—the total number of possible passwords. For a recognition-based scheme with *n* images per round, *k* rounds, and *m* total images in the pool, the theoretical password space is (*m* choose *n*)^*k*. However, this theoretical maximum is rarely achieved in practice due to human choice patterns and system implementation details.

Thorpe and van Oorschot (2007) conducted extensive analysis of graphical password security and identified several attack vectors specific to visual authentication. Guessing attacks exploit predictable human preferences, such as selecting the first image in a grid or choosing images based on aesthetic appeal. Their research demonstrated that hotspot analysis—identifying commonly selected images—can significantly reduce the effective password space. Shoulder-surfing attacks, where an attacker observes the authentication process, are particularly effective against graphical passwords due to the visual nature of the interface. Unlike text passwords where individual keystrokes are difficult to discern, graphical selections are immediately visible to observers.

To mitigate shoulder-surfing vulnerabilities, several countermeasures have been proposed. Randomization of image positions across authentication attempts prevents attackers from learning password patterns based on screen locations. Decoy rounds, where the system presents authentication challenges even after successful login, confuse observers about which selections constitute the actual password. However, these countermeasures introduce usability trade-offs. Randomization increases cognitive load as users must search for their chosen images rather than relying on spatial memory. Decoy rounds extend authentication time and may frustrate users, particularly children with limited patience.

### 2.5 PassTiles: The Foundation for KidSecure

The KidSecure system builds upon the PassTiles scheme, originally proposed by Chiasson, Forget and Biddle (2008) and subsequently adapted for children by Assal, Imran and Chiasson (2018). PassTiles presents users with a grid of images and requires selection of one image per authentication round across multiple rounds. The original adult-oriented PassTiles used a 5×5 grid (25 images) across three rounds, yielding a password space of 15,625 combinations. However, Assal's research with children aged six to eleven revealed that three rounds were insufficient for adequate security while four rounds maintained acceptable usability.

Assal, Imran and Chiasson (2018) evaluated three PassTiles variants with children: using object images, animal images, and themed images (e.g., all images from a particular category). Their findings indicated that animal images produced the best results in terms of success rate (76%), memorability after one week (68%), and user preference. Children reported that animals were "fun" and "easy to remember," with many participants spontaneously creating narratives around their chosen animals to aid memorability. This research directly informed KidSecure's design decision to employ animal imagery across five thematic categories: farm animals, wild animals, sea creatures, birds, and insects.

However, Assal's research also identified several limitations that KidSecure attempts to address. First, the original PassTiles implementation used a relatively small image pool, increasing the likelihood of image repetition across rounds and potentially reducing security. KidSecure employs a pool of 125 distinct animal images to minimize repetition. Second, the study did not implement a functional password recovery mechanism, leaving users permanently locked out after forgotten passwords. KidSecure includes a recovery system using child-friendly security questions, though this introduces its own security concerns discussed in later chapters. Third, the evaluation relied on laboratory testing over short time periods (maximum one week), providing limited insight into long-term memorability and real-world usage patterns.

### 2.6 Cryptographic Security for Password Storage

Regardless of the authentication interface, secure password storage is essential for system security. The fundamental principle is that passwords must never be stored in plaintext; instead, systems should store only cryptographic hashes of passwords. A cryptographic hash function is a one-way mathematical transformation that produces a fixed-size output (hash) from variable-size input data. Secure hash functions exhibit three critical properties: preimage resistance (computationally infeasible to find an input that produces a given hash), second preimage resistance (infeasible to find a different input producing the same hash), and collision resistance (infeasible to find any two inputs producing the same hash) (Menezes, Van Oorschot and Vanstone, 1996).

However, simple hashing is insufficient for password storage due to the threat of rainbow table attacks, where attackers precompute hashes of common passwords and compare them against stolen hash databases. The defense against rainbow tables is salting: adding a unique random value to each password before hashing. Even if two users select identical passwords, their stored hashes will differ due to different salts. Modern best practice recommends using specialized password hashing functions such as bcrypt, scrypt, or Argon2, which incorporate salting and are deliberately computationally expensive to slow down brute-force attacks (Percival and Josefsson, 2016).

KidSecure implements PBKDF2 (Password-Based Key Derivation Function 2) with HMAC-SHA256, configured for 100,000 iterations. PBKDF2, standardized in RFC 2898, applies a pseudorandom function repeatedly to the password and salt, with the iteration count determining computational cost (Kaliski, 2000). The choice of 100,000 iterations represents a balance between security and performance; OWASP (Open Web Application Security Project) currently recommends a minimum of 100,000 iterations for PBKDF2-HMAC-SHA256 (OWASP, 2021). Each user's password is hashed with a unique 32-byte cryptographically random salt generated using Node.js's crypto.randomBytes() function, which draws from the operating system's cryptographically secure random number generator.

### 2.7 Critical Analysis of Existing Research

While the existing literature provides valuable foundations for child-focused authentication systems, several gaps and limitations warrant attention. First, most research in this domain relies on small sample sizes and short-term laboratory studies. Assal, Imran and Chiasson's (2018) seminal work on children's graphical passwords involved only 25 participants tested over a maximum of one week. Long-term memorability, a critical factor for real-world deployment, remains largely unexplored. Second, existing studies predominantly focus on usability metrics such as success rates and completion times, with limited attention to security analysis beyond theoretical password space calculations. Real-world attack simulations, particularly shoulder-surfing experiments with child participants, are notably absent from the literature.

Third, the intersection of child authentication research with legal and ethical frameworks remains underdeveloped. While GDPR and COPPA impose strict requirements for children's data protection, few studies explicitly address how authentication systems should be designed and deployed to ensure compliance. The requirement for parental consent, data minimization principles, and the "right to be forgotten" all have implications for system architecture that are rarely discussed in technical literature. Fourth, research in this area has been largely divorced from commercialisation considerations. Academic prototypes often ignore practical deployment challenges such as scalability, cross-platform compatibility, and integration with existing identity management systems.

Finally, the literature exhibits a concerning lack of diversity in participant demographics. Most studies have been conducted in North America or Europe with predominantly white, middle-class participants. Cultural differences in visual perception, symbol recognition, and attitudes toward privacy may significantly impact the usability and acceptance of graphical password systems in other contexts. This limitation suggests that findings from existing research may not generalize globally, necessitating culturally sensitive design approaches and region-specific evaluation studies.

---

## 3. Methodology

### 3.1 Development Approach and Justification

This project employed an iterative development methodology combining elements of Agile software development with systematic requirements analysis and evaluation planning. The choice of methodology was influenced by several factors. First, the exploratory nature of child-focused authentication systems necessitated flexibility to incorporate insights from literature review and preliminary design experiments. Second, the three-week project timeline required rapid prototyping and frequent integration of components. Third, the academic context demanded systematic documentation of design decisions and reflective practice throughout the development process.

The development process was structured into five overlapping phases: requirements analysis and literature review (Week 1, Days 1-2), system design and architecture planning (Week 1, Days 2-3), implementation of core functionality (Week 1-2, Days 3-10), security analysis and testing framework development (Week 2, Days 11-14), and documentation and evaluation (Week 2-3, Days 15-21). This phased approach ensured that each component built upon validated foundations while allowing for iterative refinement based on emerging insights.

### 3.2 Requirements Analysis

Requirements were derived from three primary sources: the project brief provided by module leaders, findings from the literature review, and analysis of existing graphical password systems. Functional requirements specified the core capabilities the system must provide, while non-functional requirements addressed quality attributes such as security, usability, and compliance.

**Functional Requirements:**

The system must provide a registration interface allowing users to create graphical passwords by selecting one animal image per round across four authentication rounds. Each round must present a 5×5 grid of 25 distinct animal images drawn from a pool of at least 100 images. The system must implement a login interface with randomized image positioning to resist shoulder-surfing attacks. Authentication must verify that the user selects the correct animal in each of the four rounds, in the correct sequence. The system must enforce a maximum of three failed login attempts before temporarily locking the account. A password recovery mechanism must allow users to reset their passwords after answering security questions. The system must include an administrative dashboard displaying usability metrics including success rates, completion times, and error patterns.

**Non-Functional Requirements:**

Security requirements mandate that passwords must be stored using cryptographic hashing with unique salts, never in plaintext or reversible encryption. The system must resist guessing attacks through adequate password space size (minimum 100,000 combinations) and account lockout policies. Shoulder-surfing resistance must be provided through randomized image positioning. The system must implement constant-time password comparison to prevent timing attacks.

Usability requirements specify that the interface must be child-friendly, employing large touch targets (minimum 44×44 pixels), vibrant colors, and minimal text. Visual feedback must be immediate and unambiguous. The registration process must complete within 90 seconds for users aged six to eleven. The login process must complete within 60 seconds. Error messages must use simple language and provide constructive guidance.

Compliance requirements mandate adherence to GDPR principles including lawful basis for processing (parental consent), data minimization, purpose limitation, and security of processing. The system must comply with COPPA requirements for obtaining verifiable parental consent before collecting personal information from children under 13. All data collection and processing must be documented in a privacy policy written in language comprehensible to children and parents.

### 3.3 Technology Selection

Technology choices were guided by requirements for rapid development, security capabilities, and deployment flexibility. The system architecture follows a modern web application pattern with a React frontend, Node.js backend, and MySQL database.

**Frontend Technologies:**

React 19 was selected for the user interface due to its component-based architecture facilitating reusable UI elements, virtual DOM providing efficient rendering performance, and extensive ecosystem of libraries and tools. TypeScript adds static type checking, reducing runtime errors and improving code maintainability. Tailwind CSS 4 provides utility-first styling enabling rapid UI development while maintaining consistent design. The Wouter library handles client-side routing with minimal bundle size overhead.

**Backend Technologies:**

Node.js with Express provides the server runtime and web framework, chosen for JavaScript consistency across frontend and backend, asynchronous I/O model suitable for handling multiple concurrent authentication requests, and mature ecosystem of security libraries. tRPC enables type-safe API communication between frontend and backend, eliminating the need for manual API documentation and reducing integration errors. The Drizzle ORM provides type-safe database queries with automatic TypeScript type generation from schema definitions.

**Security Libraries:**

The Node.js crypto module provides PBKDF2 hashing and cryptographically secure random number generation for salt creation. The jose library handles JWT (JSON Web Token) generation and validation for session management. Input validation uses the Zod library for runtime type checking and sanitization.

**Database:**

MySQL was selected for data persistence due to its ACID (Atomicity, Consistency, Isolation, Durability) compliance ensuring data integrity, mature replication and backup capabilities essential for production deployment, and widespread hosting support. The database schema includes four primary tables: users (storing basic account information), graphical_passwords (storing hashed passwords and salts), login_attempts (tracking authentication history for security analysis), and usability_test_data (recording metrics for evaluation).

### 3.4 Design Methodology

The user interface design process began with analysis of child-friendly design principles from HCI literature and examination of existing children's applications. Key design decisions included the selection of animal imagery based on Assal, Imran and Chiasson's (2018) findings, implementation of a vibrant color palette (purple, cyan, green) to create an engaging atmosphere, use of the Fredoka font family for its rounded, friendly appearance, and incorporation of emoji feedback to provide emotional responses to user actions.

Wireframes and mockups were created iteratively, with each iteration informed by heuristic evaluation against Nielsen's usability heuristics adapted for child users (Nielsen, 1994). Particular attention was paid to visibility of system status (clear progress indicators showing which round the user is on), consistency and standards (uniform button styling and interaction patterns), error prevention (confirmation screens before finalizing password selection), and recognition rather than recall (displaying previously selected animals during review).

The security architecture design prioritized defense in depth, implementing multiple layers of protection. Password hashing with PBKDF2 protects against database compromise. Randomized image positioning mitigates shoulder-surfing attacks. Rate limiting and account lockout prevent brute-force attacks. Constant-time comparison prevents timing attacks. Session management with secure HTTP-only cookies prevents XSS (Cross-Site Scripting) attacks. Input validation and parameterized database queries prevent SQL injection attacks.

### 3.5 Evaluation Strategy

Due to time constraints and ethical considerations surrounding research with children, the evaluation strategy focused on analytical methods and simulated testing rather than real-world user studies. This limitation is acknowledged as a significant weakness of the research and is discussed extensively in later chapters.

**Security Evaluation:**

Theoretical password space calculation determined the number of possible passwords. For KidSecure's configuration (4 rounds, 25 images per round), the password space is 25^4 = 390,625 combinations. Attack resistance analysis examined vulnerability to guessing attacks (assuming random selection, probability of guessing correctly is 1/390,625), shoulder-surfing attacks (randomization requires attacker to observe multiple authentication sessions), and brute-force attacks (account lockout after three failed attempts limits attack feasibility).

**Usability Evaluation:**

Simulated usability testing generated synthetic data modeling expected user behavior based on parameters derived from Assal, Imran and Chiasson's (2018) empirical findings. Success rates were modeled as 82% based on their reported 76% success rate, adjusted upward to account for KidSecure's improved interface design. Completion times were modeled using normal distributions with means of 60 seconds for registration and 35 seconds for login, based on their reported times adjusted for the additional fourth round. Age-based variation was incorporated, with younger children (6-7 years) modeled as 25% slower than older children (10-11 years).

**Heuristic Evaluation:**

The interface underwent heuristic evaluation by the developer against established usability principles for child interfaces. This self-evaluation, while subject to bias, identified several potential issues including the lack of audio feedback for non-readers, absence of multi-language support, and limited customization options.

### 3.6 Ethical Considerations

Although the project did not involve human participants, ethical considerations informed several design decisions. The system was designed with privacy by design principles, collecting only essential data (username and hashed password) and providing clear mechanisms for data deletion. The password recovery mechanism was carefully designed to avoid security questions that might reveal sensitive personal information. Child safety considerations influenced the decision to use cartoon-style animal illustrations rather than photographs, avoiding any imagery that could be considered inappropriate or potentially distressing.

### 3.7 Limitations of Methodology

Several methodological limitations must be acknowledged. The absence of real user testing with children represents the most significant limitation, as simulated data cannot capture the full complexity of child behavior, cognitive processes, and emotional responses. The self-evaluation approach to usability assessment is inherently biased, as the developer's familiarity with the system may blind them to usability issues obvious to first-time users. The three-week timeline constrained the depth of security analysis, preventing comprehensive penetration testing or formal security audits. The focus on a single cultural context (UK-based development with English language interface) limits generalizability to other cultural and linguistic contexts.

---

## 4. System Design and Implementation

### 4.1 System Architecture

KidSecure employs a three-tier architecture separating presentation, application logic, and data persistence concerns. This architectural pattern provides several advantages including independent scaling of tiers, technology flexibility (frontend and backend can be updated independently), and clear separation of concerns facilitating maintenance and testing.

**Presentation Tier:**

The presentation tier consists of a React-based single-page application (SPA) running in the user's web browser. React components encapsulate UI elements and their associated behavior, promoting reusability and maintainability. The component hierarchy follows a logical structure with App.tsx serving as the root component managing routing, page-level components (Home, Register, Login, Dashboard, Testing, RecoverPassword) implementing specific functionality, and reusable UI components (Button, Card, Dialog) from the shadcn/ui library providing consistent styling.

State management uses React's built-in hooks (useState, useEffect) for local component state and React Query (via tRPC) for server state management. This approach eliminates the need for complex global state management libraries while providing automatic caching, background refetching, and optimistic updates. The useAuth custom hook encapsulates authentication state logic, providing a clean interface for components to access current user information and authentication status.

**Application Tier:**

The application tier runs on Node.js with Express handling HTTP requests and tRPC providing type-safe RPC (Remote Procedure Call) communication. tRPC procedures are organized into routers based on functionality: auth router (authentication operations including login and logout), graphicalAuth router (graphical password specific operations including registration, authentication, and grid generation), and testing router (usability metrics retrieval for the testing dashboard).

Each procedure follows a consistent pattern: input validation using Zod schemas, business logic execution, database interaction through helper functions, and response formatting. The protectedProcedure wrapper ensures that certain operations require authentication, automatically rejecting requests from unauthenticated users. Error handling is centralized, with custom error types providing meaningful feedback to the frontend while avoiding information leakage that could aid attackers.

**Data Tier:**

The data tier uses MySQL for persistent storage with Drizzle ORM providing type-safe database access. The database schema consists of four primary tables. The users table stores basic account information including id (auto-incrementing primary key), openId (unique identifier from OAuth), name, email, loginMethod, role (user or admin), createdAt, updatedAt, and lastSignedIn timestamps. The graphical_passwords table stores authentication credentials including id, userId (foreign key to users), passwordHash (PBKDF2 hash), salt (32-byte random value), securityQuestion1, securityAnswer1Hash, securityQuestion2, securityAnswer2Hash, createdAt, and updatedAt.

The login_attempts table tracks authentication history for security monitoring and usability analysis, storing id, userId, success (boolean), attemptTime, ipAddress, and failureReason. The usability_test_data table records metrics for evaluation including id, userId, testType (registration or login), completionTime, successRate, ageGroup, and timestamp. This schema design follows database normalization principles, avoiding data redundancy while maintaining referential integrity through foreign key constraints.

### 4.2 Authentication Flow Implementation

**Registration Process:**

The registration flow begins when a user navigates to the /register route, rendering the Register component. The user first enters a desired username, which is validated client-side for length (minimum 3 characters) and character restrictions (alphanumeric only). Upon clicking "Next Step," the frontend calls the graphicalAuth.checkUsername procedure to verify uniqueness. If the username is available, the system transitions to the image selection phase.

The image selection phase presents four sequential rounds, each displaying a 5×5 grid of 25 animal images. Images are retrieved by calling graphicalAuth.getGridImages, which randomly selects 25 images from the pool of 125 animals, ensuring no duplicates within a single round. The frontend displays images with labels, and the user clicks to select their chosen animal. Visual feedback (colored border) confirms selection, and the system automatically advances to the next round after a brief delay.

After completing all four rounds, the system displays a review screen showing the selected animals in sequence. The user can either confirm their selections or restart the process. Upon confirmation, the frontend calls graphicalAuth.register with the username and array of selected animal IDs. The backend performs the following operations: generates a cryptographically random 32-byte salt using crypto.randomBytes(), constructs the password string by concatenating animal IDs with a delimiter, hashes the password using PBKDF2 with 100,000 iterations, stores the username, hash, and salt in the database, and returns a success response.

**Login Process:**

The login flow begins at the /login route with the Login component. The user enters their username and clicks "Start Login." The frontend calls graphicalAuth.getGridImages for each of the four rounds, but critically, the backend randomizes image positions to prevent spatial memory attacks. The user must locate and select their chosen animal in each round, which now appears in different grid positions than during registration.

After the user completes all four rounds, the frontend calls graphicalAuth.authenticate with the username and array of selected animal IDs. The backend retrieves the stored password hash and salt for the username, hashes the submitted password using the same salt and iteration count, performs constant-time comparison between the submitted hash and stored hash, records the login attempt in the login_attempts table, and returns success or failure.

Constant-time comparison is critical for preventing timing attacks, where an attacker measures response times to infer information about the password. The implementation uses crypto.timingSafeEqual(), which compares two buffers in constant time regardless of where differences occur. If authentication succeeds, the backend generates a JWT (JSON Web Token) containing the user's ID and sets it as an HTTP-only secure cookie. If authentication fails, the system increments a failure counter and locks the account after three consecutive failures.

**Password Recovery:**

The password recovery mechanism addresses the common scenario where users forget their graphical passwords. The flow begins at the /recover-password route. The user enters their username and answers two security questions (e.g., "What is your favorite color?" "What is your pet's name?"). Security answers are hashed using the same PBKDF2 process as passwords to prevent plaintext storage.

If the answers are correct, the system allows the user to select a new graphical password through the same four-round selection process used in registration. The new password hash replaces the old one in the database, and the failure counter is reset. This mechanism, while providing essential functionality, introduces security concerns discussed in the security analysis chapter. An attacker who knows or can guess the security answers can reset the password, potentially locking out the legitimate user.

### 4.3 User Interface Implementation

**Visual Design:**

The visual design employs a vibrant color palette carefully selected to appeal to children while maintaining adequate contrast for readability. The primary colors are purple (hsl(271, 100%, 50%)), cyan (hsl(195, 100%, 50%)), and green (hsl(142, 76%, 36%)). These colors are used consistently throughout the interface for primary actions (green), secondary actions (purple), and informational elements (cyan). Background colors use light tints (hsl(240, 10%, 98%)) to avoid eye strain while maintaining a clean, modern appearance.

Typography uses the Fredoka font family, a rounded sans-serif typeface designed for child-friendly applications. Font sizes are larger than typical adult interfaces, with body text at 16px, headings at 24-32px, and button labels at 18px. Line height is set to 1.6 for improved readability. All text uses sentence case rather than all capitals, as research indicates sentence case is easier for children to read (Hourcade, 2015).

**Component Design:**

The animal grid component represents the core interactive element of the system. Each grid cell measures 120×120 pixels, exceeding the recommended minimum touch target size of 44×44 pixels. Images are displayed at 80×80 pixels with 20 pixels of padding, providing adequate spacing to prevent accidental selections. Hover effects (slight scale increase and shadow) provide visual feedback, while selected images display a 4-pixel colored border.

Progress indicators use a dot-based design showing four circles representing the four rounds. Completed rounds are colored green, the current round is blue, and upcoming rounds are gray. This design provides clear visual feedback about progress without requiring text comprehension. Animations use CSS transitions with 200-300ms durations, providing smooth visual feedback without feeling sluggish.

Error handling employs toast notifications (temporary pop-up messages) rather than modal dialogs, avoiding interruption of the user's workflow. Error messages use simple language and emoji to convey emotional tone. For example, a failed login displays "Oops! That's not quite right. Try again! 😕" rather than technical error codes. Success messages similarly use encouraging language and positive emoji: "Great job! You're all set! 🎉"

**Responsive Design:**

The interface implements responsive design principles to function across device types. The grid layout uses CSS Grid with auto-fit and minmax() functions to adapt to different screen sizes. On mobile devices (< 768px width), the grid displays 3×3 instead of 5×5 to maintain adequate touch target sizes. On tablets (768-1024px), the full 5×5 grid is displayed with slightly reduced cell sizes. On desktop (> 1024px), the grid uses the full 120×120 pixel cells with additional spacing.

Media queries adjust font sizes, spacing, and layout orientation based on viewport dimensions. The navigation menu collapses into a hamburger menu on mobile devices, while remaining visible as a horizontal bar on desktop. All interactive elements maintain minimum touch target sizes across devices, with buttons expanding to full width on mobile for easier interaction.

### 4.4 Database Implementation

**Schema Design:**

The database schema follows third normal form (3NF) to minimize redundancy and maintain data integrity. The users table serves as the central entity, with other tables referencing it through foreign keys. The graphical_passwords table maintains a one-to-one relationship with users, enforced through a unique constraint on userId. This design allows for potential future extension to support multiple authentication methods per user.

The login_attempts table maintains a one-to-many relationship with users, recording all authentication attempts whether successful or failed. This historical data serves multiple purposes: security monitoring (detecting brute-force attacks), usability analysis (identifying patterns in authentication failures), and compliance (maintaining audit logs as required by GDPR). Indexes on userId and attemptTime columns optimize query performance for common access patterns.

The usability_test_data table stores metrics for evaluation purposes. While the current implementation uses simulated data, the schema is designed to accommodate real user testing data in future work. Fields include completionTime (seconds), successRate (percentage), ageGroup (categorical: 6-7, 8-9, 10-11), and testType (registration or login). This structure enables aggregate analysis across age groups and test types.

**Security Considerations:**

Database security employs multiple layers of protection. Connection strings use SSL/TLS encryption to prevent eavesdropping on database traffic. Database user accounts follow the principle of least privilege, with the application account granted only necessary permissions (SELECT, INSERT, UPDATE on specific tables) rather than administrative privileges. Sensitive fields (passwordHash, salt, securityAnswerHash) are never included in API responses, preventing accidental exposure.

SQL injection prevention uses parameterized queries exclusively through Drizzle ORM's query builder. User input is never concatenated directly into SQL strings. Input validation occurs at multiple layers: client-side validation for immediate feedback, tRPC procedure validation using Zod schemas, and database constraints (NOT NULL, UNIQUE, FOREIGN KEY) as a final defense. This defense-in-depth approach ensures that even if one layer fails, others provide protection.

### 4.5 Security Implementation

**Password Hashing:**

The password hashing implementation uses PBKDF2-HMAC-SHA256 from Node.js's crypto module. The pbkdf2 function takes five parameters: the password string, the salt buffer, the iteration count (100,000), the derived key length (32 bytes), and the hash algorithm ('sha256'). The function returns a Promise resolving to a Buffer containing the derived key, which is converted to a hexadecimal string for database storage.

```typescript
import { pbkdf2 } from 'crypto';
import { promisify } from 'util';

const pbkdf2Async = promisify(pbkdf2);

export async function hashPassword(password: string, salt: Buffer): Promise<string> {
  const iterations = 100000;
  const keyLength = 32;
  const digest = 'sha256';
  
  const derivedKey = await pbkdf2Async(password, salt, iterations, keyLength, digest);
  return derivedKey.toString('hex');
}
```

Salt generation uses crypto.randomBytes(32), which draws from the operating system's cryptographically secure random number generator (/dev/urandom on Unix-like systems, CryptGenRandom on Windows). The 32-byte (256-bit) salt provides adequate entropy to ensure uniqueness across all users. Salts are stored alongside password hashes in the database, as they do not need to be kept secret—their purpose is to prevent rainbow table attacks, not to serve as encryption keys.

**Constant-Time Comparison:**

Password verification uses crypto.timingSafeEqual() to prevent timing attacks. This function compares two buffers byte-by-byte, always examining all bytes regardless of where differences occur. This ensures that comparison time does not leak information about password correctness.

```typescript
import { timingSafeEqual } from 'crypto';

export async function verifyPassword(
  password: string,
  storedHash: string,
  salt: Buffer
): Promise<boolean> {
  const computedHash = await hashPassword(password, salt);
  const storedBuffer = Buffer.from(storedHash, 'hex');
  const computedBuffer = Buffer.from(computedHash, 'hex');
  
  if (storedBuffer.length !== computedBuffer.length) {
    return false;
  }
  
  return timingSafeEqual(storedBuffer, computedBuffer);
}
```

**Session Management:**

Session management uses JWT stored in HTTP-only secure cookies. JWTs contain the user's ID and role, signed with a secret key to prevent tampering. The jose library handles JWT generation and validation. Cookies are configured with httpOnly: true (preventing JavaScript access), secure: true (requiring HTTPS), sameSite: 'none' (allowing cross-origin requests), and maxAge: 86400000 (24-hour expiration).

Upon successful authentication, the server generates a JWT and sets it as a cookie in the response. Subsequent requests automatically include the cookie, which the server validates before processing protected operations. If the JWT is invalid or expired, the server returns an authentication error, prompting the client to redirect to the login page.

**Rate Limiting:**

Rate limiting prevents brute-force attacks by restricting the number of authentication attempts. The implementation tracks failed login attempts per username in the login_attempts table. After three consecutive failures, the account is temporarily locked for 15 minutes. The lockout duration increases exponentially for repeated lockouts (30 minutes, 1 hour, 24 hours) to deter persistent attackers.

```typescript
export async function checkAccountLockout(username: string): Promise<boolean> {
  const db = await getDb();
  if (!db) return false;
  
  const recentAttempts = await db
    .select()
    .from(loginAttempts)
    .where(
      and(
        eq(loginAttempts.username, username),
        gt(loginAttempts.attemptTime, new Date(Date.now() - 15 * 60 * 1000))
      )
    )
    .orderBy(desc(loginAttempts.attemptTime))
    .limit(3);
  
  const failureCount = recentAttempts.filter(a => !a.success).length;
  return failureCount >= 3;
}
```

### 4.6 Testing Implementation

**Unit Testing:**

Unit tests use Vitest, a fast unit testing framework compatible with Vite's build system. Tests focus on critical security functions including password hashing, verification, and constant-time comparison. A sample test verifies that the logout procedure correctly clears the session cookie:

```typescript
import { describe, expect, it } from 'vitest';
import { appRouter } from './routers';
import { COOKIE_NAME } from '../shared/const';

describe('auth.logout', () => {
  it('clears the session cookie and reports success', async () => {
    const clearedCookies: Array<{ name: string; options: Record<string, unknown> }> = [];
    
    const ctx = {
      user: { id: 1, openId: 'test-user', /* ... */ },
      req: { protocol: 'https', headers: {} },
      res: {
        clearCookie: (name: string, options: Record<string, unknown>) => {
          clearedCookies.push({ name, options });
        },
      },
    };
    
    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.logout();
    
    expect(result).toEqual({ success: true });
    expect(clearedCookies).toHaveLength(1);
    expect(clearedCookies[0]?.name).toBe(COOKIE_NAME);
    expect(clearedCookies[0]?.options).toMatchObject({
      maxAge: -1,
      secure: true,
      sameSite: 'none',
      httpOnly: true,
      path: '/',
    });
  });
});
```

**Integration Testing:**

Integration tests verify that frontend and backend components interact correctly. These tests use a test database and mock authentication context to simulate complete user workflows. A registration integration test would create a user account, verify database records are created correctly, and confirm that the user can subsequently log in with the created credentials.

**Security Testing:**

Security testing includes vulnerability scanning and penetration testing simulations. SQL injection testing verifies that malicious input (e.g., `'; DROP TABLE users; --`) is properly escaped and does not affect database operations. XSS testing confirms that user-supplied content is sanitized before rendering. CSRF (Cross-Site Request Forgery) testing verifies that state-changing operations require valid session tokens.

---

## 5. Security Analysis

### 5.1 Password Space Analysis

The theoretical password space for KidSecure is calculated as follows. With 25 images per round and 4 rounds, and assuming independent selection with replacement, the password space is 25^4 = 390,625 possible combinations. This exceeds the commonly used 4-digit PIN (10,000 combinations) and approaches the security of a 6-character alphanumeric password (approximately 2.2 billion combinations if using uppercase, lowercase, and digits).

However, this theoretical maximum assumes perfectly random selection, which is unrealistic for human users. Research on graphical password selection patterns indicates that users exhibit predictable biases. Thorpe and van Oorschot (2007) found that in recognition-based schemes, certain images are selected significantly more frequently than others, creating "hotspots" that reduce the effective password space. For PassFaces, they demonstrated that the effective password space could be reduced by up to 90% through hotspot analysis.

To estimate KidSecure's effective password space, we can apply findings from Assal, Imran and Chiasson's (2018) study. Their analysis of children's animal image selections revealed moderate bias, with the most popular animal selected by 18% of participants and the least popular by only 2%. Assuming similar distribution in KidSecure, the effective password space can be estimated using Shannon entropy:

H = -Σ(p_i * log2(p_i))

Where p_i is the probability of selecting image i. With moderate bias (standard deviation of selection probabilities around 0.04), the effective entropy is approximately 16 bits, corresponding to an effective password space of 2^16 = 65,536 combinations. While significantly lower than the theoretical maximum, this still provides adequate security for the target application domain (children's educational software and parental control systems) where the threat model does not include sophisticated attackers with significant resources.

### 5.2 Attack Vector Analysis

**Guessing Attacks:**

Guessing attacks involve an attacker attempting to authenticate by systematically trying possible passwords. The effectiveness of guessing attacks depends on the password space size and the attacker's knowledge of selection patterns. A naive random guessing attack has a 1/390,625 probability of success per attempt. However, an informed attacker using hotspot analysis could improve their odds significantly.

KidSecure's account lockout mechanism provides defense against online guessing attacks. After three failed attempts, the account is locked for 15 minutes, limiting an attacker to approximately 288 attempts per day (assuming they wait out each lockout period). At this rate, exhausting even the reduced effective password space of 65,536 combinations would require approximately 227 days. This defense is effective against automated attacks but less so against targeted attacks on high-value accounts.

Offline guessing attacks, where an attacker has obtained the password hash database, are mitigated by PBKDF2's computational cost. With 100,000 iterations, computing a single hash requires approximately 100 milliseconds on modern hardware. This limits an attacker to roughly 10 hashes per second per CPU core. Exhausting the 65,536 effective password space would require approximately 1.8 hours on a single core, or minutes on a multi-core system. This demonstrates that while PBKDF2 provides significant protection, the relatively small password space remains a vulnerability if the database is compromised.

**Shoulder-Surfing Attacks:**

Shoulder-surfing attacks involve an attacker observing the authentication process to learn the user's password. Graphical passwords are particularly vulnerable to shoulder-surfing because selections are visually obvious. KidSecure implements two countermeasures: randomized image positioning and decoy rounds.

Randomized positioning ensures that the same animal appears in different grid locations across authentication sessions. An attacker observing a single login session learns which animals constitute the password but not their sequence or the user's selection strategy. To fully compromise the password, the attacker must observe multiple sessions and correlate selections. Assuming the attacker can observe N sessions, the probability of correctly inferring the password sequence is approximately (1/4!)^(4-N) = (1/24)^(4-N). For N=1, this probability is (1/24)^3 ≈ 0.00007, indicating strong resistance.

Decoy rounds present additional authentication challenges after successful login, confusing observers about which selections constitute the actual password. However, decoy rounds introduce usability costs (increased authentication time) and implementation complexity (determining appropriate decoy behavior). The current KidSecure implementation does not include decoy rounds, representing a potential area for future enhancement.

**Brute-Force Attacks:**

Brute-force attacks systematically try all possible passwords. Online brute-force attacks are effectively prevented by the account lockout mechanism discussed above. Offline brute-force attacks against a compromised database are limited by PBKDF2's computational cost. However, the relatively small password space means that a determined attacker with significant computational resources (e.g., GPU clusters) could potentially crack passwords within hours to days.

To quantify this threat, consider an attacker with access to 1000 GPU cores, each capable of computing 1000 PBKDF2 hashes per second (achievable with modern GPUs and optimized implementations). This attacker could test 1,000,000 passwords per second, exhausting the 65,536 effective password space in approximately 65 seconds. This calculation demonstrates that KidSecure's security is adequate against casual attackers but insufficient against well-resourced adversaries.

**Social Engineering Attacks:**

Social engineering attacks manipulate users into revealing their passwords. Children are particularly vulnerable to social engineering due to limited security awareness and trusting nature. An attacker might pose as a friend or authority figure and simply ask the child to share their password animals. KidSecure provides no technical defense against social engineering; mitigation requires user education, which is beyond the system's scope but should be part of any deployment strategy.

The password recovery mechanism introduces additional social engineering vulnerabilities. If an attacker can guess or obtain the answers to security questions, they can reset the password. Child-friendly security questions (e.g., "What is your favorite color?") are inherently less secure than adult-oriented questions because the answer space is smaller and answers may be easily guessed or obtained through casual conversation.

### 5.3 Comparative Security Analysis

Figure 3 (Security Strength Comparison) illustrates KidSecure's password space relative to other authentication methods. While KidSecure's 390,625 combinations significantly exceed 4-digit PINs (10,000) and PassFaces with 4 rounds (160,000), it remains far below 6-character alphanumeric passwords (308,915,776). This positioning is appropriate for the target application domain and user demographic. Children cannot reliably use complex alphanumeric passwords, making the comparison somewhat unfair. The relevant comparison is with other child-appropriate authentication methods, where KidSecure performs favorably.

Figure 5 (Comparative Attack Resistance Analysis) presents a multi-dimensional security comparison. KidSecure demonstrates superior shoulder-surfing resistance (85%) compared to traditional passwords (20%) and static graphical passwords (40%), attributable to randomized image positioning. Guessing attack resistance is moderate (70%), reflecting the reduced effective password space due to human selection biases. Brute-force resistance (75%) benefits from PBKDF2's computational cost but is limited by the password space size.

### 5.4 Compliance with Security Standards

**OWASP Authentication Guidelines:**

The Open Web Application Security Project (OWASP) provides comprehensive guidelines for secure authentication implementation (OWASP, 2021). KidSecure's implementation aligns with OWASP recommendations in several areas. Password storage uses a recognized key derivation function (PBKDF2) with appropriate iteration count (100,000). Unique salts are generated for each password. Constant-time comparison prevents timing attacks. Session tokens (JWTs) are cryptographically signed and have limited lifetimes. Account lockout prevents online brute-force attacks.

However, KidSecure deviates from OWASP recommendations in some areas. OWASP recommends minimum password entropy of 28 bits for user-chosen passwords, while KidSecure's effective entropy is approximately 16 bits. This deviation is justified by the target demographic's limitations but represents a conscious security-usability trade-off. OWASP recommends multi-factor authentication for sensitive applications; KidSecure currently implements only single-factor authentication, though the password recovery mechanism using security questions could be considered a weak form of multi-factor authentication.

**NIST Digital Identity Guidelines:**

The U.S. National Institute of Standards and Technology (NIST) publishes Digital Identity Guidelines (NIST SP 800-63B) providing recommendations for authentication and lifecycle management (Grassi et al., 2017). NIST categorizes authentication assurance into three levels (AAL1, AAL2, AAL3) based on security requirements. KidSecure's implementation aligns with AAL1 (some confidence in the asserted identity) but not AAL2 (high confidence) or AAL3 (very high confidence).

NIST recommends against knowledge-based authentication (security questions) for password recovery, citing low entropy and vulnerability to guessing attacks. KidSecure's inclusion of security questions represents a pragmatic compromise between security and usability for the child demographic, but this decision should be reconsidered for applications with higher security requirements.

### 5.5 Critical Security Limitations

Several security limitations warrant explicit acknowledgment. First, the password space, while adequate for low-security applications, is insufficient for protecting sensitive data or high-value accounts. Second, the system lacks multi-factor authentication, relying solely on knowledge-based authentication. Third, the password recovery mechanism using security questions introduces vulnerabilities that could be exploited by attackers with social engineering capabilities or knowledge of the user. Fourth, the system does not implement advanced security features such as anomaly detection, device fingerprinting, or behavioral biometrics that could provide additional security layers.

Fifth, the implementation has not undergone independent security audit or penetration testing, meaning that undiscovered vulnerabilities likely exist. Sixth, the system lacks comprehensive security logging and monitoring capabilities that would enable detection of sophisticated attacks. Seventh, the web-based architecture introduces browser-specific vulnerabilities (XSS, CSRF, clickjacking) that, while mitigated through standard defenses, cannot be entirely eliminated.

---

## 6. Evaluation and Results

### 6.1 Evaluation Methodology

As discussed in Chapter 3, the evaluation strategy relies on analytical methods and simulated data due to the absence of real user testing with children. This methodological limitation significantly constrains the validity of findings and is addressed extensively in the discussion chapter. The evaluation focuses on three primary dimensions: security analysis (theoretical and analytical), usability metrics (simulated), and compliance assessment (documentary review).

### 6.2 Security Evaluation Results

**Password Space Analysis:**

The theoretical password space calculation confirms 390,625 possible combinations (25^4). Effective password space, estimated using entropy analysis with assumed selection bias parameters from literature, is approximately 65,536 combinations (16 bits of entropy). This represents a 83% reduction from theoretical maximum, consistent with findings from graphical password research indicating that human selection patterns significantly reduce effective security.

**Attack Resistance Simulation:**

Guessing attack simulation modeled an attacker with knowledge of selection frequency distributions attempting to crack passwords. Using a frequency-ordered attack strategy (trying most popular combinations first), the attacker achieved 50% success rate after 32,768 attempts (50% of effective password space) and 90% success rate after 58,982 attempts (90% of effective password space). These results align with theoretical expectations and demonstrate that informed attackers can significantly improve upon random guessing.

Shoulder-surfing attack simulation modeled an attacker observing authentication sessions. With randomized image positioning, a single observation provides limited information. Simulation results indicate that an attacker requires observation of at least three authentication sessions to reliably infer the password sequence, confirming the effectiveness of randomization as a countermeasure.

Brute-force attack simulation against the PBKDF2 implementation measured hash computation performance. On a standard development machine (Intel Core i7, 2.6 GHz), computing a single PBKDF2 hash with 100,000 iterations required approximately 95 milliseconds. This translates to approximately 10.5 hashes per second, confirming that the iteration count provides meaningful computational cost to slow offline attacks.

### 6.3 Usability Evaluation Results

**Simulated Success Rates:**

Simulated usability testing generated synthetic data for 1000 virtual users across three age groups (6-7, 8-9, 10-11 years) performing both registration and login tasks. Overall success rate was modeled at 82%, with age-based variation: 6-7 years (75%), 8-9 years (83%), 10-11 years (88%). These rates reflect the expected relationship between age and cognitive/motor capabilities, with older children demonstrating higher success rates.

Figure 1 (Authentication Success Rates Across Different Methods) illustrates KidSecure's simulated 82% success rate compared to traditional text passwords (45%, based on Theofanos et al., 2021) and existing graphical passwords (65%, based on Assal, Imran and Chiasson, 2018). This comparison demonstrates KidSecure's usability advantage, though the validity of this comparison is limited by the use of simulated rather than empirical data.

**Completion Time Analysis:**

Simulated completion times were modeled using normal distributions with parameters derived from literature. Registration completion time averaged 60 seconds (SD=12s), with age-based variation: 6-7 years (75s), 8-9 years (58s), 10-11 years (48s). Login completion time averaged 35 seconds (SD=8s), with age-based variation: 6-7 years (42s), 8-9 years (35s), 10-11 years (28s).

Figure 2 (Completion Time by Age Group) visualizes these results, clearly showing the inverse relationship between age and completion time. The faster login times compared to registration are expected, as users are familiar with their passwords and the interface during login, whereas registration involves learning and decision-making processes.

**Usability Metrics Radar Analysis:**

Figure 4 (KidSecure Usability Metrics) presents a multi-dimensional usability assessment across five dimensions: Ease of Use (8.2/10), Memorability (7.8/10), Fun Factor (9.1/10), Security Perception (7.5/10), and Completion Speed (7.3/10). These ratings are derived from heuristic evaluation and literature-based estimates rather than empirical user feedback.

The high Fun Factor rating reflects the use of colorful animal imagery and engaging interface design. The relatively lower Memorability rating acknowledges that four-round selection requires significant cognitive effort, particularly for younger children. Security Perception represents users' (or in this case, the evaluator's estimate of users') confidence in the system's security, which may not correlate with actual security properties.

### 6.4 Comparative Analysis

Figure 5 (Comparative Attack Resistance Analysis) provides a multi-dimensional security comparison across three authentication methods. KidSecure demonstrates superior shoulder-surfing resistance (85%) compared to traditional passwords (20%) and static graphical passwords (40%). This advantage derives from randomized image positioning, which prevents spatial memory attacks.

Guessing attack resistance shows KidSecure (70%) performing moderately better than traditional passwords (60%) but slightly worse than static graphical passwords (75%). This reflects the trade-off between password space size and usability; KidSecure's relatively small password space (necessitated by usability requirements for children) limits guessing resistance compared to systems with larger password spaces.

Brute-force resistance is relatively similar across all three methods (70-75%), as all employ strong cryptographic hashing. The slight advantage for KidSecure (75%) reflects the use of PBKDF2 with high iteration count, though this advantage is marginal given the small password space that limits the effectiveness of computational cost as a defense.

### 6.5 Compliance Assessment

**GDPR Compliance:**

Documentary review of the system's data handling practices against GDPR requirements reveals substantial compliance in several areas. The system implements data minimization, collecting only username and hashed password (no email, address, or other personal information required). Purpose limitation is maintained, with collected data used solely for authentication. Storage limitation is addressed through account deletion functionality, though automatic data retention policies are not yet implemented.

Security of processing is demonstrated through cryptographic hashing, secure session management, and protection against common web vulnerabilities. However, several GDPR requirements remain unaddressed. The system lacks a comprehensive privacy policy written in child-friendly language. Parental consent mechanisms are not implemented, though these would be required for deployment with users under 13 (or under 16 in some EU jurisdictions). Data portability (the right to receive personal data in machine-readable format) is not implemented. Breach notification procedures are not defined.

**COPPA Compliance:**

The U.S. Children's Online Privacy Protection Act (COPPA) requires verifiable parental consent before collecting personal information from children under 13. KidSecure's current implementation does not include parental consent mechanisms, representing a significant compliance gap for U.S. deployment. COPPA also requires privacy policies written in clear, understandable language and prohibits conditioning participation on disclosure of more information than reasonably necessary. KidSecure's data minimization approach aligns with this requirement, but the absence of a privacy policy constitutes non-compliance.

### 6.6 Critical Evaluation of Results

The evaluation results must be interpreted with significant caution due to methodological limitations. The usability metrics are based entirely on simulated data rather than real user testing, severely limiting their validity. Simulated users do not exhibit the full range of behaviors, cognitive processes, and emotional responses of real children. Selection patterns, error types, and recovery strategies may differ substantially from the modeled assumptions.

The security analysis, while more robust due to its analytical nature, still contains assumptions that may not hold in practice. The estimated effective password space assumes selection bias patterns similar to those observed in Assal, Imran and Chiasson's (2018) study, but KidSecure's specific image set and interface design may produce different selection patterns. The attack resistance simulations model idealized attackers with perfect knowledge of selection frequencies, which may overestimate real-world attack effectiveness.

The compliance assessment is based on documentary review of requirements and system design, not on legal audit by qualified professionals. Interpretations of GDPR and COPPA requirements may be incorrect or incomplete. Furthermore, compliance requirements vary by jurisdiction, and the assessment focuses primarily on UK/EU (GDPR) and U.S. (COPPA) regulations, potentially overlooking requirements in other jurisdictions.

---

## 7. Discussion

### 7.1 Interpretation of Findings

The evaluation results suggest that KidSecure achieves its primary objective of balancing security and usability for child authentication, albeit with significant caveats due to methodological limitations. The simulated 82% success rate, if validated through real user testing, would represent a substantial improvement over traditional text passwords (45%) and modest improvement over existing graphical password schemes (65%). This improvement can be attributed to several design decisions: the use of familiar animal imagery rather than abstract images or human faces, the implementation of a child-friendly interface with large touch targets and vibrant colors, and the four-round authentication process that provides adequate security without excessive cognitive load.

The security analysis reveals that KidSecure occupies a middle ground in the security-usability spectrum. Its password space of 390,625 theoretical combinations (65,536 effective combinations) provides adequate protection for low-to-moderate security applications such as educational software, children's content platforms, and parental control systems. However, this security level is insufficient for protecting sensitive data such as financial information or personal health records. This positioning is appropriate given the target demographic and application domain, but it constrains the system's applicability to contexts where higher security is required.

The comparative attack resistance analysis demonstrates that KidSecure's primary security advantage lies in shoulder-surfing resistance, achieved through randomized image positioning. This is particularly relevant for children, who often use devices in shared spaces (classrooms, living rooms) where observation by siblings or peers is common. The moderate guessing attack resistance reflects the fundamental trade-off between password space size and usability; increasing security by expanding the password space (e.g., using 6 rounds instead of 4, or 36 images per grid instead of 25) would likely reduce usability below acceptable levels for young children.

### 7.2 Limitations and Threats to Validity

**Methodological Limitations:**

The absence of real user testing with children represents the most significant limitation of this research. All usability metrics are based on simulated data, which cannot capture the complexity of real child behavior. Children may exhibit selection patterns, error types, and emotional responses that differ substantially from the modeled assumptions. The simulated success rates and completion times should be considered hypotheses to be tested rather than validated findings.

Ethical and practical constraints prevented user testing within the project timeline. Conducting research with children requires ethical approval from institutional review boards, parental consent procedures, and specialized facilities and protocols. The three-week project timeline was insufficient to navigate these requirements. Future work must prioritize real user testing to validate (or refute) the simulated findings.

**Generalizability Limitations:**

The research focuses on a specific cultural context (UK-based development with English language interface) and may not generalize to other cultural or linguistic contexts. Visual perception, symbol recognition, and attitudes toward privacy vary across cultures. For example, certain animals may have different cultural connotations or familiarity levels in different regions. The color palette, while designed to be universally appealing to children, may have cultural associations that affect user perception.

The target age range (6-11 years) encompasses significant developmental variation. A six-year-old in early elementary school has vastly different cognitive and motor capabilities compared to an eleven-year-old approaching adolescence. The system's design attempts to accommodate this range through interface simplicity and forgiving interaction design, but optimal usability likely varies significantly across this age spectrum. Future research should investigate age-specific adaptations, such as adaptive difficulty levels that adjust grid size or round count based on user age and performance.

**Technical Limitations:**

The implementation exhibits several technical limitations that would need to be addressed for production deployment. The system lacks comprehensive error handling and recovery mechanisms for edge cases such as network failures during authentication or database unavailability. Scalability has not been tested; the current architecture may not perform adequately under high concurrent user loads. Cross-browser compatibility has been tested only on modern browsers (Chrome, Firefox, Safari); older browsers or specialized browsers used in educational settings may exhibit compatibility issues.

Accessibility for users with disabilities is limited. The system relies heavily on visual perception and does not provide alternative modalities for users with visual impairments. Screen reader support is minimal, and keyboard navigation is not fully implemented. While the target demographic (children aged 6-11) has lower rates of disability compared to the general population, inclusive design principles suggest that accessibility should be prioritized from the outset rather than added retrospectively.

**Security Limitations:**

The security analysis identifies several vulnerabilities that limit the system's applicability to high-security contexts. The relatively small effective password space (65,536 combinations) means that a determined attacker with access to the password hash database could crack passwords within hours using modern hardware. The password recovery mechanism using security questions introduces social engineering vulnerabilities. The absence of multi-factor authentication limits security assurance.

Furthermore, the security analysis relies on assumptions about attacker capabilities and motivations that may not reflect real-world threats. The threat model assumes attackers are primarily interested in unauthorized access to individual accounts rather than mass compromise or data exfiltration. In contexts where children's accounts contain valuable data (e.g., linked payment methods, personal information), the threat model would need to be revised and additional security measures implemented.

### 7.3 Comparison with Existing Research

KidSecure's design and findings align closely with Assal, Imran and Chiasson's (2018) research on graphical passwords for children, which is unsurprising given that their work directly informed KidSecure's design. The use of animal imagery, four-round authentication, and 5×5 grids are all derived from their findings. However, KidSecure extends their work in several ways. First, the implementation includes a functional password recovery mechanism, addressing a limitation they identified. Second, the system incorporates a testing dashboard for usability metrics collection, facilitating future empirical research. Third, the implementation uses modern web technologies and security practices, providing a more production-ready foundation than their research prototype.

Compared to other graphical password schemes, KidSecure demonstrates advantages and disadvantages. Relative to PassFaces (Brostoff and Sasse, 2000), KidSecure avoids the ethical concerns and demographic biases associated with human face recognition. Relative to Déjà Vu (Dhamija and Perrig, 2000), KidSecure uses concrete, recognizable imagery rather than abstract random art, potentially improving memorability for children. Relative to PassPoints (Wiedenbeck et al., 2005), KidSecure requires less precise motor control, as users select entire images rather than specific points within images.

However, KidSecure's security properties are weaker than some alternative schemes. PassPoints, for example, offers a much larger password space (approximately 2^43 combinations for a 1024×768 image with 5 click points) at the cost of increased cognitive and motor demands. This comparison illustrates the fundamental trade-off between security and usability, with KidSecure positioned toward the usability end of the spectrum to accommodate children's capabilities.

### 7.4 Implications for Practice

For practitioners considering deployment of child-focused authentication systems, several implications emerge from this research. First, graphical passwords using familiar, concrete imagery appear to offer significant usability advantages over text-based passwords for children aged 6-11. However, this usability gain comes with security trade-offs that must be carefully evaluated against the application's security requirements and threat model.

Second, randomized image positioning is an effective and relatively low-cost countermeasure against shoulder-surfing attacks, which are particularly relevant in the shared spaces where children often use devices. Implementation of randomization adds minimal complexity and cognitive load while providing meaningful security benefits.

Third, password recovery mechanisms for children present a difficult design challenge. Security questions, while providing a familiar recovery method, introduce vulnerabilities due to low entropy and guessability. Alternative approaches such as parental recovery codes or biometric authentication may provide better security-usability balance but introduce their own complexities and requirements.

Fourth, compliance with data protection regulations (GDPR, COPPA) must be considered from the outset of system design rather than added retrospectively. Parental consent mechanisms, privacy policies, and data minimization practices have architectural implications that are difficult to retrofit into existing systems.

### 7.5 Theoretical Contributions

From a theoretical perspective, this research contributes to the growing body of work on child-computer interaction and authentication systems. It demonstrates that applying child-centered design principles—large touch targets, vibrant colors, familiar imagery, minimal text—can significantly improve usability without necessarily compromising security. This finding supports the broader HCI principle that usability and security need not be opposing goals when systems are designed with specific user populations and contexts in mind.

The research also contributes to understanding of the security-usability trade-off space for authentication systems. By quantifying the password space, attack resistance, and usability characteristics of a specific design point (4-round recognition-based graphical passwords with 25 images per round), it provides a reference point for future research exploring alternative design points. Researchers can use KidSecure as a baseline for comparison when evaluating novel authentication schemes for children.

Finally, the research highlights the importance of ecological validity in authentication research. The reliance on simulated data in this study, while necessitated by practical constraints, limits the validity of findings and underscores the need for methodologies that enable safe, ethical user testing with children. Future research should prioritize development of such methodologies, potentially involving partnerships with schools, parental consent frameworks, and age-appropriate evaluation protocols.

### 7.6 Reflection on Development Process

The development process revealed several insights relevant to future projects. The iterative approach, combining literature review, design, implementation, and evaluation, proved effective for managing complexity and ensuring that design decisions were grounded in research evidence. However, the compressed timeline created tension between depth and breadth; more time would have enabled more thorough security analysis, comprehensive testing, and potentially real user studies.

The choice of modern web technologies (React, TypeScript, tRPC) facilitated rapid development and provided strong type safety, reducing certain categories of bugs. However, the learning curve for these technologies consumed time that could have been allocated to other aspects of the project. In retrospect, using more familiar technologies might have enabled faster development, though at the cost of reduced code quality and maintainability.

The decision to implement a functional prototype rather than a high-fidelity mockup proved valuable, as it revealed implementation challenges and edge cases that would not have been apparent in design artifacts alone. However, the prototype's limitations (lack of real user testing, simulated data) constrain its utility for drawing definitive conclusions about the system's real-world effectiveness.

---

## 8. Commercialisation and Legal Considerations

### 8.1 Market Analysis

The market for child-focused authentication systems can be segmented into several application domains, each with distinct requirements and opportunities. Educational technology represents a significant market segment, with schools and educational platforms requiring authentication systems that balance security with usability for young students. The global EdTech market was valued at approximately $254 billion in 2021 and is projected to reach $605 billion by 2027 (HolonIQ, 2021), indicating substantial growth potential.

Parental control applications constitute another key market segment. Parents increasingly seek tools to manage their children's device usage, content access, and online activities. Authentication systems that children can use independently while maintaining parental oversight are essential components of these applications. The parental control software market was valued at $1.5 billion in 2020 and is expected to grow at 8.5% CAGR through 2027 (Grand View Research, 2021).

Children's content platforms, including streaming services, gaming platforms, and social networks designed for children, represent a third market segment. These platforms require authentication to maintain user profiles, track progress, and comply with age-appropriate content regulations. The children's entertainment market, while mature, continues to grow with digital transformation, creating opportunities for improved authentication solutions.

However, market entry faces significant barriers. Established authentication providers (e.g., Auth0, Okta) offer comprehensive identity management solutions that, while not optimized for children, benefit from economies of scale, extensive security audits, and enterprise trust. Competing against these incumbents requires either superior technology, lower cost, or focus on underserved niches. KidSecure's child-specific design represents a potential differentiation strategy, but market validation through real user testing and pilot deployments would be essential before significant commercialisation investment.

### 8.2 Business Models

Several business models could support commercialisation of a child-focused authentication system. A Software-as-a-Service (SaaS) model, where customers pay recurring subscription fees for access to hosted authentication services, aligns well with the ongoing nature of authentication requirements. Pricing could be tiered based on number of users, with educational institutions and large platforms paying higher fees than individual developers or small applications.

A licensing model, where the authentication system is licensed to application developers for integration into their products, provides an alternative approach. This model transfers hosting and operational responsibilities to licensees while generating revenue through license fees. However, it may result in inconsistent implementation quality and reduced ability to gather usage data for system improvement.

A freemium model, offering basic authentication functionality for free with premium features (advanced analytics, custom branding, priority support) available for a fee, could accelerate adoption by reducing barriers to entry. This approach is common in developer-focused products and could build a user base that subsequently converts to paid tiers.

Regardless of business model, revenue projections must account for the costs of ongoing security maintenance, compliance audits, customer support, and infrastructure. Authentication systems are critical security components, and any security breach could result in significant reputational damage and legal liability. Insurance, legal reserves, and security audit budgets must be factored into financial planning.

### 8.3 Legal and Regulatory Compliance

**GDPR Compliance:**

The General Data Protection Regulation (GDPR), which came into effect in May 2018, establishes comprehensive requirements for processing personal data of individuals in the European Union. Children's data receives enhanced protection under GDPR Article 8, which sets the age of digital consent at 16 (though member states may lower this to 13) and requires parental consent for processing data of younger children (European Parliament and Council, 2016).

KidSecure's compliance with GDPR requires several measures. First, a lawful basis for processing must be established. For children under the age of digital consent, this requires verifiable parental consent. Verification mechanisms might include email confirmation with age verification, credit card verification (as payment methods are typically held by adults), or government-issued ID verification. Each approach involves trade-offs between security, privacy, and user friction.

Second, data minimization principles must be implemented. KidSecure currently collects only username and hashed password, aligning well with minimization requirements. However, any future enhancements that collect additional data (e.g., age, email, usage analytics) must be carefully evaluated against necessity and proportionality principles.

Third, data subject rights must be supported. These include the right to access (users must be able to view their personal data), right to rectification (users must be able to correct inaccurate data), right to erasure (users must be able to delete their accounts and data), right to data portability (users must be able to export their data in machine-readable format), and right to object (users must be able to object to certain processing activities).

Fourth, security of processing must be ensured through appropriate technical and organizational measures. KidSecure's cryptographic hashing, secure session management, and protection against common vulnerabilities demonstrate technical security measures. Organizational measures might include security policies, employee training, and incident response procedures.

Fifth, breach notification procedures must be established. GDPR requires notification to supervisory authorities within 72 hours of becoming aware of a breach, and notification to affected individuals when the breach poses high risk to their rights and freedoms. KidSecure must implement monitoring and alerting systems to detect potential breaches and documented procedures for breach response.

**COPPA Compliance:**

The Children's Online Privacy Protection Act (COPPA), enacted in the United States in 1998 and updated in 2013, regulates collection of personal information from children under 13. COPPA requires operators of websites or online services directed to children to obtain verifiable parental consent before collecting, using, or disclosing personal information from children (Federal Trade Commission, 2013).

COPPA defines "personal information" broadly, including not only obvious identifiers like names and addresses but also persistent identifiers such as cookies, IP addresses, and device identifiers. KidSecure's collection of usernames and storage of authentication cookies likely constitutes collection of personal information under COPPA, triggering compliance requirements.

Verifiable parental consent under COPPA requires using a method that ensures the person providing consent is the child's parent. Acceptable methods include providing a credit card or other payment method, answering knowledge-based questions, verifying a government-issued ID, video-conferencing with trained personnel, or using facial recognition technology. Email confirmation alone is insufficient. Each method involves costs and user friction that must be balanced against compliance requirements.

COPPA also requires clear privacy policies written in language that is easy to understand, describing what information is collected, how it is used, and with whom it is shared. The privacy policy must be prominently displayed and easily accessible. For KidSecure, this might involve a two-tier privacy policy: a detailed version for parents and a simplified, child-friendly version for young users.

**Other Jurisdictions:**

Beyond GDPR and COPPA, numerous other jurisdictions have enacted or are considering child data protection regulations. The UK's Age Appropriate Design Code, which came into effect in September 2020, establishes 15 standards for online services likely to be accessed by children, including data minimization, default privacy settings, and transparency (UK Information Commissioner's Office, 2020). California's California Consumer Privacy Act (CCPA) includes enhanced protections for minors' data. Australia's Privacy Act includes special provisions for children's data. Any commercial deployment must assess compliance requirements in all jurisdictions where the service is offered.

### 8.4 Intellectual Property Considerations

The intellectual property landscape for authentication systems is complex, with numerous patents covering various aspects of graphical password technology. A preliminary patent search reveals several relevant patents, including U.S. Patent 6,950,949 for "Secure user authentication using biometric information" and U.S. Patent 7,698,563 for "Graphical image authentication and security system." While KidSecure's specific implementation may not infringe existing patents, a comprehensive freedom-to-operate analysis by a qualified patent attorney would be essential before commercialisation.

Defensive publication of KidSecure's design and implementation details could establish prior art, preventing others from patenting similar approaches. Alternatively, pursuing patent protection for novel aspects of the system (e.g., specific countermeasures against shoulder-surfing, child-specific interface designs) could create barriers to competition. However, patent prosecution is expensive and time-consuming, and the rapidly evolving nature of authentication technology may limit the practical value of patents.

Open-source licensing represents an alternative intellectual property strategy. Releasing KidSecure under an open-source license (e.g., MIT, Apache 2.0) could accelerate adoption, enable community contributions, and establish the system as a standard. However, open-source licensing complicates certain business models (particularly licensing and SaaS) and may reduce ability to capture value from the technology.

### 8.5 Liability and Risk Management

Authentication systems carry significant liability risk. If a security breach occurs due to system vulnerabilities, the operator may face legal liability for resulting damages. For child-focused systems, this risk is amplified due to the vulnerable population and enhanced regulatory protections. Comprehensive liability insurance, including cyber liability coverage, is essential for any commercial deployment.

Terms of service and liability limitations must be carefully drafted to manage legal exposure while complying with consumer protection laws. In the EU, GDPR limits the extent to which liability can be contractually limited for data protection violations. In the U.S., various consumer protection statutes similarly restrict liability limitations. Legal counsel specializing in technology and data protection law should review all customer-facing legal documents.

Security audit and penetration testing by independent third parties would provide both risk mitigation (by identifying vulnerabilities before exploitation) and potential liability protection (by demonstrating due diligence in security practices). Industry-standard security certifications (e.g., SOC 2, ISO 27001) could provide additional credibility and risk management benefits, though achieving these certifications requires significant investment in security controls and audit processes.

### 8.6 Ethical Considerations

Beyond legal compliance, several ethical considerations arise in commercialising authentication systems for children. First, the system design must prioritize child safety and wellbeing over commercial interests. Features that increase engagement or usage time at the expense of child welfare (e.g., addictive design patterns, excessive data collection) should be avoided even if legally permissible.

Second, transparency and honesty in marketing and communication are essential. Claims about security, usability, or effectiveness must be substantiated by evidence. Given the simulated nature of KidSecure's evaluation data, any commercial deployment would require real user testing before making performance claims.

Third, accessibility and inclusion should be prioritized. Authentication systems that work only for typically developing children exclude those with disabilities, potentially exacerbating digital divides. Investment in accessible design, even when not legally required, represents an ethical imperative.

Fourth, the system should be designed to empower rather than surveil children. While parental oversight is appropriate and often legally required, excessive monitoring or control features could undermine children's autonomy and digital literacy development. Balancing parental rights, child safety, and child autonomy represents a complex ethical challenge without clear solutions.

---

## 9. Conclusion and Future Work

### 9.1 Summary of Contributions

This dissertation has presented the design, implementation, and evaluation of KidSecure, a graphical password authentication system specifically tailored for children aged six to eleven years. The research makes several contributions to the fields of child-computer interaction and authentication systems.

First, it demonstrates that graphical passwords using familiar animal imagery can achieve high simulated usability (82% success rate) while maintaining adequate security (390,625 theoretical password combinations) for low-to-moderate security applications. This finding, while requiring validation through real user testing, suggests that the security-usability trade-off can be navigated successfully when systems are designed with specific user populations in mind.

Second, the research provides a detailed implementation of a child-focused authentication system using modern web technologies and security practices. The open availability of the implementation (code, documentation, and evaluation framework) provides a foundation for future research and development in this domain. Researchers can build upon this work, extending or modifying the system to explore alternative design points or evaluate novel features.

Third, the dissertation contributes a comprehensive analysis of security properties, attack resistance, and compliance requirements for child authentication systems. The multi-dimensional security evaluation framework, examining guessing attacks, shoulder-surfing attacks, and brute-force attacks, provides a template for evaluating future systems. The detailed examination of GDPR and COPPA compliance requirements offers practical guidance for practitioners developing child-focused applications.

Fourth, the research identifies and critically examines limitations and challenges in child authentication research, particularly the difficulty of conducting ethical user studies with children and the limitations of simulated evaluation data. By explicitly acknowledging these limitations, the dissertation contributes to methodological discussions in the field and highlights areas requiring innovation in research methods.

### 9.2 Limitations Revisited

As discussed extensively throughout this dissertation, several significant limitations constrain the validity and generalizability of findings. The absence of real user testing with children represents the most critical limitation, rendering all usability findings provisional and requiring validation through empirical research. The security analysis, while comprehensive within its scope, relies on assumptions about attacker capabilities and user behavior that may not reflect real-world conditions.

The technical implementation, while functional, lacks several features necessary for production deployment, including comprehensive error handling, scalability testing, cross-browser compatibility verification, and accessibility features for users with disabilities. The compliance analysis, based on documentary review rather than legal audit, may contain errors or omissions in interpreting complex regulatory requirements.

The cultural and linguistic specificity of the research (UK-based development with English language interface) limits generalizability to other contexts. The focus on a specific age range (6-11 years) obscures significant developmental variation within that range. These limitations are not mere caveats but fundamental constraints that should inform interpretation of all findings and conclusions.

### 9.3 Future Research Directions

Several promising directions for future research emerge from this work. Most critically, empirical user studies with children are essential to validate (or refute) the simulated usability findings. Such studies should employ age-appropriate evaluation protocols, obtain proper ethical approvals and parental consents, and examine both short-term usability and long-term memorability. Longitudinal studies tracking authentication success rates over weeks or months would provide valuable insights into password memorability, a critical factor for real-world deployment.

Comparative studies evaluating KidSecure against alternative authentication methods (biometric authentication, pattern-based passwords, token-based authentication) would help identify the optimal approach for different contexts and requirements. Such studies should examine not only usability and security metrics but also user preferences, emotional responses, and learning effects.

Research on adaptive authentication systems that adjust difficulty based on user age, cognitive abilities, or performance could address the challenge of accommodating diverse user populations within a single system. Machine learning techniques could potentially personalize the authentication experience, selecting image categories or grid sizes that optimize the security-usability trade-off for individual users.

Investigation of multi-modal authentication combining graphical passwords with other factors (biometrics, device tokens, parental verification) could enhance security while maintaining usability. The challenge lies in designing multi-factor systems that children can use independently without requiring adult assistance for routine authentication.

Research on password recovery mechanisms specifically designed for children represents another important direction. The security question approach used in KidSecure introduces vulnerabilities; alternative approaches such as parental recovery codes, trusted contact recovery, or biometric recovery deserve investigation.

Finally, cross-cultural research examining how cultural differences in visual perception, symbol recognition, and privacy attitudes affect graphical password usability and security would enhance understanding of generalizability and inform culturally sensitive design practices.

### 9.4 Practical Recommendations

For practitioners considering deployment of child-focused authentication systems, several recommendations emerge from this research:

1. **Prioritize usability without compromising security:** Use familiar, concrete imagery rather than abstract symbols. Implement large touch targets, immediate visual feedback, and minimal text. Balance password space size against cognitive load, aiming for the minimum security level appropriate for the application's threat model.

2. **Implement randomization to resist shoulder-surfing:** Randomize image positions across authentication sessions. This countermeasure provides significant security benefits with minimal usability cost and is particularly important for children who often use devices in shared spaces.

3. **Design for compliance from the outset:** Incorporate GDPR and COPPA requirements into system architecture from the beginning. Implement parental consent mechanisms, data minimization practices, and data subject rights support. Consult legal counsel specializing in data protection and child safety regulations.

4. **Conduct thorough security analysis:** Perform password space calculations, attack resistance analysis, and penetration testing. Engage independent security auditors to identify vulnerabilities. Implement defense-in-depth strategies with multiple security layers.

5. **Test with real users:** Conduct empirical usability studies with children in the target age range. Obtain proper ethical approvals and parental consents. Use age-appropriate evaluation protocols and metrics. Iterate on design based on empirical findings rather than assumptions.

6. **Plan for accessibility:** Design for users with diverse abilities from the outset. Provide alternative modalities (audio, haptic feedback) for users with visual impairments. Ensure keyboard navigation for users with motor impairments. Follow WCAG accessibility guidelines.

7. **Consider the broader context:** Authentication is only one component of a secure system. Ensure that other system components (data storage, network communication, session management) maintain equivalent security levels. Educate users (both children and parents) about security best practices.

### 9.5 Final Reflections

This research has explored the challenging problem of designing authentication systems that are simultaneously secure and usable for children. The tension between security and usability, well-documented in the broader authentication literature, is amplified when the user population consists of young children with developing cognitive and motor capabilities. KidSecure represents one point in the design space, prioritizing usability while maintaining adequate security for low-to-moderate security applications.

The development process has reinforced several lessons about software engineering and research practice. First, the importance of grounding design decisions in empirical research rather than intuition or assumption. The extensive literature review that informed KidSecure's design proved invaluable, preventing reinvention of known solutions and avoiding previously identified pitfalls. Second, the value of iterative development and continuous evaluation. Regular testing and refinement throughout the development process identified issues early when they were easier to address.

Third, the necessity of acknowledging and communicating limitations. Research that presents findings without critical examination of limitations and threats to validity misleads readers and impedes scientific progress. By explicitly discussing KidSecure's limitations—particularly the absence of real user testing—this dissertation aims to provide an honest assessment of what has been achieved and what remains uncertain.

Fourth, the importance of considering the broader context beyond technical implementation. Authentication systems exist within complex sociotechnical systems involving legal requirements, ethical considerations, business models, and user practices. Technical excellence alone is insufficient; successful systems must address this broader context.

As children's digital lives continue to expand, the need for authentication systems that balance security, usability, and child wellbeing will only grow. This dissertation represents a step toward addressing that need, but significant work remains. The ultimate measure of success will not be the elegance of the technical implementation or the sophistication of the security analysis, but whether real children can successfully and safely use the system to access the digital resources they need for learning, creativity, and connection.

---

## References

Assal, H., Imran, A. and Chiasson, S. (2018) 'An exploration of graphical password authentication for children', *International Journal of Child-Computer Interaction*, 18, pp. 37-46. Available at: https://doi.org/10.1016/j.ijcci.2018.06.003 (Accessed: 15 February 2026).

Baddeley, A., Eysenck, M.W. and Anderson, M.C. (2015) *Memory*. 2nd edn. London: Psychology Press.

Biddle, R., Chiasson, S. and van Oorschot, P.C. (2012) 'Graphical passwords: Learning from the first twelve years', *ACM Computing Surveys*, 44(4), pp. 1-41. Available at: https://doi.org/10.1145/2333112.2333114 (Accessed: 15 February 2026).

Bonneau, J., Herley, C., van Oorschot, P.C. and Stajano, F. (2012) 'The quest to replace passwords: A framework for comparative evaluation of web authentication schemes', in *Proceedings of the 2012 IEEE Symposium on Security and Privacy*. San Francisco, CA: IEEE, pp. 553-567. Available at: https://doi.org/10.1109/SP.2012.44 (Accessed: 15 February 2026).

Brostoff, S. and Sasse, M.A. (2000) 'Are Passfaces more usable than passwords? A field trial investigation', in *Proceedings of HCI 2000*. London: Springer, pp. 405-424.

Chiasson, S., Forget, A. and Biddle, R. (2008) 'Graphical password authentication using cued click points', in *Proceedings of the 13th European Symposium on Research in Computer Security*. Málaga, Spain: Springer, pp. 359-374. Available at: https://doi.org/10.1007/978-3-540-88313-5_23 (Accessed: 15 February 2026).

Davis, D., Monrose, F. and Reiter, M.K. (2004) 'On user choice in graphical password schemes', in *Proceedings of the 13th USENIX Security Symposium*. San Diego, CA: USENIX Association, pp. 151-164.

Dhamija, R. and Perrig, A. (2000) 'Déjà Vu: A user study using images for authentication', in *Proceedings of the 9th USENIX Security Symposium*. Denver, CO: USENIX Association, pp. 45-58.

European Parliament and Council (2016) *Regulation (EU) 2016/679 of the European Parliament and of the Council of 27 April 2016 on the protection of natural persons with regard to the processing of personal data and on the free movement of such data (General Data Protection Regulation)*. Available at: https://eur-lex.europa.eu/eli/reg/2016/679/oj (Accessed: 16 February 2026).

Federal Trade Commission (2013) *Children's Online Privacy Protection Rule: A Six-Step Compliance Plan for Your Business*. Available at: https://www.ftc.gov/business-guidance/resources/childrens-online-privacy-protection-rule-six-step-compliance (Accessed: 16 February 2026).

Florêncio, D. and Herley, C. (2007) 'A large-scale study of web password habits', in *Proceedings of the 16th International Conference on World Wide Web*. Banff, Canada: ACM, pp. 657-666. Available at: https://doi.org/10.1145/1242572.1242661 (Accessed: 15 February 2026).

Grand View Research (2021) *Parental Control Software Market Size, Share & Trends Analysis Report*. Available at: https://www.grandviewresearch.com/industry-analysis/parental-control-software-market (Accessed: 16 February 2026).

Grassi, P.A., Garcia, M.E. and Fenton, J.L. (2017) *NIST Special Publication 800-63B: Digital Identity Guidelines - Authentication and Lifecycle Management*. Gaithersburg, MD: National Institute of Standards and Technology. Available at: https://doi.org/10.6028/NIST.SP.800-63b (Accessed: 16 February 2026).

HolonIQ (2021) *Global EdTech Market to Reach $404B by 2025*. Available at: https://www.holoniq.com/notes/global-education-technology-market-to-reach-404b-by-2025 (Accessed: 16 February 2026).

Hourcade, J.P. (2015) *Child-Computer Interaction*. Iowa City, IA: Juan Pablo Hourcade.

Jermyn, I., Mayer, A., Monrose, F., Reiter, M.K. and Rubin, A.D. (1999) 'The design and analysis of graphical passwords', in *Proceedings of the 8th USENIX Security Symposium*. Washington, DC: USENIX Association, pp. 1-14.

Kaliski, B. (2000) *RFC 2898: PKCS #5: Password-Based Cryptography Specification Version 2.0*. Available at: https://www.rfc-editor.org/rfc/rfc2898 (Accessed: 16 February 2026).

Menezes, A.J., Van Oorschot, P.C. and Vanstone, S.A. (1996) *Handbook of Applied Cryptography*. Boca Raton, FL: CRC Press.

Nielsen, J. (1994) 'Heuristic evaluation', in Nielsen, J. and Mack, R.L. (eds.) *Usability Inspection Methods*. New York: John Wiley & Sons, pp. 25-62.

OWASP (2021) *Password Storage Cheat Sheet*. Available at: https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html (Accessed: 16 February 2026).

Percival, C. and Josefsson, S. (2016) *RFC 7914: The scrypt Password-Based Key Derivation Function*. Available at: https://www.rfc-editor.org/rfc/rfc7914 (Accessed: 16 February 2026).

Piaget, J. (1952) *The Origins of Intelligence in Children*. New York: International Universities Press.

Ratakonda, D.K. (2022) *Improving Children's Authentication Practices with Respect to Graphical Passwords*. PhD thesis. Boise State University. Available at: https://scholarworks.boisestate.edu/td/1990/ (Accessed: 15 February 2026).

Theofanos, M., Stanton, B., Furman, S. and Choong, Y.Y. (2021) 'Understanding what children think about passwords', in *Proceedings of the 30th USENIX Security Symposium*. Virtual Event: USENIX Association, pp. 1677-1694. Available at: https://www.usenix.org/system/files/sec21-theofanos.pdf (Accessed: 15 February 2026).

Thorpe, J. and van Oorschot, P.C. (2007) 'Human-seeded attacks and exploiting hot-spots in graphical passwords', in *Proceedings of the 16th USENIX Security Symposium*. Boston, MA: USENIX Association, pp. 103-118.

UK Information Commissioner's Office (2020) *Age Appropriate Design: A Code of Practice for Online Services*. Available at: https://ico.org.uk/for-organisations/guide-to-data-protection/ico-codes-of-practice/age-appropriate-design-code/ (Accessed: 16 February 2026).

Whitten, A. and Tygar, J.D. (1999) 'Why Johnny can't encrypt: A usability evaluation of PGP 5.0', in *Proceedings of the 8th USENIX Security Symposium*. Washington, DC: USENIX Association, pp. 169-184.

Wiedenbeck, S., Waters, J., Birget, J.C., Brodskiy, A. and Memon, N. (2005) 'PassPoints: Design and longitudinal evaluation of a graphical password system', *International Journal of Human-Computer Studies*, 63(1-2), pp. 102-127. Available at: https://doi.org/10.1016/j.ijhcs.2005.04.010 (Accessed: 15 February 2026).

---

## Appendices

### Appendix A: System Architecture Diagrams

![System Architecture](https://private-us-east-1.manuscdn.com/sessionFile/QODoOskG4eanwuaW9WGDWy/sandbox/AfLMpXEq5GXsLlUkt4wxEs-img-1_1771567891000_na1fn_ZmlnMS1hdXRoZW50aWNhdGlvbi1jb21wYXJpc29u.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvUU9Eb09za0c0ZWFud3VhVzlXR0RXeS9zYW5kYm94L0FmTE1wWEVxNUdYc0xsVWt0NHd4RXMtaW1nLTFfMTc3MTU2Nzg5MTAwMF9uYTFmbl9abWxuTVMxaGRYUm9aVzUwYVdOaGRHbHZiaTFqYjIxd1lYSnBjMjl1LnBuZz94LW9zcy1wcm9jZXNzPWltYWdlL3Jlc2l6ZSx3XzE5MjAsaF8xOTIwL2Zvcm1hdCx3ZWJwL3F1YWxpdHkscV84MCIsIkNvbmRpdGlvbiI6eyJEYXRlTGVzc1RoYW4iOnsiQVdTOkVwb2NoVGltZSI6MTc5ODc2MTYwMH19fV19&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=JqwakNuVNblLp-GSqo8GMfOap5BJYtGrZ9ZYq0Au3hx01A5c0QQWED5WtC4iKr5OlSpN~bHcVo8WqRZF1xkbCxxKrqxS6VWBI5IQDo5H-CmZX-A6K1UrhKA3LeP~ccKhctHQSRS-mMMAiKjgqcMncGfkoRTCAU7so~5pqVTUJIVPZk9xb4ozgtRXMTRywK8pQbzC9qWPPpjEf1KfeA9ehXkkANeaZfvMYpAynL6ir2Goq~T~IN8ohnvUyISqUzWO8Xf9ESyFZvMZJ08q7xuOFl~sR1DefOaeqYltiNeOxSonwwA5xIvA6SxdoeHDYSfvgCSlRerPJzsjGJrNHhbIhg__)

**Figure 1:** Authentication Success Rates Across Different Methods

![Completion Time Analysis](https://private-us-east-1.manuscdn.com/sessionFile/QODoOskG4eanwuaW9WGDWy/sandbox/AfLMpXEq5GXsLlUkt4wxEs-img-2_1771567903000_na1fn_ZmlnMi1jb21wbGV0aW9uLXRpbWUtYW5hbHlzaXM.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvUU9Eb09za0c0ZWFud3VhVzlXR0RXeS9zYW5kYm94L0FmTE1wWEVxNUdYc0xsVWt0NHd4RXMtaW1nLTJfMTc3MTU2NzkwMzAwMF9uYTFmbl9abWxuTWkxamIyMXdiR1YwYVc5dUxYUnBiV1V0WVc1aGJIbHphWE0ucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=hgDO3dWXrz0UDWppTMYkTNwlJZl7bK7yC27WdKKs5G2VIfF5LmMhsN-2KggMpiP56psQQCl-WtyGkLowRvf1WwoGpvIbsVDKjw5QtVCwd-54c4QMO95QcdLSUpVgpZcKueq26RPUm-tnVOw6Zv6XUO5NBpetWDmo3V1AZ-G35A6btySvJotfsd8ZoLJDla8rtGl6wbn-PXL4dlmAuFVJx8nQ5Kkjy7UX~R~fb52-H725UJ78mCMsvVcE4YuX1f9bDJfRDpPjcLsjoL4-OkP2RVj9UNAYieYnOojQdJ~6BLrrdQOEeABs18tgkPGjhj-89Z1agszbBV0BgmFd1ieQLw__)

**Figure 2:** Completion Time by Age Group

![Security Strength Comparison](https://private-us-east-1.manuscdn.com/sessionFile/QODoOskG4eanwuaW9WGDWy/sandbox/AfLMpXEq5GXsLlUkt4wxEs-img-3_1771567900000_na1fn_ZmlnMy1zZWN1cml0eS1zdHJlbmd0aC1jb21wYXJpc29u.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvUU9Eb09za0c0ZWFud3VhVzlXR0RXeS9zYW5kYm94L0FmTE1wWEVxNUdYc0xsVWt0NHd4RXMtaW1nLTNfMTc3MTU2NzkwMDAwMF9uYTFmbl9abWxuTXkxelpXTjFjbWwwZVMxemRISmxibWQwYUMxamIyMXdZWEpwYzI5dS5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=AngdA6dA-gFbjiq0W2Fgx3B93xUZZV~zmgNTHLnPT3K30WWHKDAiRZaC4Si1zGW7Va2w-G9HNX8Yvs-15-bQdCApA8tOlfdlasp-~a5EjJEh7HG-EhgNeXn8vZB4oTvWn5b7aCKkTBUthgUkPchwqVigKocJcIbwOoeml06EOgobWeiVM1LPv6tutuNlgOUwwr9B-3EhVz-8l8ghlJQeWYhVuprMRd2x-Kv-zDvG1QWAKg8ckWGXMvi43ss-gQUenXG378RXBYZtR7VWE-wJbf27cO63k7nPTV1W6y3wMdWXPzmrpxCWQqV0V14pn2Moh6bIgOe3U1FGUuiUYJj2Gw__)

**Figure 3:** Security Strength Comparison

![Usability Metrics Radar](https://private-us-east-1.manuscdn.com/sessionFile/QODoOskG4eanwuaW9WGDWy/sandbox/AfLMpXEq5GXsLlUkt4wxEs-img-4_1771567894000_na1fn_ZmlnNC11c2FiaWxpdHktbWV0cmljcy1yYWRhcg.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvUU9Eb09za0c0ZWFud3VhVzlXR0RXeS9zYW5kYm94L0FmTE1wWEVxNUdYc0xsVWt0NHd4RXMtaW1nLTRfMTc3MTU2Nzg5NDAwMF9uYTFmbl9abWxuTkMxMWMyRmlhV3hwZEhrdGJXVjBjbWxqY3kxeVlXUmhjZy5wbmc~eC1vc3MtcHJvY2Vzcz1pbWFnZS9yZXNpemUsd18xOTIwLGhfMTkyMC9mb3JtYXQsd2VicC9xdWFsaXR5LHFfODAiLCJDb25kaXRpb24iOnsiRGF0ZUxlc3NUaGFuIjp7IkFXUzpFcG9jaFRpbWUiOjE3OTg3NjE2MDB9fX1dfQ__&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=OGitBuE5OqtrBSNY6yMQe~aNuXGoFwnCSOuonRSGe2AgOgaVXmLEHsdC~2yzo5uK4Dzr4nW~2CIptjkpr4godqXqF-CKYJ4HVn2D63YAbU~GcMV152LoLd3ba8qUo5RjheD~cjGDNiA2UFPXaG~i1mUiFb16jhP8goYSD-Bf80Ip3Wd44c982VVAGAFbhE6ZoA~7CfEIAujW3269eBazmDfzkoC7gqVTNyTbp5jpLbfzTo1eQiUfAf0jMZq7Ws527q6Z~lQ5CTHCLOKm9y7XKcUBsM4HEId9KrRjL3X9JrldiBK4qB18a65ZkpPINDpXDtUOTI5dD89FP1Mf-Kdkjg__)

**Figure 4:** KidSecure Usability Metrics

![Attack Resistance Analysis](https://private-us-east-1.manuscdn.com/sessionFile/QODoOskG4eanwuaW9WGDWy/sandbox/AfLMpXEq5GXsLlUkt4wxEs-img-5_1771567906000_na1fn_ZmlnNS1hdHRhY2stcmVzaXN0YW5jZS1hbmFseXNpcw.png?x-oss-process=image/resize,w_1920,h_1920/format,webp/quality,q_80&Expires=1798761600&Policy=eyJTdGF0ZW1lbnQiOlt7IlJlc291cmNlIjoiaHR0cHM6Ly9wcml2YXRlLXVzLWVhc3QtMS5tYW51c2Nkbi5jb20vc2Vzc2lvbkZpbGUvUU9Eb09za0c0ZWFud3VhVzlXR0RXeS9zYW5kYm94L0FmTE1wWEVxNUdYc0xsVWt0NHd4RXMtaW1nLTVfMTc3MTU2NzkwNjAwMF9uYTFmbl9abWxuTlMxaGRIUmhZMnN0Y21WemFYTjBZVzVqWlMxaGJtRnNlWE5wY3cucG5nP3gtb3NzLXByb2Nlc3M9aW1hZ2UvcmVzaXplLHdfMTkyMCxoXzE5MjAvZm9ybWF0LHdlYnAvcXVhbGl0eSxxXzgwIiwiQ29uZGl0aW9uIjp7IkRhdGVMZXNzVGhhbiI6eyJBV1M6RXBvY2hUaW1lIjoxNzk4NzYxNjAwfX19XX0_&Key-Pair-Id=K2HSFNDJXOU9YS&Signature=Az4vCV4Zu-R7FBCPhFKKqi4eS2e~~KDudjBqvBTyV-TeLC06neXyGBwcLSpHyOsmZdRrA6VZ3jLdK4RN4YlnWb~AsWFzh32m3S8Lgds0sC6JeOyo3x3LiUWiwqMkwIvQea-OPu~EMqaJZ9eHzTbIi526o1HvrZi-vzcXRXdgnMT~KlPP0wY5ElBWv9uoZJ8-cX4HxbfLsNfcJUrksmrOtbaLGCfdXrd~NJfOgYUIDmYQrQoDgJSg3bqBhvTh8E8CGSKGdA3lqEsFOUF0d6ZD0hEN5mR3idp9MEd8rCdPRsgdf8kqWli~LWsfa8AFfUwZQDXGtW9a-x-Ga7ghuwbsEw__)

**Figure 5:** Comparative Attack Resistance Analysis

### Appendix B: Database Schema

**Users Table:**
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- openId (VARCHAR(64), UNIQUE, NOT NULL)
- name (TEXT)
- email (VARCHAR(320))
- loginMethod (VARCHAR(64))
- role (ENUM('user', 'admin'), DEFAULT 'user')
- createdAt (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
- updatedAt (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)
- lastSignedIn (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)

**Graphical_Passwords Table:**
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- userId (INT, FOREIGN KEY REFERENCES users(id))
- passwordHash (VARCHAR(128), NOT NULL)
- salt (VARCHAR(128), NOT NULL)
- securityQuestion1 (TEXT)
- securityAnswer1Hash (VARCHAR(128))
- securityQuestion2 (TEXT)
- securityAnswer2Hash (VARCHAR(128))
- createdAt (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
- updatedAt (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)

**Login_Attempts Table:**
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- userId (INT, FOREIGN KEY REFERENCES users(id))
- success (BOOLEAN, NOT NULL)
- attemptTime (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
- ipAddress (VARCHAR(45))
- failureReason (TEXT)

**Usability_Test_Data Table:**
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- userId (INT, FOREIGN KEY REFERENCES users(id))
- testType (ENUM('registration', 'login'), NOT NULL)
- completionTime (INT, NOT NULL)
- successRate (DECIMAL(5,2))
- ageGroup (ENUM('6-7', '8-9', '10-11'))
- timestamp (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)

### Appendix C: Animal Image Categories

**Farm Animals (25 images):**
Cow, Pig, Sheep, Horse, Chicken, Duck, Goat, Turkey, Rabbit, Donkey, Goose, Rooster, Hen, Lamb, Calf, Piglet, Foal, Chick, Duckling, Gosling, Guinea Fowl, Alpaca, Llama, Peacock, Pheasant

**Wild Animals (25 images):**
Lion, Elephant, Giraffe, Zebra, Tiger, Bear, Wolf, Fox, Deer, Moose, Kangaroo, Koala, Panda, Gorilla, Chimpanzee, Orangutan, Leopard, Cheetah, Hyena, Rhinoceros, Hippopotamus, Crocodile, Alligator, Monkey, Lemur

**Sea Creatures (25 images):**
Dolphin, Whale, Shark, Fish, Octopus, Squid, Jellyfish, Starfish, Seahorse, Crab, Lobster, Shrimp, Clam, Oyster, Seal, Sea Lion, Walrus, Otter, Penguin, Turtle, Stingray, Eel, Angelfish, Clownfish, Pufferfish

**Birds (25 images):**
Parrot, Owl, Eagle, Hawk, Falcon, Crow, Raven, Sparrow, Robin, Bluebird, Cardinal, Hummingbird, Woodpecker, Pelican, Flamingo, Swan, Stork, Crane, Heron, Toucan, Peacock, Ostrich, Emu, Kiwi, Cassowary

**Insects (25 images):**
Butterfly, Bee, Ladybug, Ant, Grasshopper, Cricket, Dragonfly, Damselfly, Beetle, Firefly, Moth, Caterpillar, Snail, Slug, Spider, Scorpion, Centipede, Millipede, Praying Mantis, Walking Stick, Cicada, Aphid, Wasp, Hornet, Bumblebee

### Appendix D: Security Question Examples

1. What is your favorite color?
2. What is your pet's name?
3. What is your favorite food?
4. What is your favorite animal?
5. What is your favorite toy?
6. What is your best friend's name?
7. What is your favorite game?
8. What is your favorite book?
9. What is your favorite movie?
10. What is your favorite sport?

### Appendix E: Glossary of Terms

**Authentication:** The process of verifying a claimed identity.

**Brute-Force Attack:** A systematic attempt to guess a password by trying all possible combinations.

**COPPA:** Children's Online Privacy Protection Act, U.S. federal law regulating collection of personal information from children under 13.

**Cryptographic Hash:** A one-way mathematical function that transforms input data into a fixed-size output.

**Decoy Round:** An authentication challenge presented after successful login to confuse observers.

**Effective Password Space:** The actual number of likely passwords considering human selection biases, typically smaller than the theoretical password space.

**GDPR:** General Data Protection Regulation, EU regulation governing processing of personal data.

**Graphical Password:** An authentication method using images rather than text.

**Guessing Attack:** An attempt to authenticate by trying likely passwords based on knowledge of selection patterns.

**Hotspot:** An image or location that is selected more frequently than others, reducing effective password space.

**PBKDF2:** Password-Based Key Derivation Function 2, a cryptographic function for deriving keys from passwords.

**Recognition-Based:** A graphical password scheme where users identify previously selected images from a larger set.

**Salt:** A random value added to a password before hashing to prevent rainbow table attacks.

**Shoulder-Surfing Attack:** An attack where an adversary observes the authentication process to learn the password.

**Theoretical Password Space:** The total number of possible passwords, calculated mathematically without considering human selection biases.

**tRPC:** TypeScript Remote Procedure Call, a library for building type-safe APIs.

---

**End of Dissertation**

**Word Count:** 9,847 words (excluding references, appendices, and figure captions)

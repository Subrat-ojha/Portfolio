<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head> </head>
   <body>

<!DOCTYPE html>
<html lang="en">
<head>
 <!DOCTYPE html>
<html lang="en">
<head>
   <!DOCTYPE html>
<html lang="en">
<head>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Java Developer Portfolio</title>
    <style>
        /* Neubrutalism Style - Reset and base styles */
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Courier New', monospace;
        }

        body {
            background-color: #f0f0f0;
            color: #000;
        }

        /* Header and Navigation */
        header {
            background-color: #f5ca5a;
            padding: 1rem;
            border-bottom: 4px solid #000;
            position: sticky;
            top: 0;
            z-index: 100;
        }

        .header-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 1200px;
            margin: 0 auto;
        }

        .logo {
            display: flex;
            align-items: center;
            font-weight: bold;
            font-size: 1.8rem;
            color: #000;
            background-color: #fff;
            padding: 0.3rem 0.6rem;
            border: 3px solid #000;
            transform: rotate(-1deg);
        }

        .logo span {
            margin: 0 5px;
        }

        .search-bar {
            flex-grow: 1;
            margin: 0 2rem;
            position: relative;
        }

        .search-bar input {
            width: 100%;
            padding: 0.8rem 2.5rem;
            border: 3px solid #000;
            font-size: 1rem;
            background-color: #fff;
            transform: rotate(0.5deg);
        }

        .search-bar::before {
            content: "🔍";
            position: absolute;
            left: 10px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 1.2rem;
        }

        .user-actions {
            display: flex;
            align-items: center;
            gap: 1.5rem;
        }

        .user-actions .icon {
            font-size: 1.4rem;
            cursor: pointer;
            background-color: #ff90e8;
            padding: 0.5rem;
            border: 3px solid #000;
            transform: rotate(2deg);
        }

        /* Navigation */
        nav {
            background-color: #000;
            padding: 0.8rem 1rem;
        }

        .nav-container {
            display: flex;
            justify-content: space-between;
            align-items: center;
            max-width: 1200px;
            margin: 0 auto;
        }

        .main-nav {
            display: flex;
            list-style: none;
            flex-wrap: wrap;
        }

        .main-nav li {
            margin-right: 1rem;
            margin-bottom: 0.5rem;
        }

        .main-nav a {
            color: #fff;
            text-decoration: none;
            font-weight: bold;
            position: relative;
            padding: 0.6rem 1rem;
            display: flex;
            align-items: center;
            background-color: #333;
            border: 2px solid #f5ca5a;
            transform: rotate(-1deg);
            transition: transform 0.2s;
        }

        .main-nav a:hover {
            color: #fff;
            background-color: #555;
            transform: rotate(1deg) scale(1.05);
        }

        .main-nav a span {
            margin-right: 0.6rem;
            font-size: 1.2rem;
        }

        /* Main Content */
        main {
            max-width: 1200px;
            margin: 2rem auto;
            padding: 0 1rem;
        }

        .hero {
            background-color: #c1f0dd;
            padding: 1.2rem;
            margin-bottom: 1.5rem;
            border: 4px solid #000;
            position: relative;
            max-height: 90vh;
            overflow: visible;
        }

        .hero::after {
            content: "";
            position: absolute;
            top: 10px;
            right: 10px;
            bottom: 10px;
            left: 10px;
            border: 2px dashed #000;
            pointer-events: none;
            z-index: 1;
        }

        .portfolio-title {
            font-size: 2rem;
            margin-bottom: 1rem;
            color: #000;
            text-align: center;
            font-weight: bold;
            text-decoration: underline;
            text-decoration-thickness: 3px;
            text-underline-offset: 5px;
            letter-spacing: 2px;
        }

        .profile-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            position: relative;
            z-index: 2;
        }

        .profile-header {
            display: flex;
            align-items: center;
            margin-bottom: 1rem;
            width: 100%;
            background-color: #fff;
            border: 4px solid #000;
            padding: 0.8rem;
            transform: rotate(-0.5deg);
        }

        .profile-image {
            width: 70px;
            height: 70px;
            object-fit: cover;
            border: 3px solid #000;
        }

        .profile-name {
            margin-left: 1rem;
            flex-grow: 1;
        }

        .profile-name h2 {
            font-size: 1.6rem;
            margin-bottom: 0.2rem;
            text-transform: uppercase;
        }

        .profile-email {
            color: #333;
            font-weight: bold;
            font-size: 0.9rem;
        }

        .social-links {
            display: flex;
            gap: 0.5rem;
        }

        .social-button {
            width: 40px;
            height: 40px;
            background-color: #f5ca5a;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 3px solid #000;
            cursor: pointer;
            font-size: 1.2rem;
            transform: rotate(3deg);
            transition: transform 0.2s;
        }

        .social-button:hover {
            background-color: #82ddff;
            transform: rotate(-3deg) scale(1.1);
        }

        .stats {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 0.8rem;
            margin: 1rem 0;
        }

        .stat-box {
            border: 3px solid #000;
            padding: 0.6rem;
            width: 100px;
            text-align: center;
            background-color: #fff;
            transform: rotate(1deg);
            position: relative;
        }

        .stat-box:nth-child(odd) {
            transform: rotate(-1deg);
            background-color: #82ddff;
        }

        .stat-box:nth-child(3n) {
            transform: rotate(2deg);
            background-color: #ff90e8;
        }

        .stat-number {
            font-size: 1.5rem;
            font-weight: bold;
            color: #000;
        }

        .stat-label {
            font-size: 0.8rem;
            margin-top: 0.3rem;
            font-weight: bold;
        }

        .profile-bio {
            text-align: center;
            margin: 1rem 0;
            line-height: 1.5;
            max-width: 800px;
            background-color: #fff;
            padding: 0.8rem;
            border: 3px solid #000;
            font-size: 0.95rem;
            position: relative;
            z-index: 2;
        }

        .action-buttons {
            display: flex;
            justify-content: center;
            gap: 1.5rem;
            margin-top: 1rem;
           
        }

        .hire-button, .cv-button {
            padding: 0.8rem 1.5rem;
            font-weight: bold;
            cursor: pointer;
            display: flex;
            align-items: center;
            border: 3px solid #000;
            font-size: 1rem;
            text-transform: uppercase;
            transition: transform 0.2s;
             text-decoration: none;
        }

        .hire-button {
            background-color: #000;
            color: #fff;
            transform: rotate(-2deg);
             
        }

        .hire-button:hover {
            background-color: #222;
            transform: rotate(1deg) translateY(-5px);
        }

        .cv-button {
            background-color: #f5ca5a;
            color: #000;
            transform: rotate(2deg);
        }

        .cv-button:hover {
            background-color: #ffdf8d;
            transform: rotate(-1deg) translateY(-5px);
        }

        .button-icon {
            margin-right: 0.8rem;
            font-size: 1.3rem;
        }

        /* Content Sections */
        .content-section {
            margin-bottom: 3rem;
        }

        .section-title {
            font-size: 1.8rem;
            margin-bottom: 1.5rem;
            padding: 0.6rem 1rem;
            background-color: #000;
            color: #fff;
            display: inline-block;
            transform: rotate(-1deg);
            border: 2px solid #f5ca5a;
        }

        .section-container {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
        }

        .experience-box {
            background-color: #fff;
            padding: 1.5rem;
            border: 3px solid #000;
            position: relative;
            z-index: 1;
            transform: rotate(-0.5deg);
        }

        .job-title {
            font-size: 1.4rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
            text-transform: uppercase;
        }

        .company-name {
            color: #333;
            font-weight: bold;
            margin-bottom: 1rem;
            border-bottom: 2px solid #000;
            padding-bottom: 0.5rem;
            display: inline-block;
        }

        .skills-container {
            display: flex;
            flex-wrap: wrap;
            gap: 0.8rem;
        }

        .skill-tag {
            background-color: #f5ca5a;
            color: #000;
            padding: 0.6rem 1.2rem;
            font-size: 1rem;
            font-weight: bold;
            border: 2px solid #000;
            transform: rotate(1deg);
        }

        .skill-tag:nth-child(odd) {
            background-color: #82ddff;
            transform: rotate(-1deg);
        }

        .skill-tag:nth-child(3n) {
            background-color: #ff90e8;
            transform: rotate(2deg);
        }

        /* Footer */
        footer {
            background-color: #000;
            color: #fff;
            padding: 2.5rem 1rem;
            text-align: center;
            border-top: 4px solid #f5ca5a;
        }

        .footer-container {
            max-width: 1200px;
            margin: 0 auto;
        }

        .contact-button {
            background-color: #f5ca5a;
            color: #000;
            padding: 1rem 2rem;
            text-decoration: none;
            font-weight: bold;
            display: inline-flex;
            align-items: center;
            margin-top: 1.5rem;
            border: 3px solid #fff;
            text-transform: uppercase;
            transform: rotate(1deg);
            transition: transform 0.2s;
        }

        .contact-button:hover {
            background-color: #ffdf8d;
            transform: rotate(-2deg) scale(1.05);
        }

        /* Media Queries */
        @media (max-width: 768px) {
            .section-container {
                grid-template-columns: 1fr;
            }

            .search-bar {
                margin: 0 1rem;
            }

            .profile-header {
                flex-direction: column;
                text-align: center;
            }

            .profile-name {
                margin-left: 0;
                margin-top: 1rem;
            }

            .social-links {
                margin-top: 1rem;
            }
        }
    </style>
</head>
<body>
    <!-- Header with Logo and Search -->
    <header>
        <div class="header-container">
            <div class="logo">
                <span>{</span> <span>}</span> JAVA
            </div>
            <div class="search-bar">
                <input type="text" placeholder="Search Java concepts...">
            </div>
            <div class="user-actions">
                <div class="icon">🔔</div>
                <div class="icon">👤</div>
            </div>
        </div>
    </header>

    <!-- Navigation Bar (moved from sidebar) -->
    <nav>
        <div class="nav-container">
            <ul class="main-nav">
                <li><a href="#profile"><span>👤</span>Profile</a></li>
                <li><a href="#concepts"><span>📚</span>Java Concepts</a></li>
                <li><a href="#interview"><span>❓</span>Interview Q&A</a></li>
                <li><a href="#projects"><span>📁</span>Projects</a></li>
                <li><a href="#blog"><span>📝</span>Blog</a></li>
                <li><a href="#contact"><span>📨</span>Contact</a></li>
            </ul>
        </div>
    </nav>

    <!-- Main Content -->
    <main>
        <section id="profile" class="hero">
            <h1 class="portfolio-title">FULL-STACK JAVA DEVELOPER</h1>
            
            <div class="profile-container">
                <div class="profile-header">
                    <img src="images/dipu.jpg" alt="Your Profile" class="profile-image">
                    <div class="profile-name">
                        <h2>Subrat Ojha</h2>
                        <p class="profile-email">iamsubratojha@gmail.com</p>
                    </div>
                    <div class="social-links">
                        <div class="social-button"><a href="https://linkedin.com/in/subratojha">👥</a></div>
                          <div class="social-button"><a href="https://github.com/Subrat-ojha">🔗</a></div>
                        <div class="social-button"><a href="mailto:your.email@example.com">📧</a></div>
                    </div>
                </div>
                
                <div class="row-wrapper" style="display: flex; gap: 2rem; width: 100%; align-items: flex-start; justify-content: space-between;">
                    <div class="stats" style="flex: 1; margin: 0.5rem 0;">
                        <div class="stat-box">
                            <div class="stat-number">1+</div>
                            <div class="stat-label">YEARS</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-number">20+</div>
                            <div class="stat-label">PROJECTS</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-number">100%</div>
                            <div class="stat-label">JAVA</div>
                        </div>
                        <div class="stat-box">
                            <div class="stat-number">∞</div>
                            <div class="stat-label">PASSION</div>
                        </div>
                    </div>
                    
                    <div style="flex: 1.5;">
                        <p class="profile-bio" style="margin: 0 0 0.8rem 0;">
                            I'm a passionate Java developer with expertise in building robust backend systems, microservices architecture,
                            and enterprise applications. I love solving complex problems and sharing my knowledge with the developer
                            community.
                        </p>
                        
                    <div class="action-buttons" style="margin-top: 0.5rem;">
  <a href="mailto:iamsubratojha@gmail.com?subject=Hiring%20Inquiry" class="hire-button" target="_blank">
    <span class="button-icon">🚀</span> Hire Me
  </a>
  <a href="https://drive.google.com/uc?export=download&id=14xib-qvNZRgafta7TawkYrTRz9O268af
  " class="cv-button" target="_blank">
    <span class="button-icon">📄</span> Download CV
  </a>
</div>

                    </div>
                </div>
            </div>
        </section>

        <section class="content-section">
            <div class="section-container">
                <div>
                    <h2 class="section-title" id="experience">Work Experience</h2>
                    <div class="experience-box">
                        <h3 class="job-title"> Java Developer</h3>
                        <p class="company-name">IbaseIt Inc.</p>
                       <p>Developing backend systems in Java using a Finite State Machine (FSM) based framework to manage complex state transitions and workflow logic efficiently.</p>
                       
                    </div>
                </div>
                
                <div>
                    <h2 class="section-title" id="skills">Skills</h2>
                    <div class="skills-container">
                        <div class="skill-tag">Java 17+</div>
                        <div class="skill-tag">Spring Boot</div>
                        <div class="skill-tag">Hibernate</div>
                        <div class="skill-tag">Microservices</div>
                        <div class="skill-tag">REST APIs</div>
                        <div class="skill-tag">Docker</div>
                        <div class="skill-tag">Kubernetes</div>
                        <div class="skill-tag">AWS</div>
                        <div class="skill-tag">CI/CD</div>
                        <div class="skill-tag">React Js</div>
                    </div>
                </div>
            </div>
        </section>
    </main>

    <footer id="contact">
        <div class="footer-container">
            <h2>Get In Touch</h2>
            <p>Interested in working together? Let's connect and discuss your next project.</p>
            <a href="mailto:iamsubratojha@gmail.com" " class="contact-button"><span class="button-icon">📨</span> Contact Me</a>
        </div>
    </footer>
</body>
</html>
</body>
</html>
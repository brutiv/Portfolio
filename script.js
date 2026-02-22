document.addEventListener('DOMContentLoaded', () => {
  // Init video on load
  const backgroundVideo = document.getElementById('background');
  if (backgroundVideo) {
    backgroundVideo.muted = true;
    backgroundVideo.loop = true;
    backgroundVideo.play().catch(err => console.error("Failed to play background video:", err));
  }

  const startScreen = document.getElementById('start-screen');
  const startText = document.getElementById('start-text');
  const profileName = document.getElementById('profile-name');
  const profileBio = document.getElementById('profile-bio');
  const backgroundMusic = document.getElementById('dobermann-music');
  const hackerMusic = document.getElementById('rrugac-music');
  const homeButton = document.getElementById('home-theme');
  const hackerButton = document.getElementById('hacker-theme');
  const resultsButtonContainer = document.getElementById('results-button-container');
  const resultsButton = document.getElementById('results-theme');
  const volumeIcon = document.getElementById('volume-icon');
  const volumeSlider = document.getElementById('volume-slider');
  const playPauseButton = document.getElementById('play-pause-button');
  const playPauseIcon = document.getElementById('play-pause-icon');
  const hackerOverlay = document.getElementById('hacker-overlay');
  const snowOverlay = document.getElementById('snow-overlay');
  const glitchOverlay = document.querySelector('.glitch-overlay');
  const profileBlock = document.getElementById('profile-block');
  const skillsBlock = document.getElementById('skills-block');
  const pythonBar = document.getElementById('python-bar');
  const cppBar = document.getElementById('cpp-bar');
  const csharpBar = document.getElementById('csharp-bar');
  const resultsHint = document.getElementById('results-hint');
  const profilePicture = document.querySelector('.profile-picture');
  const profileContainer = document.querySelector('.profile-container');
  const socialIcons = document.querySelectorAll('.social-icon');
  const badges = document.querySelectorAll('.badge');

  const cursor = document.querySelector('.custom-cursor');
  const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;

  if (isTouchDevice) {
    document.body.classList.add('touch-device');

    document.addEventListener('touchstart', (e) => {
      const touch = e.touches[0];
      cursor.style.left = touch.clientX + 'px';
      cursor.style.top = touch.clientY + 'px';
      cursor.style.display = 'block';
    });

    document.addEventListener('touchmove', (e) => {
      const touch = e.touches[0];
      cursor.style.left = touch.clientX + 'px';
      cursor.style.top = touch.clientY + 'px';
      cursor.style.display = 'block';
    });

    document.addEventListener('touchend', () => {
      cursor.style.display = 'none';
    });
  } else {
    document.addEventListener('mousemove', (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
      cursor.style.display = 'block';
    });

    document.addEventListener('mousedown', () => {
      cursor.style.transform = 'scale(0.8) translate(-50%, -50%)';
    });

    document.addEventListener('mouseup', () => {
      cursor.style.transform = 'scale(1) translate(-50%, -50%)';
    });
  }


  // --- Start screen typewriter ---
  const startMessage = "Click here to see the motion baby";
  let startTextContent = '';
  let startIndex = 0;
  let startCursorVisible = true;

  function typeWriterStart() {
    if (startIndex < startMessage.length) {
      startTextContent = startMessage.slice(0, startIndex + 1);
      startIndex++;
    }
    startText.textContent = startTextContent + (startCursorVisible ? '|' : ' ');
    setTimeout(typeWriterStart, 100);
  }

  setInterval(() => {
    startCursorVisible = !startCursorVisible;
    startText.textContent = startTextContent + (startCursorVisible ? '|' : ' ');
  }, 500);


  // --- Start screen activate ---
  function onStartScreenActivate() {
    startScreen.classList.add('hidden');
    backgroundMusic.muted = false;
    backgroundMusic.play().catch(err => {
      console.error("Failed to play music after start:", err);
    }).finally(() => updatePlayPauseIcon());
    profileBlock.classList.remove('hidden');
    gsap.fromTo(profileBlock,
      { opacity: 0, y: -50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power2.out', onComplete: () => {
        profileBlock.classList.add('profile-appear');
        profileContainer.classList.add('orbit');
      }}
    );
    if (!isTouchDevice) {
      try {
        new cursorTrailEffect({ length: 10, size: 8, speed: 0.2 });
        console.log("Cursor trail initialized");
      } catch (err) {
        console.error("Failed to initialize cursor trail effect:", err);
      }
    }
    typeWriterName();
    typeWriterBio();
  }

  startScreen.addEventListener('click', onStartScreenActivate);
  startScreen.addEventListener('touchstart', (e) => {
    e.preventDefault();
    onStartScreenActivate();
  });


  // --- Profile name typewriter ---
  const name = "brutiv";
  let nameText = '';
  let nameIndex = 0;
  let isNameDeleting = false;
  let nameCursorVisible = true;
  let nameTypingStarted = false;

  function typeWriterName() {
    nameTypingStarted = true;
    if (!isNameDeleting && nameIndex < name.length) {
      nameText = name.slice(0, nameIndex + 1);
      nameIndex++;
    } else if (isNameDeleting && nameIndex > 0) {
      nameText = name.slice(0, nameIndex - 1);
      nameIndex--;
    } else if (nameIndex === name.length) {
      isNameDeleting = true;
      setTimeout(typeWriterName, 10000);
      return;
    } else if (nameIndex === 0) {
      isNameDeleting = false;
    }
    profileName.textContent = nameText + (nameCursorVisible ? '|' : ' ');
    if (Math.random() < 0.1) {
      profileName.classList.add('glitch');
      setTimeout(() => profileName.classList.remove('glitch'), 200);
    }
    setTimeout(typeWriterName, isNameDeleting ? 150 : 300);
  }

  setInterval(() => {
    if (!nameTypingStarted) return;
    nameCursorVisible = !nameCursorVisible;
    profileName.textContent = nameText + (nameCursorVisible ? '|' : ' ');
  }, 500);


  // --- Bio typewriter ---
  const bioMessages = [
    "Python Developer and Bot Developer from Kosovo",
    "Developing since 2021",
    "Love automated systems"
  ];
  let bioText = '';
  let bioIndex = 0;
  let bioMessageIndex = 0;
  let isBioDeleting = false;
  let bioCursorVisible = true;
  let bioTypingStarted = false;

  function typeWriterBio() {
    bioTypingStarted = true;
    if (!isBioDeleting && bioIndex < bioMessages[bioMessageIndex].length) {
      bioText = bioMessages[bioMessageIndex].slice(0, bioIndex + 1);
      bioIndex++;
    } else if (isBioDeleting && bioIndex > 0) {
      bioText = bioMessages[bioMessageIndex].slice(0, bioIndex - 1);
      bioIndex--;
    } else if (bioIndex === bioMessages[bioMessageIndex].length) {
      isBioDeleting = true;
      setTimeout(typeWriterBio, 2000);
      return;
    } else if (bioIndex === 0 && isBioDeleting) {
      isBioDeleting = false;
      bioMessageIndex = (bioMessageIndex + 1) % bioMessages.length;
    }
    profileBio.textContent = bioText + (bioCursorVisible ? '|' : ' ');
    if (Math.random() < 0.1) {
      profileBio.classList.add('glitch');
      setTimeout(() => profileBio.classList.remove('glitch'), 200);
    }
    setTimeout(typeWriterBio, isBioDeleting ? 75 : 150);
  }

  setInterval(() => {
    if (!bioTypingStarted) return;
    bioCursorVisible = !bioCursorVisible;
    profileBio.textContent = bioText + (bioCursorVisible ? '|' : ' ');
  }, 500);


  // --- Volume / mute ---
  let currentAudio = backgroundMusic;
  let isMuted = false;

  volumeIcon.addEventListener('click', () => {
    isMuted = !isMuted;
    currentAudio.muted = isMuted;
    volumeIcon.innerHTML = isMuted
      ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path>`
      : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>`;
  });

  volumeIcon.addEventListener('touchstart', (e) => {
    e.preventDefault();
    isMuted = !isMuted;
    currentAudio.muted = isMuted;
    volumeIcon.innerHTML = isMuted
      ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"></path>`
      : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>`;
  });

  volumeSlider.addEventListener('input', () => {
    currentAudio.volume = volumeSlider.value;
    isMuted = false;
    currentAudio.muted = false;
    volumeIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"></path>`;
  });

  // --- Play / Pause control ---
  function updatePlayPauseIcon() {
    if (!playPauseIcon) return;
    if (!currentAudio || currentAudio.paused) {
      playPauseIcon.innerHTML = `<path d="M6 4v16l12-8z"></path>`;
    } else {
      playPauseIcon.innerHTML = `<path d="M6 5h4v14H6zM14 5h4v14h-4z"></path>`;
    }
  }

  function togglePlayPause() {
    if (!currentAudio) return;
    if (currentAudio.paused) {
      currentAudio.play().catch(err => console.error('Play failed:', err));
    } else {
      currentAudio.pause();
    }
    updatePlayPauseIcon();
  }

  if (playPauseButton) {
    playPauseButton.addEventListener('click', (e) => { e.preventDefault(); togglePlayPause(); });
    playPauseButton.addEventListener('touchstart', (e) => { e.preventDefault(); togglePlayPause(); });
  }



  // --- Theme switcher ---
  function switchTheme(videoSrc, audio, themeClass, overlay = null, overlayOverProfile = false) {
    let primaryColor;
    switch (themeClass) {
      case 'home-theme':   primaryColor = '#00CED1'; break;
      case 'hacker-theme': primaryColor = '#22C55E'; break;
      case 'rain-theme':   primaryColor = '#1E3A8A'; break;
      case 'anime-theme':  primaryColor = '#DC2626'; break;
      case 'car-theme':    primaryColor = '#EAB308'; break;
      default:             primaryColor = '#00CED1';
    }
    document.documentElement.style.setProperty('--primary-color', primaryColor);

    gsap.to(backgroundVideo, {
      opacity: 0,
      duration: 0.5,
      ease: 'power2.in',
      onComplete: () => {
        backgroundVideo.src = videoSrc;
        backgroundVideo.loop = true;
        try {
          backgroundVideo.load();
          backgroundVideo.play().catch(err => console.error("Failed to play switched background video:", err));
        } catch (e) {
          console.error('Error loading/playing switched background video:', e);
        }

        if (currentAudio) {
          currentAudio.pause();
          currentAudio.currentTime = 0;
        }
        currentAudio = audio;
        currentAudio.volume = volumeSlider.value;
        currentAudio.muted = isMuted;
        currentAudio.play().catch(err => console.error("Failed to play theme music:", err)).finally(() => updatePlayPauseIcon());

        document.body.classList.remove('home-theme', 'hacker-theme', 'rain-theme', 'anime-theme', 'car-theme');
        document.body.classList.add(themeClass);

        hackerOverlay.classList.add('hidden');
        snowOverlay.classList.add('hidden');
        profileBlock.style.zIndex = overlayOverProfile ? 10 : 20;
        skillsBlock.style.zIndex = overlayOverProfile ? 10 : 20;
        if (overlay) {
          overlay.classList.remove('hidden');
        }

        if (themeClass === 'hacker-theme') {
          resultsButtonContainer.classList.remove('hidden');
        } else {
          resultsButtonContainer.classList.add('hidden');
          skillsBlock.classList.add('hidden');
          resultsHint.classList.add('hidden');
          profileBlock.classList.remove('hidden');
          gsap.to(profileBlock, { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' });
        }

        gsap.to(backgroundVideo, {
          opacity: 1,
          duration: 0.5,
          ease: 'power2.out',
          onComplete: () => {
            profileContainer.classList.remove('orbit');
            void profileContainer.offsetWidth;
            profileContainer.classList.add('orbit');
          }
        });
      }
    });
  }


  // --- Theme buttons ---
  homeButton.addEventListener('click', () => {
    switchTheme('assets/background.mp4', backgroundMusic, 'home-theme');
  });
  homeButton.addEventListener('touchstart', (e) => {
    e.preventDefault();
    switchTheme('assets/background.mp4', backgroundMusic, 'home-theme');
  });

  hackerButton.addEventListener('click', () => {
    switchTheme('assets/hacker_background.mp4', hackerMusic, 'hacker-theme', hackerOverlay, false);
  });
  hackerButton.addEventListener('touchstart', (e) => {
    e.preventDefault();
    switchTheme('assets/hacker_background.mp4', hackerMusic, 'hacker-theme', hackerOverlay, false);
  });




  // --- Card tilt ---
  function handleTilt(e, element) {
    const rect = element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    let clientX, clientY;
    if (e.type === 'touchmove') {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    const tiltX = ((clientY - centerY) / rect.height) * 15;
    const tiltY = -((clientX - centerX) / rect.width) * 15;
    gsap.to(element, { rotationX: tiltX, rotationY: tiltY, duration: 0.3, ease: 'power2.out', transformPerspective: 1000 });
  }

  profileBlock.addEventListener('mousemove', (e) => handleTilt(e, profileBlock));
  profileBlock.addEventListener('touchmove', (e) => { e.preventDefault(); handleTilt(e, profileBlock); });
  skillsBlock.addEventListener('mousemove', (e) => handleTilt(e, skillsBlock));
  skillsBlock.addEventListener('touchmove', (e) => { e.preventDefault(); handleTilt(e, skillsBlock); });

  profileBlock.addEventListener('mouseleave', () => {
    gsap.to(profileBlock, { rotationX: 0, rotationY: 0, duration: 0.5, ease: 'power2.out' });
  });
  profileBlock.addEventListener('touchend', () => {
    gsap.to(profileBlock, { rotationX: 0, rotationY: 0, duration: 0.5, ease: 'power2.out' });
  });
  skillsBlock.addEventListener('mouseleave', () => {
    gsap.to(skillsBlock, { rotationX: 0, rotationY: 0, duration: 0.5, ease: 'power2.out' });
  });
  skillsBlock.addEventListener('touchend', () => {
    gsap.to(skillsBlock, { rotationX: 0, rotationY: 0, duration: 0.5, ease: 'power2.out' });
  });


  // --- Profile picture glitch + orbit spin ---
  profilePicture.addEventListener('mouseenter', () => {
    glitchOverlay.style.opacity = '1';
    setTimeout(() => { glitchOverlay.style.opacity = '0'; }, 500);
  });

  function spinOrbit() {
    profileContainer.classList.remove('fast-orbit', 'orbit');
    void profileContainer.offsetWidth;
    profileContainer.classList.add('fast-orbit');
    setTimeout(() => {
      profileContainer.classList.remove('fast-orbit');
      void profileContainer.offsetWidth;
      profileContainer.classList.add('orbit');
    }, 500);
  }

  profilePicture.addEventListener('click', spinOrbit);
  profilePicture.addEventListener('touchstart', (e) => { e.preventDefault(); spinOrbit(); });


  // --- Results / skills toggle ---
  let isShowingSkills = false;

  function toggleSkills() {
    if (!isShowingSkills) {
      gsap.to(profileBlock, {
        x: -100, opacity: 0, duration: 0.5, ease: 'power2.in',
        onComplete: () => {
          profileBlock.classList.add('hidden');
          skillsBlock.classList.remove('hidden');
          gsap.fromTo(skillsBlock, { x: 100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' });
          gsap.to(pythonBar, { width: '87%', duration: 2, ease: 'power2.out' });
          gsap.to(cppBar, { width: '75%', duration: 2, ease: 'power2.out' });
          gsap.to(csharpBar, { width: '80%', duration: 2, ease: 'power2.out' });
        }
      });
      resultsHint.classList.remove('hidden');
      isShowingSkills = true;
    } else {
      gsap.to(skillsBlock, {
        x: 100, opacity: 0, duration: 0.5, ease: 'power2.in',
        onComplete: () => {
          skillsBlock.classList.add('hidden');
          profileBlock.classList.remove('hidden');
          gsap.fromTo(profileBlock, { x: -100, opacity: 0 }, { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' });
        }
      });
      resultsHint.classList.add('hidden');
      isShowingSkills = false;
    }
  }

  resultsButton.addEventListener('click', toggleSkills);
  resultsButton.addEventListener('touchstart', (e) => { e.preventDefault(); toggleSkills(); });


  // --- Kick off ---
  try { updatePlayPauseIcon(); } catch (e) { /* ignore if not available */ }
  typeWriterStart();
});

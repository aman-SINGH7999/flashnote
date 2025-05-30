(function (global) {
    const containers = {};
  
    function getContainer(position) {
      if (containers[position]) return containers[position];
  
      const div = document.createElement('div');
      div.className = `notify-container notify-${position}`;
      document.body.appendChild(div);
      containers[position] = div;
      return div;
    }

    const preloadedSounds = {
        success: new Audio("/sounds/success.wav"),
        error: new Audio("/sounds/error.wav"),
        warning: new Audio("/sounds/error.wav"),
        info: new Audio("/sounds/success.wav"),
      };
      
      // Preload the audio files
      Object.values(preloadedSounds).forEach(audio => {
        audio.load(); // forces browser to preload
      });      
  
      function playSound(type) {
        const sound = preloadedSounds[type] || preloadedSounds.info;
        sound.currentTime = 0; // rewind to start
        sound.play();
      }
  
    function showNotification(message, type = "info", position = "top-center", duration = 2000, audio = false) {
      if(audio)  playSound(type); // 🔊 play sound
  
      const container = getContainer(position);
      const box = document.createElement("div");
      box.className = `notify-box ${type}`;
      box.innerHTML = `
        <span>${message}</span>
        <span class="notify-close">✖</span>
      `;
  
      // Add progress bar
      const progress = document.createElement("div");
      progress.className = "notify-progress";
      progress.style.animationDuration = `${duration}ms`;
      box.appendChild(progress);
  
      container.appendChild(box);
  
      // Close animation
      const closeNotification = () => {
        box.style.animation = 'fadeOut 0.4s ease forwards';
        setTimeout(() => {
          container.removeChild(box);
        }, 400);
      };
  
      const timeout = setTimeout(closeNotification, duration);
  
      box.querySelector(".notify-close").onclick = () => {
        clearTimeout(timeout);
        closeNotification();
      };
    }
  
    const flash = {
      show: (msg, type = "info", pos = "top-center", duration = 2000, audio = false) =>
        showNotification(msg, type, pos, duration, audio),
  
      success: (msg, pos = 'top-center', duration = 3000, audio = false) =>
        showNotification(msg, 'success', pos, duration, audio),
  
      error: (msg, pos = 'top-center', duration = 3000, audio = false) =>
        showNotification(msg, 'error', pos, duration, audio),
  
      warning: (msg, pos = 'top-center', duration = 3000, audio = false) =>
        showNotification(msg, 'warning', pos, duration, audio),
  
      info: (msg, pos = 'top-center', duration = 3000, audio = false) =>
        showNotification(msg, 'info', pos, duration, audio),
    };
  
    global.flash = flash;
  })(window);
  
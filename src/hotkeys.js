import { getKeyColor } from './helpers.js';
import './styles.css';

// --- HotKeys ---
// Like/Dislike
const hitTheLikeBtn = (e) => {
  if (e.type === 'keydown') {
    // Press Like/Dislike Button
    document.querySelector('[aria-label*="like"]').click();

    // Remove focus from the right bar if TikTok not asking to log in
    if (!document.querySelector('[data-e2e*="LoginModal"]')) {
      document.querySelector('[data-e2e*="NavigationMenu_Container"]').click();
    }
  }
};

// Video Rewind
let lastRemoveNotificationTimerID;
const videoRewind = (e) => {
  if (e.type === 'keydown') {
    const isForward = getKeyColor(e.keyCode) === 'yellow';

    const player = window.xgplayer; // TikTok using xgplayer for video
    const videoRoot = player.root;
    const removeNotification = () => {
      videoRoot.classList.remove('videoRewind');
      videoRoot.classList.remove('back');
    };

    // Remove notification before show up new one
    removeNotification();
    // Clear previous timer
    clearTimeout(lastRemoveNotificationTimerID);

    // Video Rewind
    const newTime = isForward ? player.currentTime + 5 : player.currentTime - 5;

    if (isForward) {
      player.currentTime =
        newTime > player.duration ? player.duration : newTime;
    } else {
      player.currentTime = newTime < 0 ? 0 : newTime;
    }

    videoRoot.classList.add('videoRewind');

    if (!isForward) {
      videoRoot.classList.add('back');
    }

    // Remove notification after a 1 sec of inactivity
    lastRemoveNotificationTimerID = setTimeout(() => {
      removeNotification();
    }, 1000);
  }
};

// Collect HotKeys
const hotkeysMap = {
  red: hitTheLikeBtn,
  green: videoRewind,
  yellow: videoRewind
};

// Find and Handle HotKey event
const handleHotkeys = (e) => {
  const currentButtonColor = getKeyColor(e.keyCode);

  if (currentButtonColor in hotkeysMap) {
    hotkeysMap[currentButtonColor](e);
  }
};

// Register Events
document.addEventListener('keydown', handleHotkeys);
document.addEventListener('keypress', handleHotkeys);
document.addEventListener('keyup', handleHotkeys);

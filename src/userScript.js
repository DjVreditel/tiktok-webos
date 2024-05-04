import { startApp } from './helpers.js';
import './hotkeys.js';

// Auto App Relaunch
document.addEventListener('webOSRelaunch', startApp, true);

# TikTok WebOS

Unofficial TikTok App for WebOS with extended features

![Splash](./assets/splash.png)

## Extended Features
### HotKeys
* 🔴 Like/Dislike 
* 🟢 Rewind five seconds
* 🟡 Fast-forward five seconds

## Installation

- Use [Device Manager app](https://github.com/webosbrew/dev-manager-desktop) - see [Releases](https://github.com/DjVreditel/tiktok-webos/releases) for a
  prebuilt `.ipk` binary file
- Use [webOS TV CLI tools](https://webostv.developer.lge.com/develop/tools/cli-installation) -
  `ares-install tiktok...ipk` (for webOS CLI tools configuration see below)

### Autostart

To autostart an application, the following command needs to be executed
via SSH or Telnet:

```sh
luna-send-pub -n 1 'luna://com.webos.service.eim/addDevice' '{"appId":"tiktok.djvreditel.v1","pigImage":"","mvpdIcon":""}'
```

This will make "TikTok" display as an eligible input application (next
to HDMI/Live TV, etc...), and, if it was the last selected input, it will be
automatically launched when turning on the TV.

This will also greatly increase startup performance, since it will be running
constantly in the background, at the cost of increased idle memory usage.
(So far, relatively unnoticeable in normal usage)

To disable app autostart run this:

```sh
luna-send-pub -n 1 'luna://com.webos.service.eim/deleteDevice' '{"appId":"tiktok.djvreditel.v1"}'
```

## Building

- Clone the repository

```sh
git clone https://github.com/DjVreditel/tiktok-webos.git
```

- Enter the folder and build the App, this will generate a `*.ipk` file.

```sh
cd tiktok-webos

# Install dependencies (need to do this only when updating local repository / package.json is changed)
npm install

npm run compile
```

## Development TV setup

### Configuring webOS TV CLI tools with Developer Mode App

This is partially based on: https://webostv.developer.lge.com/develop/getting-started/developer-mode-app

- Install Developer Mode app from Content Store
- Enable developer mode, enable keyserver
- Download TV's private key: `http://TV_IP:9991/webos_rsa`
- Configure the device using `ares-setup-device` (`-a` may need to be replaced with `-m` if device named `webos` is already configured)
  - `PASSPHRASE` is the 6-character passphrase printed on screen in developer mode app

```sh
ares-setup-device -a webos -i "username=prisoner" -i "privatekey=/path/to/downloaded/webos_rsa" -i "passphrase=PASSPHRASE" -i "host=TV_IP" -i "port=9922"
```

### Configuring webOS TV CLI tools with Homebrew Channel / root

- Enable sshd in Homebrew Channel app
- Generate the ssh key on developer machine (`ssh-keygen`)
- Copy the public key (`id_rsa.pub`) to `/home/root/.ssh/authorized_keys` on TV
- Configure the device using `ares-setup-device` (`-a` may need to be replaced with `-m` if device named `webos` is already configured)

```sh
ares-setup-device -a webos -i "username=root" -i "privatekey=/path/to/id_rsa" -i "passphrase=SSH_KEY_PASSPHRASE" -i "host=TV_IP" -i "port=22"
```

## Installation

```
npm run deploy
```

## Launching

- The app will be available in the TV's app list or launch it using ares-cli.

```sh
npm run launch
```

## Special Thanks 
[Piotr Dobrowolski](https://github.com/Informatic) and [throwaway96](https://github.com/throwaway96) for the [YouTube AdFree](https://github.com/webosbrew/youtube-webos) Application and Repo that was taken as the basis of this application

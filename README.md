# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.

# AsmaAppV3 — Guia de Setup (novo PC) e Atualização

Aplicativo mobile (Android) em **Expo/React Native** com **BLE** para leitura de sensores (ESP32) e integração com **Azure** (APIs/IA/ML).  
Este guia explica como rodar o projeto em um **novo computador** e como **atualizar** um ambiente que já existe.

> **Nome do pacote Android:** `com.coquinha.AsmaAppV3`  
> **SDK:** Expo + React Native (com `react-native-ble-plx` e `expo-dev-client`)  
> **Plataforma alvo:** Android

---

## Sumário
- [Pré-requisitos](#pré-requisitos)
- [Variáveis de ambiente (Android/JDK)](#variáveis-de-ambiente-androidjdk)
- [Permissões e notas de BLE](#permissões-e-notas-de-ble)
- [Caso A — Clonar em um novo computador](#caso-a--clonar-em-um-novo-computador)
- [Caso B — Atualizar um projeto já clonado](#caso-b--atualizar-um-projeto-já-clonado)
- [Build local vs EAS Build](#build-local-vs-eas-build)
- [Solução de problemas (FAQ rápido)](#solução-de-problemas-faq-rápido)
- [Anexos (úteis)](#anexos-úteis)

---

## Pré-requisitos
Instale no computador:

- **Node.js LTS** (18+).
- **Git**.
- **Android Studio** (incluindo **Android SDK**, **Build Tools** e **Platform Tools/ADB**).
- **JDK 17** (ex.: Temurin/Adoptium).
- **CLI**: `npm i -g eas-cli` (para builds na nuvem).

Verifique no terminal:
```bash
node -v
adb version
java -version
```

> iOS não é necessário (projeto focado em Android).

---

## Variáveis de ambiente (Android/JDK)

### Windows (PowerShell – ajuste os caminhos conforme seu usuário)
```powershell
# Android SDK
$env:ANDROID_HOME="C:\Users\<SEU_USUARIO>\AppData\Local\Android\Sdk"
[System.Environment]::SetEnvironmentVariable("ANDROID_HOME",$env:ANDROID_HOME,"User")

$env:Path += ";$env:ANDROID_HOME\platform-tools;$env:ANDROID_HOME\emulator;$env:ANDROID_HOME\cmdline-tools\latest\bin"
[System.Environment]::SetEnvironmentVariable("Path",$env:Path,"User")

# JDK 17
$env:JAVA_HOME="C:\Program Files\Eclipse Adoptium\jdk-17"
[System.Environment]::SetEnvironmentVariable("JAVA_HOME",$env:JAVA_HOME,"User")
```

### macOS/Linux (bash/zsh)
Adicione ao `~/.zshrc` ou `~/.bashrc`:
```bash
export ANDROID_HOME="$HOME/Library/Android/sdk"   # macOS; em Linux costuma ser $HOME/Android/Sdk
export PATH="$PATH:$ANDROID_HOME/platform-tools:$ANDROID_HOME/emulator:$ANDROID_HOME/cmdline-tools/latest/bin"

# macOS: seleciona JDK 17 instalado
export JAVA_HOME=$(/usr/libexec/java_home -v 17)
```

---

## Permissões e notas de BLE

No `app.json` (Android), mantenha:
```json
"android": {
  "package": "com.coquinha.AsmaAppV3",
  "permissions": [
    "BLUETOOTH",
    "BLUETOOTH_ADMIN",
    "BLUETOOTH_SCAN",
    "BLUETOOTH_CONNECT",
    "ACCESS_FINE_LOCATION"
  ]
}
```

- **Android 12+**: `BLUETOOTH_SCAN` e `BLUETOOTH_CONNECT` (aparecem como “Dispositivos por perto”).  
- **Android 10/11**: o scan BLE exige `ACCESS_FINE_LOCATION` **e** a **Localização do sistema ligada**.  
- **Runtime**: o app pede as permissões em tempo de execução (via `PermissionsAndroid`).  
- **Biblioteca BLE**: `react-native-ble-plx` (requer build nativa).

> Dica: mudanças **nativas** (permissões/libs nativas/plugins) exigem **rebuild**. Mudanças **só em JS/TS** não.

---

## Caso A — Clonar em um novo computador

### 1) Preparar o Android físico
- Ative **Opções do desenvolvedor** e **Depuração USB**.  
- Conecte por **USB** ou configure **ADB sem fio** (Android 11+: *Wireless debugging* → `adb pair`/`adb connect`).  
- Confirme que o PC enxerga o device:
```bash
adb devices   # deve listar <serial>    device
```

### 2) Clonar o repositório e instalar dependências
```bash
git clone https://github.com/<org>/<repo>.git
cd <repo>

# use o gerenciador de pacotes padrão do projeto
npm ci   # (ou: npm i / yarn / pnpm)
```

> A pasta **`android/`** está versionada, então **não** precisa rodar `expo prebuild`.

### 3) Instalar o Dev Client (uma vez)
Escolha **um** fluxo (local **OU** nuvem):

**Opção A — Build local (rápida para dev)**
```bash
npx expo install expo-dev-client
npx expo run:android
```
Isto compila via **Gradle local** e **instala** no celular.

**Opção B — EAS Build (nuvem, fácil de compartilhar)**
```bash
npm i -g eas-cli
eas login
eas init          # se for o 1º uso deste projeto no EAS
eas build -p android --profile development
# baixe o APK gerado e instale no celular
```
Exemplo de `eas.json`:
```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal",
      "android": { "buildType": "apk" }
    }
  }
}
```

> Alternar entre APK local e APK do EAS no mesmo aparelho pode falhar por **assinaturas diferentes**.  
> Se for alternar de fluxo, **desinstale antes**:
```bash
adb uninstall com.coquinha.AsmaAppV3
```

### 4) Rodar o app (JS/TS) — sem rebuild nativo
```bash
npx expo start --dev-client
```
- Pressione **a** para abrir no Android, ou escaneie o **QR** com o app instalado.  
- Em redes problemáticas: `npx expo start --dev-client --tunnel`.

> **Mudanças só em JS/TS não exigem nova build.** Rebuild apenas quando instalar/atualizar **lib nativa** ou alterar algo **nativo** no `app.json`.

---

## Caso B — Atualizar um projeto já clonado

### 1) Obter as últimas alterações
```bash
git pull origin main   # ajuste o branch se necessário
```

### 2) Sincronizar dependências
Se o `package.json` mudou:
```bash
npm ci    # (ou npm i / yarn / pnpm)
```

### 3) Preciso rebuildar?
- **Mudou só JS/TS** → **NÃO** precisa rebuild:  
  ```bash
  npx expo start --dev-client
  ```
- **Mudou lib nativa / permissões / plugins / campos nativos do `app.json`** → **SIM**:
  - **Local**: `npx expo run:android`  
  - **Nuvem**: `eas build -p android --profile development` e instale o APK.

> Se você estava com um APK do EAS e agora vai usar build local (ou vice-versa), **desinstale** antes:
```bash
adb uninstall com.coquinha.AsmaAppV3
```

### 4) Limpezas úteis quando atualizou React Native/SDK ou várias libs nativas
```bash
cd android
./gradlew clean        # macOS/Linux
# ou no Windows (PowerShell):
.\gradlew.bat clean
cd ..
npx expo run:android
```

---

## Build local vs EAS Build

### `npx expo run:android` (local)
- **Uso**: desenvolvimento diário, iteração rápida após mudanças nativas.  
- **Prós**: rápido, instala via ADB, sem depender da nuvem.  
- **Contras**: requer Android SDK/JDK funcionando; pouco prático para distribuir APK.

### `eas build -p android --profile development` (nuvem)
- **Uso**: compartilhar APK com colegas/testers, CI, ambiente reprodutível.  
- **Prós**: link para download, logs na nuvem, menos atrito de ambiente local.  
- **Contras**: depende da nuvem; primeira build tende a demorar mais.

**Regra de ouro**: use **local** para desenvolver; use **EAS** para **distribuir** ou validar builds “limpos”.

---

## Solução de problemas (FAQ rápido)

**“No development build installed” ao rodar `expo start`**  
→ Use sempre `npx expo start --dev-client`. Sem o flag, o CLI tenta abrir com **Expo Go**, que não inclui suas libs nativas (BLE).

**`INSTALL_FAILED_UPDATE_INCOMPATIBLE` ao instalar APK**  
→ Você alternou entre build local e EAS (assinaturas diferentes). Desinstale antes:
```bash
adb uninstall com.coquinha.AsmaAppV3
```

**“Native module cannot be null”**  
→ Instalada/atualizada **lib nativa** sem rebuild. Faça `npx expo run:android` (ou EAS Build).

**ADB não detecta o celular**  
→ Troque o cabo/porta USB; confirme “Permitir depuração USB”.  
→ No Wi‑Fi (Android 11+): *Wireless debugging* → `adb pair` e `adb connect <IP:PORTA>` → `adb devices`.

**BLE scan não encontra nada (Android 10/11)**  
→ Além de `ACCESS_FINE_LOCATION`, ligue a **Localização do sistema** nas configurações do Android.

**Bundler não conecta**  
→ Use `--tunnel`: `npx expo start --dev-client --tunnel`.

---

## Anexos (úteis)

**Snippet: pedir permissões BLE em runtime**
```ts
import { PermissionsAndroid, Platform } from "react-native";

export async function ensureBlePermissions() {
  if (Platform.OS !== "android") return true;
  const sdk = Number(Platform.Version);
  if (sdk >= 31) {
    const res = await PermissionsAndroid.requestMultiple([
      "android.permission.BLUETOOTH_SCAN",
      "android.permission.BLUETOOTH_CONNECT"
    ]);
    return Object.values(res).every(v => v === PermissionsAndroid.RESULTS.GRANTED);
  } else {
    const loc = await PermissionsAndroid.request("android.permission.ACCESS_FINE_LOCATION");
    return loc === PermissionsAndroid.RESULTS.GRANTED;
  }
}
```

**Cheat sheet (comandos)**
```bash
# instalar dev client (local)
npx expo run:android

# iniciar bundler para dev client
npx expo start --dev-client
npx expo start --dev-client --tunnel   # se estiverem em redes diferentes

# build na nuvem (APK dev)
eas build -p android --profile development

# alternou EAS <-> local? limpe antes
adb uninstall com.coquinha.AsmaAppV3

# logs do dispositivo
adb logcat
```

**.easignore (sugestão para builds mais rápidas)**
```
.git/
.vscode/
.idea/
*.mp4
*.zip
docs/
design/
data/
dumps/
.venv/
```

---


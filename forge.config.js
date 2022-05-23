/**
 * Electron Forge configuration file.
 *
 * @author     Justin Hartman <code@justinhartman.co>
 * @link       https://justinhartman.co
 * @copyright  Copyright (c) 2021-2022 Justin Hartman
 * @licence    https://github.com/justinhartman/MEGAdesktop/blob/main/LICENSE MIT
 * @since      1.0.0
 */

const ray = require('node-ray').ray;
const path = require('path');
const fs = require('fs');
const iconDir = path.resolve(__dirname, 'build', 'icons');
const packageJson = require('./package.json');
const { version } = packageJson;
const appVersion = `${version}`;
const appName = 'MEGAdesktop';
const appId = process.env.IS_DEV ? 'co.justinhartman.dev.megadesktop' : 'co.justinhartman.megadesktop';
const appDescription = 'A Mega.nz Electron Desktop app for managing files on Windows, macOS and Linux.';
const appIconLinux = './build/icons/128x128.png';
const devName = 'Justin Hartman';
const devUrl = 'https://justinhartman.co';

const commonLinuxConfig = {
  options: {
    name: appName,
    productName: appName,
    maintainer: devName,
    homepage: devUrl,
    categories: 'Utility',
    description: appDescription,
    icon: './build/icons/128x128.png',
    version: appVersion,
  },
};

const config = {
  packagerConfig: {
    name: appName,
    productName: appName,
    executableName: appName,
    asar: true,
    appBundleId: appId,
    appCategoryType: 'public.app-category.productivity',
    icon: path.resolve(iconDir, 'icon'),
    win32metadata: {
      CompanyName: devName,
      OriginalFilename: appName,
    },
    osxSign: {
      identity: 'Developer ID Application: Social Code Online Agency (Pty) Ltd (DYB6HN3MN6)',
      hardenedRuntime: true,
      'gatekeeper-assess': false,
      entitlements: 'static/entitlements.plist',
      'entitlements-inherit': 'static/entitlements.plist',
      'signature-flags': 'library',
    },
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      platforms: ['win32'],
      config: (arch) => ({
        name: appName,
        authors: devName,
        exe: 'MEGAdesktop.exe',
        setupExe: `MEGAdesktop-${version}-win32-${arch}-setup.exe`,
        setupIcon: path.resolve(iconDir, 'icon.ico'),
        noMsi: true,
        // certificateFile: process.env['WINDOWS_CODESIGN_FILE'],
        // certificatePassword: process.env['WINDOWS_CODESIGN_PASSWORD'],
      }),
    },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-dmg',
      config: {
        name: appName,
        format: 'ULFO',
        icon: './build/icons/icon.icns',
        overwrite: true,
      },
    },
    {
      name: '@electron-forge/maker-deb',
      platforms: ['linux'],
      config: commonLinuxConfig,
    },
    {
      name: '@electron-forge/maker-rpm',
      platforms: ['linux'],
      config: commonLinuxConfig,
    },
  ],
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'justinhartman',
          name: 'MEGAdesktop',
        },
        draft: true,
        prerelease: true,
      },
    },
  ],
};

function notarizeMaybe() {
  if (process.platform !== 'darwin') {
    return;
  }

  if (!process.env.CI) {
    console.log(`Not in CI, skipping notarization`);
    return;
  }

  if (!process.env.APPLE_ID || !process.env.APPLE_ID_PASSWORD) {
    console.warn(
      'Should be notarizing, but environment variables APPLE_ID or APPLE_ID_PASSWORD are missing!',
    );
    return;
  }

  config.packagerConfig.osxNotarize = {
    appBundleId: appId,
    appleId: process.env.APPLE_ID,
    appleIdPassword: process.env.APPLE_ID_PASSWORD,
    ascProvider: 'DYB6HN3MN6',
  };
}

notarizeMaybe();

// Finally, export the configuration.
module.exports = config;

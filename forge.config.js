/**
 * Electron Forge configuration file.
 *
 * @author     Justin Hartman <code@justinhartman.co>
 * @link       https://justinhartman.co
 * @copyright  Copyright (c) 2021-2022 Justin Hartman
 * @licence    https://github.com/justinhartman/MEGAdesktop/blob/main/LICENSE MIT
 * @since      1.0.0
 */

const { utils: { fromBuildIdentifier } } = require('@electron-forge/core');
const ray = require('node-ray').ray;

const appVersion = '1.0.0';
const appName = 'MEGAdesktop';
const appId = process.env.IS_DEV ? 'co.justinhartman.dev.megadesktop' : 'co.justinhartman.megadesktop';
const appDescription = 'A Mega.nz Electron Desktop app for managing files on Windows, macOS and Linux.';
const appIconLinux = './build/icons/128x128.png';
const devName = 'Justin Hartman';
const devUrl = 'https://justinhartman.co';

ray(appId).green();

module.exports = {
  packagerConfig: {
    name: appName,
    productName: appName,
    executableName: appName,
    appBundleId: appId,
    appCategoryType: 'public.app-category.productivity',
    icon: './build/icons/icon',
  },
  makers: [
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: appName,
        // certificateFile: './cert.pfx',
        // certificatePassword: 'this-is-a-secret'
      },
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
      name: '@electron-forge/maker-zip',
    },
    {
      name: '@electron-forge/maker-deb',
      config: {
        options: {
          name: appName,
          productName: appName,
          maintainer: devName,
          homepage: devUrl,
          categories: 'Utility',
          description: appDescription,
          icon: appIconLinux,
          size: '200MB',
          version: appVersion,
        },
      },
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {
        options: {
          name: appName,
          productName: appName,
          maintainer: devName,
          homepage: devUrl,
          categories: 'Utility',
          description: appDescription,
          icon: appIconLinux,
          version: appVersion,
        },
      },
    },
  ],
};
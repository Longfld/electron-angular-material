# electron-angular-material
Electron App with Angular and Material by systemjs

**************************************************
How to run under development enviroment (under any OS, windows, linux, iOS)?
---------------------------------------------

After download

npm install

npm start

When code  changing, reloading Electron via “View ⟶ Reload” or with Cmd-R (Ctrl-R on Windows)
*****************************************************
***********************************************

$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

$ Electron Application auto update (Windows) $

$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$

Electron builder is a complete solution to package, build a ready for distribution Electron app and with  “auto update” support out of the box.

For how to use electron builder: https://github.com/electron-userland/electron-builder

Surprisely I cannot find windows enviroment electron application auto update example all over on internet (today).  I have built this to share with you. And below can work under windows only.
***************************************************
How to package it?
--------------------------------------------
>npm run dist

When complete, to install it by open your distribution files in "dist" folder, right click "Electron Angular Application Setup.exe" and "Run as administrator"

************************************
Electron Application auto update (Windows)
---------------------------------------------
1. Open a command prompt windows session, go to folder where package.json is and run this to start website (assume this is your hosting website)
>npm run wb

2. Open another command prompt windows session, go to folder where package.json is and run build as:
>npm run dist

Copy everything under folder dist to folder wwwroot (assume this is distribution for production) 

3. After complete, right click dist/"Electron Angular Application Setup.exe" and "run as administrator" to install electron application

4. Try your electron application from desktop shortcut and make sure everything is ok, then we upgrade our electron application by:
>npm version patch

5. To build and distribute, delete everything in folder "dist" and "wwwroot" then repeat step 2 above again.

6. Open your electron application from desktop shortcut again and you can see new version is downloaded and upgraded.

**************************************************

For Electron quick start: https://electron.atom.io/docs/tutorial/quick-start/

For angular quick start, check https://angular.io or https://github.com/Longfld/AngularQuickStartForBeginning

For Angular Dynamic Router as Electron application: https://github.com/Longfld/AngularRouter4Electron

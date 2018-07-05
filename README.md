# nodejsWebServer


guide on how to get node.js app on azure
https://www.youtube.com/watch?v=WDqnaZFE7Oc
## basic node app setup
1. Start your project in vscode
2. Create your .js file where you entry point is (ex: index.js or server.js)
3. in the terminal launch "npm init" to create the package.json file (make sure you are in the app folder.)
    * add a strart command in the scripts part of package.json
    * you can now start the app with "npm start"

## connect to Azure
1. Install Azure App Service extension
2. in the azure tab Create a new web app.
3. choose linux
4. in azure tab chose deploy to webapp
    * this is the simplest way to do it, it zips your folder and uploads it to azure. There are other ways, directly from git for example.
    * notice the appService.zipIgnorePattern in workspace settings
    * note: Make sure to use enviroment varialbles for things like port.


I installed nodeexpress to get better http wrappers
to add compression middleware npm install --save compression




https://github.com/SheKnowsItsAMultipass/nodejsWebServer


https://lhx-simplenodeapp.azurewebsites.net

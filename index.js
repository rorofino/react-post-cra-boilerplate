#!/usr/bin/env node

const { execSync, spawn } = require('child_process');
const { resolve } = require('path');
const fs = require('fs-extra');
const { platform } = require('os');

const modules_to_install = ['moment', 'node-sass-chokidar', 'npm-run-all', 
    'react-redux', 'react-router-dom', 'redux', 'redux-form', 'redux-thunk'];

const runningPath = process.cwd();
const templatePath = resolve(__dirname, 'templates');
const srcDestination = resolve(runningPath, 'src');
console.log('copying template files');
console.log('from', templatePath);
console.log('to', srcDestination);

try {
    fs.copySync(templatePath, srcDestination);
} catch (e) {
    console.log('Erro while copying template files');
}

console.log('Adjusting package.json to include sass');

const craPackageJsonPath = resolve(runningPath, 'package.json');
const craPackageJson = require(craPackageJsonPath);
craPackageJson.scripts["build-css"] = "node-sass-chokidar src/ -o src/";
craPackageJson.scripts["watch-css"] = "npm run build-css && node-sass-chokidar src/ -o src/ --watch --recursive";
craPackageJson.scripts['start-js'] = craPackageJson.scripts['start'];
craPackageJson.scripts['build-js'] = craPackageJson.scripts['build'];
craPackageJson.scripts['start'] = 'npm-run-all -p watch-css start-js';
craPackageJson.scripts['build'] = 'npm-run-all build-css build-js';

fs.renameSync(craPackageJsonPath, craPackageJsonPath+".bak");
try {
    fs.writeFileSync(craPackageJsonPath, JSON.stringify(craPackageJson));

} catch(e) {
    console.log('Error while modifing package.json', e);
    fs.renameSync(craPackageJsonPath+".bak", craPackageJsonPath.replace('.bak', ''));
}

console.log('Removing unused files');
fs.unlinkSync(resolve(srcDestination, 'logo.svg'));
fs.unlinkSync(resolve(srcDestination, 'App.js'));
fs.unlinkSync(resolve(srcDestination, 'App.css'));
fs.unlinkSync(craPackageJsonPath+".bak");
fs.moveSync(resolve(srcDestination, 'App.test.js'), resolve(srcDestination, 'components', 'App.test.js'));


console.log('instaling node modules', modules_to_install);

try {
    execSync('npm install --save ' + modules_to_install.join(' '), { stdio: 'inherit', cwd: runningPath });
} catch (e) {
    console.log("Fail to install npm modules", e);
}
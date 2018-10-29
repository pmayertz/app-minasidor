
# Proof of concept: Ny mobil-app

Det här är en proof of concept som Försäkringskassan har startat för att utmana sig själva i att bygga mjukvara snabbare.

## Kontaktinformation
* Ägs av 66112395
* Utvecklas av 66121631 & 66127541

## Starta mock-server

- npm install -g mockserver
- mockserver -p 8080 -m mock

## Bygg för produktion
iOS: ```react-native run-ios --device --configuration Release```
Android: ```react-native run-android --variant=release```

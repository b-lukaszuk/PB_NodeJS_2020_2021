# Zadania

## Zadanie 3 [2 punkty]

Napisz program który wypisze szczegóły pliku z własnym kodem źródłowym.

Wypisywane informacje:
- czas utworzenia
- czas modyfikacji
- rozmiar

Program powinien działać poprawnie także po zmianie nazwy i lokalizacji pliku - bez zmiany kodu źródłowego!

Przykłady wywołania
```bash
node app.js # wyświetla szczegóły pliku app.js
```
po zmianie nazwy app.js na app2.js
```bash
node app2.js # wyświetla szczegóły pliku app2.js
```
Podpowiedź: jest to możliwe przy użyciu standardowych modułów Node.js.

## Sposob tworzenia tego projektu

```bash
npm init # tworzenie pliku package.json
npm i yargs --save # dodanie modulu (tu jako przyklad yargs)
# (updateuje package.json i package-lock.json)
```

## Przed pierwszym uruchomieniem (po pobraniu z github-a)

```bash
npm install # instaluje potrzebne zaleznosci
```

## Uruchomienie programu

```bash
node z3.js
```

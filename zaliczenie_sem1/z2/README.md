# Zadania

## Zadanie 2 [2 punkty]

Napisz aplikację która przyjmuje w parametrze ciąg znaków a następnie wyświetli go w kolorach tęczy. Wykorzystaj moduł `colors` (https://www.npmjs.com/package/colors) w wersji 1.3.2!. Pamiętaj o obsłudze błędów.

Sposób obsługi parametrów wejściowych jest dowolny (w kodzie rozwiązania należy dodać komentarz z przykładowym wywołaniem).

## Sposob tworzenia tego projektu

```bash
npm init # tworzenie pliku package.json
npm i colors@1.3.2 --save # dodanie modulu (tu jako przyklad colors w wersji 1.3.2)
# (updateuje package.json i package-lock.json)
```

## Przed pierwszym uruchomieniem (po pobraniu z github-a)

```bash
npm install # instaluje potrzebne zaleznosci
```

## Uruchomienie programu

(dbp) - displayed by the program

```bash
node z2.js
Hello user # (dbp)
Please type your text below and I will color it for you: # (dbp)
colors of the rainbow # user's input
colors of the rainbow # (dbp)
All done. See above. # (dbp)
Goodbye :) # (dbp)
```

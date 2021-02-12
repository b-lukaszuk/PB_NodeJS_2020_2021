# Zadania

## Zadanie 5 [10 punktów]

Stwórz aplikację która pobierze informacje o użytkowniku, albumie i przypisanych do tego albumu zdjęciach.
- wyświetl email użytkownika
- wyświetl liczbę wszystkich albumów użytkownika
- wyświetl tytuły zdjeć z wybranego albumu
- żądania do API wysyłaj asynchronicznie
- pamiętaj o obsłudze błędów
- podziel rozwiązanie na moduły
- identyfikator użytkownika i identyfikator albumu są podawane w parametrach wejściowych, sposób obsługi parametrów wejściowych jest dowolny (w kodzie rozwiązania należy dodać komentarz z przykładowym wywołaniem).

Lista adresów API:
- endpoint do użytkownika: https://jsonplaceholder.typicode.com/users/{id_użytkownika}
- endpoint do albumów: https://jsonplaceholder.typicode.com/albums?userId={id_użytkownika}
- endpoint do zdjęć: https://jsonplaceholder.typicode.com/photos?albumId={id_albumu}


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
node z5.js [usrId] [albumId]
# np.: node z5.js
# lub
# node z5.js 1 3
```

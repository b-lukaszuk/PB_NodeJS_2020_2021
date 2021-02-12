# Zadania

## Zadanie 4 [5 punktów]

Napisz aplikację która odczyta z pliku `data.json` liczbę oraz nazwę pliku, a następnie:
- pobierze z API (http://numbersapi.com/{numer}) informacje o danej liczbie 
- zapisze pobrane informacje w pliku o pobranej wcześniej nazwie

Przykład pliku: data.json
```JSON
{
    "number": "588",
    "filename": "file.jaon"
}
```

Pamiętaj o obsłudze błędów. Żądania do API oraz zapis do pliku wykonuj asynchronicznie.

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
node z4.js
```

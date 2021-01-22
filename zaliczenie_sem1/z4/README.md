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

## Uruchomienie programu

```bash
node z4.js
```

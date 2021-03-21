---

# Spis tresci

1. [Zadania](#zadania-do-wykonania-we-wlasnym-zakresie)
   + [Task 6](#task-6)
   + [Task 7](#task-7)
   + [Task 8](#task-8)
   + [Task 9](#task-9)
   + [Task 10](#task-10)
2. Postman(#postman)
   + [Instalacja i pierwsze uruchomienie](#instalacja-i-pierwsze-uruchomienie)
   + [Kolejne uruchomienie](#kolejne-uruchomienie)

---

# Zadania do wykonania we własnym zakresie

## Task 6

Stwórzmy aplikację która pobiera 2 parametry `a` i `b` z adresu url i wykona mnożenie w naszej aplikacji. Rezultat działania powinniśmy wysłać do użytkownika końcowego(klienta). 

```
http://localhost:4700?a=5&b=2 //wywołanie
10 //rezultat
```
## Task 7

Rozszerzmy naszą aplikację z zadania 6 o dodatkowe działania matematyczne takie jak mnożenie, dzielenie i odejmowanie. Podzielmy zadania na odpowiednie ścieżki.

```
/mnozenie...
/dzielenie...
/dodawanie...
/odejmowanie...
```

Gdy działanie jest niemożliwe do wykonania, aplikacja zwraca odpowiedni komunikat oraz kod statusu `Bad Request`

## Task 8

Napiszmy aplikacja która zwróci wszystkie parametry podane w url. Zwracany rezultat powinien być obiektem i mieć `'Content-type':'application/json'`

```
http://localhost:4700?a=5&b=2 //wywołanie
{'a':'1','b':'2'} //rezultat
http://localhost:4700?name=jan&lastname=kowalski //wywołanie
{'name':'jan','lastname':'kowalski'} //rezultat
```

## Task 9

Stwórzmy aplikację której zadaniem będzie operacja na tablicy zawierającej użytkowników

- stworzyć ścieżkę `/add` do dodawania użytkownika która przyjmuje parametry `name`, `username`, `email` np `?name=Jan&username=janko&email=jan@nowak.abc`, dodanie użytkownika powinno zadziałać tyko wtedy gdy zostało wysłane żądanie typu `POST`, jako rezultat należy zwrócić identyfikator dodanego użytkownika (sposób przydzielania identyfikatorów dowolny)
- dodać ścieżkę `/show` do wyświetlania wszystkich użytkowników (gdy żądanie będzie typu `GET`)
- rozbudować ścieżkę `/show` tak by wyświetlała jedynie wybranego użytkownika, jeżeli zostanie podany odpowiedni `id` (`/show?id=1`) oraz żądanie będzie typu `GET`, gdy nie ma użytkownika o danym id zwracamy odpowiedni kod statusu
- rozszerzyć aplikację o kasowanie użytkownika poprzez ścieżkę `/delete?id=1`, gdy nie ma użytkownika o danym id zwracamy odpowiedni kod statusu

## Task 10

Do wykonanych zadań przygotujmy kolekcję żądań w postmanie tak by móc sprawdzić wszystkie obsługiwane ścieżki

# Postman

## Instalacja i pierwsze uruchomienie

1. Pobrac Postmana z oficjalnej stronki, tj. https://www.postman.com 
2. Przejsc do folderu z pobranym Postmanem -> PPM na *.tar.gz i wypakuj tutaj
3. Po wypakowaniu wejsc do folderu Postman i z basha wpisac:

```bash
./Postman
```
4. Po odpaleniu GUI nie logowac sie, nie tworzyc darmowego konta
5. Przejsc dalej (malo widoczny napis u dolu pod logowaniem)
6. Voila mozna uzywac

## Kolejne uruchomienie

1. Wejsc do folderu Postman i z basha wpisac:

```bash
./Postman
```
2. Voila mozna uzywac

Prawdopodobnie nie trzeba bedzie przechodzic przez punkty 4 i 5 z instalacji

---

# Spis tresci

1. [Task 7](#task-7)
2. [Przypomninie](#przypomninie)
   + [Sposob tworzenia nowego projektu](#sposob-tworzenia-nowego-projektu)
   + [Przed pierwszym uruchomieniem](#przed-pierwszym-uruchomieniem)
   + [Uruchomienie programu](#uruchomienie-programu)
3. Postman(#postman)
   + [Instalacja i pierwsze uruchomienie](#instalacja-i-pierwsze-uruchomienie)
   + [Kolejne uruchomienie](#kolejne-uruchomienie)

---

# Task 7

Rozszerzmy naszą aplikację z zadania 6 o dodatkowe działania matematyczne takie jak mnożenie, dzielenie i odejmowanie. Podzielmy zadania na odpowiednie ścieżki.

> /mnozenie...
> /dzielenie...
> /dodawanie...
> /odejmowanie...

Gdy działanie jest niemożliwe do wykonania, aplikacja zwraca odpowiedni komunikat oraz kod statusu `Bad Request`


# Przypomninie

## Sposob tworzenia nowego projektu

```bash
npm init # tworzenie pliku package.json
npm i --save-dev http # dodanie modulu
# (updeateuje package.json i pakgage-lock.json)
```

## Przed pierwszym uruchomieniem

Po pobraniu z github-a


```bash
npm install # instaluje potrzebne zaleznosci
```

## Uruchomienie programu

```bash
node main.js # uruchomienie progamu
```

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

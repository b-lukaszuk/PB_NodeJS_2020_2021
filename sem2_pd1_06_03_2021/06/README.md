---

# Spis tresci

1. [Task 6](#task-6)
2. [Przypomninie](#przypomninie)
   + [Sposob tworzenia nowego projektu](#sposob-tworzenia-nowego-projektu)
   + [Przed pierwszym uruchomieniem](#przed-pierwszym-uruchomieniem)
   + [Uruchomienie programu](#uruchomienie-programu)
3. Postman(#postman)
   + [Instalacja i pierwsze uruchomienie](#instalacja-i-pierwsze-uruchomienie)
   + [Kolejne uruchomienie](#kolejne-uruchomienie)

---

# Task 6

Stwórzmy aplikację która pobiera 2 parametry `a` i `b` z adresu url i wykona mnożenie w naszej aplikacji. Rezultat działania powinniśmy wysłać do użytkownika końcowego(klienta). 

> http://localhost:4700?a=5&b=2 //wywołanie
> 10 //rezultat


# Przypomninie

## Sposob tworzenia nowego projektu

```bash
npm init # tworzenie pliku package.json
npm i --save-dev @types/node # dodanie modulu
# (updeateuje package.json i pakgage-lock.json)
tsc --init # tworzy plik tsconfig.json
```

## Przed pierwszym uruchomieniem

Po pobraniu z github-a


```bash
npm install # instaluje potrzebne zaleznosci
```

## Uruchomienie programu

```bash
tsc # transpilacja plikow *.ts do JS-a
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

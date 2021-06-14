## Zasady zaliczenia przedmiotu

Ostateczny termin zaliczenia: 19-20.06.2021 (ostatni zjazd)

Sposób zaliczenia:
- przygotowujesz implementacje wybranych przez siebie funkcji
- przesyłasz mi rozwiązania poprzez email, teams, slack (sugeruje nie umieszczać ich w publicznym repozytorium :) )
- omawiamy przygotowane rozwiązanie poprzez Teams:
    - umawiamy się indywidualnie na dogodny termin
    - w czasie ostatniego zjazdu 19-20.06.2021

Skala ocen:
- 0-6 pkt => 2
- 7-9 pkt => 3
- 10-12 pkt => 3.5
- 13-16 pkt => 4
- 17-20 pkt => 4.5
- 21 i więcej pkt => 5

### **Uwagi**
1. Możesz użyć dowolnej wersji Node.js >= 12.
2. Możesz użyć dowolnego modułu `npm`
3. Rozwiązanie powinno zawierać:
    - pliki z kodem źródłowym
    - plik package.json
    - plik package-lock.json
    - plik sample.env

## Cel biznesowy

Celem projektu jest stworzenie aplikacji pozwalającej na zarządzanie ogłoszeniami online - prosta tablica ogłoszeń.

Każde ogłoszenie ma:
- tytuł
- opis
- autora
- kategorię
- tagi (wiele tagów)
- cenę
- ... (miejsce na Twoje pomysły, najlepsze będą punktowane dodatkowo)

Interfejs graficzny nie jest potrzebny. Funkcjonalność będzie sprawdzona przy pomocy Postmana. Warto zwrócić uwagę na obsługę błędów, nazewnictwo endpointów, obsługę metod HTTP oraz zwracanych kodów odpowiedzi HTTP.

Lista funkcji:

1. [1 punkt] Port z którego korzysta aplikacja powinien być ustawiany za pomocą zmiennych środowiskowych

```bash
npm run start # default port (read from ./environmentalVariables/sample.env file)
# or
PORT=9999 npm run start # port from env variable
```

2. [1 punkt] Aplikacja na żądania wysłane pod adres `/heartbeat` odpowiada zwracając aktualną datę i godzinę

```bash
echo `curl --location --request GET 'http://localhost:4700/heartbeat'`
```

3. [1 punkt] Aplikacja umożliwia dodawanie ogłoszenia

```bash
echo `curl --location --request POST 'http://localhost:4700/api/adds/addNew' \
--header 'Content-Type: application/json' \
--data-raw '{
        "category": "zabawka",
        "description": "test test",
        "author": "ala",
        "tags": ["test"],
        "price": 333,
        "title": "zabawka"
}'`
```

4. [2 punkty] Aplikacja umożliwia zwracanie wszystkich ogłoszeń oraz pojedynczego ogłoszenia

```bash
echo `curl --location --request GET 'http://localhost:4700/api/adds'`
# or
echo `curl --location --request GET 'http://localhost:4700/api/adds/1'`
# or
echo `curl --location --request GET 'http://localhost:4700/api/adds/999'`
```

5. [1 punkt] Aplikacja umożliwia usuwanie wybranego ogłoszenia

```bash
# single add (if user is the author)
echo `curl --location --request DELETE 'http://localhost:4700/api/adds/2' \
--header 'Password: 1234' \
--header 'User: ala'`

# all adds (only admin)
echo `curl --location --request DELETE 'http://localhost:4700/api/adds' \
--header 'Password: 1234' \
--header 'User: admin'`
```

6. [1 punkt] Aplikacja umożliwia modyfikowanie wybranego ogłoszenia

```bash
# if user is the author
echo `curl --location --request PATCH 'http://localhost:4700/api/adds/1' \
--header 'Password: 1234' \
--header 'User: adam' \
--header 'Content-Type: application/json' \
--data-raw '{
        "description": "double modified add"
}'`

# admin can do it at will
echo `curl --location --request PATCH 'http://localhost:4700/api/adds/1' \
--header 'Password: 1234' \
--header 'User: admin' \
--header 'Content-Type: application/json' \
--data-raw '{
        "description": "double modified add"
}'`
```

7. [1 punkt za każde kryterium wyszukiwania] Aplikacja pozwala na wyszukiwanie ogłoszeń według różnych kryteriów (tytuł, opis, zakres data, zakres ceny itp).

```bash
# simple querries like:
echo `curl --location --request GET 'http://localhost:4700/api/adds?id=0'`
# or
echo `curl --location --request GET 'http://localhost:4700/api/adds?title=wozek'`
# or
echo `curl --location --request GET 'http://localhost:4700/api/adds?description=test'`
# or
echo `curl --location --request GET 'http://localhost:4700/api/adds?category=test'`
# or
echo `curl --location --request GET 'http://localhost:4700/api/adds?tags=igla'`
# or
echo `curl --location --request GET 'http://localhost:4700/api/adds?price=300&price=900'`
```

8. [8 punktów] Aplikacja zapisuje ogłoszenia w bazie danych lub plikach

```bash
# see pseudoDB (so file)
cat addsDb/adds.json
```

9. [2 punkty] Usuwanie i modyfikowanie ogłoszeń jest zabezpieczone hasłem (np. middleware weryfikujące hasło), przy braku dostępu zwracany jest stosowny komunikat i kod odpowiedzi HTTP

```bash
# see point 5 and 6 above
# see middleware in ./routes/api/adds.js
```

10. [4 punkty] Aplikacja ma 3 zdefiniowanych na stałe użytkowników, każdy z nich może usuwać i modyfikować tylko te ogłoszenia które sam dodał, przy braku dostępu zwracany jest stosowny komunikat i kod odpowiedzi HTTP

```bash
# see point 5 and 6 above
# see users in ./routes/api/adds.js
```

11. [3 punkty] Aplikacja po uruchomieniu z parametrem (np `debug`) zapisuje w pliku czas odebrania żądania, metodę HTTP oraz adres na który przyszło żądanie

```bash
npm run start debug # i teraz nalezy uzywac normalnie
# or
npm run dev debug # i teraz nalezy uzywac normalnie
# see ./logs/
```

12. [2 punkty] Aplikacja po odebraniu żądania do adresu który nie istnieje powinna zwracać statyczny obrazek zamiast domyślnej strony błędu 404

> wystarczy wpisac, np. localhost:4700/xyz

13. [2 punkty] W przypadku wystąpienia błędów aplikacji, szczegóły błędu zapisywane są w console.log a użytkownik dostaje stosowny komunikat i kod odpowiedzi HTTP

> wystarczy wpisac, np. localhost:4700/error

14. [+15% do już uzyskanych punktów] Aplikacja jest udokumentowana za pomocą Postmana - kolekcja zawierająca przykłady żądań do wszystkich przygotowanych funkcji

```bash
# srodowisko wyeksportowane z Postmana
cat ./exportsFromPostman/nodeJSzalSem2.postman_environment.json
# przyklady zadan wyeksportowane z Postmana
cat ./exportsFromPostman/zalSem2NodeJS.postman_collection.json
```

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
npm run dev # default port (read from sample.env file)
# or
PORT=9999 npm run dev # port from env variable
```

2. [1 punkt] Aplikacja na żądania wysłane pod adres `/heartbeat` odpowiada zwracając aktualną datę i godzinę

```bash
echo `curl --location --request GET http://localhost:4700/heartbeat`
```

3. [1 punkt] Aplikacja umożliwia dodawanie ogłoszenia

```bash
echo `curl --location --request POST 'http://localhost:4700/api/adds/add' \
--header 'Content-Type: application/json' \
--data-raw '{
        "title": "test1",
        "description": "test test",
        "author": "test test",
        "category": "test",
        "tags": [
            "test",
            "silnik igla"
        ],
        "price": 3
}'`
```

4. [2 punkty] Aplikacja umożliwia zwracanie wszystkich ogłoszeń oraz pojedynczego ogłoszenia

```bash
echo `curl --location --request GET 'http://localhost:4700/api/adds'` # displays all adds
# or
echo `curl --location --request GET 'http://localhost:4700/api/adds/0'` # displays choosen add
# or
echo `curl --location --request GET 'http://localhost:4700/api/adds?id=0'` # displays choosen add
```

5. [1 punkt] Aplikacja umożliwia usuwanie wybranego ogłoszenia

```bash
echo `curl --location --request DELETE 'http://localhost:4700/api/adds'` # deletes all adds
# or
echo `curl --location --request DELETE 'http://localhost:4700/api/adds/2'` # deltes choosen add
```

6. [1 punkt] Aplikacja umożliwia modyfikowanie wybranego ogłoszenia

```bash
echo `curl --location --request PATCH 'http://localhost:4700/api/adds/1' \
--header 'Content-Type: application/json' \
--data-raw '{
        "author": "madka polka",
        "price": 3
}'`
```

7. [1 punkt za każde kryterium wyszukiwania] Aplikacja pozwala na wyszukiwanie ogłoszeń według różnych kryteriów (tytuł, opis, zakres data, zakres ceny itp).

```bash
# simple (single) querries like:
echo `curl --location --request GET 'http://localhost:4700/api/adds?title=sprzedam'`
# or
echo `curl --location --request GET 'http://localhost:4700/api/adds?description=tanio'`
# or
echo `curl --location --request GET 'http://localhost:4700/api/adds?category=dzieciecy'`
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

10. [4 punkty] Aplikacja ma 3 zdefiniowanych na stałe użytkowników, każdy z nich może usuwać i modyfikować tylko te ogłoszenia które sam dodał, przy braku dostępu zwracany jest stosowny komunikat i kod odpowiedzi HTTP

11. [3 punkty] Aplikacja po uruchomieniu z parametrem (np `debug`) zapisuje w pliku czas odebrania żądania, metodę HTTP oraz adres na który przyszło żądanie

12. [2 punkty] Aplikacja po odebraniu żądania do adresu który nie istnieje powinna zwracać statyczny obrazek zamiast domyślnej strony błędu 404

13. [2 punkty] W przypadku wystąpienia błędów aplikacji, szczegóły błędu zapisywane są w console.log a użytkownik dostaje stosowny komunikat i kod odpowiedzi HTTP

14. [+15% do już uzyskanych punktów] Aplikacja jest udokumentowana za pomocą Postmana - kolekcja zawierająca przykłady żądań do wszystkich przygotowanych funkcji

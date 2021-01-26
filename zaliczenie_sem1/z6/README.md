# Zadania

## Zadanie 6 [10 punktów]

Napisz aplikację pozwalającą na przechowywanie w pliku listy zadań do wykonania (klasyczna lista TODO). Użyj w tym celu biblioteki `yargs` z konstrukcją `command`. Aplikacja powinna pozwalać na dodanie do listy nowego zadania, jak również wyświetlić zawartość całej listy. Przy uruchomieniu bez parametrów aplikacja powinna informować o możliwych parametrach wywołania.

- zapis/odczyt wykonuj asynchronicznie
- pamiętaj o obsłudze błędów
- poinformuj użytkownika o poprawności wykonanych operacji
- wydziel odczyt i zapis informacji do osobnych modułów


Przykład wywołania programu:
```bash
> node app.js dodaj "napisac program na zaliczenie z NodeJS"
```

```bash
> node app.js lista
```
## Uruchomienie programu

```bash
node z6.js # wyswietla opcje (informuje o braku podania co najmniej 1 args-a)
node z6.js -h # wyswietla opcje
node z6.js display # skrot: node z6.js d, wyswietla liste todosow
node z6.js add "umyc zeby" # skrot: node z6.js a "xxx", wyswietla dodaje todos-a
node z6.js remove 0 # skrot: node z6.js r 0, usuwa todos-a o danym id
node z6.js togStatus 0 # skrot: node z6.js t 0, zmienia status todos-a o danym id
```

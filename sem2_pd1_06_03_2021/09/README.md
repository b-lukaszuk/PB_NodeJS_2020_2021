# Zadania do wykonania we własnym zakresie

## Task 9

Stwórzmy aplikację której zadaniem będzie operacja na tablicy zawierającej użytkowników
- stworzyć ścieżkę `/add` do dodawania użytkownika która przyjmuje parametry `name`, `username`, `email` np `?name=Jan&username=janko&email=jan@nowak.abc`, dodanie użytkownika powinno zadziałać tyko wtedy gdy zostało wysłane żądanie typu `POST`, jako rezultat należy zwrócić identyfikator dodanego użytkownika (sposób przydzielania identyfikatorów dowolny)
- dodać ścieżkę `/show` do wyświetlania wszystkich użytkowników (gdy żądanie będzie typu `GET`)
- rozbudować ścieżkę `/show` tak by wyświetlała jedynie wybranego użytkownika, jeżeli zostanie podany odpowiedni `id` (`/show?id=1`) oraz żądanie będzie typu `GET`, gdy nie ma użytkownika o danym id zwracamy odpowiedni kod statusu
- rozszerzyć aplikację o kasowanie użytkownika poprzez ścieżkę `/delete?id=1`, gdy nie ma użytkownika o danym id zwracamy odpowiedni kod statusu

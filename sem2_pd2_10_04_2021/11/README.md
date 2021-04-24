## Zadania do wykonania na laboratorium

11. Napiszmy aplikację która zwraca dane użytkownika pobrane z adresu `https://jsonplaceholder.typicode.com/users/{userId}`. UserId niech będzie pobierane  adresu naszego endpointu (np `http//localhost:4700/users/:userId`). W przypadku braku użytkownika lub problemów w komunikacji z serwerem rzućmy wyjątek, który zostanie obsłużony w middleware. Middleware powinno zapisać do pliku czas wystąpienia wyjątku i zwrócić odpowiedź ze stosownym komunikatem.


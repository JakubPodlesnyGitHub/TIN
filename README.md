# TIN
# OLD
Internet technologies
# Cinema Managment System 
## Relational Model
![MMP0-2022-01-22_12-01](https://github.com/JakubPodlesnyGitHub/TIN/assets/81695419/38a743f2-660e-4aa0-89ec-e27dfca11f57)
# [Backend + FRONT(DIFFERENT VERSION THAN REACT)](MP2) - Node.JS, Sequlize, Js, JWT
## Instructions:
- Run docker compose
- Create db with name: "tinProject_s20540"
- npm audit fix or npm audit fix --force in case of any sec and updates issues
- npm run start
# [Frontend](MP3) - React
## Instructions:
- npm audit fix or npm audit fix --force in case of any sec and updates issues
- npm run start
___
___
# Dokumentacja Projektowa
## Wymagania funkcjonalne
1.	(Klient, Admin) Wyświetlanie zwartości i szczegółów danego zamówienia
2.	(Klient, Admin) Edycja zamówienia
3.	(Klient, Admin) Usuwanie zmówienia
4.	(Klient, Admin) Dodanie produktu do zamówienia
5.	(Klient, Admin) Usunięcie produktu z zamówienia 
6.	(Klient, Admin) Dodanie produktu do zamówienia
7.	(Klient, Admin) Edycja produktu w zamówieniu 
8.	(Klient, Admin) Dołączenie do grupy
9.	(Klient, Admin) Utworzenie grupy
10.	(Klient - właściciel grupy, Admin) Usuniecie kogoś z grupy wraz z możliwością usunięcia całej grupy
11.	(Klient- właściciel grupy, Admin) Edycja grupy 
12.	(Klient, Admin) Wyświetlanie dostępnych grup
13.	(Klient, Admin) Wyświetlanie grup do których klient przynależy
14.	(Admin)Tworzenie filmów
15.	(Admin) Edycja filmów
16.	(Admin) Usuwanie filmów
17.	(Admin) Usuwanie kont
18.	(Admin) Wyświetlanie wszystkich użytkowników
19.	(Klient, Admin) Logowanie się
20.	(Klient, Admin) Zmiana tłumaczenia strony
## Wymagania niefunkcjonalne
### Wymaganie/Ograniczanie	Opis/Miara
- Wydajność	Aplikacja powinna spełniać wypisane poniżej wymagania przy obciążeniu 500 użytkowników: 
• Ładownie Strony 38 
• Pozytywny Wynik: poniżej 3 sekund 
• Średni Wynik: 4- 5 sekundy 
• Negatywny Wynik: powyżej 6 sekund
- Trwałość danych	Zapisywanie danych odbywa się w NOSQL bazie danych 
• Wskazane jest użycie serwera  Mongo Db Express 
• Wymagane jest, aby kopie zapasowe serwera były składowane w innym miejscu niż serwer 
• Zalecane jest, aby serwer aplikacyjny dział na niezależnej maszynie niż serwer bazodanowy. Jeśli nie jest to możliwe to zalecane jest, aby baza danych znajdowała się na oddzielnej macierzy dyskowej
- Użytkownie aplikacji	Funkcjonalności oraz interfejs graficzny (GUI) systemu/aplikacji powinny być takie same niezależnie od rodzaju systemu oraz przeglądarki. Zalecane jest, aby użytkownicy korzystający z naszego systemu/aplikacji na komputerach 39 lub urządzeniach mobilnych korzystali z niżej wymienionych przeglądarek: • Safari (wersja 15.3 i wyższa) • Chrome (wersja 100.0.4896.127 i wyższa) • FireFox (wersja 99.0.1 i wyższa) • Opera (wersja 85.0.4341.8 i wyższa)

## Diagram przypadków użycia
Poniżej znajduje się diagram przypadków użytkownika, który przedstawia najważniejsze wymagania funkcjonalne z perspektyw aktorów systemu – klienta oraz admina. Diagram został stworzony przy pomocy narzędzia zewnętrznego Lucidchart w wersji płatnej.
 ![image](https://github.com/JakubPodlesnyGitHub/TIN/assets/81695419/ceaab7f0-354e-44b6-900a-3f63b26c222b)

## Diagram klasowy
Poniżej został przedstawiony biznesowy diagram klas wykonany w UML. Przedstawia on najważniejsze klasy, asocjacje oraz ograniczenia z punktu widzenia projektu. Diagram został wykonany przy użycia oprogramowania Lucidchart w wersji PRO.
 ![image](https://github.com/JakubPodlesnyGitHub/TIN/assets/81695419/549047c3-e4a1-41fb-b4bb-985c24dff532)

## Model relacyjny
Na poniższym diagramie został ukazany  model pojęciowy encja – związek, który został wykorzystany w podejściu relacyjnym. Należy rozróżnić również, że model relacyjny oferuje mniej dostępnych pojęć od diagramu klas (obiektowego), w następstwie tego nie można bezpośrednio pokazać struktury obiektowej na diagramie relacyjnym. Diagram został wykonany przy pomocy narzędzia CASE - Vertabelo.
 ![image](https://github.com/JakubPodlesnyGitHub/TIN/assets/81695419/e5255749-5656-4407-b4a7-524039f4e557)

## Technologia
### Backend
### Architektura
  ![image](https://github.com/JakubPodlesnyGitHub/TIN/assets/81695419/d6494765-d736-4f86-875c-f559f220eca8)

W projekcie zostały wydzielone odpowiednie pod foldery, w celu zapewnienia spójności oraz odpowiedniemu podzieleniu złożoności projektu oraz funkcjonalności.
•	Folder api – warstwa odpowiedzialna za logikę poboru danych z bazy przy pomocy repozytoriów oraz wstępną walidację
•	Folder config – zawiera plik konfiguracyjny narzędzia Sequlize oraz pliki z seedem danych
•	Folder controllers – zawiera kontrolery (ang. Endpointy), czyli zestaw metod odpowiedzialnych za przetwarzanie żądań 
•	Folder docker – zaweria plik docker-compose
•	Folder locales – zawiera pliki z słownikami w odpowiednich językach
•	Folder public – zawiera pliki js, css, oraz zasoby 
•	Folder model – zawiera modele biznesowe systemu
•	Folder repository – zawiera repozytoria wykonujące podstawowe akcje na bazie danych (CRUD)
•	Folder  routes – mapuje odpowiednie url-e na poszczególne kontrolery oraz metody
### Baza danych
Baza danych została utworzona za pomocą ORM (Object-Relational Mapping) „Sequlize” dla Node.js, który umożliwia łatwe zarządzanie bazami danych SQL, takimi jak MySQL, PostgreSQL, SQLite i MSSQL. Pozwala na definiowanie SModeli danych w JavaScript, a następnie automatyczne mapowanie ich na tabele w bazie danych, co ułatwia tworzenie i utrzymywanie struktury bazy. Sequelize wspiera zaawansowane funkcje, takie jak walidacje, asocjacje między modelami, migracje i transakcje. Dzięki temu programiści mogą pracować z bazami danych w sposób bardziej zorganizowany i mniej podatny na błędy, wykorzystując znajomość języka JavaScript. W projekcie znajdują się modele w folderze Models, które później zamieniane na encje bazodanowe. Pliki konfiguracyjny wraz z seedowaniem danych znajdują się w folderze config/sequelize. Plik konfiguracyjny zawiera nazwę bazy do której ma się łączyć, hasło oraz login do bazy, a także dialekt języka. 
 ![image](https://github.com/JakubPodlesnyGitHub/TIN/assets/81695419/8bed63c0-1a87-446c-9cc4-11f50982da7d)

### Docker
Serwer bazodanowy oraz klient bazodanowy jest uruchamiany za pomocą Dockera, który jest narzędziem do tworzenia, zarządzania i uruchamiania aplikacji w kontenerach. Kontenery umożliwiają izolację aplikacji i ich zależności, co sprawia, że aplikacje stają się przenośne i łatwe do wdrożenia na różnych środowiskach. Plik wykonawczy docker-compose jest w folderze docker.
 ![image](https://github.com/JakubPodlesnyGitHub/TIN/assets/81695419/cbc4e4ca-d435-4a06-9d82-b2721f8617ae)

### Internacjonalizacja
Projekt umożliwia przełączanie się pomiędzy trzema wybranymi językami; Polski, Angielski, Niemiecki. W celu umożliwienia zmiany języka aplikacji została wykorzystana biblioteka i18n, która wspiera aplikacje Node.js i powinien współpracować z dowolnym frameworkiem (takim jak Express, restify i prawdopodobnie więcej), który udostępnia metodę app.use() przekazującą obiekty res i req. Używa typowej składni __('...') w aplikacji i szablonach. Przechowuje pliki językowe w plikach json zgodnych z formatem json webtranslateit. Dodaje nowe ciągi na bieżąco, gdy są używane po raz pierwszy w aplikacji. Konfiguracja modułu znajduje się w app.js
 ![image](https://github.com/JakubPodlesnyGitHub/TIN/assets/81695419/2f873802-10d6-4954-96e1-61e50084046a)

W konfiguracji mi.in. jest wskazane jakie języki są wspierane, ścieżka w której zawarte są słowniki zawierające odpowiednie tłumaczenia.
 ![image](https://github.com/JakubPodlesnyGitHub/TIN/assets/81695419/c4d7f2e7-ec4b-45ea-99f2-89884a3626bc)

### Frontend
### Szablony
Aplikacja wykorzystuje pliki EJS (Embedded JavaScript) do generowania dynamicznych stron internetowych, łącząc w sobie HTML i kod JavaScript. Umożliwiają one osadzanie skryptów JavaScript bezpośrednio w kodzie HTML, co pozwala na tworzenie dynamicznych treści w odpowiedzi na dane wejściowe użytkownika. Dzięki swojej prostocie i elastyczności, EJS jest często wykorzystywany w aplikacjach opartych na Node.js. Pliki te posiadają rozszerzenie ".ejs" i są zazwyczaj renderowane za pomocą odpowiednich silników szablonów w czasie rzeczywistym. W projekcie widoki, które zawierają szablony dla stron znajdują się w folderze views. Podany folder dzieli się na pliki które są współdzielone przez każda stronę w aplikacji takie jak: footer, header, loginForm, validationErrors, natomiast podfolder Pages zawiera już konkretne szablony stron aplikacji.
 ![image](https://github.com/JakubPodlesnyGitHub/TIN/assets/81695419/1d8348cd-c59e-43ed-9443-bb9b4b4c01e4)

### Walidacja szablonów oraz formularzy
Walidacja wprowadzonych danych odbywa zarówno po stronie serwerowej jak i również w widokach. Po stronie frontowej zostały wykorzystany JavaScript, w którym zostały zaimplementowane odpowiednie funkcje sprawdzające poprawność danych.
 ![image](https://github.com/JakubPodlesnyGitHub/TIN/assets/81695419/1226662d-ed68-4696-9fd7-83bf9d9b91c2)

Walidacja jest podzielona per formularz na stronie. Dane są pobierane za pomocą getElementById(), a następnie przechodzą przez zdefiniowane warunki tak jak poniżej widoczne na zdjęciu.
 ![image](https://github.com/JakubPodlesnyGitHub/TIN/assets/81695419/00b2b58a-33a8-4bb1-91d1-ec69583c0757)


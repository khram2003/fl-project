# Язык M
Был разработан парсер и поддержка в среде разработки VSCode языка М.

## Распеределение обязанностей:
+ Владимир Туров:
  - Парсер
  - Доработка лексера
+ Никита Храмов:
  - Лексер
  - Расширение для VSCode
  - Разработка синтаксиса языка

## Парсер:
Написан на ```bison``` под ```C++```. Строит АСД по исходному коду. Использует токены созданные лексером. 


## Лексер:
+ Разбиение на токены с помощью утилиты ```flex``` для последующего парсинга

## Расширение:
+ Подсветка синтаксиса:
  - Ключевые слова
  - Операторы (встроенные и пользовательские)
  - Комментарии
  - Специальные символы
+ Диагностика и автодополнение:
  - Нахождение и подчеркивание строки, не содержащей ```;```
  - QuickFix: добавления в конец ```;```
+ Сниппеты:
  - Для конструкций объявления пользовательских операторов, отношений и унификаций.

## Сложности:
+ Составление синтаксиса:
  - Тяжело понять по абстракному синтаксиу, как язык должен выглядеть
+ Расширение:
  - Пришлось разобраться в TypeScript
+ Парсер:
  - Нумеризация вершин АСД. 
  - Тяжело отличить вызов функции от ее определения. 
  - Огромное дерево на выходе
  - Тяжело отлаживать вследствие огромного вывода

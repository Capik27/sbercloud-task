# Sbercloud task

1. Repo: https://github.com/Capik27/sbercloud-task
2. Gh-pages: https://capik27.github.io/sbercloud-task/#/

- маска телефона делалась руками, т.к. поведение с др. либ не нравилось (как выяснилось, поля должны быть заполнены в disabled состоянии, но я заморочился с onChange + onPaste)
- делал на бутстрапе. под конец увидел, что селект нативный, поэтому пришлось впилить компонент из mui
- если зайти сразу на роут /create, то произойдёт редирект на мейн, т.к. те поля не запомнились
- если ввести несуществующий роут перекинет на компонент Error
- на последнем шаге при отправке накладывается disable на кнопки и textarea(кейс с табом из модалки)
- поведение в блоке about: при снятии фокуса происходит авторедактиврование - трим + убираются длинные пробелы из всей строки, при этом счетчик работает по этому же фильтру

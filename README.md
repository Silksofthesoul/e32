# e32
e32
## Description
A project where I explored the interaction between JavaScript and Rust.
Here you can see a very simple interface, the ability to upload an image, and try out different dithering and pixelation settings, as well as several color palettes.

## Самостоятельный запуск

Скачайте ZIP репозитория и распакуйте его либо клонируйте Git. Это обычные HTML/CSS/JavaScript-файлы: старый сайт, Express, Astro и установка npm-зависимостей для запуска не нужны.

Из корня репозитория запустите любой статический HTTP-сервер. Например, если есть Docker:

```sh
docker run --rm -p 127.0.0.1:8080:80 -v "$PWD:/usr/share/nginx/html:ro" nginx:alpine
```

Откройте <http://localhost:8080/>. Сам Docker image нужно получить один раз; после этого работа не требует внешних сетевых запросов. Вместо Docker можно использовать уже установленный статический сервер, например `python3 -m http.server 8080 --bind 127.0.0.1`.

Не открывайте работу через `file://`: для ES modules, загрузки ресурсов и WASM используйте HTTP. Файлы можно разместить и во вложенном URL-каталоге, сохранив их папки и относительные пути.

### Как изучать

Начните с `index.html`: он показывает порядок подключения скриптов и стилей. Перейдите к указанным в нём JS/CSS-файлам и сохраните изменения; затем обновите страницу. Папки переносить или уплощать не требуется, сборки frontend здесь нет.

Авторское название и описание находятся в `Description.md`. Он поддерживает YAML frontmatter с `title` и Markdown-текстом ниже; без frontmatter первый H1 служит названием. Пустые поля на сайте не показываются.

### Зависимости и особенности

В репозитории уже есть готовые `png-processor/png_processor.js` и `.wasm`: Rust для запуска не нужен. Загрузка PNG и палитры работают в браузере. Rust-исходников и Cargo.toml в этом репозитории нет; пересборка WASM здесь не заявляется.

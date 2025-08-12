# ВЕБ ПРИЛОЖЕНИЕ YOLK

## стек

- client: React
- server: ExpressJs + JWT (в localStorage)
- docker для запуска

### Как запускать

Для продакшена

```bash
docker-compose up --build
```

Для разработки

```bash
docker-compose -f docker-compose.dev.yml up --build
```
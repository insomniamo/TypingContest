Данный проект находится в активной стадии разработки.

Проект представляет собой игру, в которой пользователю необходимо печатать текст в соответствии с выбранным режимом.
По итогам игры пользователю будут показаны количество допущенных им ошибок и скорость набора в словах в минуту.

Что было задумано и что было реализовано:
1. Текст плейсхолдера разделён на блоки слов, а слова — на блоки букв. ✅
2. Динамический перенос текста после второй строки для поддержания его на уровне глаз. ✅
3. Отображение пользователю информации о том, находится ли тест в фокусе. ✅
4. Разные режимы теста, а именно: заглавные буквы, пунктуация, игра на время, игра по количеству слов, игра по количеству предложений. ✅
5. Стилизация. ✅
6. Адаптивность. ✅
7. Вывод статистики по итогам игры. ✅
8. Подробный вывод статистики в виде графика по итогам игры. (Работа над этим ведётся❗)
9. Сделать код более чистым и читабельным. (Работа над этим ведётся❗)

https://typingcontest.vercel.app/

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

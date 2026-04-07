"use client";

import { Card } from "@/components/ui/card";

export default function PriceListFullPage() {
  return (
    <main className="pt-20 pb-12">
      <section className="py-12 bg-gradient-to-b from-brand-50 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4">
              Полный прайс
            </h1>
            <p className="text-lg text-muted-foreground">
              Актуальные цены на основные услуги BizReg.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-5 mb-8">
            <Card className="p-5">
              <h2 className="text-lg font-semibold mb-2">Регистрация ООО/ИП</h2>
              <p className="text-2xl font-semibold text-brand-600 mb-2">от 5 000 000 сум</p>
              <p className="text-sm text-muted-foreground">Подготовка документов и сопровождение регистрации.</p>
            </Card>

            <Card className="p-5">
              <h2 className="text-lg font-semibold mb-2">Бухгалтерское сопровождение</h2>
              <p className="text-2xl font-semibold text-brand-600 mb-2">от 2 500 000 сум</p>
              <p className="text-sm text-muted-foreground">Ежемесячный учет, отчеты и консультации по налогам.</p>
            </Card>
          </div>

          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-semibold mb-5 text-center">Юридический адрес</h2>
            <div className="grid md:grid-cols-3 gap-5">
              <Card className="p-5">
                <p className="text-sm text-muted-foreground mb-2">Старт</p>
                <p className="text-3xl font-semibold text-foreground mb-1">990 000</p>
                <p className="text-sm text-muted-foreground mb-4">сум/мес + НДС</p>
                <ul className="text-sm text-muted-foreground space-y-1.5">
                  <li>Кадастровый адрес для ООО / ИП</li>
                  <li>Регистрация в Didox и e-ijara</li>
                  <li>Соответствие требованиям законодательства</li>
                </ul>
              </Card>

              <Card className="p-5 border-brand-300 bg-brand-50/40">
                <p className="text-sm text-brand-700 mb-2">Стандарт</p>
                <p className="text-3xl font-semibold text-foreground mb-1">1 300 000</p>
                <p className="text-sm text-muted-foreground mb-4">сум/мес + НДС</p>
                <ul className="text-sm text-muted-foreground space-y-1.5">
                  <li>Все из пакета Старт</li>
                  <li>Выделенный представитель с 10:00 до 20:00</li>
                  <li>Приём и пересылка почты — до 10 отправлений/мес</li>
                </ul>
              </Card>

              <Card className="p-5">
                <p className="text-sm text-muted-foreground mb-2">Бизнес</p>
                <p className="text-3xl font-semibold text-foreground mb-1">2 600 000</p>
                <p className="text-sm text-muted-foreground mb-4">сум/мес без НДС</p>
                <ul className="text-sm text-muted-foreground space-y-1.5">
                  <li>Все из пакета Стандарт</li>
                  <li>Площадь 18 м² — для учёта по НДС</li>
                  <li>Подходит для фирм с НДС</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

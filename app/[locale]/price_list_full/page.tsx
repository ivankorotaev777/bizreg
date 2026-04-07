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
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-5">
            <Card className="p-5">
              <h2 className="text-lg font-semibold mb-2">Регистрация ООО/ИП</h2>
              <p className="text-2xl font-semibold text-brand-600 mb-2">от 5 000 000 сум</p>
              <p className="text-sm text-muted-foreground">Подготовка документов и сопровождение регистрации.</p>
            </Card>

            <Card className="p-5">
              <h2 className="text-lg font-semibold mb-2">Юридический адрес</h2>
              <p className="text-2xl font-semibold text-brand-600 mb-2">от 990 000 сум</p>
              <p className="text-sm text-muted-foreground">Оформление адреса для регистрации и работы компании.</p>
            </Card>

            <Card className="p-5">
              <h2 className="text-lg font-semibold mb-2">Бухгалтерское сопровождение</h2>
              <p className="text-2xl font-semibold text-brand-600 mb-2">от 2 500 000 сум</p>
              <p className="text-sm text-muted-foreground">Ежемесячный учет, отчеты и консультации по налогам.</p>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}

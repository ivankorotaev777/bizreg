"use client";

import { Card } from "@/components/ui/card";

export default function ClientsPage() {
  return (
    <main className="pt-20 pb-12">
      <section className="py-12 bg-gradient-to-b from-brand-50 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold mb-4">
              Наши клиенты
            </h1>
            <p className="text-lg text-muted-foreground">
              С кем мы уже работаем и для каких задач нас выбирают.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-5">
            <Card className="p-5">
              <h2 className="text-lg font-semibold mb-2">IT и стартапы</h2>
              <p className="text-sm text-muted-foreground">
                Регистрация компаний, юридический адрес и бухгалтерский учет на старте.
              </p>
            </Card>

            <Card className="p-5">
              <h2 className="text-lg font-semibold mb-2">Торговые компании</h2>
              <p className="text-sm text-muted-foreground">
                Поддержка по налогам, отчетности и сопровождение ежедневных операций.
              </p>
            </Card>

            <Card className="p-5">
              <h2 className="text-lg font-semibold mb-2">Сервисный бизнес</h2>
              <p className="text-sm text-muted-foreground">
                Ведение учета для агентств, консалтинга, образовательных и других услуг.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </main>
  );
}

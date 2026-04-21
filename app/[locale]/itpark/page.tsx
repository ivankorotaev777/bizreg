import type { Metadata } from "next";
import ItParkLandingClient from "./ItParkLandingClient";

export const metadata: Metadata = {
  title: "Открыть компанию в IT Park Узбекистан | Спецусловия BizReg",
  description:
    "Поможем открыть компанию в Узбекистане под IT Park: скидка на регистрацию, специальные условия на юридический адрес и сопровождение на старте.",
  openGraph: {
    title: "Открыть компанию в IT Park Узбекистан | Спецусловия BizReg",
    description:
      "Проверим, подходит ли ваш кейс под IT Park, и запустим регистрацию компании на выгодных условиях через BizReg.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function ItParkPage() {
  return <ItParkLandingClient />;
}

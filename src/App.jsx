import { useState } from "react";
import * as data from "./data/data.json";
import moment from "moment";
import israel from "./assets/israel.jpg";
import ArrowLeft from "./components/ArrowLeft";
import ArrowRight from "./components/ArrowRight";
import { Header } from "./components/Header";

const getFechaCobro = (fechaSearch) => {
    const dateCobrar = fechaSearch.endOf("month");
    let days = 0;

    while (days < 1) {
        if (dateCobrar.isoWeekday() < 6) {
            if (!data.feriados.includes(dateCobrar.format("YYYY-MM-DD"))) {
                days++;
            }
        }
        dateCobrar.subtract(1, "days");
    }
    return dateCobrar;
};

const getDias = (fechaCobro) => {
    const today = moment();
    const days = fechaCobro.diff(today, "days");
    return days;
};

const getText = (fechaCobro) => {
    const dFechaCobro = getFechaCobro(moment(fechaCobro, "YYYY-MM-DD"));
    const dias = getDias(dFechaCobro);
    let texto = "";
    let coma = "";
    if (dias === 0) {
        texto = "HOY COBRAS";
    } else {
        if (dias > 0) {
            texto = "FALTAN " + Math.abs(dias).toString() + " DIAS PARA COBRAR";
        } else {
            texto =
                "PASARON " +
                Math.abs(dias).toString() +
                " DIAS DESDE QUE COBRASTE";
        }
    }
    data.conceptos[dFechaCobro.format("MM")].map((concepto) => {
        texto = texto + coma + " " + concepto.toUpperCase();
        coma = ",";
    });
    texto = texto + " - " + dFechaCobro.format("DD/MM/YYYY");
    return texto;
};

export default function App() {
    const [fechaSearch, setFechaSearch] = useState(
        moment().startOf("month").format("YYYY-MM-DD")
    );

    const handleMonthPicker = (amount) => {
        const newDate = moment(fechaSearch, "YYYY-MM-DD");
        newDate.subtract(amount, "months");
        setFechaSearch(newDate.format("YYYY-MM-DD"));
    };

    return (
        <main className="h-screen w-full flex flex-col p-4 bg-[#A71B08]">
            <Header />
            <section className="w-full mb-auto py-10 grid">
                <div className="flex flex-row justify-between items-center">
                    <button
                        onClick={() => handleMonthPicker(1)}
                        className="hover:scale-150 hover:opacity-50 transition: all 0.3s ease-in-out"
                    >
                        <ArrowLeft />
                    </button>
                    <span className="text-3xl font-bold text-white">
                        {moment(fechaSearch, "YYYY-MM-DD").format("YYYY-MM")}
                    </span>
                    <button
                        onClick={() => handleMonthPicker(-1)}
                        className="hover:scale-150 hover:opacity-50 transition: all 0.3s ease-in-out"
                    >
                        <ArrowRight />
                    </button>
                </div>
                <div className="py-10 text-center text-wrap">
                    <span className="text-5xl font-extrabold font-Impact text-white antialiased tracking-widest text-shadow opacity-90">
                        {getText(fechaSearch)}
                    </span>
                </div>
            </section>
            <footer className="h-30 flex flex-col justify-normal items-center">
                <img src={israel} alt="Donate" height={10} />
                <span className="leading-[4rem]">
                    {new Date().getFullYear()} Josecito
                </span>
            </footer>
        </main>
    );
}

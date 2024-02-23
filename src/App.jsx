import { useState } from "react";
import * as data from "./data/data.json";
import moment from "moment";
import israel from "./assets/israel.jpg";

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
        console.log(moment(newDate, "YYYY-MM-DD").format("MM"));
    };

    return (
        <main className="h-screen w-full flex flex-col p-4 bg-red-600">
            <header className="h-10 flex items-start">
                <span className="text-2xl font-extrabold font-sans italic text-white">
                    CUANDO COBRAMOS
                </span>
            </header>
            <section className="w-full mb-auto py-10 grid">
                <div className="flex flex-row justify-between items-center">
                    <span
                        className="text-2xl hover:cursor-pointer hover:text-red-300"
                        onClick={() => handleMonthPicker(1)}
                    >
                        Anterior
                    </span>
                    <span className="text-3xl font-bold text-white">
                        {moment(fechaSearch, "YYYY-MM-DD").format("YYYY-MM")}
                    </span>
                    <span
                        className="text-2xl hover:cursor-pointer hover:text-red-300"
                        onClick={() => handleMonthPicker(-1)}
                    >
                        Siguiente
                    </span>
                </div>
                <div className="py-10 text-center text-wrap">
                    <span className="text-5xl font-extrabold font-sans text-white antialiased tracking-widest">
                        {getText(fechaSearch)}
                    </span>
                </div>
            </section>
            <footer className="h-30 text-center leading-[4rem] text-muted-foreground">
                <img src={israel} alt="Donate" height={10} />
                {new Date().getFullYear()} Josecito
            </footer>
        </main>
    );
}

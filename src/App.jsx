import { useState } from "react";
import * as data from "./data/data.json";
import moment from "moment";
import israel from "./assets/israel.jpg";

const getFechaCobro = (fechaSearch) => {
    const dateCobrar = moment(fechaSearch, "YYYY-MM-DD").endOf("month");
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
    if (days < 0) {
        return "Pasaron " + days.toString() + " dias";
    }
    if (days > 0) {
        return "Faltan " + days.toString() + " dias";
    }
    return `Es HOY`;
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
        <main className="container grid items-start min-h-screen grid-rows-[auto,1fr,auto] p-4 font-sans antialiased bg-gradient-to-br from-sky-500 to-indigo-500">
            <header className="flex justify-between items-center">
                <span className="text-3xl font-bold">Cuando Cobramos</span>
            </header>
            <section className="py-10 grid">
                <div className="flex flex-row justify-between items-center">
                    <span
                        className="text-2xl"
                        onClick={() => handleMonthPicker(1)}
                    >
                        Anterior
                    </span>
                    <span className="text-3xl font-bold text-white">
                        {moment(fechaSearch, "YYYY-MM-DD").format("YYYY-MM")}
                    </span>
                    <span
                        className="text-2xl"
                        onClick={() => handleMonthPicker(-1)}
                    >
                        Siguiente
                    </span>
                </div>
                <div className="py-10 text-3xl text-white text-center">
                    <h1>{getFechaCobro(fechaSearch).format("DD/MM/YYYY")}</h1>
                    <h3>{getDias(getFechaCobro(fechaSearch))}</h3>
                </div>
                <div className="py-10 text-3xl text-white text-center">
                    <ul>
                        {data.conceptos[
                            moment(fechaSearch, "YYYY-MM-DD").format("MM")
                        ].map((concepto, index) => {
                            return <li key={index}>{concepto}</li>;
                        })}
                    </ul>
                </div>
                <div className="transition-all">
                    <img src={israel} alt="Donate" />;
                </div>
            </section>
            <footer className="text-center leading-[4rem] text-muted-foreground">
                {new Date().getFullYear()} Josecito
            </footer>
        </main>
    );
}

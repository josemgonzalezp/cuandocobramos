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
        <main className="h-screen w-full flex flex-col items-center  p-4 bg-gradient-to-br from-sky-500 to-indigo-500">
            <header className="h-10 flex justify-between items-center">
                <span className="text-3xl font-bold">Cuando Cobramos</span>
            </header>
            <section className="w-full mb-auto py-10 grid">
                <div className="flex flex-row justify-between items-center">
                    <span
                        className="text-2xl hover:cursor-pointer hover:text-blue-800"
                        onClick={() => handleMonthPicker(1)}
                    >
                        Anterior
                    </span>
                    <span className="text-3xl font-bold text-white">
                        {moment(fechaSearch, "YYYY-MM-DD").format("YYYY-MM")}
                    </span>
                    <span
                        className="text-2xl hover:cursor-pointer hover:text-blue-800"
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
            </section>
            <footer className="h-30 text-center leading-[4rem] text-muted-foreground">
                <img src={israel} alt="Donate" height={10} />
                {new Date().getFullYear()} Josecito
            </footer>
        </main>
    );
}

import moment from "moment";

export const Header = () => {
    return (
        <header className="h-10 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold font-Impact italic text-white tracking-wide text-shadow">
                CUANDO COBRAMOS
            </span>
            <div className="flex flex-col w-40">
                <span className="text-xl font-Impact text-blue-600 bg-white rounded-sm text-center">
                    BCBA
                </span>
                <span className="text-xl font-Impact text-[#EAEDBB] text-center">
                    {moment().format("HH:mm")}
                </span>
            </div>
        </header>
    );
};

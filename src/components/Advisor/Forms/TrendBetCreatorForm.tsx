import { classMap } from "@/components/Tools/Misc"
import SendRequest from "@/components/Tools/SendRequest";
import { useState } from "react";

type FormData = {
    title: string;
    body: string;
    options: string[];
    correct: any
}

const TrendBetCreatorForm = () => {
    const optionsCount = 4;

    const [data, setData] = useState<FormData>({
        title: "",
        body: "",
        options: Array(optionsCount).fill(""),
        correct: '',
    });

    const fields = [
        {
            name: "title",
            label: "Title",
            type: "text"
        },
        {
            name: "body",
            label: "Question",
            type: "text"
        },
        {
            name: "option",
            label: "Options",
            type: "array",
            arrayValue: optionsCount
        },
        {
            name: "correct",
            label: "Correct Option",
            type: "dropdown",
            data: 4
        },
    ]

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name.startsWith("option-")) {
            const idx = Number(name.split("-")[1]);
            setData(prev => {
                const options = [...prev.options];
                options[idx] = value;
                return { ...prev, options };
            });
            return;
        }

        // for title/body
        setData(prev => ({ ...prev, [name as "title" | "body"]: value } as FormData));
    };

    return (
        <section className="flex flex-col">
            {fields.map((item, fi) => (
                <div key={fi}>
                    {item.type === 'text' && (
                        <div>
                            <label htmlFor={item.name}>{item.label}</label>
                            <input
                                className={`${classMap.input}`}
                                type="text"
                                name={item.name}
                                id={item.name}
                                required
                                value={(data as any)[item.name] ?? ""}
                                onChange={handleChange}
                            />
                        </div>
                    )}

                    {item.type === 'dropdown' && (
                        <div>
                            <label htmlFor={item.name}>{item.label}</label>
                            <select
                                className={`${classMap.input}`}
                                name={item.name}
                                id={item.name}
                                value={data.correct}
                                onChange={(e) => setData(prev => ({ ...prev, correct: Number(e.target.value) }))}
                            >
                                <option value="">Select correct option</option>
                                {data.options.map((option, idx) => (
                                    <option key={idx} value={idx}>
                                        {option || `Option ${idx + 1}`}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    {item.type === 'array' && (
                        <div className={`grid grid-cols-2 gap-2`}>
                            {[...Array(item.arrayValue)].map((_, idx) => {
                                const count = idx + 1;
                                const inputName = `${item.name}-${idx}`; // e.g. "option-0"
                                return (
                                    <div key={idx}>
                                        <label htmlFor={inputName}>{item.label} {count}</label>
                                        <input
                                            className={`${classMap.input}`}
                                            type="text"
                                            name={inputName}
                                            id={inputName}
                                            value={data.options[idx]}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            ))}
            <SendRequest
                url={`/trendbet/create`}
                data={data}
                text="Create Trend"
                method="post"
                onResponse={() => { }}
            />
            {/* <button onClick={() => console.log(data)}>Submit</button> */}
        </section>
    )
}

export default TrendBetCreatorForm
import { classMap } from "@/components/Tools/Misc"
import SendRequest from "@/components/Tools/SendRequest";
import { useState, useEffect } from "react";
import { ImageUploadDiv } from "../../Tools/Misc";
import { apiUrl } from "../../../App";
import { useUser } from "@/context/UserContext";

type FormData = {
    name: string;
    username: string;
    avatar?: string;
    role?: string;
    base_address?: string;
}

const EditProfile = () => {
    const { user } = useUser();
    const [data, setData] = useState<FormData>({
        name: "",
        username: "",
        avatar: "",
        role: "",
        base_address: "",
    });

    // Sync form with user data when user loads
    useEffect(() => {
        if (user) {
            setData({
                name: user.name || "",
                username: user.username || "",
                avatar: user.avatar || "",
                role: user.role || "",
                base_address: user.base_address || ""
            });
        }
    }, [user]);

    const fields = [
        { name: "name", label: "Name", type: "text" },
        { name: "username", label: "Username", type: "text" },
        { name: "base_address", label: "USDC Address", type: "text" },
    ] as const;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    return (
        <section className="flex flex-col">
            {fields.map((item) => (
                <div key={item.name}>
                    <label className={classMap.label()} htmlFor={item.name}>
                        {item.label}
                    </label>
                    <input
                        className={classMap.input()}
                        type={item.type}
                        name={item.name}
                        id={item.name}
                        required
                        value={data[item.name]}
                        onChange={handleChange}
                    />
                </div>
            ))}
            <SendRequest
                url="/api/profile"
                data={data}
                text="Edit Profile"
                method="post"
                className="mt-2"
            />
        </section>
    )
}

export default EditProfile

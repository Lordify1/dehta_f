import SendRequest from "@/components/Tools/SendRequest";
import axios from "axios";
import { useState } from "react";

const Test = () => {
  const [data, setData] = useState<any>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        setData(file);
        console.log(data)
        const res = await axios.post('/phi/public/test_cloudinary', data)
        console.log(data)
        console.log(res)
    }
  };

  return (
    <div className="p-4 max-w-md bg-gray-500 mx-auto">
      <label className="block mb-2 font-semibold text-gray-700">Upload Image</label>
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="border rounded p-2 w-full"
      />

      {data && (
        <div className="mt-4">
          <p className="text-sm text-gray-600">📄 File Selected:</p>
          <ul className="text-xs bg-gray-100 p-2 rounded">
            <li><strong>Name:</strong> {data.name}</li>
            <li><strong>Type:</strong> {data.type}</li>
            <li><strong>Size:</strong> {(data.size / 1024).toFixed(2)} KB</li>
          </ul>

          {/* 🔥 Preview the image */}
          {data.type.startsWith("image/") && (
            <img
              src={URL.createObjectURL(data)}
              alt="preview"
              className="mt-3 rounded shadow max-h-56 object-contain"
            />
          )}
        </div>
      )}

      <div className="block">
        <SendRequest
        url="/test_cloudinary"
        method="post"
        data={data}
        onResponse={() => {}}
        text="Test Cloudinary"
        />
      </div>
    </div>
  );
};

export default Test;
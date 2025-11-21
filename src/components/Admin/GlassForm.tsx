import React, { useEffect, useState } from "react";
import ImageUploader from "../Tools/ImageUploader";
import SendRequest from "../Tools/SendRequest";
import { cardClass, classMap, containerDiv, disabledClass, formClass, hoverClass, ImageUploadDiv, selectClass } from "../Tools/Misc";
import { Button, Select } from "antd";
import { appUrl } from "@/app";
import { FaTrashRestore } from "react-icons/fa";
import { IoTrashOutline } from "react-icons/io5";

const fields = [
  { name: "name", label: "Name", type: "text", model:"input",placeholder: "Glass name" },
  { name: "description", label: "Description", type: "text", model:"input",placeholder: "Glass description" },
  { name: "lens_cost", label: "Lens cost", type: "number", model:"input",placeholder: "Lens cost" },
  { name: "rarity", label: "Rarity", type: "text", model:"input",placeholder: "Common or Special" },
  { name: "icon", label: "Icon", type: "text", model:"input",placeholder: "Use emoji for now" },
];

export default function GlassForm({ onClose, onResponse, EditData  }) {
  const [linksArray, setLinksArray] = useState([]);
  const [imagePreview, setImagePreview] = useState([]);
  const [attPreview, setAttPreview] = useState([]);
  const [formData, setFormData] = useState({ 
    name: "",
    description: "",
    lens_cost: "",
    rarity: "",
    icon: "",
    slug: ""
  });

  const statusOptions = [
    { value: "draft", label: "Draft" },
    { value: "sent", label: "Send" },
    { value: "scheduled", label: "Schedule" },
  ];

  // console.log(formData)
  
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files : value,
    }));
  };



  useEffect(() => {
    if (EditData) {
      setFormData((prev) => ({
        ...prev,
        id: EditData?.id || "",
        name: EditData?.name || "",
        description: EditData?.description || "",
        lens_cost: EditData?.lens_cost || "",
        rarity: EditData?.rarity || "",
        icon: EditData?.icon || "",
        slug: EditData?.slug || ""
      }));
    }
  }, [EditData])

  return (
    <form className="space-y-4" encType="multipart/form-data">
      {fields.map(({ name, label, type, placeholder }) => (
        <div key={name} className="flex flex-col">
          <label htmlFor={name} className={`${classMap.label}`}>
            {label}
          </label>
          <input
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            value={formData[name] || ""}
            onChange={handleChange}
            className={`${classMap.input}`}
          />
        </div>
      ))}

      {/* <ImageUploader
        onChange={(e) => handleChange('founder', {...formData.founder, [item.key]: e})}
        uploadUrl={`${appUrl}/upload-file`}
        deleteUrl={`${appUrl}/delete-file`}
        path="/files/projects/founder/"
      /> */}

      <div className="pt-2 flex items-center gap-4">
        <SendRequest
          text="Save Glass"
          url="/admin/glass/save"
          data={formData}
          onResponse={() => {onResponse(true)}}
        />
        {!EditData && (
          <button
          type="button"
          onClick={() => {onClose, setFormData([])}}
          className="text-sm text-gray-400 hover:text-red-400 transition"
        >
          Cancel
        </button>
        )}
      </div>
    </form>
  );
}

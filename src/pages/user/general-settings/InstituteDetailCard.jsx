import { Button, Label, Modal, ModalBody, ModalFooter, ModalHeader, TextInput } from "flowbite-react";
import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";

// Modal Component
const CustomModal = ({ open, onClose, title, children, onSave }) => {
    return (
        <Modal show={open} onClose={onClose}>
            <ModalHeader>{title}</ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
                <Button size="xs" color="red" onClick={onClose}>
                    Cancel
                </Button>
                <Button size= 'xs' color={"purple"} onClick={onSave}>Save</Button>
            </ModalFooter>
        </Modal>
    );
};

// Section Component
const Section = ({ title, fields, data, onUpdate }) => {
    const [open, setOpen] = useState(false);
    const [formData, setFormData] = useState({});

    const handleEditClick = () => {
        const sectionData = {};
        fields.forEach((f) => {
            sectionData[f.key] = data[f.key] || "";
        });
        setFormData(sectionData);
        setOpen(true);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = () => {
        onUpdate(formData);
        console.log(formData);
        
        setOpen(false);
    };

    return (
        <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
                {title !== "Meta Info" && <Button size="xs" outline color={"purple"} className="cursor-pointer" onClick={handleEditClick}>
                    <FaPencilAlt className="mr-2" />
                    Edit
                </Button>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-white p-4 rounded-md shadow-sm border border-gray-100">
                {fields.map((field) => (
                    <div key={field.key}>
                        <Label htmlFor={field.key}>{field.label}</Label>
                        <p className="text-sm text-gray-800">{data[field.key] || "-"}</p>
                    </div>
                ))}
            </div>

            <CustomModal
                open={open}
                onClose={() => setOpen(false)}
                onSave={handleSubmit}
                title={`Edit ${title}`}
            >
                <form className="space-y-6 max-w-md mx-auto">
                    {fields.map((field) => (
                        <div key={field.key} className="flex flex-col">
                            <label
                                htmlFor={field.key}
                                className="mb-1 text-gray-700 font-semibold text-sm"
                            >
                                {field.label}
                            </label>
                            <input
                                id={field.key}
                                name={field.key}
                                value={formData[field.key]}
                                onChange={handleChange}
                                placeholder={`Enter ${field.label.toLowerCase()}`}
                                required
                                className="h-9
                                            px-3
                                            text-sm
                                            border
                                            border-gray-300
                                            rounded-md
                                            focus:outline-none
                                            focus:ring-1
                                            focus:ring-purple-500
                                            focus:border-purple-500
                                            transition
                                            duration-200
                                            ease-in-out"
                            />
                        </div>
                    ))}
                </form>


            </CustomModal>
        </div>
    );
};

// Main InstituteDetailsCard Component
const InstituteDetailsCard = ({ data }) => {
    const [instituteData, setInstituteData] = useState(data);

    const handleSectionUpdate = (updatedFields) => {
        setInstituteData((prev) => ({
            ...prev,
            ...updatedFields,
        }));
    };

    return (
        <div className="p-6 max-w-5xl mx-auto bg-white rounded-md shadow-md border border-gray-200 space-y-8">
            <Section
                title="General Information"
                data={instituteData}
                onUpdate={handleSectionUpdate}
                fields={[
                    { label: "School ID", key: "schoolId" },
                    { label: "School Name", key: "schoolName" },
                    { label: "School Code", key: "schoolCode" },
                    { label: "Description", key: "schoolDesc" },
                    { label: "Type", key: "schoolType" },
                    { label: "Board", key: "boardType" },
                    { label: "Levels", key: "levels" },
                    { label: "Established On", key: "establishedOn" },
                ]}
            />

            <Section
                title="Contact Details"
                data={instituteData}
                onUpdate={handleSectionUpdate}
                fields={[
                    { label: "Phone No.", key: "phoneNo" },
                    { label: "Alternate Phone No.", key: "alternatePhoneNo" },
                    { label: "Email", key: "emailId" },
                    { label: "Alternate Email", key: "alternateEmailId" },
                ]}
            />

            <Section
                title="Address"
                data={instituteData}
                onUpdate={handleSectionUpdate}
                fields={[
                    { label: "Address", key: "address" },
                    { label: "City", key: "city" },
                    { label: "State", key: "state" },
                    { label: "Pin Code", key: "pinCode" },
                    { label: "Country", key: "country" },
                ]}
            />

            <Section
                title="Academic Information"
                data={instituteData}
                onUpdate={handleSectionUpdate}
                fields={[
                    { label: "Academic Schedule", key: "academicSchedule" },
                    { label: "Admission Period", key: "admissionPeriod" },
                    { label: "Facilities", key: "facilities" },
                    { label: "Extra Curricular", key: "extraCurricular" },
                ]}
            />

            <Section
                title="Meta Info"
                data={instituteData}
                onUpdate={handleSectionUpdate}
                fields={[
                    { label: "Created By", key: "createdBy" },
                    { label: "Created On", key: "createdOn" },
                    { label: "Updated On", key: "updatedOn" },
                    { label: "Enabled", key: "enabled" },
                    { label: "Active", key: "active" },
                ]}
            />

            {instituteData.schoolLogo && (
                <div className="mt-6">
                    <h3 className="text-md font-semibold text-purple-700 mb-2">
                        School Logo
                    </h3>
                    <img
                        src={instituteData.schoolLogo}
                        alt="School Logo"
                        className="w-32 h-32 object-contain border rounded"
                    />
                </div>
            )}
        </div>
    );
};

export default InstituteDetailsCard;

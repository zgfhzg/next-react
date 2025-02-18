import React, {useEffect, useState} from 'react';

interface DialogProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: Record<string, any>) => void;
    title: string;
    elements: { type: string; name: string; placeholder?: string; title?: string; options?: string[]; className?: string }[];
}

const DynamicDialog: React.FC<DialogProps> = ({isOpen, onClose, onSubmit, title, elements}) => {
    const [formData, setFormData] = useState<Record<string, any>>({});

    useEffect(() => {
        const today = new Date().toISOString().substring(0, 10);
        setFormData((prevData) => ({
            ...prevData,
            date: today,
        }));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const {name, value} = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = () => {
        onSubmit(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="dialog-backdrop" onClick={onClose}>
            <div className="dialog-content" onClick={(e) => e.stopPropagation()}>
                <h2 id="dialogTitle">{title}</h2>
                <div id="dynamicContentDiv">
                    {elements.map((element) => {
                        switch (element.type) {
                            case 'text':
                            case 'number':
                                return (
                                    <input
                                        key={element.name}
                                        type={element.type}
                                        name={element.name}
                                        placeholder={element.placeholder}
                                        onChange={handleChange}
                                    />
                                );
                            case 'date':
                                return (
                                    <input
                                        key={element.name}
                                        type="date"
                                        name={element.name}
                                        className={element.className}
                                        value={formData[element.name] || ''}
                                        onChange={handleChange}
                                    />
                                )
                            case 'select':
                                return (
                                    <select key={element.name} name={element.name} onChange={handleChange}>
                                        {element.options?.map((option) => (
                                            <option key={option} value={option}>
                                                {option}
                                            </option>
                                        ))}
                                    </select>
                                );
                            case 'checkbox':
                                return (
                                    <div className="align-right" key={element.name}>
                                        {element.options?.map((option) => (
                                            <label key={option}><input type={element.type} name={element.name} value={option} onChange={handleChange}/>{option}</label>
                                        ))}
                                    </div>
                                )
                            default:
                                return null;
                        }
                    })}
                </div>
                <div className="btns">
                    <button onClick={onClose}>닫기</button>
                    <button onClick={handleSubmit} className="right">추가</button>
                </div>
            </div>
        </div>
    );
};

export default DynamicDialog;

import { useState }  from 'react';

export const useStateForm = (initialState) => {
    const [formState, setFormState] = useState(initialState);

    const onChange = (event) => {
        const { name, value } = event.target;
        setFormState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const resetForm = () => {
        setFormState(initialState);
    }

    return { formState, setFormState, onChange, resetForm};
}
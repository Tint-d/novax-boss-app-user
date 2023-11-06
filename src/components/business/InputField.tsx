import InputError from '../ui/Errors/InputError'
import { t } from 'i18next'
import { UseFormRegister } from 'react-hook-form'

interface InputFieldProps {
    type: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors: any,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: UseFormRegister<any>,
    register_name: string,
    label: string,
    placeholder?: string,
    disabled?: boolean,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    initialValue?: string | number | any
}

const InputField = ({ type, errors, register, register_name, label, placeholder, disabled, initialValue }: InputFieldProps) => {


    return (
        <>
            <h2 className=" text-[#A8B3CF] pb-2">{t(label)}</h2>
            <input
                className="bg-[#1C1F26] w-full p-2 outline-none border rounded text-white border-[#4e525a]"
                type={type}
                {...register(register_name)} disabled={disabled}
                defaultValue={initialValue}
                placeholder={t(placeholder!)}
                
            />
            <InputError errors={errors} />
        </>
    )
}

export default InputField
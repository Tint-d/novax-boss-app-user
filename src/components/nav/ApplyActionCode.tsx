import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import { CgProfile } from 'react-icons/cg';
import { t } from 'i18next';
import { Button } from '@mantine/core';
import { ToastContainer, toast } from "react-toastify";
import { useRef } from 'react';
import { useAppliedCodeMutation } from '@/redux/api/BusinessAddressApi';
import { addProfile } from '@/redux/services/businessSlice';
import { Profile } from '@/utils/Navbar';
import { useAppDispatch } from '@/redux/hook';
import { AiFillEdit } from 'react-icons/ai';

interface ApiResponse {
    data: {
        success: boolean;
        code: string[] | null ;
        message: string;
    }
}

const ActionCodeApply = ({ profile }: { profile: Profile }) => {

    const [opened, { open, close }] = useDisclosure(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const [appliedCode, { isLoading }] = useAppliedCodeMutation();
    const dispatch = useAppDispatch();


    const applyCode = async () => {
        try {
            const code = inputRef.current?.value;
            const body = {
                code: code
            }
            if (code !== "") {
                const res = await appliedCode(body) as unknown as ApiResponse;
                if (res.data.success) {

                    toast.success("Applied code successfully");
                    const user: Profile = {
                        ...profile,
                        action_codes: res.data.code
                    }
                    dispatch(addProfile(user));
                    close();
                }
                else {
                    toast.error(res?.data.message, {
                        position: toast.POSITION.TOP_LEFT,
                        autoClose: 2000,
                    })
                }
            }
        } catch (error) {
            console.log(error)
            toast.error("Applied code failed", {
                position: toast.POSITION.TOP_LEFT,
                autoClose: 2000,
            })
        }
    }

    return (
        <>
            <Modal
                centered
                opened={opened}
                onClose={close}
                title={t('Apply Address Code')}
                transitionProps={{ transition: 'fade', duration: 200 }}
                styles={{
                    content: {
                        borderRadius: "10px"
                    },
                    header: {
                        background: "#1C1F26",
                        color: "white",
                    },
                    body: {
                        background: "#1C1F26",
                        height: "100%",
                    },
                    close: {
                        color: "white",
                        background: "transparent",
                        "&:hover": {
                            background: "transparent",
                        },
                        scale: "2"
                    },
                }}
            >
                <div className="pt-4 pb-8 flex flex-col justify-center items-center text-white gap-4">
                    <div className="w-full flex justify-center">

                        <input type="text" className="bg-[#1C1F26] text-white w-[170px] sm:w-[220px] h-[40px] border border-gray-400 rounded-lg px-3"
                            ref={inputRef}
                            placeholder={t('Type apply code')} />

                    </div>


                    <Button
                        style={{
                            backgroundColor: "green",
                            color: "white",
                            padding: "10px 40px",
                        }}
                        loading={isLoading}
                        onClick={applyCode}
                        variant="filled" color="green">{t('Continue')}</Button>


                </div>
            </Modal>

            <button onClick={open} className=" flex justify-start gap-2  w-[250px]  px-3 items-center py-3 text-[#A8B3CF] hover:text-white hover:bg-black duration-[0.5s] rounded">
                <AiFillEdit className="text-[26px]  " />
                <h2 className="text-[16px] pt-1 whitespace-nowrap">{t('Apply Address Code')}</h2>
            </button>

        </>
    )
}

export default ActionCodeApply
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import { CgLock, CgProfile } from 'react-icons/cg';
import { t } from 'i18next';
import { ChangeEvent, useRef, useState } from 'react';
import { Button } from '@mantine/core';
import { useUpdateProfileInfoMutation, useUpdateProfilePhotoMutation } from '@/redux/api/profile';
import { ToastContainer, toast } from "react-toastify";
import { Profile } from '@/utils/Navbar';
import { useAppDispatch } from '@/redux/hook';
import { addProfile } from '@/redux/services/businessSlice';



const ProfileNav = ({profile} : {profile:Profile}) => {

    const [opened, { open, close }] = useDisclosure(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const imageInput = useRef<HTMLInputElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [updateProfileInfo, { isLoading }] = useUpdateProfileInfoMutation();
    const [updateProfilePhoto, { isLoading : uploadLoading }] = useUpdateProfilePhotoMutation();   
    const dispatch = useAppDispatch();      

    let profilePhoto;
    if (profile?.profile_photo == null && profile?.facebook_profile_photo != null) {
        profilePhoto = profile?.facebook_profile_photo;
    }
    else {
        profilePhoto = profile?.profile_photo;
    }

    const imageEdit = () => {
       if(editMode){
        imageInput.current?.click();
       }
    }

    const fileChanged = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setPreviewImage(reader.result as string);
            }
            reader.readAsDataURL(file);
        }
    }

    const saveProfile = async () => {
        const data = new FormData();
        const image = imageInput.current!.files![0];
        const inputName = inputRef.current!.value;
        data.append("name", inputRef.current!.value);
        if(image){
            data.append("photo", image)
        }
        try{
            if(inputName !== "" && profile.name !== inputName){
            await updateProfileInfo(data).unwrap();
            }
            const user: Profile = {
                ...profile,
                name: inputName,
            }
            if(image){
                await updateProfilePhoto(data).unwrap();
                user.profile_photo = previewImage;
            }
            dispatch(addProfile(user));
            setEditMode(false);

            toast.success("Profile Updated Successfully", {
                position: toast.POSITION.TOP_LEFT,
                autoClose: 2000,
              })

        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        catch(res :any){

            toast.error(res?.data.message, {
                position: toast.POSITION.TOP_LEFT,
                autoClose: 2000,
              })
        }
        close();
    }

    return (
        <>
            <Modal
                opened={opened}
                onClose={close}
                centered
                //   fullScreen={isMobile}
                title="Profile"
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
                    
                    <div className="">
                        <div className="avatar bg-gray-500 rounded-full">
                            {
                                previewImage ? (
                                     <img onClick={imageEdit} src={previewImage} alt="" className="rounded-full w-[150px] h-[150px] object-cover" /> 
                                ) : (
                                    <img onClick={imageEdit} src={profilePhoto!} alt="" className="rounded-full w-[150px] h-[150px] object-cover" /> 
                                )
                            }

                            <input type="file" id="file" className="hidden" accept="image/*" ref={imageInput} onChange={fileChanged} />

                        </div>
                    </div>
                    <div className="w-full flex justify-center">
                        {
                            editMode ? (
                                <input type="text" className="bg-[#1C1F26] text-white w-[170px] sm:w-[220px] h-[40px] border border-gray-400 rounded-lg px-3"
                                ref = {inputRef}
                                defaultValue={profile?.name ?? null}
                                required
                                placeholder="Name" />
                            ) : (
                                <div className="flex gap-6 relative w-full justify-center items-center">

                                    
                                    <h2 className="text-[#A8B3CF] text-2xl ">{profile?.name ?? null}</h2>


                                    <button onClick={()=>setEditMode(true)} className='absolute right-6 bg-green-600 px-3 py-2 rounded-lg hover:bg-green-700'>
                                        <CgLock className="text-md" />
                                    </button>
                                </div>
                            )
                        }
                    </div>

                    {
                        editMode && (
                            <Button
                                style={{
                                    backgroundColor: "green",
                                    color: "white",
                                    padding: "10px 40px",
                                }}
                                loading={isLoading || uploadLoading}
                                onClick={saveProfile}
                                variant="filled" color="green">Save</Button>
                        )
                    }

                </div>
            </Modal>

            <button onClick={open} className=" flex justify-start gap-2  w-[250px]  px-3 items-center py-3 text-[#A8B3CF] hover:text-white hover:bg-black duration-[0.5s] rounded">
                <CgProfile className="text-[26px]  " />
                <h2 className="text-[16px] pt-1">{t('Profile')}</h2>
            </button>

      <ToastContainer />
        </>
    )
}

export default ProfileNav
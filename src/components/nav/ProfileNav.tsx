import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core';
import { CgLock, CgProfile } from 'react-icons/cg';
import { t } from 'i18next';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { Button } from '@mantine/core';
import Cookies from 'js-cookie';
import { useUpdateProfileInfoMutation, useUpdateProfilePhotoMutation } from '@/redux/api/profile';
import { ToastContainer, toast } from "react-toastify";
import { useAppSelector } from '@/redux/hook';


interface Profile {
    name: string;
    facebook_profile_photo: string;
    profile_photo: string;
}

const ProfileNav = () => {

    const [opened, { open, close }] = useDisclosure(false);
    const [editMode, setEditMode] = useState<boolean>(false);
    const imageInput = useRef<HTMLInputElement>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [updateProfileInfo, { isLoading }] = useUpdateProfileInfoMutation();
    const [updateProfilePhoto, { isLoading : uploadLoading }] = useUpdateProfilePhotoMutation();
    const user = useAppSelector((state) => state.user);
            console.log(user)

    const [profile, setProfile] = useState<Profile>({
        name: "",
        facebook_profile_photo: "",
        profile_photo: ""
    })


    const fetchProfile = useCallback(
        async () => {
            const token = Cookies.get("token"); // Replace with your actual authorization token
            const headers = { Authorization: `Bearer ${token}` };
            console.log("token", Cookies.get("token"));
            
            try {
                const res = await fetch(
                    "https://novax-mm.com/api/v1/user/profile/me?withAddress=true",
                    {
                        headers,
                    }
                );

                if (!res.ok) {
                    toast.error(res.text, {
                        position: toast.POSITION.BOTTOM_CENTER,
                        autoClose: 2000,
                      });
                }

                const data = await res.json();
                setProfile(data?.data);
                console.log(data.data);
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        },
        []
    )

    useEffect(() => {
        fetchProfile();
    }, [fetchProfile])

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
        data.append("name", profile?.name);
        if(image){
            data.append("photo", image)
        }
        try{
            await updateProfileInfo(data).unwrap();
            if(image){
                await updateProfilePhoto(data).unwrap();
            }
            setEditMode(false);
            toast.success("Profile Updated Successfully", {
                position: toast.POSITION.TOP_LEFT,
                autoClose: 2000,
              })

        }
        catch(res){
            toast.error(res.data.message, {
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
                                    <img onClick={imageEdit} src={profilePhoto} alt="" className="rounded-full w-[150px] h-[150px] object-cover" /> 
                                )
                            }

                            <input type="file" id="file" className="hidden" accept="image/*" ref={imageInput} onChange={fileChanged} />

                        </div>
                    </div>
                    <div className="w-full flex justify-center">
                        {
                            editMode ? (
                                <input type="text" className="bg-[#1C1F26] text-white w-[170px] sm:w-[220px] h-[40px] border border-gray-400 rounded-lg px-3"
                                onChange={(e)=>setProfile({...profile,name:e.target.value})}
                                value={profile?.name ?? null}
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
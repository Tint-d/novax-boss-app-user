import { useGetSupportQuestionsQuery } from "@/redux/api/supportMessageApi";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import Logo from "../../assets/qa.png";

interface Message {
    id: number,
    message: string,
    type: "question" | "answer",
    extra_link?: string
}

interface Question {
    id: number,
    support_question: string,
    support_answer: string,
    extra_link: string
    support_code: string
}

type MessageHistory = Message[]


const QA = ({ setMessage }: { setMessage: React.Dispatch<React.SetStateAction<boolean>> }) => {

    const [messageHistory, setMessageHistory] = useState<MessageHistory>([]);
    const [loading, setLoading] = useState<boolean>(false);

    const { data: questions, isLoading } = useGetSupportQuestionsQuery({});
    const messageContainer = document.getElementById('supportMessage');
    const url = window.getUrl('/v1/user');

    const renderMessages = messageHistory.map((message) => {
        if (message.type === "question") {
            return (
                <div className="chat chat-end">
                    <div className="chat-bubble  font-bold ">   {message.message}</div>
                </div>
            )
        } else {
            return (

                <div className="chat chat-start">
                <div className="chat-bubble ">   {message.message}</div>
            </div>
            )
        }
    })

    const getAnwser = async (q: Question) => {
        if (!isLoading && !loading) {
            setLoading(true);
            const code = q.support_code;

            const question: Message = {
                id: messageHistory.length + 1,
                message: q.support_question,
                type: "question"
            }

            setMessageHistory((prev) => [...prev, question])

            try {
                const res = await fetch(`${url}/support-message/answers?support_code=${code}`);
                const data = await res.json();
                console.log(data);
                const answer: Message = {
                    id: messageHistory.length + 2,
                    message: data.question.support_answer,
                    type: "answer",
                    extra_link: data.question.extra_link
                }
                setMessageHistory((prev) => [...prev, answer])
                if (messageContainer) messageContainer.scrollTop = messageContainer.scrollHeight;
            }
            catch (error) {
                console.log('here');
            }
            finally {
                setLoading(false);
            }
        }
    }


    return (
        <div className="md:w-[440px] w-[340px] h-[70vh] rounded-lg absolute right-0 bottom-[25%]  p-2 pt-5 flex flex-col gap-y-4 justify-center items-center bg-[#262a31] overflow-hidden">
            <RxCross2
                onClick={() => setMessage(false)}
                className="text-xl absolute cursor-pointer top-5 right-3 text-[#A8B3CF]"
            />
            <img
                width={80}
                height={80}
                src={Logo}
            />
            <h2 className="text-[16px] py-2 w-[300px] text-center text-[#A8B3CF]">
                သင်မေးလိုသောမေးခွန်းများကို နှိပ်၍ အဖြေများကို ရယူနိုင်ပါသည်။
            </h2>
            <div className="flex flex-col flex-wrap gap-3 items-center justify-center h-[150px] overflow-x-scroll w-full ">
                {
                    isLoading ? <div className="text-white">Loading...</div> : questions?.questions.map((question: Question) => (
                        <button key={question.id} onClick={() => getAnwser(question)} className={`text-[14px] min-h-[50px] max-h-[300px] min-w-[200px] leading-5 text-white bg-[#383d47] px-3 rounded-[30px] py-1`}>
                            {question.support_question}
                        </button>
                    ))
                }

            </div>
            <div id="supportMessage" className="max-h-[30vh] w-full overflow-y-scroll no-scrollbar text-white flex flex-col gap-7 pb-7 px-5">
                {renderMessages}
            </div>
        </div>
    )
}

export default QA
import { FaRegMessage } from "react-icons/fa6";
import { IoSend } from "react-icons/io5";

const Chat_system = () => {
    return (
        <div className="fixed z-50 bottom-4 right-4 flex flex-col gap-4">

            <div className="w-[350px] bg-white box-shadow rounded-lg overflow-hidden">
                {/* header */}
                <div className="flex items-center space-x-2 bg-customRed p-4">
                    <div className="flex-shrink-0">
                        <img src="https://example.com/user-avatar.jpg" alt="User Avatar" className="rounded-full h-10 w-10" />
                    </div>
                    <div>
                        <div className="text-sm font-medium">Support Team</div>
                        <div className="text-xs font-light">Online</div>
                    </div>
                </div>
                {/* customer message land */}
                <div className="h-[300px] p-4">
                    <div className="flex-grow">
                        <div className="flex space-x-2">
                            <div className="flex-shrink-0">
                                <img src="https://example.com/user-avatar.jpg" alt="User Avatar" className="rounded-full h-10 w-10" />
                            </div>
                            <div>
                                <div className="text-sm font-medium">User Name</div>
                                <div className="text-xs font-light">Last Active: 12:30 PM</div>
                            </div>
                        </div>
                        <div className="text-sm font-medium">Hello, how can I help you today?</div>
                    </div>
                </div>
                {/* customer message input */}
                <div className="flex items-center py-3 border justify-between px-4">
                    <input type="text" placeholder="Type a message..." className="flex-grow w-full  text-sm  focus:outline-none" />
                    <span className="cursor-pointer">
                        <IoSend></IoSend>
                    </span>

                </div>
            </div>



            <div className="ml-auto flex justify-center items-center bg-darkBlue text-white size-[50px] rounded-full text-2xl cursor-pointer hover:bg-black duration-500">
                <FaRegMessage></FaRegMessage>
            </div>
        </div >
    );
};

export default Chat_system;
import useUserSelector from "../../hooks/useUserSelector";
import MicIcon from '@mui/icons-material/Mic';
import HeadsetIcon from '@mui/icons-material/Headset';
import HeadsetOffIcon from '@mui/icons-material/HeadsetOff';
import SettingsIcon from '@mui/icons-material/Settings';
import MicOffIcon from '@mui/icons-material/MicOff';
import { Avatar } from "@mantine/core";
import { useState } from "react";

const ControlPanel = () => {
    const [isMuted, setMute] = useState(false);
    const [isDeafen, setDeafen] = useState(false);

    const toggleMute = () => {
        setMute(!isMuted)
    }

    const toggleDeafen = () => {
        setDeafen(!isDeafen);
        console.log("deafen");
    }

    const user = useUserSelector();
    return <div className="bottom-0">
        <div className="border-gray-700 border-b border-t-0 border-x-0 border-solid"> 
        </div>

        <div className="border-gray-700 border-b border-t-0 border-x-0 border-solid">
            <div className="m-3 flex">
                <Avatar size={"lg"} className="mr-2" src={user.avatar}/>
                {user.username}
            </div>
            <div className="text-right right-0 flex justify-end">
                <IconButton onClick={() => toggleMute()}>
                    {isMuted ? <MicOffIcon className="m-auto"/> : <MicIcon className="m-auto"/>}
                </IconButton>
                <IconButton onClick={() => toggleDeafen()}>
                    {isDeafen ? <HeadsetOffIcon className="m-auto"/> : <HeadsetIcon className="m-auto"/>}
                </IconButton>
                <IconButton onClick={() => {}}>
                    <SettingsIcon className="m-auto"/>
                </IconButton>
            </div>
        </div>
    </div>
}

const IconButton = ({ children, onClick } : { children : JSX.Element, onClick: () => void }) => {

    return <div className="rounded-md w-8 h-8 hover:bg-slate-600 flex m-1 mb-4" onClick={onClick}>
        { children }
    </div>
}

export default ControlPanel;
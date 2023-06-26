import useUserSelector from "../../hooks/useUserSelector";
import MicIcon from '@mui/icons-material/Mic';
import HeadsetIcon from '@mui/icons-material/Headset';
import SettingsIcon from '@mui/icons-material/Settings';
import { Avatar } from "@mantine/core";

const ControlPanel = () => {
    const user = useUserSelector();
    return <div className="bottom-0">
        <div className="border-gray-700 border-b border-t-0 border-x-0 border-solid"> 
            <div className="m-3">
            
            </div>
        </div>
        <div className="border-gray-700 border-b border-t-0 border-x-0 border-solid">
            <div className="m-3 flex">
                <Avatar size={"lg"} className="mr-2" />
                {user.username}
            </div>
            <div className="text-right right-0">
                <MicIcon className="m-1"/>
                <HeadsetIcon className="m-1"/>
                <SettingsIcon className="m-1"/>
            </div>
        </div>
    </div>
}

export default ControlPanel;
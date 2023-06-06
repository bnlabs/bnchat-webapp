import { createContext } from "react";
import { getConnection } from "./SignalRManager";
import { HubConnection } from "@microsoft/signalr";

const SignalRContext = createContext<HubConnection | null>(null);

export function SignalRProvider({ children }: { children: React.ReactNode }) {
	const connection = getConnection();

	return (
		<SignalRContext.Provider value={connection}>
			{children}
		</SignalRContext.Provider>
	);
}

export default SignalRContext;

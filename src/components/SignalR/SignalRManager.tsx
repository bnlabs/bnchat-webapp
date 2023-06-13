import * as signalR from "@microsoft/signalr";

let connection: signalR.HubConnection | null = null;
const url = import.meta.env.VITE_API_URL;

export function getConnection() {
	if (!connection) {
		connection = new signalR.HubConnectionBuilder()
			.withUrl(`${url}/message-hub`, {
				skipNegotiation: true,
				transport: signalR.HttpTransportType.WebSockets,
			})
			.build();
	}
	return connection;
}

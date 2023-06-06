import * as signalR from "@microsoft/signalr";

let connection: signalR.HubConnection | null = null;

export function getConnection() {
	if (!connection) {
		connection = new signalR.HubConnectionBuilder()
			.withUrl("http://localhost:5077/message-hub", {
				skipNegotiation: true,
				transport: signalR.HttpTransportType.WebSockets,
			})
			.build();
	}
	return connection;
}

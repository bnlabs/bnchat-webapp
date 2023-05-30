import * as signalR from '@microsoft/signalr';

let connection: signalR.HubConnection | null = null;

export function getConnection() {
  if (!connection) {
    connection = new signalR.HubConnectionBuilder()
      .withUrl('https://localhost:44369/message-hub')
      .build();
  }
  return connection;
}

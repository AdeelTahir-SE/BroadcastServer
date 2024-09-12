# 🚀 **Real-Time Chat Application CLI** 🚀

This CLI tool allows you to run a Socket.IO server and connect multiple clients for interactive real-time messaging via command-line. The tool supports starting the server and connecting clients for chat with an intuitive user interface.

---

## 🛠️ **Installation**

### 1️⃣ **Clone the repository**
```bash
git clone <repository_url>
cd <repository_directory>
```
### 2️⃣ **Install dependencies**
```bash
npm install
```

## 🚀 Usage
### Commands:

### 1️⃣ **Start the Server:**
``` bash
roadcast-server start [PORT]
```
Description: Start the server on a specific port (default: 5001).
Arguments:
[PORT] (optional): The port number to start the server (between 1 and 65535).
Example:

``` bash
roadcast-server start 5001

```
### 2️⃣ **Connect as a Client:**
```bash

roadcast-server connect [name]
```
Description: Connect to the server as a client and start interacting with real-time messaging.
Arguments:
[name] (optional): Name of the client (default: client).
Example:

``` bash
./<script_name> connect JohnDoe
```

## 📝 Interactive Messaging:
- Once connected, you can start sending messages.
- Type your message and hit **Enter** to send.
- Type `exit` to disconnect.

---

## 💬 Message Display:
- Messages sent by **you** will be prefixed with **"You"** and displayed in **blue**.
- Messages from **others** will be shown in **yellow** followed by the message.
- All messages are assigned an **ID**.

---

## 🛑 Disconnect:
- To disconnect, type `exit` and press **Enter**.

---

## 🛠️ Error Handling:
- Errors related to connection issues or readline input are displayed in **red**.
- If an invalid port is specified, the system will prompt you to enter a valid port number.

---

## ⚙️ Technologies Used:
- **Socket.IO**: For real-time communication.
- **Yargs**: For command-line interface.
- **Readline**: For interactive input.
- **Chalk**: For colorful terminal output.
- **Node.js**: JavaScript runtime for executing server-side code.
- **Express.js**: Web framework for building APIs and handling HTTP requests.

---

## 🔧 Contributing:
Feel free to submit issues or pull requests if you have any improvements or find bugs.

---

## 📜 Link of project idea:
https://roadmap.sh/projects/broadcast-server
---

## 🎉 Enjoy Real-Time Messaging! 🎉

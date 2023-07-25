import Chat from "./components/Chat.component";
import ContextMenu from "./components/ContextMenu.component";

function App() {
  return (
    <>
      <ContextMenu />
      <Chat />
      <div className="companion-content"></div>
    </>
  );
}

export default App;

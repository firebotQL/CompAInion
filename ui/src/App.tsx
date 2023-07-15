import Chat from "./components/Chat.component";
import ContextMenu from "./components/ContextMenu.component";

function App() {
  return (
    <div>
      <header>
        <ContextMenu />
        <Chat />
      </header>
    </div>
  );
}

export default App;

import { Theme } from "./theme";

function App() {
  return (
    <main>
      <header className="flex items-center justify-between p-4">
        <Theme.Switch />
      </header>
    </main>
  );
}

export default App;

import './App.css';
import Dropdown from './components/Dropdown';
import Links from './components/Links';

function App() {

  const dropdownOptions = [
    { value: 'V75', label: 'V75' },
    { value: 'V86', label: 'V86' },
    { value: 'GS75', label: 'GS75' },
  ];

  return (
    <div className="App">
      <header className="App-header">
        <p>
          ATG
        </p>
      </header>

      <div>
        <h1>Choose bet types</h1>
        <Dropdown
          options={dropdownOptions}
        />
        <Links />
      </div>
    </div>
  );
}

export default App;

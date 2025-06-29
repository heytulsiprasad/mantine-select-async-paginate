export default function Home() {
  return (
    <div className="container">
      <main style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <h1>Mantine Select Async Paginate</h1>
        <p style={{ fontSize: '1.25rem' }}>
          Documentation for the async paginate select component for Mantine UI.
        </p>
        
        <div>
          <section>
            <h2>Installation</h2>
            <pre>
              <code>npm install mantine-select-async-paginate</code>
            </pre>
          </section>
          
          <section>
            <h2>Quick Start</h2>
            <p>Import and use the component:</p>
            <pre>
              <code>{`import { AsyncPaginateSelect } from 'mantine-select-async-paginate';

function MyComponent() {
  const [value, setValue] = useState(null);
  
  const loadOptions = async (search, loadedOptions, additional) => {
    const response = await fetch(\`/api/search?q=\${search}\`);
    const data = await response.json();
    
    return {
      options: data.items.map(item => ({
        value: item.id,
        label: item.name,
      })),
      hasMore: data.hasMore,
    };
  };
  
  return (
    <AsyncPaginateSelect
      value={value}
      onChange={setValue}
      loadOptions={loadOptions}
      placeholder="Search..."
    />
  );
}`}</code>
            </pre>
          </section>
          
          <section>
            <h2>Features</h2>
            <ul>
              <li>Async data loading with pagination</li>
              <li>Debounced search</li>
              <li>Infinite scroll support</li>
              <li>TypeScript support</li>
              <li>Full Mantine theming</li>
              <li>Caching options</li>
            </ul>
          </section>
          
          <section>
            <h2>Links</h2>
            <ul style={{ listStyle: 'none' }}>
              <li>
                <a href="https://github.com/heytulsiprasad/mantine-select-async-paginate">
                  GitHub Repository
                </a>
              </li>
              <li>
                <a href="https://www.npmjs.com/package/mantine-select-async-paginate">
                  npm Package
                </a>
              </li>
              <li>
                <a href="https://mantine-select-async-paginate-tulsi-prasads-projects.vercel.app/">
                  Storybook Demo
                </a>
              </li>
            </ul>
          </section>
        </div>
      </main>
    </div>
  );
}
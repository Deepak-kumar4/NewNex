import React, { useState } from 'react';
import Navbar from './Components/Navbar';
import NewsList from './Components/NewsList';

function App() {
  const [category, setCategory] = useState('top');

  return (
    <div>
      <Navbar onCategoryChange={setCategory} selectedCategory={category} />
      <NewsList category={category} />
    </div>
  );
}

export default App;



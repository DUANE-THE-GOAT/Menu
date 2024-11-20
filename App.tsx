// App.tsx
import React, { useState } from 'react';
import { NativeRouter, Route, Routes } from 'react-router-native';
import HomePage from './Screens/HomePage';
import AddMenu from './Screens/AddMenu';
import ViewPage from './Screens/ViewPage';
import { MenuItem } from './types/types'; // Import the MenuItem interface

export default function App() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]); // Initialize as an empty array

  return (
    <NativeRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/add"
          element={<AddMenu setMenuItems={setMenuItems} menuItems={menuItems} />}
        />
        <Route
          path="/view"
          element={<ViewPage menuItems={menuItems} />}
        />
      </Routes>
    </NativeRouter>
  );
}

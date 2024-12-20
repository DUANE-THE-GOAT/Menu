import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker'; // Import Picker
import { useNavigate } from 'react-router-native';
import { MenuItem } from '../types/types';

interface AddMenuProps {
  setMenuItems: React.Dispatch<React.SetStateAction<MenuItem[]>>;
  menuItems: MenuItem[];
}

export default function AddMenu({ setMenuItems, menuItems }: AddMenuProps) {
  const [dishName, setDishName] = useState('');
  const [description, setDescription] = useState('');
  const [course, setCourse] = useState('Starters'); // Default to Starters
  const [price, setPrice] = useState('');
  const navigate = useNavigate();

  const handleAddMenuItem = () => {
    // Basic validation
    if (!dishName || !description || !price) {
      console.log("All fields are required");
      Alert.alert("Error", "All fields are required.");
      return;
    }

    const priceValue = Number(price);
    if (isNaN(priceValue) || priceValue <= 0) {
      console.log("Price must be a valid positive number");
      Alert.alert("Error", "Price must be a valid positive number.");
      return;
    }

    try {
      const newItem: MenuItem = {
        dishName,
        description,
        course,
        price: priceValue,
      };

      console.log("New menu item added", newItem);
      // Update menu items state
      setMenuItems([...menuItems, newItem]);

      // Clear input fields after adding the item
      setDishName('');
      setDescription('');
      setCourse('Starters'); // Reset to default value
      setPrice('');

      // Navigate to the view page to see the menu items
      navigate('/view');
    } catch (error) {
      console.log("Error adding menu item", error);
      Alert.alert("Error", "Failed to add the menu item. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Menu Item</Text>
      <TextInput
        style={styles.input}
        placeholder="Dish Name"
        value={dishName}
        onChangeText={setDishName}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />

      {/* Picker for predefined course list */}
      <Picker
        selectedValue={course}
        style={styles.picker}
        onValueChange={(itemValue) => setCourse(itemValue)}
      >
        <Picker.Item label="Starters" value="Starters" />
        <Picker.Item label="Mains" value="Mains" />
        <Picker.Item label="Desserts" value="Desserts" />
        <Picker.Item label="Drinks" value="Drinks" />
      </Picker>

      <TextInput
        style={styles.input}
        placeholder="Price"
        value={price}
        keyboardType="numeric"
        onChangeText={setPrice}
      />
      <Button title="Add Menu Item" onPress={handleAddMenuItem} />

      {/* Button to view menu items */}
      <Button title="View Menu Items" onPress={() => navigate('/view')} />

      {/* Button to go back to the home page */}
      <Button title="Go Back home" onPress={() => navigate('/')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f0f8ff', // Light blue background
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#4b0082', // Indigo text
  },
  input: {
    height: 50,
    borderColor: '#4682b4', // Steel blue border
    borderWidth: 2,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  picker: {
    height: 50,
    marginBottom: 15,
    backgroundColor: '#e6e6fa', // Lavender background
    borderColor: '#dda0dd', // Plum border
    borderWidth: 1,
    borderRadius: 5,
  },
});
